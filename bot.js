const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`Logged in as ${bot.user.tag} and is in ${bot.guilds.size} servers!`);
  bot.user.setActivity(".help | RiseSolutions");
});

bot.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;

  let prefix = process.env.PREFIX;
  let bicon = bot.user.displayAvatarURL;
  let messageArray = msg.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1).join(' ');

  if (msg.content == `${prefix}help`) {
   	let helps = new Discord.RichEmbed()
		.setTitle("Help")
		.addField("**.setgame**", "Sets the bots game")
		.setColor("#FF0000")
		.setFooter("RiseSolutions", bot.user.displayAvatarURL)
		.setTimestamp();

	msg.channel.send(`Messages are on the way to your dms :ticket:`);
	msg.author.send(helps);
  }

  if (msg.content.startsWith(prefix + "announce")) {
  	let channel = msg.guild.channels.find('name', 'announcements');
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
    	let s = new Discord.RichEmbed()
    	.setTitle('Announcement')
    	.setColor("#FF0000")
    	.setDescription(args)
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
        .addField("You don't have permission", "You don't have the permission to perform that command.")
        .setColor("#FF0000")
        .setFooter("RiseSolutions", bicon)
        .setTimestamp();

        msg.author.send(nopermembed);
    }
  }

  if (msg.content.startsWith(prefix + "rules")) {
    if (!args[0]) return msg.channel.send("Please specify your rules message.");
    if (msg.member.hasPermission("MANAGE_GUILD")) {
      msg.delete();
      let channel = msg.guild.channels.find('name', 'rules');
      let rules = new Discord.RichEmbed()
        .setTitle("Rules")
        .setColor("#FF0000")
        .addField(args, "Please stick to these rules if you can.")
        .setFooter(`${msg.author.tag} | RiseSolutions`, bicon)
        .setTimestamp();
     channel.send(rules);
    }
  }
});

bot.login(process.env.BOT_TOKEN);
