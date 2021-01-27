const onChannelModeration = (prefix, client, message) => {

    // prevent reading messages that doesn't start with prefix
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Split command to array using spaces
    const args = message.content.slice(prefix.length).split(/ +/);

    // Grab command using shift
    const command = args.shift().toLowerCase();

    // command list, pulls from commands folder
    switch (command) {

        // channelid, returns the channel id of the specified channel or the channel this command is invoked from. [!channelid <channel name?>]
        case 'channelid':
            const returnMessage = client.commands.get('channel_id').execute(message, args, client);
            message.author.send(`Channel ID is: ${returnMessage}`)
                .catch(e => {
                    console.log(e)
                });
            message.delete()
            break;
        // channelassign, assigns a designated channel or where this command is invoked from to a specific function. [!channelassign <channel name?> <function name>]
        case 'channelassign':
            client.commands.get('channel_assign').execute(message, args, client, response => {
                message.channel.send(response.message).then(notify => {
                    notify.delete({timeout: 5000});
                });
            });
            message.delete()
            break;
        default:
            break;
    }
}

module.exports = onChannelModeration;