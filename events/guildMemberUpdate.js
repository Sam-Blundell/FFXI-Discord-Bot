import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import rolesConfig from '../configs/rolesConfig.js';
import channelsConfig from '../configs/channelsConfig.js';
const { newbie } = rolesConfig;
const { newbieChannel } = channelsConfig;

export default {
    name: 'guildMemberUpdate',
    async execute (oldMember, newMember) {
        const usrNm = newMember.nickname;
        if (!newMember.roles.cache.has(newbie) || newMember.nickname === null) {
            return;
        }
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('memberrole')
                    .setLabel('Member')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('friendrole')
                    .setLabel('Friend')
                    .setStyle(ButtonStyle.Success),
            );

        await newMember.guild.channels.cache.get(newbieChannel)
            .send({
                content: `Thanks ${usrNm}, so are you a member of Omen or just a friend?`,
                components: [row],
            });
    },
};
