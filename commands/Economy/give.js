const { MessageEmbed } = require('discord.js')
const profileModel = require('../../models/profileSchema')

module.exports = {
  name: "give",
  aliases: [],
  permissions: ["ADMINISTRATOR"],
  cooldown: 600,
  description: "Give a use of your server some coins!",
  category: 'Economy',
  async execute(message, args, cmd, client, Discord, profileData) {
      if(!args.length) return message.channel.send('You need to mention a player to give the coins to.')
      const amount = args[0];
      const target = message.mentions.users.first();
      if (!target) return message.channel.send('That user does not exist.')

      if (amount % 1 != 0 || amount <=0) return message.channel.send("You must give a whole number/positive amount of coins.")

      try {
          const targetData = await profileModel.findOne({ userID: target.id });

          if (!targetData) return message.channel.send(`${target.id}, ${target.tag} does not exist in The Bot's database.`);

          await profileModel.findOneAndUpdate(
              {
                  userID: target.id,
              },
              {
                  $inc: {
                      coins: amount
                  }
              }
          )
          return message.channel.send(
              new MessageEmbed()
              .setTitle(`${target.tag} has been given $${amount}!`)
              .setColor('GREEN')
          )
      } catch(err) {
          console.log(err);
      }
  },
};