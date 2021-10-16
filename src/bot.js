require("dotenv").config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;

	const { commandName } = interaction;
	switch (commandName) {
		case "ping":
			await interaction.reply("Pong");
			break;
		case "server":
			await interaction.reply(`Server info: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}`);
		break;
		case "user":
			await interaction.reply(`Hello ${interaction.user}`);
		break;
		default:
			await interaction.reply("I cannot recognize that command");
		break;
	}
});

client.login(process.env.CHAZZE_BOT_TOKEN);