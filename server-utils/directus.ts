export function regiserDirectusUser(email: string, password: string) {
    // process.env?.DIRECTUS_API_KEY
    // process.env?.DIRECTUS_BASE_URL

    const url = `${process.env['DIRECTUS_BASE_URL']}/users/register`;
    const requestBody = {
        email,
        password
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env['DIRECTUS_API_KEY']}`
        },
        body: JSON.stringify(requestBody),
    }).then(res => {
        console.log('\n', requestBody, '\n', res, '\n');
        return res.status;
    });
}

export function loginDirectusUser(email: string, password: string) {
    
    console.log('\n\nloginDirectusUser:', email, password);

    const url = `${process.env['DIRECTUS_BASE_URL']}/auth/login`;
    const requestBody = {
        email,
        password
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env['DIRECTUS_API_KEY']}`
        },
        body: JSON.stringify(requestBody),
    }).then(res => {
        return res.json();
    });
}

export function getDirectusUserInfo(access_token: string) {
    console.log('\n\ngetDirectusUserInfo:', access_token);

    const url = `${process.env['DIRECTUS_BASE_URL']}/users/me`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    }).then((response) => {
        return response.json();
     });
}