import { Client, cacheExchange, fetchExchange } from '@urql/core';

export const client = new Client({
    url: `https://cg.optimizely.com/content/v2?auth=${process.env?.OPTIMIZELY_CG_SINGLEKEY}`,
    exchanges: [cacheExchange, fetchExchange],
});

export const restUrl = 'https://app-flso01saas05ctsp001.cms.optimizely.com/_cms/preview2/content?skipValidation=true';