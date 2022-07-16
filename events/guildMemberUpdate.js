const { newbie } = require('../configs/roles.json');
const { newbiechannel } = require('../configs/channels.json');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    async execute (oldMember, newMember) {
        const usrNm = newMember.nickname;
        if (!newMember.roles.cache.has(newbie) || newMember.nickname === null) {
            return;
        }
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('memberrole')
                    .setLabel('Member')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('friendrole')
                    .setLabel('Friend')
                    .setStyle('SUCCESS'),
            );

        await newMember.guild.channels.cache.get(newbiechannel)
            .send({
                content: `Thanks ${usrNm}, so are you a member of Omen or just a friend?`,
                components: [row],
            });
    },
};
