import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Display information about the server'),
    async execute (interaction) {
        const {
            name = 'namenotfound',
            memberCount = 'countnotfound',
        } = interaction.guild;

        await interaction.reply(
            `Server name: ${name}\nTotal members: ${memberCount}.`,
        );
    },
};
