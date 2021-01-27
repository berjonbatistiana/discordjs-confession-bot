const c = require('../../constants');
const {insertRoleFn} = require('../../db/dbORM')

module.exports = {
  name: 'role_assign',
  description: 'Assigns a role into the DB with for the minimum tier of who can use the bot. !role [role_name]',
  execute(message, args, client, callback) {
    const response = {
      success: false,
      message: 'Untracked error found. Please contact Lemon :('
    }

    if (args.length < 2) {
      response.message = 'Command error: Specify role and a proper role function code'
      callback(response);
      return;
    }

    const roleName = args.shift();
    const fnName = args.shift();

    const fnCode = c.ROLE_FUNCTION_CODES.get(fnName);

    if (fnCode === undefined) {
      response.message = 'Command error: function name not found';
      callback(response);
      return;
    }

    const id = client.commands.get('role_id').execute(message, [roleName], client)
    const gid = message.guild.id;

    insertRoleFn({name: roleName, id, gid}, fnCode, (err) => {
      response.message = err ? 'DB Error: Please contact Lemon for help!' : 'Role successfully assigned';
      if (err)
        console.log(err);
      callback(response);
      return;
    })
  }
}