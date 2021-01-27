const DB = 'CatsTale';
const CHANNEL_FN_TABLE = 'channel_assignments';
const ROLE_FN_TABLE = 'role_function';
const GUILD_TABLE = 'guild_table';
const CHANNEL_TABLE = 'channel_table';
const ROLE_MIN_TABLE = 'role_min_table';

const CREATE_GUILD_TABLE =
  `CREATE TABLE IF NOT EXISTS
  ${GUILD_TABLE}(
    guild_id TEXT NOT NULL UNIQUE,
    guild_name TEXT NOT NULL,
    PRIMARY KEY(guild_id)
    ON CONFLICT REPLACE
  )`;

const CREATE_CHANNEL_TABLE =
  `CREATE TABLE IF NOT EXISTS
  ${CHANNEL_TABLE}(
    ch_id TEXT NOT NULL,
    ch_fn_code TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    PRIMARY KEY(ch_fn_code, guild_id),
    FOREIGN KEY (guild_id) REFERENCES ${GUILD_TABLE} (guild_id)
  )`;

const CREATE_ROLE_TABLE =
  `CREATE TABLE IF NOT EXISTS
  ${ROLE_MIN_TABLE}(
    role_id TEXT NOT NULL,
    role_fn_code TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    PRIMARY KEY(role_fn_code, guild_id),
    FOREIGN KEY (guild_id) REFERENCES ${GUILD_TABLE}(guild_id)
  )`;

// const CREATE_CONFESSION_PATH_TABLE = `
//   CREATE TABLE IF NOT EXITS
//   ${CONFESSION_PATH_TABLE}(
//     guild_id TEXT NOT NULL UNIQUE,
//     role_min TEXT NOT NULL,
//     ch_pend TEXT NOT NULL,
//     ch_valid TEXT NOT NULL,
//     PRIMARY KEY (guild_id),
//     FOREIGN KEY (guild_id) REFERENCES ${GUILD_TABLE}(guild_id),
//     FOREIGN KEY (role_min) REFERENCES ${ROLE_TABLE}(role_id),
//     FOREIGN KEY (ch_pend) REFERENCES ${CHANNEL_TABLE}(ch_id),
//     FOREIGN KEY (ch_valid) REFERENCES ${CHANNEL_TABLE}(ch_id)
//   )`;

const CREATE_ROLE_FUNCTION_TABLE =
  `CREATE TABLE
  IF NOT EXISTS
  ${ROLE_FN_TABLE}(
    role_id TEXT NOT NULL,
    role_name TEXT NOT NULL,
    fn_code NOT NULL UNIQUE,
    guild_id TEXT NOT NULL,
    PRIMARY KEY(fn_id)
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

module.exports = {
  DB,
  CREATE_CHANNEL_FUNCTION_TABLE,
  CHANNEL_FN_TABLE,
  ROLE_FN_TABLE,
  CREATE_ROLE_FUNCTION_TABLE,

  GUILD_TABLE,
  CHANNEL_TABLE,
  ROLE_MIN_TABLE,
  CREATE_GUILD_TABLE,
  CREATE_CHANNEL_TABLE,
  CREATE_ROLE_TABLE
}