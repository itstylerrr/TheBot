const { MessageEmbed } = require('discord.js')
const profileModel = require('../../models/profileSchema')

module.exports = {
  name: "richest",
  aliases: [],
  permissions: ["SEND_MESSAGES"],
  cooldown: 5,
  description: "Shows the richest users of The Bot\'s economy system.",
  category: 'Economy',
  async execute(message, args, cmd, client, Discord, profileData) {
    const top10 = await profileModel.find({}).sort({ coins: -1 }).limit(10);

    const rich1t = Math.floor(top10[0].coins + top10[0].bank)
    const rich2t = Math.floor(top10[1].coins + top10[1].bank)
    const rich3t = Math.floor(top10[2].coins + top10[2].bank)
    const rich4t = Math.floor(top10[3].coins + top10[3].bank)
    const rich5t = Math.floor(top10[4].coins + top10[4].bank)
    // const rich6t = Math.floor(top10[5].coins + top10[5].bank)
    // const rich7t = Math.floor(top10[6].coins + top10[6].bank)
    // const rich8t = Math.floor(top10[7].coins + top10[7].bank)
    // const rich9t = Math.floor(top10[8].coins + top10[8].bank)
    // const rich10t = Math.floor(top10[9].coins + top10[9].bank)

    message.channel.send(
        new MessageEmbed()
        .setTitle("🤑 The Bot\'s Richest Users 🤑")
        .setDescription(`
        ***1.*** <@${top10[0].userID}>
        **💵 Total:** ${rich1t}
        \n
        ***2.*** <@${top10[1].userID}>
        **💵 Total:** ${rich2t}
        \n
        ***3.*** <@${top10[2].userID}>
        **💵 Total:** ${rich3t}
        \n
        ***4.*** <@${top10[3].userID}>
        **💵 Total:** ${rich4t}
        \n
        ***5.*** <@${top10[4].userID}>
        **💵 Total:** ${rich5t}
        \n
        `)
        .setColor(message.guild.me.displayHexColor)
    )
  },
};