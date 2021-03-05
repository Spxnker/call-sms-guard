const Discord = require('discord.js')
const db = require('quick.db')
//Spanker
exports.run = async (client, message, args) => {
      //yetkili rol id
if(!["817355812887330817", ""].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  
const kayıtsız = message.guild.roles.cache.find(r => r.id === "kayıtsızrolid")
const erkek = message.guild.roles.cache.find(r => r.id === "erkekrolid")
const erkek1 = message.guild.roles.cache.find(r => r.id === "erkek1rolid")
const kadın = message.guild.roles.cache.find(r => r.id === "kadınrolid")
const kadın1 = message.guild.roles.cache.find(r => r.id === "kadın1rolid")
//Spanker
  
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(`Bir Kullanıcı Belirt.`)
if(!member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu Kullanıcı Sizle Üst/Aynı Pozisyondadır.`)
const x = message.guild.member(member)



message.react('✅')//bu yeri hareketli emoji yapabilirsiniz sj
member.roles.add(kayıtsız)
member.roles.remove(erkek)
member.roles.remove(erkek1)
member.roles.remove(kadın)
member.roles.remove(kadın1)
  
////Spanker
x.roles.add(kayıtsız)
member.roles.remove(erkek)
member.roles.remove(erkek1)
member.roles.remove(kadın)
member.roles.remove(kadın1)
}
//Spanker
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["tagsız"],
    permLevel: 0
};

exports.help = {
    name: "kayıtsız"
}

