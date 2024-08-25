import {OpenAI} from 'openai'

const openai = new OpenAI({
    apiKey: process.env?.OPENAI_SECRET_KEY
  });

export async function POST(request: Request) {
    var data = await request.json() as TrackCover;

    if(!data?.artistName?.length || !data?.genre?.length || !data?.trackName?.length) {
        return new Response(JSON.stringify({ error: 'Artist name & track name & genre is required' }), { 
            headers: { 'content-type': 'application/json' },
            status: 400
        });
    }

    const prompt = 
    `Your task is to design an sound track image cover. Try to find style which best fits genre of the sound track. Motives should be based on sound track name and artist name.
    Artist name: ${data.artistName}
    Song track name: ${data.trackName}
    Genre: ${JSON.stringify(data.genre)}
    It is important that text on the image only can be sound track name, artist name, or genre`;

    const imageResults =  await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

    var messageResult = imageResults.data[0].url
    if(!messageResult?.length) {
        return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { 
            headers: { 'content-type': 'application/json' },
            status: 500
        });
    }

    const storage: {url: string} = await fetch(`${process.env?.FILE_STORAGE_URL}/store`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: messageResult
        }),
    }).then(res => res.json()) as {url: string};

    if (!storage?.url) {
        return new Response(JSON.stringify({ error: 'Image not stored' }), { 
            headers: { 'content-type': 'application/json' },
            status: 500
        });
    }

    return new Response(JSON.stringify(storage), { headers: { 'content-type': 'application/json' } });
}

interface TrackCover {
    artistName: string,
    trackName: string,
    genre: string[]
}