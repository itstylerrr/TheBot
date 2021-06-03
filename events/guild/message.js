const { prefix } = require('../../config.json')
const date = Date.now();
const { MessageEmbed } = require('discord.js')
const profileModel = require("../../models/profileSchema");
const guildModel = require("../../models/guildSchema")

const cooldowns = new Map();

const validPermissions = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS",
]

module.exports = async (Discord, client, message) => {

  var colors = require('colors')
  colors.setTheme({
    info: 'green',
    update: 'cyan',
    warn: 'yellow',
    success: 'blue',
    error: 'red'
  });

  const timestamp = (message.editedTimestamp) ? message.editedTimestamp : message.createdTimestamp;
  const latency = Math.floor(message.createdTimestamp - timestamp);
  const apiLatency = Math.round(message.client.ws.ping);

  const date = new Date();
  const formatData = (input) => {
    if (input > 9) {
      return input;
    } else return `0${input}`;
  };
  const formatHour = (input) => {
    if (input > 12) {
      return input - 12;
    }
    return input;
  };
  const format = {
    dd: formatData(date.getDate()),
    mm: formatData(date.getMonth() + 1),
    yyyy: date.getFullYear(),
    HH: formatData(date.getHours()),
    hh: formatData(formatHour(date.getHours())),
    MM: formatData(date.getMinutes()),
    SS: formatData(date.getSeconds()),
  };
  const format24Hour = ({ dd, mm, yyyy, HH, MM, SS }) => {
    return;
  };
  const format12Hour = ({ dd, mm, yyyy, hh, MM, SS }) => {
    return;
  };

  // Time in 24 Hour format
  format24Hour(format);
  // Time in 12 Hour format
  format12Hour(format);


  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if (!profileData) {
      let profile = await profileModel.create({
        userID: message.author.id,
        serverID: message.guild.id,
        coins: 1000,
        bank: 0,
      });
      profile.save();
    }
  } catch (err) {
    console.log(err);
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

  if (command.permissions.length) {
    let invalidPerms = []
    for (const perm of command.permissions) {
      if (!validPermissions.includes(perm)) {
        return console.log(`Invalid Permissions ${perm}`);
      }
      if (!message.member.hasPermission(perm)) {
        invalidPerms.push(perm);
      }
    }
    if (invalidPerms.length) {
      return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
    }
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now()
  const time_stamps = cooldowns.get(command.name)
  const cooldown_ammount = (command.cooldown) * 1000

  if (time_stamps.has(message.author.id)) {
    const expiration_time = time_stamps.get(message.author.id) + cooldown_ammount;

    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000

      return message.channel.send(
        new MessageEmbed()
          .setTitle('🕰 Your on cooldown!')
          .setDescription('Dont worry, you are not in trouble... We just have these cooldowns set in place so our database/api\'s dont get spammed! <3 !ts tyler#7922')
          .addField('Command:', command.name)
          .addField('Time Left:', time_left.toFixed(1))
          .setColor('RED')
      )
    }
  }

  time_stamps.set(message.author.id, current_time);
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_ammount);

  try {
    command.execute(message, args, cmd, client, Discord, profileData, guildData)
      .then(console.log("-UPDATE-".update, `${date} -- Command ran: ${cmd} -- Api Latency: ${apiLatency}`))
  } catch (err) {
    message.channel.send(
      new MessageEmbed()
        .setTitle(`❌ Error while trying to execute ${cmd}`)
        .setDescription('There was an error trying to execute a command! You can use `!bugreport <message>` to report the error that is listed down below.')
        .addField(`Command:`, cmd)
        .addField('Error:', err)
        .setColor('RED')
    )
    console.log('-ERROR-'.error, `Error trying to execute ${command.name}... Error message: ${err}`)
  }

}