const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setgamenickname')
		.setDescription('Checks lodestone and sets your discord nick'),
	async execute(interaction) {

		await interaction.member.setNickname('newnickname');

		await interaction.reply(
			'setting your nick...'
		);
	}
};