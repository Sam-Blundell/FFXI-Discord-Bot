const axios = require('axios');

const xivApi = axios.create({
	baseUrl: 'https://xivapi.com/'
});

const getCharacter = (name, server) => {
	return xivApi.get('character', {
		params: {
			name: name,
			server: server
		}
	});
};

module.exports = getCharacter;