require('dotenv').config();

const fs = require('fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientID = process.env.CLIENT_ID;
const guildID = process.env.GUILD_ID;
const token = process.env.CHAZZE_BOT_TOKEN;

/*
const commands = [
	new SlashCommandBuilder().setName("ping").setDescription("Replies pong"),
	new SlashCommandBuilder().setName("server").setDescription("Replies the server info"),
	new SlashCommandBuilder().setName("user").setDescription("Replies the user's username"),

].map(command => command.toJSON());
*/

const commands = [];
const commandFiles = fs.readdirSync(__dirname+"/commands").filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
	const command = require(__dirname+`/commands/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({version:'9'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientID,guildID), {body:commands})
.then(() => {console.log("Registered commands successfully")})
.catch(console.error);