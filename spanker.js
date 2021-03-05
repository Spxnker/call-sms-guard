const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const queue = new Map();
const db = require("quick.db");    

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Hostlandı!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek. Spanker Tarafından Hazırlandı!`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.on("message", message => {
  if(message.content.toLowerCase() == ".e") 
  return message.channel.send('Yanlış kullanım! Doğrusu ise `.kayıt @etiket İsim Yaş` Bu şekilde kullanabilirsiniz.').then(x => x.delete({ timeout: 8000 }));
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".kayıt") 
  return message.channel.send('Yanlış kullanım! Doğrusu ise `.kayıt @etiket İsim Yaş` Bu şekilde kullanabilirsiniz.').then(x => x.delete({ timeout: 8000 }));
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".k") 
  return message.channel.send('Yanlış kullanım! Doğrusu ise `.kayıt @etiket İsim Yaş` Bu şekilde kullanabilirsiniz.').then(x => x.delete({ timeout: 8000 }));
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".erkek") 
  return message.channel.send('Yanlış kullanım! Doğrusu ise `.kayıt @etiket İsim Yaş` Bu şekilde kullanabilirsiniz.').then(x => x.delete({ timeout: 8000 }));
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".kadın") 
  return message.channel.send('Yanlış kullanım! Doğrusu ise `.kayıt @etiket İsim Yaş` Bu şekilde kullanabilirsiniz.').then(x => x.delete({ timeout: 8000 }));
});
client.on("message", message => {
  if(message.content.toLowerCase() == ".kadın") 
  return message.react("✖️")
});

client.on("message", message => {
  if(message.content.toLowerCase() == ".erkek") 
  return message.react("✖️")
});
client.on("message", message => {
  if(message.content.toLowerCase() == ".kayıt") 
  return message.react("✖️")
});
client.on("message", message => {
  if(message.content.toLowerCase() == "sahibin geldi") 
  return message.channel.send('S P A N K E R sahibim gelmiş amk').then(x => x.delete({ timeout: 18000 }));
});
  client.on("message", message => {
    if(message.content.toLowerCase() == "mal amk") 
    return message.channel.send('senin kadar olmasakta aq').then(x => x.delete({ timeout: 18000 }));
});


client.on("message", message => {
  if(message.content.toLowerCase() == ".e") 
  return message.react("✖️")
});
client.on("message", message => {
  if(message.content.toLowerCase() == ".k") 
  return message.react("✖️")
});
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
//Fake giriş mesajı. Chate gir yazarsanız bir hesap giriş yapmış gibi olur. Farklı hesap sokmakla uğraşmazsınız!
client.on("message", async message => {
    if(!message.author.id == ayarlar.sahip) return;
    if (message.content === "gir") {
        client.emit(
            "guildMemberAdd",
            message.member || (await message.guild.fetchMember(message.author))
        );
    }
});
//Taglı Alım- Tag Alınca Mesaj Sistemi

client.on("userUpdate", async (oldUser, newUser) => { 
    let sunucu = `sunucuid`;
    let kanal = `logkanalid`;
    let taglı = `familyrol`;
  
    let tag = `TAGINIZ`;
    let untag = `İKİNCİTAGINIZ`;
    let channel = client.guilds.cache.get(sunucu).channels.cache.get(kanal);
  
    if (oldUser.username !== newUser.username) {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(taglı)
      ) {
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(taglı);
  
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .setNickname(
            client.guilds.cache
              .get(sunucu)
              .members.cache.get(newUser.id)
              .displayName.replace(untag, tag)
          );
  
        channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adına ekleyerek ailemize katıldı.`);
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(taglı)
      ) {
        if (db.fetch(`taglıAlım.${sunucu}`)) {
          await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(taglı);
          await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          roles.set(["kayıtsızrolid"] || []);
        }
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(taglı);
  
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .setNickname(
            client.guilds.cache
              .get(sunucu)
              .members.cache.get(newUser.id)
              .displayName.replace(tag, untag)
          );
        channel.send(`${newUser} adlı kullanıcı "${tag}" sembolünü kullanıcı adından kaldırarak ailemizden ayrıldı.`);
      }
    }
  });

