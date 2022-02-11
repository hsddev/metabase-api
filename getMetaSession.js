// Dependencies
const axios = require("axios");

// Metabase credentials
const opts = {
    method: "post",
    url: "https://learn.01founders.co/metabase/api/session",
    headers: {
        accept: "application/json",
        "content-type": "application/json",
    },
    data: '{"username": "salah@01founders.co", "password": "CrpYXoaEi8ywCY"}',
};

// Get metabase session
const getMetaSession = async () => {
    try {
        const response = await axios(opts);

        // Check data
        if (!response || !response.data || !response.data)
            throw new Error("Data object not found");

        // return the session
        return response.data;
    } catch (err) {
        console.log(err);
    }
};

module.exports = getMetaSession;
