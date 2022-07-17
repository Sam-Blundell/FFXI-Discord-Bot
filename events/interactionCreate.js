import rolesConfig from '../configs/rolesConfig.js';
import channelsConfig from '../configs/channelsConfig.js';
const { newbie, member, friend } = rolesConfig;
const { generalChannel } = channelsConfig;

export default {
    name: 'interactionCreate',
    execute (interaction) {
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

                interaction.guild.channels.cache.get(generalChannel)
                    .send({
                        content: `${nickname} has joined as a new member.`,
                    });
            } else if (customId === 'friendrole') {
                interaction.member.roles.remove(newbie);
                interaction.member.roles.add(friend);

                interaction.guild.channels.cache.get(generalChannel)
                    .send({
                        content: `${nickname} has joined as a new friend.`,
                    });
            }
        }
    },
};
