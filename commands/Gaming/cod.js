const cod_api = require('call-of-duty-api')();
const { COD_USERNAME, COD_PASSWORD } = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'cod',
    description: "Displays alot of information on a COD players multiplayer stats",
    aliases: ['mpcheck', 'codstats'],
    cooldown: 10,
    category: 'Gaming',
    async execute(message, args, cmd, client, Discord, profileData){
        
        if(!args[0]) return message.channel.send('Please enter a username');
        if(!args[1]) return message.channel.send('Please enter a platfrom');
 
        
        let username = COD_USERNAME;
        let password = COD_PASSWORD;
 
        try{
            await cod_api.login(username, password);
            
            let data = await cod_api.CWmp(args[0], args[1]);
            
            const embed = new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setTitle('COD Multiplayer Stats')
            .setDescription(`Cod stats for ${args[0]}`)
            .addFields(
                { name: 'Games Played', value: data.lifetime.all.properties.totalGamesPlayed, inline: true},
                { name: 'Wins', value: data.lifetime.all.properties.wins, inline: true},
                { name: 'Losses', value: data.lifetime.all.properties.losses, inline: true},
                { name: 'KD Ratio', value: data.lifetime.all.properties.kdratio, inline: true},
                { name: 'Kills', value: data.lifetime.all.properties.kills, inline: true},
                { name: 'Deaths', value: data.lifetime.all.properties.deaths, inline: true},
                { name: 'Longest Kill Streak', value: data.lifetime.all.properties.longestKillstreak},
                {name: 'Total Time Played', value: (parseFloat(data.lifetime.all.properties.timePlayedTotal / 3600).toFixed(2)) + " Hours"}
            
            )
            .setFooter('COD stats || call-of-duty-api');
 
            message.channel.send(embed);
 
            
            console.log(data.lifetime.all.properties);
 
        }catch(error){
            message.channel.send('There was an error fetching this player');
            throw error;
        }

    }
}