const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('displays information about the user'),
	async execute(interaction) {
		const { tag, id } = interaction.user;
		await interaction.reply(`User tag: ${tag}\nUser id: ${id}`);
	}
};