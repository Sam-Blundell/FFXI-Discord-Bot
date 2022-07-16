const axios = require('axios');
const { xivApiToken } = require('./configs/xivapiconfig.json');

const xivApi = axios.create({
    baseURL: 'https://xivapi.com/',
});

const getCharacter = (name, server) => {
    xivApi.get('character/search', {
        params: {
            // eslint-disable-next-line camelcase
            private_key: xivApiToken,
            name,
            server,
        },
    })
        .then(({ data }) => data.Results[0]);
};

module.exports = { getCharacter };
