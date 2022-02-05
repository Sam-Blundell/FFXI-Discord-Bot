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
			await interaction.member.roles.remove(newbie);

			await interaction.reply(
				`Assigning friend role to ${interaction.user.username}.`
			);
		}
	}
};