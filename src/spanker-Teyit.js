const Discord = require('discord.js');
const rdb = require('quick.db');
const pdb = rdb.table('teyitler');
const moment = require("moment");
exports.run = async (client, message, args) => {
  if(!(spxnkerconfig.registerhammer).some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
 let kullanıcı = message.mentions.users.first()
    

if(!kullanıcı) {
let erkek = rdb.fetch(`yetkili.${message.author.id}.erkek`);
let kadın = rdb.fetch(`yetkili.${message.author.id}.kadin`);
let kayıtlar = rdb.fetch(`yetkili.${message.author.id}.toplam`); 
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
  
const sorgu1 = new Discord.MessageEmbed()
.setAuthor(message.author.username)
.setDescription(`˃ Toplam Kayıtların: \`${kayıtlar}\`
˃ Toplam Erkek Kayıtların: \`${erkek}\`
˃ Toplam Kadın Kayıtların: \`${kadın}\``)
.setColor('RANDOM')
.setFooter(`Spanker ?`)
 return message.channel.send(sorgu1)
};
  
if(kullanıcı) {  
let erkek1 = rdb.fetch(`yetkili.${kullanıcı.id}.erkek`);
let kadın1 = rdb.fetch(`yetkili.${kullanıcı.id}.kadin`);
let kayıtlar1 = rdb.fetch(`yetkili.${kullanıcı.id}.toplam`); 
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
  
const sorgu2 = new Discord.MessageEmbed()
.setAuthor(`${kullanıcı.username}`)
.setDescription(`˃ Toplam Kayıtlar: \`${kayıtlar1}\`
˃ Toplam Erkek Kayıtlar: \`${erkek1}\`
˃ Toplam Kadın Kayıtlar: \`${kadın1}\``)
 return message.channel.send(sorgu2)
  
};
  
  };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ks','teyit','me'],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsay',
  description: "Teyit sayısını gösterir",
  usage: 'kayıtsay <nick>'
}