module.exports = {
  name: '.sfw',
  description: '(universal permission) Post some good ol sfw',
  execute(message, args) {
    let loop = 5
    let max = 10
    if (args.length > 0) {
      loop = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
      loop = loop > max ? max : loop
    }
    for (let i = 0; i < loop; i++) {
      message.channel.send({
        files: ["./img/sfw.png"]
      })
    }
  },
};

