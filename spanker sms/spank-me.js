const Vonage = require('@vonage/server-sdk');

// Çok istediğiniz Sms botunu paylaşıyorum.

const Discord = require("discord.js") 
const client = (global.client = new Discord.Client());
const config = require('./config-client.json');
// Spanker Ve Null Tarafın 'dan Geliştirildi.

const spankerApi = new Vonage({ 
  apiKey: config.simple.NEXMO_API_KEY, 
  apiSecret: config.simple.NEXMO_API_SECRET
}); 

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: "Spanker Null Sms Log." }, status: "dnd" });
  });


client.on('roleDelete', async role => {
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
  let spankerLogMessaj = `${entry.exexecutor} ${entry.executor.id} Tarafından \n${role.name} ${role.id} Rolleri Silindi!` 
  let burayısilmeyenadamdır = `Spanker Tarafından Geliştirildi.`
  spankerApi.message.sendSms(config.simple.VirtualNumber, config.simple.PhoneNumber, spankerLogMessaj, burayısilmeyenadamdır, (err, responseData) => {
  if (err) { console.log(err);
    } else {
      if (responseData.messages[0]['status'] === "0") { console.log(`${config.simple.PhoneNumber} Numarasına Mesaj Başarıyla Gönderildi.`);
      } else {
        console.log(`Mesaj gönderilirken bir hata ile karşılaşıldı: ${responseData.messages[0]['error-text']}`);
      }
    }
  })

});

client.login(config.object.botToken)
.then(c => console.log(`${client.user.tag} İsminde Giriş Gerçekleşti!`))
.catch(err => console.error("Bot Başlatılamadı!"
));
