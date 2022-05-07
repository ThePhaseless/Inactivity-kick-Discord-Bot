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

  function prnt(value){
    console.log(value);
  }

  if (commandName === 'info') {
    await interaction.guild.members.fetch().then(console.log).catch(console.error);
  }

  if (commandName === 'autokick') {
    if (!interaction.user.id == "282188744696659969") {
      await interaction.reply('chciałbyś')
      return
    }

    let channel = interaction.channel;
    channel.messages.fetch()
      .then(messages => {
        for (let msg of messages)
          for (let x of msg)
            if (x.author)
              if (!x.author.bot) {
                whitelist.push(x.author.id);
                client.channels.cache.get(channel.id).send(x.author.username);
              }
      }
      ).catch(console.error);
    const members = interaction.guild.members.fetch().then(members => console.log(members))
    while (true)
      console.log(members);


    //tbd: https://www.w3schools.com/jsref/jsref_includes_array.asp



    interaction.reply('Zostają:');
  }
});

// Login to Discord with your client's token
client.login(token);
