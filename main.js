//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STEP 1:
// Initial Set up
// Initialization of Instance, connection with Discord

// Importing necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js'); // requiring discord.js library
const { token } = require('./config.json');

// fs is Node's native file system module. Can read commands directory and identify actual files for each command
// npath is node's native path system module. Can construct file paths for file access (auto detects OS, etc)
const fs = require('node:fs');
const path = require('node:path');

// Creating a new client instance
// the term 'GUILD' is used in Discord API to refer to SERVER
// Intents also define which events should be sent to your bot
// Client class extends EventEmitter class
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it seperate from the already defined 'client'
client.once(Events.ClientReady, c=>{  
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STEP 2:
// Slash commands in folder "commands"
// Now that commands folder is filled, we use command handler to load command files 
// We are avoiding use of long if

// Attaching .commands property to client instance to access commands in other files
client.commands = new Collection(); // Collections extends native JS Map class (stores, retrieves commands for use)


//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STEP 3:
// Load all command files into commands directory (WHY? WHY CANT I JUST IMPORT FOLDER?)

// __dirname is env variable storing absolute path to current file
// commandPath holds path to commands folder
// commandFiles holds an array all .js files in commands folder (filter)
// filter takes in a lambda function as a parameter, with a parameter file, return boolean if file ends with .js
// QUESTION: WHAT IS FILE TYPE OF file? : STRING
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else if (!'data' in command) {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" field.`);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "execute" field.`);
    }

}

// Now, client.commands is a collection holding all commands offered by bot

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STEP 4:
// Event Listener/Command Handler, recieving command interactions (every slash command is an interaction object)

// .on() and .off() methods add/remove events
// this will execute whenever interactionCreate is executed, lambda function will follow through
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand) { return; } // stops if interaction is not slash command

    // Interaction object contains all info needed to know about the specific command we are executing
    // args, name of required command, etc
    // catch and dismiss any asks of commands that do not exist
    // match info with commands array, run commands execute function with interaction as parameter
    // catch and log any errors

    // IMPORTANT: client can always be accessed through interaction.client pointer
    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        // interaction.reply is one common way to tell Discord there is error and command was NOT executed
        // ELSE NOTHING WILL WORK, U MUST COMMUNICATE !!
        await interaction.reply({content: "There was an error while executing this command!", ephemeral: true});
    }
});


// AT THIS POINT, commands are properly defined, loaded onto bot client, and the event listeners are prepped.

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STEP 5:
// Command Deployment Script, Registering Commands
// This will allow commands to be registered on the Discord Client
// Two types: Single Guild, Global Guild Deployment
// Need to be registed once, updated once per change (updated do not include changes to execute, only to name/desc)
// in deploy-commands.js


// Client login onto server, bot will come online, last line in code please
client.login(token) // token stored in config file
