const Discord = require('discord.js');
const {getChannelFn, getMinRole, addOneConfessionCount} = require('../db/dbORM');
const c = require('../constants');

const onDirectMessage = async (client, message) => {
  
  const fnChCode = c.CHANNEL_FUNCTION_CODES.get('confessions');
  const fnRoCode = c.ROLE_FUNCTION_CODES.get('confession_role')
  const fnPubConCode = c.CHANNEL_FUNCTION_CODES.get('confessions_public')
  
  // Get Channel to send the message first together with guild id
  await getChannelFn(fnChCode, (err, row) => {
    
    // guard if row returns undefined
    if (!row || row.length < 1) {
      message.author.send('The confessional is not set up yet! Try again later.')
      return;
    }
    const gid = row.guild_id;
    const cid = row.channel_id;
    const guild = client.guilds.cache.get(gid);
    const returnChannel = guild.channels.cache.get(cid);
    
    // expansion: Check if bot belongs to the guild
    if (!guild) {
      message.author.send(`Sorry! You don't have the proper permissions to send a confession. Try again later!`)
    }
    
    // fetch all members of the guild to check if they are eligible to confess
    guild.members.fetch({user: [message.author.id], cache: false}).then(member => {
      
      const memberRolePos = member.first().roles.highest.position;
      
      // Get the minimum role to be able to confess.
      getMinRole(fnRoCode, (err, row) => {
        // guard if row returns undefined
        if (!row || row.length < 1) {
          message.author.send('The confessional is not set up yet! Try again later.')
          return;
        }
        
        const minRole = guild.roles.cache.get(row.role_id);
        
        // eligibility check
        const proceed = minRole.position <= memberRolePos
        
        // eligibility guard
        if (!proceed) {
          message.author.send('Sorry, you are not eligible yet to send a confession. Contact the server admins for more details.')
          return;
        }
        
        // lookup guild key (keyarray) in table for all keys
        returnChannel.send(
          // Message Content
          new Discord.MessageEmbed()
            .setDescription(message.content)
            .setColor('#00FF00')
            .setTimestamp(message.createdAt)
        ).then(async embedMessage => {
          
          await embedMessage.react('✅');
          await embedMessage.react('❌');
          
          message.client.on('messageReactionAdd', (reaction, user) => {
              if ((reaction.message.id === embedMessage.id) &&
                (reaction.message.channel.id === embedMessage.channel.id) &&
                (user.id !== embedMessage.author.id) &&
                (embedMessage.reactions.cache.get('✅').count < 3) &&
                ('✅'.localeCompare(reaction.emoji.name) === 0)) {
                
                const pubEmbedMessage = new Discord.MessageEmbed()
                  
                  .setDescription(reaction.message.embeds[0].description)
                  .setColor('#76519b');
                
                getChannelFn(fnPubConCode, async (perr, prow) => {
                  const pgid = prow.guild_id;
                  const pcid = prow.channel_id;
                  const pguild = client.guilds.cache.get(pgid);
                  const pubChannel = pguild.channels.cache.get(pcid);
  
                  await addOneConfessionCount(pgid, (err, data) => {
                    if (!err)
                      pubChannel.send(pubEmbedMessage.setTitle(`**Confession #${data.confession_count}**`));
                  })
                })
              }
            }
          )
        })
          .catch(err => {
            console.log(JSON.stringify(err))
            message.author.send({
              embed: {
                title: `Error Code: ${err.code}`,
                description: err.message
              }
            })
          })
      })
    });
  });
}

module.exports = onDirectMessage;