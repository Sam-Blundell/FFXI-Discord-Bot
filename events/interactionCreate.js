const { newbie, member, friend } = require('../configs/roles.json');
const { generalchannel } = require('../configs/channels.json');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		const {
			user: { tag = 'usertagnotfound' },
			channel: { name = 'channelnotfound' },
		} = interaction;
		console.log(`${tag} in #${name} triggered an interaction`);

		if (!interaction.isButton()) {
			return;
		}

		const { customId, member: { nickname } } = interaction;

		if (
			(customId === 'memberrole' || customId === 'friendrole')
			&& interaction.member.roles.cache.has(newbie)
		) {
			if (customId === 'memberrole') {
				interaction.member.roles.remove(newbie);
				interaction.member.roles.add(member);

				interaction.guild.channels.cache.get(generalchannel)
					.send({
						content: `${nickname} has joined as a new member.`
					});
			} else if (customId === 'friendrole') {
				interaction.member.roles.remove(newbie);
				interaction.member.roles.add(friend);

				interaction.guild.channels.cache.get(generalchannel)
					.send({
						content: `${nickname} has joined as a new friend.`
					});
			}
		}
	}
};