const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: ['api', 'network'],
    description: "Displays network information for The Bot",
    permissions: ["SEND_MESSAGES"],
    cooldown: 5,
    category: 'Info',
    async execute(message, args, cmd, client, Discord, profileData) {

        const embed = new MessageEmbed()
            .setDescription('`Pinging...`')
            .setColor('RED');
        const msg = await message.channel.send(embed);
        const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp; 
        const latency = `\`\`\`ini\n[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\`\`\``;
        const apiLatency = `\`\`\`ini\n[ ${Math.round(message.client.ws.ping)}ms ]\`\`\``;
        embed.setTitle(`Pong! 📶`)
            .setDescription('')
            .addField('Latency', latency, true)
            .addField('API Latency', apiLatency, true)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('GREEN');
        msg.edit(embed);
    }
}