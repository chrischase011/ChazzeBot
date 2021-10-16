const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName("me")
	.setDescription("Replies your username"),
	async execute(interaction){
		await interaction.reply(`Hello there, ${interaction.user}`);
	},
}