'use strict';

/*
 Türkiye 'de ilk paylaşılan sms + guard botudur.
 Spanker, Shinoa ve Null 'dan Size..
*/


const Vonage = require('@vonage/server-sdk');
const Discord = require("discord.js") 
const client = (global.client = new Discord.Client());
const config = require('./config-client.json');
const {whitelist,presence} = require('./config-client.json')
const {} = require('./functions.js')

// Sms gönderen kısım
const spankerApi = new Vonage({ 
  apiKey: config.simple.NEXMO_API_KEY, 
  apiSecret: config.simple.NEXMO_API_SECRET
}); 




client.on("error", function(Error) {
  console.log("CLIENT ERROR",Error)
})
client.on("rateLimit", function(RateLimitData) {
  console.log("RATE LIMIT WARN",RateLimitData)
})

client.on("warn", function (warn) {
  console.log("CLIENT WARN",warn)
})

client.on("ready", async () => {
  client.user.setPresence({ status: "dnd" });
  });

// Yazarken yanlış yazdığım basit hatalar olabilir çözebilirsiniz çok zor değil. 





// Roller
client.on('roleDelete', async role => {
  let entry = await role
  .guild.fetchAuditLogs({type: 'ROLE_DELETE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  role.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let spankerLogMessaj = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${role.name} ${role.id} Rolleri Silindi!` 
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, spankerLogMessaj, (err, responseData) => {
  if (err) { console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
      } else {
        console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
       
/*
Canım sıkıldı böyle yaptım eleştirmeyin.
        client.channels.cache.get(config.logs)
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
       */
      }
    }
  })
});

