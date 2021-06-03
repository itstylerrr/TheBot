const Jwork = require('../../jobs.json');
const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
const { MessageEmbed } = require('discord.js')
const profileModel = require('../../models/profileSchema')
const ms = (milliseconds) => {
    if (typeof milliseconds !== 'number') {
        throw new TypeError('Expected a number');
    }

    return {
        days: Math.trunc(milliseconds / 86400000),
        hours: Math.trunc(milliseconds / 3600000) % 24,
        minutes: Math.trunc(milliseconds / 60000) % 60,
        seconds: Math.trunc(milliseconds / 1000) % 60,
        milliseconds: Math.trunc(milliseconds) % 1000,
        microseconds: Math.trunc(milliseconds * 1000) % 1000,
        nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
    };
}

module.exports = {
  name: "work",
  aliases: [],
  permissions: ["SEND_MESSAGES"],
  description: "Work for some money!",
  category: 'Economy',
  async execute(message, args, cmd, client, Discord, profileData) {
    let user = message.author;
    let author = await profileData.workcd

    let timeout = 1800000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));

        let timeEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
        message.channel.send(timeEmbed)
    } else {
        let amount = Math.floor(Math.random() * 125) + 1;
        let embed1 = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ **${JworkR} ${amount}**`)
        message.channel.send(embed1)

        await profileModel.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: amount,
                workcd: Date.now()
              },
            }
          );
    };
  },
};