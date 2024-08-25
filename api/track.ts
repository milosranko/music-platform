import { getAccessSaaSToken } from '../server-utils/auth';
import { client, restUrl } from '../server-utils/saas';

export async function POST(request: Request) {
    /** The data from UI: */
    const params: any = await request.json();
    const key = params.id.replace(/-/gi, '');
    const body = {
      "key": key,
      "contentType": "ArtistTrack",
      "locale": "en",
      "container": params.artistPageId,
      "displayName": params.title,
      "status": "Published",
      "properties": {
          "Name": params.title,
          "Description": "<p>some text</p>",
          "Url": params.url,
          "Genres": params.genres,
          "Artists": params.artists,
          "Cover": params.cover,
          "Promo": params.promo,
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
      console.log('ERROR during creating the track', err);
    });

    const response = await res?.json();
    return new Response(JSON.stringify({
      response,
    }), { headers: { 'content-type': 'application/json' }, status: 200 });
}