const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setgamenickname')
		.setDescription('Checks lodestone and sets your discord nick')
		.addStringOption(option => option.setName('nickname')
			.setDescription('your in-game username')
			.setRequired(true)),
	async execute(interaction) {

		const newNick = interaction.options.getString('nickname');

		await interaction.member.setNickname(newNick);

		await interaction.reply(
			`Setting your nickname to ${newNick}...`
		);
	}
};