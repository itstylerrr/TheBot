const PROFILE_MODEL = require("../../models/profileSchema");
const { MessageEmbed } = require('discord.js')
const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];

module.exports = {
  name: "slots",
  aliases: ['quick-money'],
  permissions: ["SEND_MESSAGES"],
  cooldown: 30,
  category: "Economy",
  async execute(message, args, cmd, client, Discord, profileData) {

    let user = message.author;
    let money = parseInt(args[0]);
    let win = false

    if (!money) return message.reply("You need to bet something.");
    if (money > profileData.coins) return message.reply(`You only have ${profileData.coins} coins, dont try and lie to me, I know everything.`);

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2])  { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 3
        win = true;
    }

    if (win) {
        let slotsEmbed1 = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("GREEN")
        message.channel.send(slotsEmbed1)
        await PROFILE_MODEL.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: money,
              },
            }
          );
    } else {
        let slotsEmbed = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("RED")
        message.channel.send(slotsEmbed)
        await PROFILE_MODEL.findOneAndUpdate(
            {
              userID: message.author.id,
            },
            {
              $inc: {
                coins: -money,
              },
            }
          );
    }
  },
};