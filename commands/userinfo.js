import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('displays information about the user'),
    async execute (interaction) {
        const {
            tag = 'tagnotfound',
            id = 'idnotfound',
        } = interaction.user;
        await interaction.reply(`User tag: ${tag}\nUser id: ${id}`);
    },
};
