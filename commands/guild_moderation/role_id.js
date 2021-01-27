module.exports = {
  name: 'role_id',
  description: 'returns id of a specified role. !role <role_name> ',
  execute(message, args, client) {
    let returnId = 'Role Not Found';
    let returnPos = 'Role Not Found';

    if (args.length < 1) {
      // return this roleId not found
      return 'You did not specify a role';
    }
    const roleName = args.shift();
    const roles = message.guild.roles.cache;
    roles.forEach(role => {
      if (role.name.toLowerCase() === roleName.toLowerCase()){
        returnPos = role.position;
        returnId = role.id;
      }
    });

    return {returnId, returnPos};
  }
}