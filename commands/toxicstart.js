module.exports = {
  name: '.tstart',
  description: 'Start toxicity filter',
  execute(msg, args) {
    msg.channel.send('Starting Toxicity Filter');
    filter = 1
  },
};

