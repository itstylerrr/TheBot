const PROFILE_MODEL = require("../../models/profileSchema");

module.exports = {
  name: "freelance",
  aliases: ['quick-money'],
  permissions: ["SEND_MESSAGES"],
  cooldown: 60000,
  category: "Economy",
  async execute(message, args, cmd, client, Discord, profileData) {
    const JOBS = [
        'Handyman',
        'Tutor',
        'Lawn Mower',
        'Caretaker',
        'Dog Walker',
        'Pet Sitter',
        'Babysitter'
    ];

    let chosenJOBS = JOBS.sort(() => Math.random() - Math.random()).slice(0, 3);

    const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    const FILTER = (m) => {
      return chosenJOBS.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
    };

    const COLLECTOR = message.channel.createMessageCollector(FILTER, { max: 1, time: 15000 });

    COLLECTOR.on("collect", async (m) => {
      const EMBED = new Discord.MessageEmbed()
        .setColor("#ffa500")
        .setTitle(`${message.author.username} worked as a ${m.content} 💵`)
        .setDescription(`You earned 💵 ${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
        .setFooter(`A hard woker you are I see!`);

      await PROFILE_MODEL.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: RANDOM_NUMBER,
          },
        }
      );

      message.channel.send(EMBED);
    });

    COLLECTOR.on("end", (collected) => {
      if (collected.size == 0) {
        return message.channel.send(
          `Nice job <@${message.author.id}>! You worked and earned 💵 ${RANDOM_NUMBER.toString().replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ","
          )} from ${chosenJOBS[0]} 😭`
        );
      }
    });

    message.channel.send(
      `<@${
        message.author.id
      }>\n**What do you want to do as your freelance?** 🔍\nType the job in this channel.\n\`${chosenJOBS.join("` `")}\``
    );
  },
};