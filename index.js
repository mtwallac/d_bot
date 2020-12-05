require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
let filter = 0
let fLinks = 0
let stalking = 0
let conf = 0

let targetId = '200037356491898880' // flip
// let targetId = '172949976152801280' // me

const fs = require('fs')

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  // log if stalking is on
  if (stalking && msg.author.id == targetId) {
    fs.appendFile('./logs/flip.txt', `${msg.content} \n`, function (err) {
      if (err) throw err
      console.log('Saved!')
    })
  }

  // delete toxicity if the filter is on
  if (filter && msg.author.id == targetId) {
    console.log(msg.content)
    msg.delete(1)
  }
  //fix links if toggled
  if (fLinks) {
    bot.commands.get('.fl').improve(msg)
  }
  // looking for confirmation input
  if (conf && msg.author.id == '172949976152801280') {
    if (msg.content == 'yes') {
      bot.commands.get('.bgone').execute(msg)
    }
    conf = 0
  }
  // not from me or the bot
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  if (!bot.commands.has(command)) return;
  if (msg.author.id === '767922830989197382') return;
  try {
    // if the command came from me or not a universal command
    if (msg.author.id !== '172949976152801280' && !(command == '.sfw' || command == '.fl'))  {
      msg.reply('lol no scrub')
    } else {
      console.info(`Called command: ${command}`);
      if (msg.content == '.bgone') {
        if (!conf) {
          msg.channel.send(`Are  you sure you want to execute this command?`);
          conf = 1
          return
        }
      }
      bot.commands.get(command).execute(msg, args);
      if(msg.content == '.tstart') {filter = 1}
      if(msg.content == '.tstop') {filter = 0}
      if(msg.content == '.logstart') {stalking = 1}
      if(msg.content == '.logstop') {stalking = 0}
      if(msg.content == '.fl') {
        fLinks = !fLinks
        msg.channel.send(`Fixing links: ${fLinks}`);
      }
    }
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});
