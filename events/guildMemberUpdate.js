import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import rolesConfig from '../configs/rolesConfig.js';
import channelsConfig from '../configs/channelsConfig.js';
const { newbie } = rolesConfig;
const { newbieChannel } = channelsConfig;

export default {
    name: 'guildMemberUpdate',
    async execute (oldMember, newMember) {
        if (!newMember.roles.cache.has(newbie) || newMember.nickname === null) {
            return;
        }
        const memberResponse = JSON.stringify({
            id: newMember.id,
            role: 'member',
        });
        const friendResponse = JSON.stringify({
            id: newMember.id,
            role: 'friend',
        });
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(memberResponse)
                    .setLabel('Member')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(friendResponse)
                    .setLabel('Friend')
                    .setStyle(ButtonStyle.Success),
            );

        await newMember.guild.channels.cache.get(newbieChannel)
            .send({
                content: `Thanks ${newMember}, so are you a member of Omen or just a friend?`,
                components: [row],
            });
    },
};
