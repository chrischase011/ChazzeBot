require("dotenv").config();

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.commands = new Collection();

const commandFiles = fs.readdirSync(__dirname+"/commands").filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
	const command = require(__dirname+`/commands/${file}`);

	//setting new items on collection so that we can register it on register_commands.js

	client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {
	if(!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if(!command) return;

	try {
		await command.execute(interaction);
	} catch(e) {
		// statements
		console.log(e);
		await interaction.reply({content:"There was an error on executing command", ephemeral: true});
	}

});



/* 

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

*/

client.login(process.env.CHAZZE_BOT_TOKEN);