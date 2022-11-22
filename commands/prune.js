const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Prunes last x msgs in current chat. Up to 99 msgs.')
        // .addIntegerOption adds a field of type integer, with name and description
        .addIntegerOption(option => option.setName('amount').setDescription('Number of msgs to prune')),

    async execute(interaction) { // overloading
        // getter method
        const amount = interaction.options.getInteger('amount');

        if (amount < 1 || amount > 99) {
            return interaction.reply({content: 'You need to input an integer between 1 and 99', ephemeral: true});
            // ephemeral means the interaction reply is a private msg to u in a public chat (for errors)
        }

        try {
            await interaction.channel.bulkDelete(amount, true);
        } catch (error) {
            console.log(error);
            // ALWAYS REMEMBER, interaction.reply is always needed at the end of execute control flow
            interaction.reply({content: 'Something went wrong when trying to delete these msgs!', ephemeral: true});
        }

        return interaction.reply({ content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true});
    },

};