const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'setup',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Set up The Bot for your server",
    cooldown: 5,
    category: 'Admin',
    async execute(message, args, cmd, client, Discord, profileData, guildData) {
        message.channel.send('Test me bitty...')
        message.channel.send('Fetching server ID to test guildModel in MONGODB...')
        message.channel.send(`This guilds ID is ${guildData.serverID}`)
    }
}