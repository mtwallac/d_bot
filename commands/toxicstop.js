module.exports = {
  name: '.tstop',
  description: 'Stop Toxicity Filter',
  execute(msg, args) {
    msg.channel.send('Stopping Toxicity Filter');
    filter = 0
  },
};

