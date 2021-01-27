module.exports = {
    name: 'channel_id',
    description: 'returns id of a specified channel. no args = current channel ID, args = args ID ',
    execute(message, args, client) {
        let returnId = 'Channel Not Found';
        if (args.length < 1) {
            // return this channel's id
            returnId = message.channel.id;
        }
        const channelName = args.shift();
        const channels = client.channels.cache;
        channels.forEach(channel => {
            if (channel.name === channelName && channel.type === "text"){
                returnId = channel.id;
            }
        });

        return returnId;
    }
}

// client.channels.cache object: 
// {
//     "type": "text",
//     "deleted": false,
//     "id": "723434273486667778",
//     "name": "welcome",
//     "rawPosition": 9,
//     "parentID": "744627368496463985",
//     "permissionOverwrites": [
//       "723434272907722752"
//     ],
//     "topic": "",
//     "nsfw": false,
//     "lastMessageID": "748949206110175242",
//     "rateLimitPerUser": 0,
//     "lastPinTimestamp": null,
//     "guild": "723434272907722752",
//     "messages": [],
//     "createdTimestamp": 1592550571558
//   },