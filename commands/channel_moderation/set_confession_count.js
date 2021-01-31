const {insertConfessionCount, getConfessionCount} = require('../../db/dbORM');

module.exports = {
  name: 'set_confession_count',
  description: 'Set the current confession count. !confessions',
  execute(message, args, callback) {
    let returnCount = -1;
    
    if (args.length < 1) {
      // return confession count
      getConfessionCount(message.guild.id, (err, data) => {
        if (!err)
          callback(data.confession_count);
      })
    } else {
      
      const newCount = args.shift();
      insertConfessionCount(message.guild.id, newCount, (err, _data) => {
        if (!err)
          callback(newCount);
      })
    }
  }
}
