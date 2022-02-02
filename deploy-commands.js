const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./config.json');

const commands = [
	new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong.'),
	new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server information.'),
	new SlashCommandBuilder()
		.setName('user')
		.setDescription('Replies with user information.')
];

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('successfully registed application commands.'))
	.catch(console.error);