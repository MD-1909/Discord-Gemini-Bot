// This is used by the save command to resend the last prompt + response
let lastMessage = "";

module.exports = {
  updateValue: (message) => {
    lastMessage = message;
    return lastMessage;
  },
  getValue: () => lastMessage,
};