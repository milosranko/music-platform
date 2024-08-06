import { Client, cacheExchange, fetchExchange } from '@urql/core';
import { getAccessToken } from '../server-utils/auth';

const client = new Client({
    url: `https://cg.optimizely.com/content/v2?auth=${process.env?.OPTIMIZELY_CG_SINGLEKEY}`,
    exchanges: [cacheExchange, fetchExchange],
  });

export async function POST(request: Request) {
    const {
        login, password
    }: any = await request.json();

    const QUERY = `
        {
            ArtistPage(where: { UserName: { eq: "${login}" } }, locale: [en]) {
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

    if (!userData || userData.Password !== password) {
        return new Response(JSON.stringify({ error: 'User not found' }), { 
            headers: { 'content-type': 'application/json' },
            status: 404
        });
    } else {
        const accessToken: any = await getAccessToken(process.env?.OPTIMIZELY_REST_CLIENTID as string, process.env?.OPTIMIZELY_REST_SECRET as string);
        return new Response(JSON.stringify({userData, accessToken: accessToken?.access_token}), { headers: { 'content-type': 'application/json' } });
    }
}