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

export default {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('Checks lodestone and sets your discord nickname')
        .addStringOption((option) => option.setName('nickname')
            .setDescription('your in-game username')
            .setRequired(true))
        .addStringOption((option) => option.setName('server')
            .setDescription('the server your character is on')
            .setRequired(true)),
    async execute (interaction) {
        // TODO: change this to use the built in permission system.
        if (!interaction.member.roles.cache.has(newbie)) {
            const notNewUserEmbed = new MessageEmbed()
                .setColor(failRed)
                .setTitle('Only new members can use this command')
                .setTimestamp();
            await interaction.reply({
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
            await interaction.reply({
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
            await interaction.reply({
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
            await interaction.reply({
                content: null,
                embeds: [newNickEmbed],
            });
            try {
                await interaction.member.setNickname(newNick);
            } catch (error) {
                console.log(error);
                await interaction.editReply({
                    content: 'Error changing nickname, are you an admin?',
                });
            }
        }
    },
};
