import { getCharacter } from '../api.js';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { serverCaseCheck } from '../utils/serverCaseCheck.js';
import rolesConfig from '../configs/rolesConfig.js';
const { newbie } = rolesConfig;

const failRed = '#d40000';
const successGreen = '#02d642';
const authorObj = {
    name: 'Augur',
    iconURL: 'https://i.imgur.com/KpGs20S.jpeg',
};

export default {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('Checks lodestone and sets your discord nickname')
        .addStringOption((option) => option
            .setName('nickname')
            .setDescription('your in-game username')
            .setRequired(true))
        .addStringOption((option) => option
            .setName('server')
            .setDescription('the server your character is on')
            .setRequired(true)),
    async execute (interaction) {
        /* NOTE: Use deferReply here to keep the interaction token alive for
            more than three seconds in case the API response is slow. */
        await interaction.deferReply();
        if (!interaction.member.roles.cache.has(newbie)) {
            const notNewUserEmbed = new EmbedBuilder()
                .setColor(failRed)
                .setTitle('Only new members can use this command')
                .setAuthor(authorObj)
                .setDescription('If you\'re having trouble with our bot please @ Jack or Adrian for assistance')
                .setTimestamp();
            await interaction.editReply({
                content: `${interaction.user}`,
                embeds: [notNewUserEmbed],
            });
            return;
        }

        const newNick = interaction.options.getString('nickname');
        const serverArg = interaction.options.getString('server');
        const server = serverCaseCheck(serverArg);

        if (!server) {
            const unknownServerEmbed = new EmbedBuilder()
                .setColor(failRed)
                .setTitle(`Invalid server name: ${serverArg}`)
                .setAuthor(authorObj)
                .setDescription('Please try again, or if you\'re having trouble with our bot please @ Jack or Adrian for assistance')
                .setTimestamp();
            await interaction.editReply({
                content: null,
                embeds: [unknownServerEmbed],
            });
            return;
        }

        const charData = await getCharacter(newNick, server);
        if (!charData) {
            const nickFailEmbed = new EmbedBuilder()
                .setColor(failRed)
                .setTitle('Authentication failure')
                .setAuthor(authorObj)
                .setDescription(`Lodestone can't find a player named ${newNick} on server: ${server}\nPlease try again or @ Jack or Adrian for assistance.`)
                .setTimestamp()
                .setFooter({ text: 'All information sourced from lodestone' });
            await interaction.editReply({
                content: null,
                embeds: [nickFailEmbed],
            });
        } else {
            const newNickEmbed = new EmbedBuilder()
                .setColor(successGreen)
                .setTitle('Authentication success')
                .setAuthor(authorObj)
                .setDescription(`${newNick} found on server: ${server}`)
                .setImage(charData.Avatar)
                .setTimestamp()
                .setFooter({ text: 'All information sourced from lodestone' });
            await interaction.editReply({
                content: null,
                embeds: [newNickEmbed],
            });
            try {
                await interaction.member.setNickname(newNick);
            } catch (error) {
                console.log('NameCommandError:\n', error, '\n');
                await interaction.followUp({
                    content: 'There was an error when Augur tried to change your nickname.\nThis is usually caused by someone with elevated server permissions attempting to use the /name command.\nAre you an admin?\nPlease @ Jack or Adrian for assistance.',
                });
            }
        }
    },
};
