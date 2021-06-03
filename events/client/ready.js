const colors = require('colors')
const Discord = require('discord.js')
const { prefix } = require('../../config.json')

module.exports = async (client, Discord) => {
    var colors = require('colors')
    colors.setTheme({
        info: 'green',
        help: 'cyan',
        warn: 'yellow',
        success: 'blue',
        error: 'red'
    });

    console.log("-BOT SUCCESS-".success, `The Bot completly initialized ✅`)
}