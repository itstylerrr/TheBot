const { MessageEmbed } = require('discord.js')
const profileModel = require('../../models/profileSchema')

module.exports = {
  name: "withdraw",
  aliases: ["wd", "cash"],
  permissions: ["SEND_MESSAGES"],
  description: "Withdraw cash from your bank into your wallet.",
  category: 'Economy',
  async execute(message, args, cmd, client, Discord, profileData) {
      
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.channel.send("Withdraw amount must be a whole number");
    if (amount > 10000) return message.channel.send('Sorry, but you can only withdraw $10000 at a time')
    try {
      if (amount > profileData.bank) return message.channel.send(`You don't have that amount of coins to withdraw.`);
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
          },
        }
      );

      return message.channel.send(
          new MessageEmbed()
          .setTitle('New withdraw!')
          .setDescription(`You have just withdrew ${amount} into your wallet`)
          .setThumbnail('https://freepngimg.com/download/dollar/64058-united-dollar-sign-states-design-icon.png')
          .setColor(message.guild.me.displayHexColor)
          .setFooter(`Cash withdrew into ${message.author.tag}'s wallet || Economy by @The Bot`)
      );
    } catch (err) {
      console.log(err);
    }
  },
};