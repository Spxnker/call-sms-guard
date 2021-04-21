const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const rdb = require('quick.db')
const pdb = rdb.table('teyitler');
exports.run = async (client, message, args) => {
    let uye = message.mentions.users.first() || message.author;
let bilgi = rdb.get(`yetkili.${uye.id}.toplam`);
let yazı = "Top Teyit Listesi"
  
let top = message.guild.members.cache.filter(uye => rdb.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(rdb.get(`yetkili.${uye2.id}.toplam`))-Number(rdb.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + rdb.get(`yetkili.${uye.id}.toplam`) +"\` Kayıta Sahip.").join('\n');
message.channel.send(new Discord.MessageEmbed().setAuthor(yazı).setTimestamp().setColor("RANDOM").setFooter("Developed Spanker").setDescription(top));
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['top','topteyit'],
  permLevel: 0
}
exports.help = {
  name: 'top',
  description: "toplam teyit gösterir",
  usage: 'top'
}