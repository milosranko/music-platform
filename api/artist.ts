import { client } from '../server-utils/saas';

export async function POST(request: Request) {
    const {
        userId
    }: any = await request.json();

    const QUERY = `
        {
            ArtistPage(where: { UserId: { eq: "${userId}" } }, locale: [en]) {
                items {
                    _id,
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