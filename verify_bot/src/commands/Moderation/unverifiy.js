const { SlashCommandBuilder } = require('discord.js');
const admin = require('firebase-admin');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unverify')
    .setDescription('Unverify with our systems!')
    .addStringOption((option) => option.setName('user').setDescription('hi').setRequired(true)),

  async execute(interaction) {
    const db = admin.database();
    const name = interaction.options.getString('user');

    try {
      const snapshot = await db.ref('verified-verification').orderByChild('roblox').equalTo(name).once('value');

      if (snapshot.exists()) {
        // Get the key of the entry
        const key = Object.keys(snapshot.val())[0];

        // Remove the entry from the database
        await db.ref('verified-verification').child(key).remove();

        interaction.reply('You\'ve successfully unverified yourself!');
      } else {
        interaction.reply('You were not found in the verified-verification database.');
      }
    } catch (error) {
      console.error('Error querying or updating the database:', error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
