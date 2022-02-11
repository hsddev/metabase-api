// Dependencies
const axios = require("axios");

// Request info
const opts = (id, query) => {
    return {
        method: "post",
        url: "https://learn.01founders.co/metabase/api/dataset/",
        headers: {
            "X-Metabase-Session": `${id}`,
            "content-type": "application/json",
            Cookie: `metabase.DEVICE=${id}`,
        },
        data: JSON.stringify({
            type: "native",
            native: {
                query: `${query}`,
                "template-tags": {},
            },
            database: 2,
            parameters: [],
        }),
    };
};

// Get the data from metabase
const getMetaData = async (xid, xquery) => {
    try {
        const response = await axios(opts(xid, xquery));

        // return the data
        return {
            rows: response.data.data.rows,
        };
    } catch (err) {
        console.log(err);
    }
};

module.exports = getMetaData;
