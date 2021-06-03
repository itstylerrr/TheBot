const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'admin',
    aliases: [],
    permissions: [],
    description: "A command base for a basic The Bot command.",
    cooldown: 5,
    category: 'Moderation',
    async execute(message, args, cmd, client, Discord, profileData) {
        message.channel.send('This command will not do anything... Just for the developers to have a base admin command!')
    }
}