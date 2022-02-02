module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const {
			user: { tag = 'usertagnotfound' },
			channel: { name = 'channelnotfound' }
		} = interaction;
		console.log(`${tag} in #${name} triggered an interaction`);
	}
};