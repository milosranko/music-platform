const SaaSApiUrl = 'https://app-flso01saas05ctsp001.cms.optimizely.com/_cms/preview2/oauth/token';
export function getAccessSaaSToken(clientId: string, secret: string) {
    const requestBody = {
        client_id: clientId,
        client_secret: secret,
        grant_type: 'client_credentials'
    }

    return fetch(SaaSApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    }).then(res => {
        return res.json();
    });
}