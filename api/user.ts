import { getAccessToken } from '../server-utils/auth';
const restUrl = 'https://app-flso01saas05ctsp001.cms.optimizely.com/_cms/preview2/content")';

export async function POST(request: Request) {
    /** The data from UI: */
    const params: any = await request.json();
    console.log('!!!!!!!!');
    console.log(params);
    console.log('!!!!!!!!');

    const accessToken: any = await getAccessToken(process.env?.OPTIMIZELY_CG_CLIENTID as string, process.env?.OPTIMIZELY_CG_SECRET as string);
    const res = await fetch(restUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken.access_token}`,
        accept: 'application/vnd.optimizely.cms.v1.includeSchema+json'
      },
      body: JSON.stringify({
        displayName: params.artistName as string,
      }),
    }).catch(err => {
      console.log('ERROR during creating the user', err);
    });

    const json = await res?.json();
    return new Response(JSON.stringify(json), { headers: { 'content-type': 'application/json' } });
}