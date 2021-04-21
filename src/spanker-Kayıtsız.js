const Discord = require('discord.js')
const db = require('quick.db')
//Spanker
exports.run = async (client, message, args) => {
      
if(!(spxnkerconfig.registerhammer).some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return message.channel.send(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`)
  
const kayıtsız = message.guild.roles.cache.find(r => r.id === (spxnkerconfig.kayıtsız))

const erkek = message.guild.roles.cache.find(r => r.id === (spxnkerconfig.erkek1))

const erkek1 = message.guild.roles.cache.find(r => r.id === (spxnkerconfig.erkek2))

const kadın = message.guild.roles.cache.find(r => r.id === (spxnkerconfig.kadın1))

const kadın1 = message.guild.roles.cache.find(r => r.id === (spxnkerconfig.kadın2))
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

