import { Client, Collection, Intents } from 'discord.js';
import commandFiles from './commands/index.js';
import eventFiles from './events/index.js';
import botConfig from './configs/botConfig.js';
const { botToken } = botConfig;

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        // Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        // Intents.FLAGS.GUILD_MESSAGES
    ],
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

// Listen for interactions, fire the appropriate event
// or handle the appropriate error
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply(
            {
                content: 'There was an error while executing this command!',
                ephemeral: true,
            },
        );
    }
});

// Start point
client.login(botToken);
