const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('displays information about the user'),
	async execute(interaction) {
		const { name, id } = interaction.user;
		await interaction.reply(`User name: ${name}\nUser id: ${id}`);
	}
};