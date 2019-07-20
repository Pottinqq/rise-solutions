const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.tag} and is in ${bot.guilds.size} servers!`);
  bot.user.setActivity(".help | RiseSolutions™");
});

bot.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;

  let prefix = process.env.PREFIX;
  let bicon = bot.user.displayAvatarURL;
  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1).join(' ');

  if (cmd.startsWith(prefix + "setgame")) {
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      msg.delete();
      bot.user.setActivity(args);
    }
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
      msg.delete();
      let nopermembed = new Discord.RichEmbed()
          .setTitle("No Permission")
          .addField("You don't have permission", "you need the permission MANAGE_MESSAGES")
          .setColor("#FF0000")
          .setFooter("RiseSolutions#2662", bicon)
          .setTimestamp();

          msg.author.send(nopermembed);
    }
  }

  if (cmd == `${prefix}help`) {
   	let helps = new Discord.RichEmbed()
		.setTitle("Help")
		.addField("**.setgame**", "Sets the bots game")
		.setColor("#FF0000")
		.setFooter("RiseSolutions | www.risesolutions.tk", bot.user.displayAvatarURL)
		.setTimestamp();

	msg.channel.send(`Messages are on the way to your dms :ticket:`);
	msg.author.send(helps);
  }

  if (cmd.startsWith(prefix + "s")) {
  	const channel = bot.channels.get("name", "announcements");
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    	let s = new Discord.RichEmbed()
    	.setTitle('Announcement')
    	.setColor("#FF0000")
    	.addField(args)
    	.setFooter(`${msg.author.tag}`, bot.user.displayAvatarURL)
    	.setTimestamp();
      msg.delete();
      channel.sendMessage("[ @here ]");
      channel.sendMessage(s);
    }
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
      msg.delete();
      let nopermembed = new Discord.RichEmbed()
          .setTitle("No Permission")
          .addField("You don't have permission", "you need the permission MANAGE_MESSAGES")
          .setColor("#FF0000")
          .setFooter("RiseSolutions#2662", bicon)
          .setTimestamp();

          msg.author.send(nopermembed);
    }
  }
});

bot.login(process.env.BOT_TOKEN);
