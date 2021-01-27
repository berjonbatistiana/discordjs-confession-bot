const {
  DB,
  CHANNEL_FN_TABLE,
  CREATE_CHANNEL_FUNCTION_TABLE,
  ROLE_FN_TABLE,
  ROLE_MIN_TABLE,
  CREATE_ROLE_FUNCTION_TABLE,
} = require('./dbQueries');

const sqlite = require('sqlite3').verbose();
const dbPath = './db/' + DB;

function createTables() {
  // open and create db
  const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
  db.run(CREATE_CHANNEL_FUNCTION_TABLE);
  db.run(CREATE_ROLE_FUNCTION_TABLE);
}

function getChannelFn(fid, callback) {

  const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  const query = `SELECT * FROM ${CHANNEL_FN_TABLE} WHERE fn_id = ?`;
  db.get(query, [fid], callback);
}

function getMinRole(fid, callback) {

  const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  const query = `SELECT * FROM ${ROLE_FN_TABLE} WHERE fn_id = ?`;
  db.get(query, [fid], callback);
}

function insertChannelFn(ch, fnCode, callback) {

  const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  let insertChFn = db.prepare(`INSERT INTO ${CHANNEL_FN_TABLE}(channel_id, channel_name, guild_id, fn_id) VALUES(?,?,?,?) ON CONFLICT(fn_id) DO UPDATE SET channel_id = ?, channel_name = ?, guild_id = ?`)
  insertChFn.run([ch.id, ch.name, ch.gid, fnCode, ch.id, ch.name, ch.gid], callback);
  insertChFn.finalize();
  db.close();

}

function insertRoleFn(role, fnCode, callback) {

  const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  let insertRole = db.prepare(`INSERT INTO ${ROLE_FN_TABLE}(role_id, role_name, guild_id, fn_id) VALUES(?,?,?,?) ON CONFLICT(fn_id) DO UPDATE SET role_id = ?, role_name = ?, guild_id = ?`)
  insertRole.run([role.id, role.name, role.gid, fnCode, role.id, role.name, role.gid], callback);
  insertRole.finalize();
  db.close();

}

function insertRole() {

  const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  let insertRole = db.prepare(
    `
    INSERT INTO ${ROLE_TABLE}(role_id, role_name, fn_code) 
    VALUES(?,?,?,?) 
    ON CONFLICT(role_id, fn_code)
    DO REPLACE`)
}

module.exports = {
  getChannelFn,
  createTables,
  insertChannelFn,
  insertRoleFn,
  getMinRole
};