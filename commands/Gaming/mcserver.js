const { MessageEmbed } = require('discord.js')
const util = require('minecraft-server-util')

module.exports = {
    name: 'mcserver',
    aliases: ['mcs', 'minecraftserver', 'mc'],
    description: "Fetches information about a Minecraft server.",
    cooldown: 10,
    category: 'Gaming',
    async execute(message, args, cmd, client, Discord, profileData) {
        if (!args[0]) return message.channel.send('Please enter a minecraft server ip');
        if (!args[1]) return message.channel.send('Please enter a minecraft server port');

        util.status(args[0], { port: parseInt(args[1]) }).then((response) => {
            const embed = new Discord.MessageEmbed()
                .setColor(message.guild.me.displayHexColor)
                .setTitle(`${response.host}'s Server Info`)
                .addFields(
                    { name: 'Server IP', value: response.host },
                    { name: 'Online Players', value: response.onlinePlayers },
                    { name: 'Max Players', value: response.maxPlayers },
                    { name: 'Version', value: response.version }
                )
                .setFooter('MC Server Info || minecraft-server-util');

            message.channel.send(embed);
        })
            .catch((error) => {
                message.channel.send(
                    new MessageEmbed()
                        .setTitle('❌ Error trying to fetch server info.')
                        .addFields(
                            { name: 'Host and port trying to be reached:', value: `${args[0]} -- ${args[1]}` },
                            { name: 'Error:', value: error }
                        )
                        .setColor('RED')
                );
                throw error;
            })
    }
}