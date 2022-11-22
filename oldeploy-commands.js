// Purpose: To define, register and update slash commands

// require returns the module.exports in those files

const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// This holds all commands in commands directory of bot
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    // command holds json (data, execute()) from this specific file
	const command = require(`./commands/${file}`);
    // we are pushing data part of json in JSON format (name, desc) onto empty commands array
	commands.push(command.data.toJSON());
}

// At the end of this loop, the commands array holds json versions of (name, desc) for each command
// We will use this information to register slash commands

// sets REST module instance. WHAT IS REST?
const rest = new REST({ version: '10' }).setToken(token);

// DEPLOYING COMMANDS:
(async () => {
    try {
        console.log(`Registering ${commands.length} (/) commands...`);

        // put method fully refreshes all commands in the guild with the current set (for current bot)
        const data = await rest.put(
            // routes to be refreshed are at this path...
            Routes.applicationCommands(clientId),
            // routes being refreshed here...
            { body: commands },
        );
    } catch (error) {
        console.error(error);
    }
})();