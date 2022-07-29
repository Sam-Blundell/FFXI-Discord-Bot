import { Client, Collection, GatewayIntentBits } from 'discord.js';
import commandFiles from './commands/index.js';
import eventFiles from './events/index.js';
import botConfig from './configs/botConfig.js';
const { botToken } = botConfig;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
    presence: {
        activities: [
            {
                name: 'you',
                type: 'WATCHING',
            },
        ],
    },
});

// collection utility class from discord.js extends JS Map class
client.commands = new Collection();

// store imported commandfiles in new client Collection
Object.values(commandFiles).forEach((commandFile) => {
    client.commands.set(commandFile.data.name, commandFile);
});

// create event listeners for each imported eventFile
Object.values(eventFiles).forEach((eventFile) => {
    if (eventFile.once) {
        client.once(eventFile.name, (...args) => eventFile.execute(...args));
    } else {
        client.on(eventFile.name, (...args) => eventFile.execute(...args));
    }
});

client.login(botToken);
