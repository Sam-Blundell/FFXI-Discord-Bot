const { newbie } = require('../configs/roles.json');
const { newbiechannel } = require('../configs/channels.json');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	name: 'guildMemberUpdate',
	async execute(oldMember, newMember) {

		const usrNm = newMember.nickname;
		const memberMsg = `Thanks ${usrNm}, `;
		const memberMsg2 = 'so are you a member of Omen or just a friend?';
		
		if (!newMember.roles.cache.has(newbie) || newMember.nickname === null) {
			return;
		} else {
			const row = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('memberrole')
						.setLabel('Member')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('friendrole')
						.setLabel('Friend')
						.setStyle('SUCCESS')
				);

			await newMember.guild.channels.cache.get(newbiechannel)
				.send({
					content: `${memberMsg}${memberMsg2}`,
					components: [row]
				});
		}
	}
};