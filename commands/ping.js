module.exports = {
    name: 'ping',
    description: 'ping command for learning purposes',
    execute(message, args){
        message.channel.send('pong~');
    }
}