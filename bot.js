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
          .addField("You don't have permission", "you don't have the permission to perform that command.")
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
		.setFooter("RiseSolutions | www.risesolutions.ga", bot.user.displayAvatarURL)
		.setTimestamp();

	msg.channel.send(`Messages are on the way to your dms :ticket:`);
	msg.author.send(helps);
  }

  if (cmd.startsWith(prefix + "s")) {
  	let channel = msg.guild.channels.find('name', 'announcements');
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    	let s = new Discord.RichEmbed()
    	.setTitle('Announcement')
    	.setColor("#FF0000")
    	.addField(args, "https://risesolutions.tk/index.php")
    	.setFooter(`${msg.author.tag}`, bicon)
    	.setTimestamp();
      msg.delete();
      channel.send("[ @here ]");
      channel.send(s);
    }
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
      msg.delete();
      let nopermembed = new Discord.RichEmbed()
          .setTitle("No Permission")
        .addField("You don't have permission", "you don't have the permission to perform that command.")
          .setColor("#FF0000")
          .setFooter("RiseSolutions#2662", bicon)
          .setTimestamp();

          msg.author.send(nopermembed);
    }
  }

  if (cmd.startsWith(prefix + "rules")) {
    let role = msg.guild.roles.find(role => role.name === "[Owner]");
    if (!args[0]) return msg.channel.send("Please specify your rules message.");
    if (msg.member.roles.some(role)) {
      msg.delete();
      let channel = msg.guild.channels.find('name', 'discord-rules');
      let rules = new Discord.RichEmbed()
      .setTitle("Rules")
      .setColor("#FF0000")
      .addField(args, "Please stick to these rules if you can.")
      .setFooter(` ${msg.author.tag} | RiseSolutions | www.risesolutions.ga`, bicon)
      .setTimestamp();
      channel.send(rules);
    } else {
      msg.delete();
      let nopermembed = new Discord.RichEmbed()
        .setTitle("No Permission")
        .addField("You don't have permission", "you don't have the permission to perform that command.")
        .setColor("#FF0000")
        .setFooter("RiseSolutions#2662", bicon)
        .setTimestamp();

      msg.author.send(nopermembed);
    }
  }

  if (msg.content == ".verify") {
    var role = msg.guild.roles.find(role => role.name === "[Verified]");
    if (!msg.member.hasRole(role)) {
      msg.member.addRole(role);
      msg.channel.send(`You have been verified`);
    } else {
      msg.channel.send(`Your verified role has allready been put on your account.`);
    }
  }
});

bot.login(process.env.BOT_TOKEN);
