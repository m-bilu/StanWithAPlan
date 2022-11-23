const { SlashCommandBuilder, Collection } = require("discord.js");
const { SlotData } = require('../shared.js');
let { week } = require('../shared.js')


// HELPER FUNCTION, Logs to log channel on test server
function log(msg, client) 
{
    console.log(msg);
    const channel = client.channels.cache.find(ch => ch.name === 'log');
    if (!channel) return;
    channel.send(msg);
}

function genCommand(interaction) {
    //log('Starting gen...', interaction.client);
    //log(`week is ${week}`, interaction.client);
    week = new Collection();
    //log('Week is made!', interaction.client);
    daysInWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (day of daysInWeek) {
        newday = new Array(24);
        week.set(day, newday);
        
        for (hour in newday) {
            week.get(day).get(hour).push(new SlotData('Empty', ''));
        }
    }

    log('Full Calendar is made!', interaction.client);
}

function printCommand(interaction) {
    log('Printing...', interaction.client);
    log(week.get('Monday').length.toString(), interaction.client);
    log('Successfully printed!', interaction.client);
}



//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STEP 1.5:
// Producing Calendar object, basic print functionality

module.exports = {
    data : new SlashCommandBuilder()
        .setName("calendar")
        .setDescription('Resets to new instance of empty calendar.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('gen')
                .setDescription('Generates new instance of week, all slots empty.')
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('print')
                .setDescription('Prints current calendar onto chat.')    
        ),



    
        async execute(interaction) {

            eval(interaction.options.getSubcommand().concat('Command(interaction)'));
            // NEVER FORGET RESPONSE
            await interaction.reply('Command Done!');
        },
};

