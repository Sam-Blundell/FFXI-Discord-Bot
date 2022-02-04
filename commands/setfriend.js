const { SlashCommandBuilder } = require('@discordjs/builders');
const { newbie, friend } = require('../roles.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolesetfriend')
		.setDescription('Assigns the user the server role of friend'),
	async execute(interaction) {
		
		if (!interaction.member.roles.cache.has(newbie)) {
			await interaction.reply(
				'Only new people can use this command'
			);
		} else {
			await interaction.member.roles.add(friend);
			// TODO: fix this so it properly removes the old new person role
			// await interaction.member.roles.delete(newbie);

			await interaction.reply(
				`Assigning friend role to ${interaction.user.username}.`
			);
		}
	}
};