const { getCharacter } = require('../api.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { newbie } = require('../roles.json');

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


		if (!interaction.member.roles.cache.has(newbie)) {
			await interaction.reply(
				'Only new people can use this command'
			);
			return;
		}

		const newNick = interaction.options.getString('nickname');
		const server = interaction.options.getString('server');

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
					interaction.reply(
						`Setting your nickname to ${newNick}...`
					);
					interaction.member.setNickname(newNick);
				}
			});

	}
};