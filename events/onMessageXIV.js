const prefix = '.';

const onMessageXIV = (client, message) => {

    // prevent reading messages that doesn't start with prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Split command to array using spaces
    const args = message.content.slice(prefix.length).split(/ +/);

    // Grab command using shift
    const command = args.shift().toLowerCase();

    // command list, pulls from commands folder
    let returnMessage;
    switch (command) {

        // Lodestone command, lets the user register their account from the lodestone 
        // and change their nick accordingly
        case 'iam':
            client.commands.get('xiv').execute('character', args)
                .then(({character}) => { // grab character property from returned lodestone info
                    if (!character) {
                        message.channel.send('Character not found. Make sure you follow the format. <First Name> <Last Name> <Server>.');
                        return;
                    }
                    console.log(character);
                    const nickName = `${character.name} [${character.server}]`;
                    console.log(nickName);
                    message.member.setNickname(nickName)
                        .then(() => {
                        message.channel.send('Success!');
                    })
                        .catch(err => {
                        message.channel.send(`Could not change nickname: ${err.message}. Contact the administrator for support.`)
                    });
                }).catch(err => {
                console.log(err)
            });
            message.delete();
            break;

        case 'link':
            const link = args.pop();
            const name = args.join(' ');
            message.channel.send({embed: {description: `[${name}](${link})`}});
            message.delete();
            break;
        default:
            break;
    }
}

module.exports = onMessageXIV;