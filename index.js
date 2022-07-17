import { Client, Collection, Intents } from 'discord.js';
import commandFiles from './commands/index.js';
import eventFiles from './events/index.js';
import botConfig from './configs/botConfig.js';
const { botToken } = botConfig;

// instantiate new Client object
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        // Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        // Intents.FLAGS.GUILD_MESSAGES
    ],
});

// add a Collection to the new client for holding commands
client.commands = new Collection();

// add commands to the client collection with command
// name as key and command module as value
Object.values(commandFiles).forEach((commandFile) => {
    client.commands.set(commandFile.data.name, commandFile);
});

// create event listeners for all events
// for (const eventFile of Object.values(eventFiles)) {
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

// Start the bot
client.login(botToken);
