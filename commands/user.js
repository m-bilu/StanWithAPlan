/* // imports
const { SlashCommandBuilder } = require('discord.js');

// exporting slash command info
module.export = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Retrieves user information.'),
    async execute(interaction) {
        // interaction.user is the object holding the User who ran the command
        // interaction.member is a GuildMember object, which represents user in the specific guild
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined at ${interaction.member.joinedAt}.`);
    },
    
}; */

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Retrieves user information.'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};