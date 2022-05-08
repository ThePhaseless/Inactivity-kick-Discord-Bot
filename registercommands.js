const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env['token']
const guildId = process.env['guildId']
const clientId = process.env['clientId']

const commands = [
	new SlashCommandBuilder().setName('autokick').setDescription("Kicks users that didn't replied in this chat"),
  new SlashCommandBuilder().setName('members').setDescription('Logs to console all users that typed in this chat'),
]
	.map(command => command.toJSON());


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands for ' + guildId))
  .catch(console.error);