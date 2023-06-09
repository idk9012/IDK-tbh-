const { canModifyQueue, LOCALE } = require("../util/SpeemUtil");
const i18n = require("i18n");
i18n.setLocale(LOCALE);

const pattern = /^[0-9]{1,2}(\s*,\s*[0-9]{1,2})*$/;

module.exports = {
  name: "remove",
  aliases: ["rm"],
  description: i18n.__("remove.description"),
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.channel.send(i18n.__("remove.errorNotQueue")).catch(console.error);
    if (!canModifyQueue(message.member)) return i18n.__("common.errorNotChannel");
    if (!args.length) return message.reply(i18n.__mf("remove.usageReply", { prefix: message.client.prefix }));

    const argu = args.join("");
    const songs = argu.split(",").map((arg) => parseInt(arg));
    let removed = [];

    if (pattern.test(argu)) {
      queue.songs = queue.songs.filter((item, index) => {
        if (songs.find((songIndex) => songIndex - 1 === index)) removed.push(item);
        else return true;
      });

      queue.textChannel.send(
        `${message.author} ❌ removed **${removed.map((song) => song.title).join("\n")}** from the queue.`
      );
    } else if (!isNaN(args[0]) && args[0] >= 1 && args[0] <= queue.songs.length) {
      console.log("we got elsed!");
      return queue.textChannel.send(
        `${message.author} ❌ removed **${queue.songs.splice(args[0] - 1, 1)[0].title}** from the queue.`
      );
    } else {
      console.log("we got the last one");
      return message.reply(i18n.__mf("remove.usageReply", { prefix: message.client.prefix }));
    }
  }
};