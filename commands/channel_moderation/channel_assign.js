const c = require('../../constants');
const {insertChannelFn} = require('../../db/dbORM')

module.exports = {
    name: 'channel_assign',
    description: 'Assigns a channel into the DB with a function code.[!channelassign [channel name?] [channel function name]',
    execute(message, args, client, callback) {
        const response = {
            success: false,
            message: 'Untracked error found. Please contact Lemon :('
        }

        if (args.length < 1) {
            response.message = 'Command error: Specify channel function code'
            callback(response);
            return;
        }

        const channelName = args.length > 1 ? args.shift() : message.channel.name;
        const fnName = args.shift();

        const fnCode = c.CHANNEL_FUNCTION_CODES.get(fnName);

        if (fnCode === undefined) {
            response.message = 'Command error: function name not found';
            callback(response);
            return;
        }

        const id = client.commands.get('channel_id').execute(message, [channelName], client)
        const gid = message.guild.id;

        insertChannelFn({name: channelName, id, gid}, fnCode, (err, row) => {
            response.message = err ? 'DB Error: Please contact Lemon for help!' : 'Channel successfully assigned';
            if (err)
                console.log(err);
            callback(response);
            return;
        })
    }
}