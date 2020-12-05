module.exports = {
  name: '.hi',
  description: 'Say Hi',
  async execute(msg, args) {
    // msg.channel.send(`Sorry I'm late gang, had to stop by Flip's mom's house, took longer than expected`);
    console.log(msg.channel)
  },
};

