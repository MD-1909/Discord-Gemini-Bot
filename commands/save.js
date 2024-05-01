const { SlashCommandBuilder } = require("discord.js");
const lastMessage = require("../utils/lastMessage");

// Since the replies of the query command are ephemeral, a user can use
// this command to ask the bot to resend the last message with ephemeral
// set to false, in order to preserve the response in the chat.
module.exports = {
  data: new SlashCommandBuilder()
    .setName("save")
    .setDescription("Save the last query and response"),
  async execute(interaction, chat) {
    await interaction.reply({ content: lastMessage.getValue(), ephemeral: false });
    return;
  },
};