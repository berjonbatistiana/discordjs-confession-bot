const DB = 'CatsTale';
const CHANNEL_FN_TABLE = 'channel_assignments';
const ROLE_FN_TABLE = 'role_function';
const GUILD_TABLE = 'guild_table';

const CREATE_GUILD_TABLE =
  `CREATE TABLE IF NOT EXISTS
  ${GUILD_TABLE}(
    guild_id TEXT NOT NULL UNIQUE,
    guild_name TEXT NOT NULL,
    PRIMARY KEY(guild_id)
    ON CONFLICT REPLACE
  )`;


const CREATE_CHANNEL_FUNCTION_TABLE =
  `CREATE TABLE 
    IF NOT EXISTS 
    ${CHANNEL_FN_TABLE}(
      channel_id TEXT NOT NULL, 
      channel_name TEXT NOT NULL, 
      fn_id INT NOT NULL UNIQUE, 
      guild_id TEXT NOT NULL,
      PRIMARY KEY (fn_id)
    )`;

const CREATE_ROLE_FUNCTION_TABLE =
  `CREATE TABLE
  IF NOT EXISTS
  ${ROLE_FN_TABLE}(
    role_id TEXT NOT NULL,
    role_name TEXT NOT NULL,
    fn_code NOT NULL UNIQUE,
    guild_id TEXT NOT NULL,
    PRIMARY KEY(fn_code, role_id)
  )`;

module.exports = {
  DB,
  CHANNEL_FN_TABLE,
  ROLE_FN_TABLE,
  GUILD_TABLE,
}