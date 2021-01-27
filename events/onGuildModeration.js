const onGuildModeration = (prefix, client, message) => {

  // prevent reading messages that doesn't start with prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Split command to array using spaces
  const args = message.content.slice(prefix.length).split(/ +/);

  // Grab command using shift
  const command = args.shift().toLowerCase();

  let isBanned = 0;

  // command list, pulls from commands folder
  switch (command) {
    // Respond command, to dms [!res <id> <message>]
    case 'res':
      const id = args.shift();
      message.client.users.fetch(id)
        .then(user => {
          const reply = args.join(' ');
          user.send(reply).then(_message => {
            message.channel.send(
              {
                embed: {
                  title: `Response to ${user.username}`,
                  description: reply,
                  color: '#00FF00',
                  footer: {
                    text: `Sent by ${message.author.username}`
                  }
                }
              }
            )
          });
        })
        .catch(err => {
          message.channel.send({
            embed: {
              title: `User ${id} not found. Try again`,
              description: args.join(' '),
              color: '#C70039',
              footer: {text: err.message}
            }
          })

        });
      message.delete()
      break;
    case 'roleassign':
      client.commands.get('role_assign').execute(message, args, client, response => {
        message.channel.send(response.message).then(notify => {
          notify.delete({timeout: 5000});
        });
      });
      message.delete();
      break;
    case 'roleid':
      const returnMessage = client.commands.get('role_id').execute(message, args, client);
      message.author.send(`Role ID is: ${returnMessage}`)
        .catch(e => {
          console.log(e)
        });
      message.delete();
      break;
    default:
      break;
  }
}

module.exports = onGuildModeration;