const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "balance",
  aliases: ["bal", "bl"],
  permissions: [],
  description: "Check the user balance",
  category: 'Economy',
  async execute(message, args, cmd, client, Discord, profileData) {
    if(args[0]) return message.channel.send(`Sorry! But at this moment you are only allowed to check your own balance (the IRS told us to do this) HOWEVER, you are able to do !richest to see who the most bouge.`)
    message.channel.send(
      new MessageEmbed()
      .setTitle('💵 Your Account 💵')
      .addFields(
        {name: '📤 Wallet', value: `💵 ${profileData.coins}`, inline: true},
        {name: '🏦 Bank', value: `💵 ${profileData.bank}`, inline: true}
      )
      .setColor(message.guild.me.displayHexColor)
      .setThumbnail('https://freepngimg.com/download/dollar/64058-united-dollar-sign-states-design-icon.png')
      .setFooter(`Your assets in ${message.guild.name} || Economy by TheBot *!invite*`)
    );
  },
};