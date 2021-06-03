const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: 'meme',
    aliases: [],
    permissions: [],
    description: "Shows a random meme from a subreddit.",
    cooldown: 5,
    category: 'Fun',
    async execute(message, args, cmd, client, Discord, profileData) {

        let res = await fetch('https://meme-api.herokuapp.com/gimme');
        res = await res.json();
        const embed = new MessageEmbed()
            .setAuthor(`Subreddit: ${res.title}`)
            .setTitle(`🤣 Meme 🤣`)
            .setImage(res.url)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);

    }
}