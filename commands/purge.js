const { Client } = require("discord.js");

module.exports = {
  name: '.purge',
  description: 'Delete @users last n messages',
  execute(message, args) {
    const user = message.mentions.users.first()
    // parse amount
    const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
    if (!amount && !user) return message.reply('user an n dumby')
    if(amount > 5) return message.reply('no more than 5 at a time')   
    message.channel.fetchMessages({
      limit: 5,
    }).then((messages) => {
      if(user) {
        const filterBy = user ? user.id : Client.user.id
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
      }
      message.channel.bulkDelete(messages).catch(error => console.log(error.stack))
    })
  },
};