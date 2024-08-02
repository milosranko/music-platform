import { getAccessToken } from '../server-utils/auth';
const restUrl = 'https://app-flso01saas05ctsp001.cms.optimizely.com/_cms/preview2/content?skipValidation=true';

export async function POST(request: Request) {
    /** The data from UI: */
    const params: any = await request.json();
    const body = {
      "key": params.key.replace(/-/gi, ''),
      "contentType": "ArtistPage",
      "locale": "en",
      "container": "562f65defc854736a253401dfc13898d",
      "displayName": params.artistName,
      "properties": {
          "Name": params.artistName,
          "Description": "<p>some text</p>",
          "UserName": params.userName,
          "Password": params.password,
          "Email": params.email,
      }
    };
    console.log('!!!!!!!!');
    console.log(body);
    console.log('!!!!!!!!');

    const accessToken: any = await getAccessToken(process.env?.OPTIMIZELY_CG_CLIENTID as string, process.env?.OPTIMIZELY_CG_SECRET as string);
    console.log('accessToken', accessToken);
    const res = await fetch(restUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.access_token}`,
        accept: 'application/vnd.optimizely.cms.v1.includeSchema+json'
      },
      body: JSON.stringify(body),
    }).catch(err => {
      console.log('ERROR during creating the user', err);
    });

    const json = await res?.json();
    return new Response(JSON.stringify(json), { headers: { 'content-type': 'application/json' } });
}