client.on('roleCreate', async role => {
  let entry = await role
  .guild.fetchAuditLogs({type: 'ROLE_CREATE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  role.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  if(!role.deleted) role.delete({resaon: "Role Guard"})
  let emreyirmi = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${role.name} ${role.id} Rolleri Silindi!` 
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, emreyirmi, (err, responseData) => {
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

client.on('roleUpdate', async role => {
  let entry = await role
  .guild.fetchAuditLogs({type: 'ROLE_UPDATE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  role.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let emreyirmia = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${role.name} ${role.id} Rolleri Silindi!` 
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, emreyirmia, (err, responseData) => {
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

// Kanallar
client.on('channelDelete', async channel => {
  let entry = await channel
  .guild.fetchAuditLogs({type: 'CHANNEL_DELETE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  channel.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  if(!channel.deleted) channel.delete({reason: "Kanal Koruma"})
  let spankme = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${channel.name} ${channel.id} Kanalı Silindi!`
  let silmelütfenn = `Spanker tarafından geliştirildi.`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, spankme, (err, responseData) => {
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
      // client.channels.cache.get(config.logs)
      // .send("<@817747393025015828> Kanal Kaldırıldı").then(message => {
      //         // <@817747393025015828> Ctrl + H Yaparak Kendi İd nizi Yazınız.
      //   var spankmerss = [
      //       ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + " ")
      //        // <@817747393025015828> Ctrl + H Yaparak Kendi İd nizi Yazınız.
      //     ]
      //     var spankmersss = [
      //       ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".")
      //        // <@817747393025015828> Ctrl + H Yaparak Kendi İd nizi Yazınız.
      //     ]
      //     var spankmerssr = [
      //       ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".\nKaldırılan Kanal İsmi**:")
      //     ]
      //     var spankmerssshj = [
      //       ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".\nKaldırılan Kanal İsmi**: :name_badge: " + channel.name + " .")
      //     ]
      //     var spankmerssb = [
      //       ("@here Lütfen Biraz Bekleyiniz.. \Tahmini Bekleme Süresi: (10 Saniye)")
      //     ]
      //     var spankmersssbv = [
      //       ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + ".\nKaldırılan Kanal İsmi**: :name_badge: " + channel.name + ".")
          
      //     ]
      //     var spankmersssbvv = [
      //       ("<@817747393025015828> Kanal Kaldırıldı: \n**Kaldırılan Kanal ID**: :name_badge: " + channel.id + "\n**Kaldırılan Kanal İsmi**: :name_badge: " + channel.name + ".")
          
      //     ]
      //     message.edit(`${spankmerss}`);
      //     message.edit(`${spankmersss}`);
      //     message.edit(`${spankmerssr}`);
      //     message.edit(`${spankmerssshj}`)
      //     message.edit(`${spankmerssb}`);
      //     message.edit(`${spankmersssbv}`);
      //     message.edit(`${spankmersssbvv}`);
      //       });
    }
   }
  })
})

client.on('channelCreate', async channel => {
  let entry = await channel
  .guild.fetchAuditLogs({type: 'CHANNEL_CREATE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  channel.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let spankme = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${channel.name} ${channel.id} Kanalı Silindi!`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, spankme, (err, responseData) => { 
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

client.on('channelUpdate', async channel => {
  let entry = await channel
  .guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  channel.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let spankmee = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${channel.name} ${channel.id} Kanalı Güncellendi!`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, spankmee, (err, responseData) => { 
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

// Emojiler
client.on('emojiDelete', async emoji => {
  let entry = await emoji
  .guild.fetchAuditLogs({type: 'EMOJI_DELETE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  emoji.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let allahu = `${emoji.name} ${emoji.id} Emojisi Silindi!`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, allahu, (err, responseData) => { 
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

client.on('emojiCreate', async emoji => {
  let entry = await emoji
  .guild.fetchAuditLogs({type: 'EMOJI_DELETE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  emoji.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let dassda = `${emoji.name} ${emoji.id} Emojisi Oluşturuldu!`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, dassda, (err, responseData) => { 
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

client.on('emojiUpdate', async emoji => {
  let entry = await emoji
  .guild.fetchAuditLogs({type: 'EMOJI_UPDATE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  emoji.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let dassda = `${emoji.name} ${emoji.id} Emojisi Güncellendi!`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, dassda, (err, responseData) => { 
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

// Sunucu
client.on('guildMemberAdd', async member => {
  let entry = await member
  .guild.fetchAuditLogs({type: 'BOT_ADD'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  member.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let annemetegimivermedi = `**Sunucuya Bir Bot Eklendi! Eklenen Botun Bilgileri Ve Ekliyen Kişinin Bilgileri :** \n**Botun Adı :** \`\`${member.user.tag}\`\` **Botun İdsi :** \`\`${member.id}\`\``
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, annemetegimivermedi, (err, responseData) => { 
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})

client.on('guildUpdate', async member => {
  let entry = await member
  .guild.fetchAuditLogs({type: 'GUILD_UPDATE'})
  .then(audit => audit.entries.first());
  if(!entry.executor || whitelist.includes(entry.executor.id) || client.user.id === entry.executor.id) return
  member.guild.members.ban(entry.executor.id,{reason: "Role Guard"})
  let annemetegimivermedii = `**Birisi Sunucunun Ayarlarıyla Oynadı!**`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, annemetegimivermedii, (err, responseData) => { 
    if (err) { console.log(err);
   } else {
     if (responseData.message[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
    } else {
      console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
    }
   }
  })
})


client.on('roleDelete', async role => {
  let entry = await role
  .guild.fetchAuditLogs({type: 'ROLE_DELETE'})
  .then(audit => audit.entries.first());
  let embed = new MessageEmbed()
  let rolsildipic = client.channels.cache.get(config.logs); 
  if (rolsildipic) { rolsildipic.send(new MessageEmbed()
  .setColor("RED")
  .setTitle('Bir Rol Silindi! Rolün Özellikleri:')
  .setDescription(`> ❯ Rolün İdsi: \`${role.id}\`
                   > ❯ Rolün İsmi:  \`${role.name}\`
                   > ❯ Rolü Silen Kişi: \`${entry.executor}, ${entry.executor.id}\``)
  .setFooter(`Spanker Always Watching!`).setTimestamp()).catch(); }
  
}
  
);

client.on('channelDelete', async channel => {
  let kanalsildipic = client.channels.cache.get(config.logs);
  let entry = await channel
  .guild.fetchAuditLogs({type: 'CHANNEL_DELETE'})
  .then(audit => audit.entries.first());
  let embed = new MessageEmbed()
  if (kanalsildipic) { 
   kanalsildipic.send(new MessageEmbed()
  .setColor("RED")
  .setTitle('Bir Rol Silindi! Rolün Özellikleri:')
  .setDescription(`> ❯ Rolün İdsi: \`${channel.id}\`
                   > ❯ Rolün İsmi:  \`${channel.name}\`
                   > ❯ Rolü Silen Kişi: \`${entry.executor}, ${entry.executor.id}\``)
  .setFooter(`Spanker Always Watching!`).setTimestamp()).catch(); }
  
}
  
);

// Url Değiştiğin 'de Telefondan Arayacak Kısım:

 /*
100 STAR 'DA SİZLERLE!!! 

İnanmayanlar için: https://dosya.co/fjeqha311vf3/SpankerRaporBotu.mp3.html Dinleyebilirsiniz.
 */

client.on("ready",async function() {
  setInterval(async function(u) {
await client.user.setActivity(presence.random())
  },1000*60*15)
})


client.login(config.object.botToken)
.then(c => console.log(`${client.user.tag} İsminde Giriş Gerçekleşti!`))
.catch(err => console.error("Bot Başlatılamadı!"
));
