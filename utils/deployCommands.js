require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const commands = [];

// Registers the slash commands for the bot
const deploySlashCommands = async () => {
  const rest = new REST({ version: "9" }).setToken(token);
  const promptCommand = require("../commands/prompt");
  const saveCommand = require("../commands/save");
  commands.push(promptCommand.data.toJSON());
  commands.push(saveCommand.data.toJSON());
  rest
    .put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
};

deploySlashCommands();
