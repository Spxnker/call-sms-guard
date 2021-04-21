const Discord = require("discord.js");
const spxnkerconfig = require('../spxnkerconfig.json');
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(spxnkerconfig.prefix)) return;
  let command = message.content.split(' ')[0].slice(spxnkerconfig.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
   if (cmd.conf.enabled === false) {
      if (!spxnkerconfig.sahip.includes(message.author.id) && !spxnkerconfig.sahip.includes(message.author.id)) {
        const embed = new Discord.MessageEmbed()
                    .setDescription(`:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`)
                    .setColor("RED")
                message.channel.send({embed})
                return
      }
    }
    
    if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`)
          .setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("BAN_MEMBERS")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Üyeleri Yasakla** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
		if (cmd.conf.permLevel === 5) {
			if (!spxnkerconfig.sahip.includes(message.author.id)) {
				const embed = new Discord.MessageEmbed()
					.setDescription(`Bu komutu sadece **sahibim** kullanabilir!`)
					.setColor("RED")
				message.channel.send({embed})
				return
			}
		}
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

  
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
  
};
