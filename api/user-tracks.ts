// {
//     ArtistPage(where: { UserId: { eq: "${userId}" } }, locale: [en]) {
//         items {
//             Name
//             Email
//             Password
//             UserName
//             Tags
//             Tracks {
//                 ...tracksFragment
//             }
//         }
//     }
// }
// fragment tracksFragment on MusicMedia {
//     Title
//     Genre
//     Release
//     Image { url { default } }
// }

import { client } from '../server-utils/saas';

export async function POST(request: Request) {
    const {
        artistPageId
    }: any = await request.json();

    // ArtistTrack(where: { _metadata: {container: { eq: "${artistPageId}" } } }, locale: [en]) {
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

    console.log('\n');
    console.log(result);
    console.log('\n');
    // const userData = result.data?.ArtistPage?.items[0];

    let tracks = [];
    if (result.data?.ArtistTrack?.items) {
        tracks = result.data.ArtistTrack.items.filter((item: any) => item._metadata.container === artistPageId);
    }

    if (!result) {
        return new Response(JSON.stringify({ error: 'Tracks not found' }), { 
            headers: { 'content-type': 'application/json' },
            status: 404
        });
    } else {
        return new Response(JSON.stringify({tracks}), { headers: { 'content-type': 'application/json' } });
    }
}