const { newbie } = require('../roles.json');
const { newbiechannel } = require('../channels.json');
const { MessageEmbed } = require('discord.js');

const dscr1 = 'Please use the /name command to set your server ';
const dscr2 = 'nickname to be the same as your in-game name. The command ';
const dscr3 = 'uses two parameters, name & server.\nFor example:\n';
const dscr4 = '/name [Adrian Adelbert] [Ravana]';

module.exports = {
	name: 'guildMemberAdd',
	async execute(interaction) {

		const newMemberJoin = new MessageEmbed()
			.setColor('#02d642')
			.setTitle(`Hi ${interaction.user.username}! Welcome to the server.`)
			.setAuthor({
				name: 'Augur',
				iconURL: 'https://i.imgur.com/KpGs20S.jpeg',
				url: null
			})
			.setDescription(dscr1 + dscr2 + dscr3 + dscr4)
			.setTimestamp();

		await interaction.guild.channels.cache.get(newbiechannel)
			.send({
				content: null,
				embeds: [newMemberJoin]
			});

		const newbieRole = await interaction.guild.roles.cache
			.get(newbie);

		await interaction.roles.add(newbieRole);
	}
};
