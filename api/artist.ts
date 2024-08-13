import { Client, cacheExchange, fetchExchange } from '@urql/core';

const client = new Client({
    url: `https://cg.optimizely.com/content/v2?auth=${process.env?.OPTIMIZELY_CG_SINGLEKEY}`,
    exchanges: [cacheExchange, fetchExchange],
  });

export async function POST(request: Request) {
    const {
        userId
    }: any = await request.json();

    const QUERY = `
        {
            ArtistPage(where: { UserId: { eq: "${userId}" } }, locale: [en]) {
                items {
                    Name
                    Email
                    Password
                    UserName
                    Tags
                    Tracks {
                        ...tracksFragment
                    }
                }
            }
            }
            fragment tracksFragment on MusicMedia {
                Title
                Genre
                Release
                Image { url { default } }
            }
    `;
    
    const result = await client.query(QUERY, {  });
    const userData = result.data?.ArtistPage?.items[0];

    if (!userData) {
        return new Response(JSON.stringify({ error: 'User not found' }), { 
            headers: { 'content-type': 'application/json' },
            status: 404
        });
    } else {
        return new Response(JSON.stringify({userData}), { headers: { 'content-type': 'application/json' } });
    }
}