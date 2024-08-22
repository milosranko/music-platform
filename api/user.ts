import { getAccessSaaSToken } from '../server-utils/auth';
import { getDirectusUserInfo, loginDirectusUser, regiserDirectusUser } from '../server-utils/directus';
import { restUrl } from '../server-utils/saas';

export async function POST(request: Request) {
    /** The data from UI: */
    const params: any = await request.json();
    
    const createUserStatus = await regiserDirectusUser(params.email, params.password);
    
    if (createUserStatus !== 204) {
      return new Response('', { headers: { 'content-type': 'application/json' }, status: 400 });
    }

    const {data: {access_token}} = await loginDirectusUser(params.email, params.password) as any;
    const {data: userData}: any = await getDirectusUserInfo(access_token);

    const body = {
      "key": params.key.replace(/-/gi, ''),
      "contentType": "ArtistPage",
      "locale": "en",
      "container": "562f65defc854736a253401dfc13898d",
      "displayName": params.artistName,
      "status": "Published",
      "properties": {
          "UserId": userData.id,
          "Name": params.artistName,
          "Description": "<p>some text</p>",
          "UserName": params.userName,
          "Password": params.password,
          "Email": params.email,
      }
    };

    const saasAccessToken: any = await getAccessSaaSToken(process.env?.OPTIMIZELY_REST_CLIENTID as string, process.env?.OPTIMIZELY_REST_SECRET as string);

    const res = await fetch(restUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${saasAccessToken.access_token}`,
        accept: 'application/vnd.optimizely.cms.v1.includeSchema+json'
      },
      body: JSON.stringify(body),
    }).catch(err => {
      console.log('ERROR during creating the user', err);
    });

    // const saasResponse.status = await res?.json();
    return new Response(JSON.stringify({
      userId: userData.id,
    }), { headers: { 'content-type': 'application/json' }, status: 200 });
}
