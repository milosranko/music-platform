import { client } from '../server-utils/saas';

export async function GET(request: Request) {
    const QUERY = `
        {
            ArtistTrack(locale: [en]) {
                items {
                    _id,
                    Name,
                    Genres,
                    Url,
                    Cover,
                    Promo,
                    Artists,
                    _metadata {
                        ... on InstanceMetadata {
                            container
                        }
                    }
                }
            }
        }
    `;
    
    const result = await client.query(QUERY, {  });


    let tracks = result.data?.ArtistTrack?.items;

    if (!result) {
        return new Response(JSON.stringify({ error: 'Tracks not found' }), { 
            headers: { 'content-type': 'application/json' },
            status: 404
        });
    } else {
        return new Response(JSON.stringify({tracks}), { headers: { 'content-type': 'application/json' } });
    }
}