module.exports = {
  name: '.help',
  description: 'List commands and description',
  execute(msg, args) {
    const commands = require('../commands')
    for (let key in commands) {
      if (commands.hasOwnProperty(key)) {
        msg.channel.send(`${commands[key].name}   ${commands[key].description}`);
      }
    }
  },
};

