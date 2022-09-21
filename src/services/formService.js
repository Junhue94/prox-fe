export async function createForm(data) {
    await fetch('https://webhook.site/c5c76877-e804-4b4d-b9eb-fdb2c8077ad9', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    return data;
}
