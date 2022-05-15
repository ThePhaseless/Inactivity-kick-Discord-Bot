// Require the necessary discord.js classes
const { Client, Intents, Message } = require('discord.js');
const token = process.env['token'];


// Create a new client instance
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"]
});

const mySecret = process.env['guildId']

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log(`${client.user.tag} is ONLINE :)`);
  console.log(mySecret);

});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  if (commandName === 'members') {
    interaction.reply({ content: 'Check bot console', ephemeral: true });
    let invite = await interaction.guild.invites.create('633603235466182656', { maxAge: 0, maxUses: 1, unique: 1 });
    console.log(invite.url);
  }

  if (commandName === 'autokick') {
    //Check if user is owner
    if (interaction.user.id != interaction.guild.ownerId) {
      interaction.reply({ content: 'Nice try...', ephemeral: true });
      return
    }

    let whitelist = [];                                         //create list of exluded users
    let messages = await interaction.channel.messages.fetch();  //get all messages in channel

    for (let message of messages) {
      messageauthor = message[1].author.id;
      if (!whitelist.includes(messageauthor))
        whitelist.push(messageauthor);
    }

    whitelist.push('610777694837407755');

    let users = await interaction.guild.members.fetch();
    interaction.channel.send("Kicking:")
    for (let user of users) {
      if (!whitelist.includes(user[1].id))
        if (!user[1].user.bot) {
          let invite = await interaction.guild.invites.create('633603235466182658', { maxAge: 0, maxUses: 1, unique: 1 });
            user[1].send("Hey, so you've been kicked from " + interaction.guild.name +
              ". If you wish to come back, here's your link: " + invite.url) .catch(() => console.log('Cant sent invite to' + user[1].user.username));
            interaction.channel.send(user[1].user.username);
          
          user[1].kick();

        }

    }
    interaction.reply({ content: 'Done' });

  }
})

// Login to Discord with your client's token
client.login(token);
