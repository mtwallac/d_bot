const { Client } = require("discord.js");

module.exports = {
  name: '.bgone',
  description: 'B gone',
  async execute(message) {
    message.channel.send('B gone')
    const sum_messages = []
    let last_id
    
    while(true) {
      const options = {limit: 100}
      if (last_id) {
        options.before = last_id
      }
      console.log(last_id)
      const messages = await message.channel.fetchMessages(options)
      let filterBy = 'KEYWORD'
      for(const [id, message] of messages) {
        if(message.content.includes(filterBy)) message.delete()
      }

      sum_messages.push(...messages.array())
      last_id = messages.last().id
      if (messages.size != 100) {
        break
      }
    }
  },
};