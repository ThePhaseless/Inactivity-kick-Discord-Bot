// Require the necessary discord.js classes
const { Client, Intents, Message } = require('discord.js');
const token = process.env['token'];


// Create a new client instance
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"]
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log(`${client.user.tag} is ONLINE :)`);
});
const whitelist = [];

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  if (commandName === 'info') {
    await interaction.guild.members.fetch().then(console.log).catch(console.error);
    interaction.reply({ content: 'Check bot console', ephemeral: true });
  }

  if (commandName === 'autokick') {
    //Check if user is owner
    if (interaction.user.id != interaction.guild.ownerId) {
      interaction.reply({ content: 'Nice try...', ephemeral: true });
      return
    }

    let whitelist = [];                             //create list of exluded users
    let channel = interaction.channel;              //fetch channel that command is used in
    channel.messages.fetch()                        //get all messages in channel
      .then(messages => {
        for (let msg of messages) {                 //fill whitelist with ids
          let authorid = msg[1].author.id;
          if (!whitelist.includes(authorid))        //skip existing users
          {
            whitelist.push(authorid);
            console.log(authorid);
          }
        }
      })
      .finally(interaction.reply({ content: 'Done', ephemeral: true }));  //reply in discord when done

    interaction.guild.members.fetch().then(members => {
      for (let member of members) {
        if (!whitelist.includes(member[0]))
          interaction.channel.send('Kicked: ' + member[1].nickname);
          console.log('Kicked: ' + member[1].nickname);
      }
    })
  }
});

// Login to Discord with your client's token
client.login(token);
