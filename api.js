const axios = require('axios');
const { xivApiToken } = require('./configs/xivapiconfig.json');

const xivApi = axios.create({
	baseURL: 'https://xivapi.com/'
});

const getCharacter = (name, server) => {
	return xivApi.get('character/search', {
		params: {
			private_key: xivApiToken,
			name: name,
			server: server
		}
	})
		.then(({ data }) => {
			return data.Results[0];
		});
};

module.exports = { getCharacter };