const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('pong');
	} else if (commandName === 'server') {
		await interaction.reply('[placeholder for future server info]');
	} else if (commandName === 'user') {
		await interaction.reply('[placeholder for future user info');
	}
});

client.login(token);