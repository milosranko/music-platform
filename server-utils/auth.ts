const apiUrl = 'https://app-flso01saas05ctsp001.cms.optimizely.com/_cms/preview2/oauth/token';
export function getAccessToken(clientId: string, secret: string) {
    const requestBody = {
        client_id: clientId,
        client_secret: secret,
        grant_type: 'client_credentials'
    }
    console.log('\n\n\n\nREQUESTING TOKEN');
    console.log(apiUrl);
    console.log(requestBody);
    console.log('\n\n');

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    }).then(res => {
        return res.json();
    }
    );
}