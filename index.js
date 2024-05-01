require("dotenv").config();
const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  ActivityType,
} = require("discord.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load your Gemini API key and define which model to use
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
let chat;

// Load your Discord Bot's token
const token = process.env.DISCORD_TOKEN;

// Create a new discord client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.slashCommands = new Collection();
const status = { name: "/prompt", type: ActivityType.Listening };

// Runs once the bot has logged in with the token
client.once(Events.ClientReady, (c) => {
  console.log("Gemini is online...");
  // Set the bot's status
  client.user.setActivity(status);
  // Initiate a new chat with gemini
  chat = model.startChat({});
  // Send a starter message to ensure that all replies stay within discord's character limit
  chat.sendMessage("Please limit your replies in this chat to 2000 characters or less. Also, dont specify in your replies that the response contains 'n' number of characters or that you've limited it to 2000 or less characters.");
});

const readSlashCommands = () => {
  let promptCommand = require("./commands/prompt");
  let saveCommand = require("./commands/save");
  client.slashCommands.set(promptCommand.data.name, promptCommand);
  console.log("Successfully loaded " + promptCommand.data.name);
  client.slashCommands.set(saveCommand.data.name, saveCommand);
  console.log("Successfully loaded " + saveCommand.data.name);
};

// Event handler for slash commands
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.slashCommands.get(interaction.commandName);
  if (!command) return;
  try {
    command.execute(interaction, chat);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Prepare slash commands
readSlashCommands();
// Log in to Discord with your client token
client.login(token);
