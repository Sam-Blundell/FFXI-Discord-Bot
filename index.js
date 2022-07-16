const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./configs/config.json');

// instantiate new Client object
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        // Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        // Intents.FLAGS.GUILD_MESSAGES
    ],
});

// add a Collection to the new client
client.commands = new Collection();

// read the commands list by parsing the commands folder
const commandFiles = fs.readdirSync('./commands')
    .filter((file) => file.endsWith('.js'));

// add all the commands to the collection on the client
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // with the key as the command name
    // and the value as the exported module
    client.commands.set(command.data.name, command);
}

// read the events list by parsing the events folder
const eventFiles = fs.readdirSync('./events')
    .filter((file) => file.endsWith('.js'));

// create an event listener for all events in the folder
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Listen for interactions, fire the appropriate event or handle
// the appropriate error
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
client.login(token);
