const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env['token']
const guildId = process.env['guildId']
const clientId = process.env['clientId']

const commands = [
	new SlashCommandBuilder().setName('autokick').setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName('info').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands for ' + guildId))
  .catch(console.error);