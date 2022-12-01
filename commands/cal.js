const { SlashCommandBuilder, Collection, EmbedBuilder } = require("discord.js");
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
        
        for (hour = 0; hour <= 23; ++hour) {
            week.get(day)[hour] = { name: 'Empty', description: 'None', time : `${day}, time is ${hour}.` };
        }
    }

}

function printCommand(interaction) {
    ///////////////////////////
    ///////////////////////////
    // EMBED FOR CALENDAR
    items = week.get('Monday'); // Make sure week is initialized;

    const embed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle("Stan's Plan")
    .setAuthor({ name: 'Stan'})
    .setDescription(`This week on ${interaction.guild.name}`)
    .setTimestamp()

    // Adding all timeslots onto embed
    for (var xc = 0; xc < (items.length-1); xc++) {
        console.log(items);
        const item = items[xc];
        console.log(item);
        embed.addFields({ name: 'Time Slot Entry', value: item});
    }

    interaction.channel.send({ embeds : [embed] });
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
            await interaction.reply('Command Complete');
        },
};

