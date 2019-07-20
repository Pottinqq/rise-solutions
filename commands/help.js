const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	let help = new Discord.RichEmbed()
	.setTile("Help")
	.addField("**.setgame**", "Sets the bots game (needs permission Manage Messages")
	.setColor("#FF0000")
	.setFooter("RiseSultions | www.risesolutions.tk", bot.user.displayAvatarURL)
	.setTimestamp();

	msg.channel.send(`Messages are on the way to your dms :ticket:`);
	msg.author.send(help);
}

module.exports.help = {
	name:"help"
}