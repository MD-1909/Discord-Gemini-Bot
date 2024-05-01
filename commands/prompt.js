const { SlashCommandBuilder } = require("discord.js");
const lastMessage = require("../utils/lastMessage");

async function buildReply(prompt, chat) {
  const response = await chat.sendMessage(prompt); // Query the AI
  const reply = await response.response;
  return reply.text();
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("prompt")
    .setDescription("Send a prompt to Gemini")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("The content of your prompt")
        .setRequired(true)
    ),
  // Discord expects a slash command to get resolved within 5 seconds
  // Since gemini takes slightly longer than that to reply, we need to send an initial message
  // and then edit it once we get a response from gemini.
  async execute(interaction, chat) {
    await interaction.reply({ content: "### **> " + interaction.options.getString("query") + "**" + "\nLoading response...", ephemeral: true });
    let answer = await buildReply(
      interaction.options.getString("query"), chat
    );
    await interaction.editReply({ content: "### **> " + interaction.options.getString("query") + "**" + "\n" + answer, ephemeral: true });
    lastMessage.updateValue("### **> " + interaction.options.getString("query") + "**" + "\n" + answer);
    return;
  },
};