//Komutlara react sistemi
client.emojiler = {
  onay: "795217749731049493",
  ret: "795217992602353664",
};
//Son

//Sunucuya giriş mesajı
client.on("guildMemberAdd", Spanker => {
    let tag = "TAGINIZ";
    let tagsızSembolü = "İKİNCİTAGINIZ";
    if (Spanker.user.username.includes(tag)) {
    Spanker.setNickname(`${tag} İsim | Yaş`)
    } else {
      Spanker.setNickname(`${tagsızSembolü} İsim | Yaş`)
    }
      Spanker.roles.add("kayıtsızrolid");
    })
    //Sunucuya giriş mesajı
    client.on("guildMemberAdd", (member, message) => {
      const sunucuid = "sunucuid"; //Sunucu 
      const id = "kayıtkanalid"; //Kanal 
      const kayıtsızRole = "kayıtsızrolid"; //Kayıtsız rol 
      const jailRole = "jailrolid"
      if (member.guild.id !== sunucuid) return;
      const channel = member.guild.channels.cache.get(id);
    let memberGün = moment(member.user.createdAt).format("DD");
    let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
    let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
    let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
    let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
          '0': `<a:sayi0:795219038736744458>   `,
          '1': `<a:sayi1:795218775363944459> `,
          '2': `<a:sayi2:795218798042546187> `,
          '3': `<a:sayi3:795218815654952971> `,
          '4': `<a:sayi4:795218839264297041> `,                  
          '5': `<a:sayi5:795218887661977600> `,
          '6': `<a:sayi6:795218910441898004> `,
          '7': `<a:sayi7:795218941449863220> `,
          '8': `<a:sayi8:795218976849788978> `,
          '9': `<a:sayi9:795218999876386826>`}[d];
            })
          }
    const Spankerfoto = new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/779455383986241536/798281651342934036/1.gif");
    channel.send(`
    ${member} Sunucumuza Hoşgeldin! Seninle birlikte ${üyesayısı} kişi olduk!
      
    Ses kanallarından herhangi birisine girerek kayıt olabilirsin! 
      
    <#795962099515392010> kanalını okumayı unutma! Kuralları okumuş olarak cezai işlem uygulanacaktır!
      
    Hesabını açılış süresi ${memberGün} ${memberAylar} ${memberTarih}  ${guvenilirlik ? "<a:ret:795217992602353664>" : "<a:onay:795217749731049493> " }
      
    Tagımıza ulaşmak için herhangi bir kanala **!tag** yazarak ulaşabilirsin! ** TAGINIZ **
      `)
    //  let Spanker = new Discord.MessageEmbed()
    //.setDescription(`
     // <a:moon:795217015815929916> Hoş geldin ${member}, seninle birlikte ${üyesayısı} kişiyiz!
    
      //<a:moon:795217015815929916> Ses kanalına girerek kayıt olabilirsin sunucuya giriş yaptınız anda <#795962099515392010> okumuş olarak kabul edileceksin ve ona göre hakkın da ceza işlemi yapılacaktır!
    
    //  <a:moon:795217015815929916> Hesabının açılış süresi ${memberGün} ${memberAylar} ${memberTarih} > ${guvenilirlik ? "<a:ret:795217992602353664>" : "<a:onay:795217749731049493> "} 
      //`) 
      //.setColor('RANDOM')
      //.setTimestamp();
      //channel.send(register).then(x => x.delete({timeout: 5000}));
      //channel.send(Spanker);
      if (guvenilirlik) {
    member.roles.set(["795956778243981342"])
    member.roles.add("795956778243981342")
      return;  
      }
      //YUKARIDA DİLERSENİZ EMBEDLİ DİLERSENİZ EMBEDLİ KULLANIM SAĞLAYABİLİRSİNİZ! **//** BUNLARI SİLEREK AÇABİLİR KAPATABİLİRSİNİZ.
    });

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("ready", async () => {
    let botVoiceChannel = client.channels.cache.get("seskanalid"); //dilerseniz silebilirsiniz
    if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });
client.login(ayarlar.token);