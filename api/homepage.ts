import { Client, cacheExchange, fetchExchange } from '@urql/core';

const client = new Client({
    url: `https://cg.optimizely.com/content/v2?auth=${process.env?.OPTIMIZELY_SAAS_SINGLE_KEY}`,
    exchanges: [cacheExchange, fetchExchange],
  });

export async function GET(request: Request) {
    const QUERY = `
        {
            StartPage(locale: en) {
                items {
                    Heading
                }
            }
        }
    `;
    
    const result = await client.query(QUERY, {  });
    return new Response(JSON.stringify(result.data), { headers: { 'content-type': 'application/json' } });
}