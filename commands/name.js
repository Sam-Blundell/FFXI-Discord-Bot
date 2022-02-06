const { getCharacter } = require('../api.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { newbie } = require('../roles.json');
const serverCaseCheck = require('../utils/serverCaseCheck.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('name')
		.setDescription('Checks lodestone and sets your discord nickname')
		.addStringOption(option => option.setName('nickname')
			.setDescription('your in-game username')
			.setRequired(true))
		.addStringOption(option => option.setName('server')
			.setDescription('the server your character is on')
			.setRequired(true)),
	async execute(interaction) {


		// TODO: change this to use the built in permission system.
		if (!interaction.member.roles.cache.has(newbie)) {
			const notNewUserEmbed = new MessageEmbed()
				.setColor('#d40000')
				.setTitle('Only new members can use this command')
				.setTimestamp();
			await interaction.reply({ embeds: [notNewUserEmbed] });
			return;
		}
		
		const newNick = interaction.options.getString('nickname');
		const serverArg = interaction.options.getString('server');

		const server = serverCaseCheck(serverArg);

		if (!server) {
			const unknownServerEmbed = new MessageEmbed()
				.setColor('#d40000')
				.setTitle(`Invalid server name: ${serverArg}`)
				.setTimestamp();
			await interaction.reply({ embeds: [unknownServerEmbed] });
			return;
		}

		await getCharacter(newNick, server)
			.then((data) => {
				console.log(data);
				return data;
			})
			.then((data) => {
				if (!data) {
					const nickFailEmbed = new MessageEmbed()
						.setColor('#d40000')
						.setTitle('Authentication failure')
						.setAuthor({
							name: 'Augur',
							iconURL: 'https://i.imgur.com/KpGs20S.jpeg'
						})
						.setDescription(
							`${newNick} not found on server: ${server}`
						)
						.setTimestamp()
						.setFooter({
							text: 'All information sourced from lodestone'
						});
					interaction.reply({ embeds: [nickFailEmbed] });
				} else {
					const newNickEmbed = new MessageEmbed()
						.setColor('#02d642')
						.setTitle('Authentication success')
						.setAuthor({
							name: 'Augur',
							iconURL: 'https://i.imgur.com/KpGs20S.jpeg'
						})
						.setDescription(
							`${newNick} found on server: ${server}`
						)
						.setImage(data.Avatar)
						.setTimestamp()
						.setFooter({
							text: 'All information sourced from lodestone'
						});
					interaction.reply({ embeds: [newNickEmbed] });
					interaction.member.setNickname(newNick);
				}
			});

	}
};