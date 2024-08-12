import {OpenAI} from 'openai'

const openai = new OpenAI({
    apiKey: process.env?.OPENAI_SECRET_KEY
  });

export async function POST(request: Request) {
    var data = await request.json() as AlbumPromo;

    if(!data?.artistName?.length || !data?.genre?.length || !data?.albumName?.length) {
        return new Response(JSON.stringify({ error: 'Artist name & album name & genre is required' }), { 
            headers: { 'content-type': 'application/json' },
            status: 400
        });
    }

    const prompt = 
    `[no_prose]
    [Output only JSON]
    You are a marketing specialist. Your task is to create a unique promotional text for a new album by music artist that should attract new listeners. You want to highlight genre and unique music from this album. Promotion text should be in plain text without emojis and special characters. It needs to be a minimum of 3 sentences and a maximum of 7. It is important to be objective and not personalized.
    Artist's name is '${data.artistName}'
    Album name is '${data.albumName}'
    Genre: ${JSON.stringify(data.genre)}
    Output needs to be JSON, schema:
    { description: "" }`;

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
            role: "user",
            content: prompt
            },
        ],
        temperature: 1,
        model: "gpt-4o",
        });

    var messageResult = chatCompletion.choices[0]?.message?.content

    if(!messageResult?.length) {
        return new Response(JSON.stringify({ error: 'Unexpected error occurred' }), { 
            headers: { 'content-type': 'application/json' },
            status: 500
        });
    }

    var jsonString = messageResult.replace('```json', "").replace("```", "");

    var result = JSON.parse(jsonString);

    return new Response(JSON.stringify(result), { headers: { 'content-type': 'application/json' } });
}

interface AlbumPromo {
    artistName: string,
    albumName: string,
    genre: string[]
}