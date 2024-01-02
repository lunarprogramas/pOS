const { SlashCommandBuilder } = require('discord.js');
const admin = require('firebase-admin');

const serviceAccount = require('../../../authentication.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://website-auth-afe12-default-rtdb.europe-west1.firebasedatabase.app',
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('check-verify')
    .setDescription('Check if you are verified!')
    .addStringOption(option => option.setName('user').setDescription('hi').setRequired(true)),

  async execute(interaction) {
    const db = admin.database();
    const name = interaction.options.getString('user');

    try {
      const sd = db.ref('verified-verification').orderByChild('roblox').equalTo(name);
      const snapshot = await sd.once('value');
      const data = snapshot.val();

      if (data === null) {
        interaction.reply("You've got no data!");
      } else {
        interaction.reply(`Looks like you're verified with us!`);
      }
    } catch (error) {
      console.error('Error querying the database:', error);
      interaction.reply('An error occurred while processing your request.');
    }
  },
};
