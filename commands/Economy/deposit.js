const { MessageEmbed } = require('discord.js')
const profileModel = require('../../models/profileSchema')

module.exports = {
  name: "deposit",
  aliases: ["dep", "bank"],
  permissions: ["SEND_MESSAGES"],
  description: "Deposit cash from your wallet into your bank.",
  category: 'Economy',
  async execute(message, args, cmd, client, Discord, profileData) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
    try {
      if (amount > profileData.coins) return message.channel.send(`You don't have that amount of coins to deposit`);
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
            bank: amount,
          },
        }
      );

      return message.channel.send(
          new MessageEmbed()
          .setTitle('New deposit!')
          .setDescription(`You have just deposited ${amount} into your bank account.`)
          .setThumbnail('https://freepngimg.com/download/dollar/64058-united-dollar-sign-states-design-icon.png')
          .setColor(message.guild.me.displayHexColor)
          .setFooter(`Cash deposited into ${message.author.tag}'s account || Economy by @The Bot`)
      );
    } catch (err) {
      console.log(err);
    }
  },
};