import { Client, cacheExchange, fetchExchange } from '@urql/core';

const client = new Client({
    url: `https://cg.optimizely.com/content/v2?auth=${process.env?.OPTIMIZELY_CG_SINGLEKEY}`,
    exchanges: [cacheExchange, fetchExchange],
  });

export async function POST(request: Request) {
    /** The data from UI: */
    const params = await request.json();

    /** The params must be in the query. Use ${params.email}, etc... */
    const QUERY = `
    {
    }
    `;
    /** Uncomment the nextline */
    // const result = await client.query(QUERY, {  });
    return new Response(JSON.stringify(params), { headers: { 'content-type': 'application/json' } });
}