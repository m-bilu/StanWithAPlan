const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
let { week } = require('../shared.js')


// HELPER FUNCTION, Logs to log channel on test server
function log(msg, client) 
{
    //console.log(msg);
    const channel = client.channels.cache.find(ch => ch.name === 'log');
    if (!channel) return;
    channel.send(msg);
}

// Adds event to calendar
function addCommand(interaction) {

    let days = { 'Monday' : 0,
        'Tuesday' : 1,
        'Wednesday' : 2,
        'Thursday' : 3,
        'Friday' : 4,
        'Saturday' : 5,
        'Sunday' : 6
    }
    

    // day, start, end, desc
    let newEntry = {user: interaction.user, startHour : interaction.options.getInteger('starthour'), 
    startMinute : interaction.options.getInteger('startminute'), endHour : interaction.options.getInteger('endhour'),
    endMinute : interaction.options.getInteger('endminute'), desc : interaction.options.getString('desc')};

    // Insert in appropriate spot and order, O(n)
    let thisday = week.week[days[interaction.options.getString('day')]];

    console.log(thisday.length);

    for (eventInd = 0; eventInd < thisday.length; ++eventInd) {
        let curTime = thisday[eventInd].startHour*100 + thisday[eventInd].startMinute;
        let targetTime = interaction.options.getInteger('starthour')*100 + interaction.options.getInteger('startminute');
        let nextTime = -1;
        if (eventInd + 1 < day.length) {
            nextTime = thisday[eventInd+1].startHour*100 + thisday[eventInd+1].startMinute;
        }

        // #---

        console.log(`curTime: ${curTime}, targetTime: ${targetTime}, nextTime: ${nextTime}`);

        if (curTime <= targetTime && targetTime != -1 && targetTime < nextTime) {
            thisday.insert(eventInd+1, newEntry);
            console.log(thisday);
        } else if (eventInd + 1 == day.length) {
            thisday.insert(eventInd, newEntry);
            console.log(thisday);
        }
    }

    if (thisday.length == 0) {thisday.push(newEntry);}




    return 'Command Complete';

}

// Purpose: Prints out embed representing calendar, does not use interaction parameter
function printCommand(interaction) {

    scheds = Array(7)
    for (i = 0; i < 7; ++i) {
        scheds[i] = week.sched(i)
    }

    const embed = new EmbedBuilder()
    .setColor('#f5426f')
    .setTitle('Calendar')
    .addFields(
        { name : 'Monday', value : scheds[0] },
        { name : 'Tuesday', value : scheds[1] },
        { name : 'Wednesday', value : scheds[2] },
        { name : 'Thursday', value : scheds[3] },
        { name : 'Friday', value : scheds[4] },
        { name : 'Saturday', value : scheds[5] },
        { name : 'Sunday', value : scheds[6] }
    )
    .setTimestamp();

    interaction.channel.send({ embeds : [embed] });

    return 'Command Complete';
}

//////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// STEP 1.5:
// Producing Calendar object, basic print functionality

module.exports = {
    data : new SlashCommandBuilder()
        .setName("calendar")
        .setDescription('Holds multiple subcommands to manipulate our calendar.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('add')
                .setDescription('Adds an event on -day-, starting at -start- and ending at -start + duration-.')
                .addStringOption(option => option.setName('day').setDescription('Day of the Week.').setRequired(true))
                .addIntegerOption(option => option.setName('starthour').setDescription('Start hour of block.').setRequired(true))
                .addIntegerOption(option => option.setName('endhour').setDescription('End of block.').setRequired(true))
                .addStringOption(option => option.setName('desc').setDescription('Goal of block.').setRequired(true))
                .addIntegerOption(option => option.setName('startminute').setDescription('End hour of block.').setRequired(false))
                .addIntegerOption(option => option.setName('endminute').setDescription('End of block.').setRequired(false))

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

