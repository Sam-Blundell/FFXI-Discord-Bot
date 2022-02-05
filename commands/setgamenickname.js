const getCharacter = require('../api.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setgamenickname')
		.setDescription('Checks lodestone and sets your discord nick')
		.addStringOption(option => option.setName('nickname')
			.setDescription('your in-game username')
			.setRequired(true))
		.addStringOption(option => option.setName('server')
			.setDescription('the server your character is on')
			.setRequired(true)),
	async execute(interaction) {

		const newNick = interaction.options.getString('nickname');
		const server = interaction.options.getString('server');

		await getCharacter(newNick, server)
			.then((data) => {
				console.log(data);
				return data;
			})
			.then((data) => {
				if (!data) {
					interaction.reply(
						`The character ${newNick} doesn't exist on ${server}`
					);
				} else {
					interaction.reply(
						`Setting your nickname to ${newNick}...`
					);
					interaction.member.setNickname(newNick);
				}
			});

	}
};