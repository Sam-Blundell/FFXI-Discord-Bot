import rolesConfig from '../configs/rolesConfig.js';
import channelsConfig from '../configs/channelsConfig.js';
const { newbie } = rolesConfig;
const { generalChannel } = channelsConfig;

export default {
    name: 'interactionCreate',
    async execute (interaction) {
        const {
            user: { tag = 'usertagnotfound' },
            channel: { name = 'channelnotfound' },
        } = interaction;
        console.log(`${tag} in #${name} triggered an interaction`);

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands
                .get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.editReply(
                    {
                        content: 'There was an error while executing this command!',
                        ephemeral: true,
                    },
                );
            }
        } else if (interaction.isButton()) {
            const { customId, member: { nickname } } = interaction;
            const { roles: userRoles } = interaction.member;

            if ( rolesConfig[customId] && userRoles.cache.has(newbie) ) {
                await interaction.update({
                    content: `Adding ${nickname} to server as a ${customId}...`,
                    components: [],
                });
                await userRoles.remove(newbie);
                await userRoles.add(rolesConfig[customId]);
                await interaction.guild.channels.cache.get(generalChannel)
                    .send({
                        content: `${nickname} has joined as a new ${customId}.`,
                    });
            }
        } else {
            return;
        }
    },
};
