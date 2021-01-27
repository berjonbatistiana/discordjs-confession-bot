const Discord = require('discord.js');
const {PARTIALS} = require('./constants');
const util = require('util');
const onGuildModeration = require('./events/onGuildModeration');
const onChannelModeration = require('./events/onChannelModeration');
const onDirectMessage = require('./events/onDirectMessage');
const {createTables} = require('./db/dbORM');
const glob = require('glob');
const fs = require('fs');

const client = new Discord.Client(PARTIALS);

const commandFiles = glob.sync('./commands/**/*.js');

// Grab command files in the commands directory
client.commands = new Discord.Collection();
for (const file of commandFiles) {
    const command = require(file);
    let newFunction = client.commands.set(command.name, command);
    util.promisify(newFunction.get(command.name).execute);
}

client.once('ready', () => {
    console.log(`I'm online!`);
    if (!fs.existsSync('./db/CatsTale'))
        createTables();
});

client.on('message', message => {
    if (message.channel.type === 'text') {
        onChannelModeration('!', client, message);
        onGuildModeration('!', client, message);
    } else {
        if (!message.author.bot) {
            onDirectMessage(client, message);
        }
    }
});
// last line of this file
if (process.env.NODE_ENV === 'production') {
    client.login(process.env.DISCORD_PROD_TOKEN).catch(e => console.log(e)); // main
} else {
    client.login(process.env.DISCORD_DEV_TOKEN).catch(e => console.log(e)); // dev
}
