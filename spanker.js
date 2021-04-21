const Discord = require('discord.js');
const client = new Discord.Client();
const spxnkerconfig = require('./spxnkerconfig.json');
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

var prefix = spxnkerconfig.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./src/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek. Spanker Tarafından Hazırlandı!`);
    files.forEach(f => {
        let props = require(`./src/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.login("TOKENİNİ YAZ");

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./src/${command}`)];
            let cmd = require(`./src/${command}`);
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
            let cmd = require(`./src/${command}`);
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

client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./src/${command}`)];
            let cmd = require(`./src/${command}`);
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
    if (message.author.id === spxnkerconfig.sahip) permlvl = 4;
    return permlvl;
};
//Fake giriş mesajı. Chate gir yazarsanız bir hesap giriş yapmış gibi olur. Farklı hesap sokmakla uğraşmazsınız!
client.on("message", async message => {
    if(!message.author.id == spxnkerconfig.sahip) return;
    if (message.content === "gir") {
        client.emit(
            "guildMemberAdd",
            message.member || (await message.guild.fetchMember(message.author))
        );
    }
});








//Taglı Alım- Tag Alınca Mesaj Sistemi

client.on("userUpdate", async (oldUser, newUser) => { 
    let sunucu = (spxnkerconfig.sunucuid);
    let kanal = (spxnkerconfig.taglog);
    let taglı = (spxnkerconfig.familyrol);
  
    let tag = (spxnkerconfig.taglıtag);
    let untag = (spxnkerconfig.taglıtag);
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
          roles.set((spxnkerconfig.kayıtsız) || []);
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

//srca react sistemi
client.emojiler = {
  onay: (spxnkerconfig.onayemoji),
  ret: (spxnkerconfig.redemoji),
};
//Son


var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("ready", async () => {
    let botVoiceChannel = client.channels.cache.get(spxnkerconfig.seskanalid); //dilerseniz silebilirsiniz
    if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });
