import axios from 'axios';
import xivApiToken from './configs/xivApiConfig.js';

const xivApi = axios.create({
    baseURL: 'https://xivapi.com/',
});

const getCharacter = (name, server) => xivApi.get('character/search', {
    params: {
        // eslint-disable-next-line camelcase
        private_key: xivApiToken,
        name,
        server,
    },
})
    .then(({ data }) => data.Results[0])
    .catch((error) => {
        console.error('Lodestone API error:\n', error);
        return error;
    });

export { getCharacter };
