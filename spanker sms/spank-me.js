'use strict';

/*
 Spanker Tarafından Yapılmıştır.
 Türkiye 'de ilk paylaşılan sms botudur.
*/


const Vonage = require('@vonage/server-sdk');
const Discord = require("discord.js") 
const client = (global.client = new Discord.Client());
const config = require('./config-client.json');

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
  client.user.setPresence({ activity: { name: "Spanker Null Sms Log." }, status: "dnd" });
  });

// Yazarken yanlış yazdığım basit hatalar olabilir çözebilirsiniz çok zor değil. 




// Roller
client.on('roleDelete', async role => {
  let entry = await role
  .guild.fetchAuditLogs({type: 'ROLE_DELETE'})
  .then(audit => audit.entries.first());
  let spankerLogMessaj = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${role.name} ${role.id} Rolleri Silindi!` 
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, spankerLogMessaj, (err, responseData) => {
  if (err) { console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
      } else {
        console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
      }
    }
  })
});

client.on('roleCreate', async role => {
  let entry = await role
  .guild.fetchAuditLogs({type: 'ROLE_DELETE'})
  .then(audit => audit.entries.first());
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
  let spankme = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${channel.name} ${channel.id} Kanalı Silindi!`
  let silmelütfenn = `Spanker tarafından geliştirildi.`
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

client.on('channelCreate', async channel => {
  let entry = await channel
  .guild.fetchAuditLogs({type: 'CHANNEL_CREATE'})
  .then(audit => audit.entries.first());
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


// Url Değiştiğin 'de Telefondan Arayacak Kısım:

 /*
100 STAR 'DA SİZLERLE!!! 

İnanmayanlar için: https://dosya.co/fjeqha311vf3/SpankerRaporBotu.mp3.html Dinleyebilirsiniz.
 */


client.login(config.object.botToken)
.then(c => console.log(`${client.user.tag} İsminde Giriş Gerçekleşti!`))
.catch(err => console.error("Bot Başlatılamadı!"
));
