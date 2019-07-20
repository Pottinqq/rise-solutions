const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

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
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,msg,args);

  if (cmd.startsWith(prefix + "setgame")) {
    var text = messageArray.slice(1).join(' ');
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      msg.delete();
      bot.user.setActivity(text);
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
