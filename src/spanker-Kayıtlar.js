const Discord = require('discord.js');
const rdb = require('quick.db')
exports.run = async (client, message, args) => {
 
     //yetkili id
if(!(spxnkerconfig.registerhammer).some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`).then(x => x.delete({timeout: 5000}));
  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`Lütfen birisini etiketleyin!`)).then(x => x.delete({timeout: 5000}));
let isim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);//Useri tanımladık
var sayi = 1 //Sıralam için sayı tanımladık
let data = rdb.get(`isim.${message.guild.id}`)//İsim verisini data diye tanımladık
let rol = rdb.fetch(`rol.${message.guild.id}`)
if(!data) return message.channel.send(new Discord.MessageEmbed()
    .setColor("RANDOM") 
    .setThumbnail(user.user.avatarURL ({ dynamic: true}))      
    .setDescription(`
    ${isim} Adlı Kullanıcı Daha Önce Kayıt Olmamış.`)
    .setColor("RANDOM"))
let isimler = data.filter(x => x.userID === isim.id).map(x => `${sayi++}- \`• ${x.isim} | ${x.yas}\`  (<@&${x.role}>),(<@&${x.role2}>)`).join("\n") //x.role kısmını çoğaltabilirsiniz.
if(isimler === null) isimler = "Kullanıcı hiç kayıt olmamış"
if(isimler === undefined) isimler = "Kullanıcı hiç kayıt olmamış"
    
  const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setFooter(`Spanker ?`) 
    .setAuthor(`Bu Kullanıcı ${sayi-1} Kere Kayıt Olmuş`) 
    .setDescription(`
    ${isimler}`)
    .setColor("RANDOM")
message.channel.send(embed)
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kayıtlar','isimler'],
  permLevel: 0
}
exports.help = {
  name: 'isimler',
  description: "kişinin eski isimlerini gösterir",
  usage: 'isimler @kişi'
}