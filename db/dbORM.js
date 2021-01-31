const {
  selectChannelFnByIdQuery,
  selectMinRoleByIdQuery,
  insertChannelQuery,
  insertRoleQuery,
  selectConfessionCountByGuildIdQuery,
  insertConfessionCountQuery,
} = require('./dbQueries');

const connection = require("./connection");


async function getChannelFn(fid, callback) {
  
  try {
    const [rows] = await connection.query(selectChannelFnByIdQuery, fid);
    if (callback)
      callback(null, rows[0]);
  } catch (e) {
    if (callback)
      callback(e, null);
    throw new Error(e);
  }
}

async function getMinRole(fid, callback) {
  
  try {
    const [rows] = await connection.query(selectMinRoleByIdQuery, fid);
    if(callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
}

async function getConfessionCount(guildId, callback){
  try{
    const [rows] = await connection.query(selectConfessionCountByGuildIdQuery, guildId)
    if (callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e)
  }
}

async function insertChannelFn(ch, fnCode, callback) {
  
  try {
    const [rows] = await connection.query(insertChannelQuery, [ch.id, ch.name, ch.gid, fnCode, ch.id, ch.name, ch.gid])
    if (callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
}

async function insertRoleFn(role, fnCode, callback) {
  
  try {
    const [rows] = await connection.query(insertRoleQuery, [role.id, role.name, role.gid, fnCode, role.id, role.name, role.gid])
    if (callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
}

async function insertConfessionCount(guildId, count, callback){
  try {
    const [rows] = await connection.query(insertConfessionCountQuery, [guildId, count, count])
    if (callback)
      callback(null, rows[0])
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
}

async function addOneConfessionCount(guildId, callback){
  let count = 0;
  try {
    const [_rows] = await connection.query(selectConfessionCountByGuildIdQuery, guildId)
    const selectRow = _rows[0];
    if (selectRow)
      count = selectRow.confession_count + 1;
  
    await connection.query(insertConfessionCountQuery, [guildId, count, count])
    if (callback)
      callback(null, {confession_count: count})
  } catch (e) {
    if (callback)
      callback(e, null)
    throw new Error(e);
  }
}

module.exports = {
  getChannelFn,
  insertChannelFn,
  insertRoleFn,
  getMinRole,
  addOneConfessionCount,
  getConfessionCount,
  insertConfessionCount
};