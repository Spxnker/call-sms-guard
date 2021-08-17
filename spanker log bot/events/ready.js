const Discord = require('discord.js');
const spxnker = require('../config/configuration.json');

module.exports = client => {
  client.user.setStatus("dnd");
  setInterval(() => {
      const spankme = ["Spanker 💙 Shinoa", "Spanker 💙 Miaf"];
      const allahu = Math.floor(Math.random() * (spankme.length));
      client.user.setActivity(`${spankme[allahu]}`, {type: "PLAYING"});
    }, 10000);
  
};
