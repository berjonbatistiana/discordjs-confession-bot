const CHANNEL_FN_TABLE = 'channel_assignments_table';
const ROLE_FN_TABLE = 'role_function_table';
const GUILD_TABLE = 'guild_table';
const CONFESSION_COUNT_TABLE = 'confession_count_table';

const selectChannelFnByIdQuery = `SELECT * FROM ${CHANNEL_FN_TABLE} WHERE fn_id = ?`;
const selectMinRoleByIdQuery = `SELECT * FROM ${ROLE_FN_TABLE} WHERE fn_code = ?`;
const selectConfessionCountByGuildIdQuery = `SELECT * FROM ${CONFESSION_COUNT_TABLE} WHERE guild_id = ?`
const insertChannelQuery = `
  INSERT INTO
  ${CHANNEL_FN_TABLE}(channel_id, channel_name, guild_id, fn_id)
  VALUES(?,?,?,?)
  ON duplicate key update
  channel_id = ?,
  channel_name = ?,
  guild_id = ?;
  `;
const insertRoleQuery =  `
  INSERT INTO
  ${ROLE_FN_TABLE}(role_id, role_name, guild_id, fn_code)
  VALUES(?,?,?,?)
  ON DUPLICATE KEY UPDATE
  role_id = ?,
  role_name = ?,
  guild_id = ?;
  `;
const insertConfessionCountQuery = `
  INSERT INTO
  ${CONFESSION_COUNT_TABLE}(guild_id, confession_count)
  VALUES(?,?)
  ON DUPLICATE KEY UPDATE
  confession_count = ?
  `;

module.exports = {
  CHANNEL_FN_TABLE,
  ROLE_FN_TABLE,
  GUILD_TABLE,
  selectChannelFnByIdQuery,
  selectMinRoleByIdQuery,
  selectConfessionCountByGuildIdQuery,
  insertChannelQuery,
  insertRoleQuery,
  insertConfessionCountQuery,
}