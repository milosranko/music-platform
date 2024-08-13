import { getAccessSaaSToken } from '../server-utils/auth';
import { loginDirectusUser, getDirectusUserInfo } from '../server-utils/directus';

export async function POST(request: Request) {
    const {
        login, password
    }: any = await request.json();

    const {data: {
        access_token
    }} = await loginDirectusUser(login, password) as any;

    const {data: {id}} = await getDirectusUserInfo(access_token) as any;

    if (id) {
        return new Response(JSON.stringify({
            userId: id,
          }), { headers: { 'content-type': 'application/json' }, status: 200 });
    }

    // if (!userData || userData.Password !== password) {
        //     return new Response(JSON.stringify({ error: 'User not found' }), { 
        //         headers: { 'content-type': 'application/json' },
        //         status: 404
        //     });
        // } else {
            //     const accessToken: any = await getAccessSaaSToken(process.env?.OPTIMIZELY_REST_CLIENTID as string, process.env?.OPTIMIZELY_REST_SECRET as string);
            //     return new Response(JSON.stringify({userData, accessToken: accessToken?.access_token}), { headers: { 'content-type': 'application/json' } });
            // }
    return new Response(JSON.stringify({ error: 'User not found' }), { 
        headers: { 'content-type': 'application/json' },
        status: 404
    });
}