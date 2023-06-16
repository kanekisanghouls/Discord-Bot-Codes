client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
  
    const { commandName } = interaction;
  
    if (commandName === 'embed') {
      // Build the embed using the SlashCommandBuilder
      const embed = new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create a custom embed message')
        .addStringOption((option) =>
          option
            .setName('content')
            .setDescription('The content of the embed')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('color')
            .setDescription('The color of the embed')
        );
  
      // Send the embed as a reply
      await interaction.reply({ embeds: [embed.toJSON()] });
    }
  });
  