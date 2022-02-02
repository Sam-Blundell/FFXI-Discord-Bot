const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Display information about the server'),
	async execute(interaction) {

		const { name, memberCount } = interaction.guild;

		await interaction.reply(
			`Server name: ${name}\nTotal members: ${memberCount}.`
		);

	}
};