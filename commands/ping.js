const { SlashCommandBuilder } = require("discord.js");


    // data and interaction-response method is stored in module.exports
    // module.exports is how u export data out of a Node.js file SO THAT
    // a different file (loader, deployment script) can 'require' it
    module.exports = {

        // data holds instance which connects with Discord, enlists this as a slash command
        // name, description
        data : new SlashCommandBuilder()
        .setName("ping")
        .setDescription('Replies with Pong!'),

        // Discord API requires an interaction-response method to confirm to Discord that 
        // Interaction has been read, response has indeed been given
        // interaction.reply() allows for acknowledgement and response + more in Response methods section

        // ASYNC is for asynchronous function like a promise, resolve using await instead of chaining with .then()
        async execute(interaction) {
            await interaction.reply('Pong!');
        }

    };


    
    