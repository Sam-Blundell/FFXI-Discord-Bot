import { getCharacter } from '../api.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';
import { serverCaseCheck } from '../utils/serverCaseCheck.js';
import rolesConfig from '../configs/rolesConfig.js';
const { newbie } = rolesConfig;

const failRed = '#d40000';
const successGreen = '#02d642';
const authorObj = {
    name: 'Augur',
    iconURL: 'https://i.imgur.com/KpGs20S.jpeg',
};

// TODO: All replies should be mentions or @s

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
            const notNewUserEmbed = new MessageEmbed()
                .setColor(failRed)
                .setTitle('Only new members can use this command')
                .setTimestamp();
            await interaction.editReply({
                content: null,
                embeds: [notNewUserEmbed],
            });
            return;
        }
        const newNick = interaction.options.getString('nickname');
        const serverArg = interaction.options.getString('server');

        const server = serverCaseCheck(serverArg);
        if (!server) {
            const unknownServerEmbed = new MessageEmbed()
                .setColor(failRed)
                .setTitle(`Invalid server name: ${serverArg}`)
                .setTimestamp();
            await interaction.editReply({
                content: null,
                embeds: [unknownServerEmbed],
            });
            return;
        }

        const charData = await getCharacter(newNick, server);
        if (!charData) {
            const nickFailEmbed = new MessageEmbed()
                .setColor(failRed)
                .setTitle('Authentication failure')
                .setAuthor(authorObj)
                .setDescription(`No ${newNick} on server: ${server}`)
                .setTimestamp()
                .setFooter({ text: 'All information sourced from lodestone' });
            await interaction.editReply({
                content: null,
                embeds: [nickFailEmbed],
            });
        } else {
            const newNickEmbed = new MessageEmbed()
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
                    content: 'There was an error when Augur tried to change your nickname.\nThis is usually caused by someone with elevated server permissions attempting to use the /name command.\nAre you an admin?',
                });
            }
        }
    },
};
