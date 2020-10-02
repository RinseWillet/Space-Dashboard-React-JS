
// Wrapper for API Calls
export default async function apiWrapper(props) {
    const response = await fetch(props);
    const body = await response.json();
    if (response.status !== 200) {
        throw Error(body.message)
    }
    return body;
}


