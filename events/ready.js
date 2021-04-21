const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const spxnkerconfig = require('../spxnkerconfig.json');

var prefix = spxnkerconfig.prefix;

module.exports = client => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT Aktif, src yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT ${client.user.username} ismi ile giriş yapıldı!`);
 console.log("Bot aktif!");
  client.user.setActivity(spxnkerconfig.botStatus);
}