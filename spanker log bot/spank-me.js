'use strict';

const { Bu, Bot, spanker, Tarafından, Yapılmıştır, } = require("discord.js")
const logs = require("discord-logs") //Daha Detaylı Bir Bot Yapacaktım Fakat Guardı Yapıyorum Zamanım az. O yüzden Detaylısını Guard Paylaştıktan sonra güncelliyeceğim.
const Discord = require("discord.js") 
const client = (global.client = new Discord.Client());

require('./util/eventLoader.js')(client);


const config = require('./config/configuration.json');
// config = require('./config/emoji.json')
// config = require('./config/kanal.json')
// config = require('./config/rol.json') Gibi ayrı da yapabilirsiniz.

const mongoose = require('mongoose');
mongoose.connect('url',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
}),

// Mongo ne alaka diyenlere sesleniyorum;
// Guardı Paylaştıktan Sonra Log Botunu Güncelleyeceğim İçin Kaldırmadım İsteğinize Bağlı Kaldırınız.

// Hata Alırsanız Mongoyu Kaldırmanızı Öneriyorum.
    
client.on("channelDelete", channel => {
    client.channels.cache.get(config.simple.kanallog)
      .send("<@817747393025015828> Kanal Kaldırıldı").then(message => {
              // <@817747393025015828> Ctrl + H Yaparak Kendi İd nizi Yazınız.
        var spankmerss = [
            ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + " ")
             // <@817747393025015828> Ctrl + H Yaparak Kendi İd nizi Yazınız.
          ]
          var spankmersss = [
            ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".")
             // <@817747393025015828> Ctrl + H Yaparak Kendi İd nizi Yazınız.
          ]
          var spankmerssr = [
            ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".\nKaldırılan Kanal İsmi**:")
          ]
          var spankmerssshj = [
            ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".\nKaldırılan Kanal İsmi**: :name_badge: " + channel.name + " .")
          ]
          var spankmerssb = [
            ("@here Lütfen Biraz Bekleyiniz.. \Tahmini Bekleme Süresi: (10 Saniye)")
          ]
          var spankmersssbv = [
            ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".\nKaldırılan Kanal İsmi**: :name_badge: " + channel.name + ".")
          
          ]
          var spankmersssbvv = [
            ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + "\n**Kaldırılan Kanal İsmi**: :name_badge: " + channel.name + ".")
          
          ]
          message.edit(`${spankmerss}`);
          message.edit(`${spankmersss}`);
          message.edit(`${spankmerssr}`);
          message.edit(`${spankmerssshj}`)
          message.edit(`${spankmerssb}`);
          message.edit(`${spankmersssbv}`);
          message.edit(`${spankmersssbvv}`);
          
          
            });
  });

  client.on("channelCreate", channel => {
      client.channels.cache.get(config.simple.kanallog)
      .send("<@817747393025015828> Kanal Oluşturuldu").then(message => {

        var spankmerss = [
            ("<@817747393025015828> Kanal Oluşturuldu: \n**Oluşturulan Kanal ID**: :name_badge: " + channel.id + " ")
          ]
          var spankmersss = [
            ("<@817747393025015828> Kanal Oluşturuldu: \n**Oluşturulan Kanal ID**: :name_badge: " + channel.id + ".")
          ]
          var spankmerssr = [
            ("<@817747393025015828> Kanal Oluşturuldu: \n**Oluşturulan Kanal ID**: :name_badge: " + channel.id + ".\nOluşturulan Kanal İsmi**:")
          ]
          var spankmerssshj = [
            ("<@817747393025015828> Kanal Oluşturuldu: \n**Oluşturulan Kanal ID**: :name_badge: " + channel.id + ".\nOluşturulan Kanal İsmi**: :name_badge: " + channel.name + " .")
          ]
          var spankmerssb = [
            ("@here Lütfen Biraz Bekleyiniz.. \Tahmini Bekleme Süresi: (10 Saniye)")
          ]
          var spankmersssbv = [
            ("<@817747393025015828> Kanal Oluşturuldu: \n**Oluşturulan Kanal ID**: :name_badge: " + channel.id + ".\nOluşturulan Kanal İsmi**: :name_badge: " + channel.name + " .")
          
          ]
          var spankmersssbvv = [
            ("<@817747393025015828> Kanal Oluşturuldu: \n**Oluşturulan Kanal ID**: :name_badge: " + channel.id + "\n**Oluşturulan Kanal İsmi**: :name_badge: " + channel.name + " .")
          
          ]
          message.edit(`${spankmerss}`);
          message.edit(`${spankmersss}`);
          message.edit(`${spankmerssr}`);
          message.edit(`${spankmerssshj}`)
          message.edit(`${spankmerssb}`);
          message.edit(`${spankmersssbv}`);
          message.edit(`${spankmersssbvv}`);
          
          
            });
    
  })
  
  // Arkadaşlar diğer eventleri yazmayı üşendim aynı şekilde yapabilirsiniz.

//   client.on("roleCreate", role)
//   client.on("roleDelete", role)
//   client.on("roleUpdate", role)

//   client.on("channelCreate", channel)
//   client.on("channelDelete", channel)
//   client.on("channelUpdate", channel)

//   client.on("emojiCreate", Emoji)
//   client.on("emojiDelete", Emoji)
//   client.on("emojiUpdate", Emoji)

// Gibi yapabilirsiniz.


  // Güzel Günler de Kullanın.


client.login(config.object.botToken)
.then(c => console.log(`${client.user.tag} İsminde Giriş Gerçekleşti!`))
.catch(err => console.error("Bot Başlatılamadı!"
));
