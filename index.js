const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose')
const guildModel = require('./models/guildSchema')
const { prefix, token, MONGODB_SRV } = require('./config.json')
 
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handler/${handler}`)(client, Discord)
});

function status() {

	let status = [
		`smoothbrains.xyz | ${client.guilds.cache.size} guilds`,
		`${prefix}help`,
		`${client.guilds.cache.size} guilds | ${prefix}help`
	];

	let statusR = Math.floor(Math.random() * status.length);

	client.user.setActivity(status[statusR], {
		type: "WATCHING",
		status: "Online",
		url: "https://smoothbrains.xyz"
	});
}
setInterval(status, 7000);

client.on('ready', () => {
    var colors = require('colors')
    colors.setTheme({
        info: 'green',
        help: 'cyan',
        warn: 'yellow',
        success: 'blue',
        error: 'red'
    });
	status();
    console.log('-BOT SUCCESS-'.success, "Status initialized ✅")
});

mongoose.connect(MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    var colors = require('colors')
    colors.setTheme({
        info: 'green',
        help: 'cyan',
        warn: 'yellow',
        success: 'blue',
        error: 'red'
    });
    console.log('-MONGO-'.info, 'Connected to MONGODB database: TheBot')
}).catch((err) => {
    console.log('-MONGO-'.info, `Mongo has errored: ${err}`)
})

//extra client.on's//

// client.on("guildCreate", async (guild) => {
//     let guildProfile = await guildModel.create({
//         serverID: guild.id,
//       });
//       guildProfile.save();
// });
 
client.login(token);
// DB NAME: TheBot