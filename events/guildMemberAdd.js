import { newbie } from '../configs/roles.json';
import { newbiechannel } from '../configs/channels.json';
import { MessageEmbed } from 'discord.js';

export default {
    name: 'guildMemberAdd',
    async execute (interaction) {
        const newMemberJoin = new MessageEmbed()
            .setColor('#02d642')
            .setTitle(`Hi ${interaction.user.username}! Welcome to the server.`)
            .setAuthor({
                name: 'Augur',
                iconURL: 'https://i.imgur.com/KpGs20S.jpeg',
                url: null,
            })
            .setDescription('Please use the /name command to set your server nickname to be the same as your in-game name. The command uses two parameters, name & server.\nFor example:\n/name Adrian Adelbert Ravana')
            .setTimestamp();

        await interaction.guild.channels.cache.get(newbiechannel)
            .send({
                content: null,
                embeds: [newMemberJoin],
            });

        const newbieRole = await interaction.guild.roles.cache
            .get(newbie);

        await interaction.roles.add(newbieRole);
    },
};
