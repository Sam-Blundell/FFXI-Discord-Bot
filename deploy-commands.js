import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import commandFiles from './commands/index.js';
import botConfig from './configs/botConfig.js';
const { botToken, clientId, guildId } = botConfig;

const commands = [];
Object.values(commandFiles).forEach((commandFile) => {
    commands.push(commandFile.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(botToken);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('successfully registed application commands.'))
    .catch(console.error);
