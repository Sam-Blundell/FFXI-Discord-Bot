const { newbie } = require('../roles.json');
const { newbiechannel } = require('../channels.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(interaction) {
		console.log(interaction);
		
		await interaction.guild.channels.cache.get(newbiechannel)
			.send('Welcome ' + interaction.user.username);

		const newbieRole = await interaction.guild.roles.cache
			.get(newbie);

		await interaction.roles.add(newbieRole);
	}
};
