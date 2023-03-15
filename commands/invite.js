const { LOCALE } = require("../util/SpeemUtil");
const i18n = require("i18n");
const { MessageEmbed } = require("discord.js");

i18n.setLocale(LOCALE);

module.exports = {
  name: "invite",
  description: i18n.__('invite.description'),
    //set the permissions id here (https://discordapi.com/permissions.html)
  execute(message, args) {
    var permissions = 70282305;

    let invite = new MessageEmbed()
      .setTitle(`**Interested by the functions of our bot**`)
      .setDescription(
        `**Then what are you waiting for? Invite me today!** \n\n [Invite Link](https://discord.com/api/oauth2/authorize?client_id=799253577491021835&permissions=0&scope=bot)`
      )
      .setURL(
        `https://discord.com/api/oauth2/authorize?client_id=799253577491021835&permissions=0&scope=bot`
      )
      .setColor("RANDOM");
    return message.channel.send(invite);
  }
};