module.exports = {
	name: 'guildMemberAdd',
	async execute(interaction) {
		console.log(interaction);
		
		await interaction.guild.channels.cache.get('938532408779743276')
			.send('Welcome ' + interaction.user.username);

		const newbieRole = await interaction.guild.roles.cache
			.get('938950302902652968');

		await interaction.roles.add(newbieRole);
	}
};
