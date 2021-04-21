const Discord = require("discord.js");
const db = require('quick.db')

module.exports.run = async (client, message, args) => {
  if(!(spxnkerconfig.kayıtsıfırlamarolid).some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!kişi) return message.channel.send('Bir kişiyi etiketlemen gerekli.')
  if(kişi) { 
  message.channel.send(`<@!${kişi.id}> Kişisinin teyit bilgileri başarıyla sıfırlandı.`)
db.delete(`yetkili.${message.author.id}.erkek`)
db.delete(`yetkili.${message.author.id}.kadin`)  
db.delete(`yetkili.${message.author.id}.toplam`)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'sıfırla'
}