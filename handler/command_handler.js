const fs = require('fs')

const colors = require('colors')
colors.setTheme({
    info: 'green',
    help: 'cyan',
    warn: 'yellow',
    success: 'blue',
    error: 'red'
});

module.exports = (client, Discord) => {
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
    
    fs.readdirSync('./commands/').forEach(dirs => {
        const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

        for (const file of commands) {
            const command = require(`../commands/${dirs}/${file}`);
            console.log('-COMMANDS-'.info, `Successfully loaded the command "${command.name}"`)
            client.commands.set(command.name.toLowerCase(), command);
        };
    });
}