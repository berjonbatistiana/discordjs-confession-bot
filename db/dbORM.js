const {
  DB,
  CHANNEL_FN_TABLE,
  CREATE_CHANNEL_FUNCTION_TABLE,
  ROLE_FN_TABLE,
  CREATE_ROLE_FUNCTION_TABLE,
  CREATE_GUILD_TABLE,
} = require('./dbQueries');

// const sqlite = require('sqlite3').verbose();
const connection = require("./connection");

const dbPath = './db/' + DB;

// function createTables() {
//   // open and create db
//   const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);
//   db.run(CREATE_GUILD_TABLE);
//   db.run(CREATE_CHANNEL_FUNCTION_TABLE);
//   db.run(CREATE_ROLE_FUNCTION_TABLE);
// }

async function getChannelFn(fid, callback) {
  
  // const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  // db.get(query, [fid], callback);
  
  const query = `SELECT * FROM ${CHANNEL_FN_TABLE} WHERE fn_id = ?`;
  
  try {
    const [rows] = await connection.query(query, fid);
    if (callback)
      callback(null, rows[0]);
  } catch (e) {
    if (callback)
      callback(e, null);
    throw new Error(e);
  }
}

async function getMinRole(fid, callback) {
  
  // const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  // const query = `SELECT * FROM ${ROLE_FN_TABLE} WHERE fn_code = ?`;
  // db.get(query, [fid], callback);
  
  const query = `SELECT * FROM ${ROLE_FN_TABLE} WHERE fn_code = ?`
  
  try {
    const [rows] = await connection.query(query, fid);
    if(callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
  
}

async function insertChannelFn(ch, fnCode, callback) {
  
  // const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  // let insertChFn = db.prepare(`INSERT INTO ${CHANNEL_FN_TABLE}(channel_id, channel_name, guild_id, fn_id) VALUES(?,?,?,?) ON CONFLICT(fn_id) DO UPDATE SET channel_id = ?, channel_name = ?, guild_id = ?`)
  // insertChFn.run([ch.id, ch.name, ch.gid, fnCode, ch.id, ch.name, ch.gid], callback);
  // insertChFn.finalize();
  // db.close();
  
  const query = `
  INSERT INTO
  ${CHANNEL_FN_TABLE}(channel_id, channel_name, guild_id, fn_id)
  VALUES(?,?,?,?)
  ON duplicate key update
  channel_id = ?,
  channel_name = ?,
  guild_id = ?;
  `;
  
  try {
    const [rows] = await connection.query(query, [ch.id, ch.name, ch.gid, fnCode, ch.id, ch.name, ch.gid])
    if (callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
  
  
}

async function insertRoleFn(role, fnCode, callback) {
  
  // const db = new sqlite.Database(dbPath, sqlite.OPEN_READWRITE);
  // let insertRole = db.prepare()
  // insertRole.run([role.id, role.name, role.gid, fnCode, role.id, role.name, role.gid], callback);
  // insertRole.finalize();
  // db.close();
  
  const query = `
  INSERT INTO
  ${ROLE_FN_TABLE}(role_id, role_name, guild_id, fn_code)
  VALUES(?,?,?,?)
  ON DUPLICATE KEY UPDATE
  role_id = ?,
  role_name = ?,
  guild_id = ?;
  `
  try {
    const [rows] = await connection.query(query, [role.id, role.name, role.gid, fnCode, role.id, role.name, role.gid])
    if (callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
}


module.exports = {
  getChannelFn,
  // createTables,
  insertChannelFn,
  insertRoleFn,
  getMinRole
};