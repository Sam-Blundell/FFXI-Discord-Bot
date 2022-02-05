const axios = require('axios');
const { xivApiToken } = require('./xivapiconfig.json');

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
	});
};

module.exports = getCharacter;