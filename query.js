'use strict'

//----------------------DATABASE--------------------------

const db = require("./sqlWrap");

module.exports = {
	getDatabaseCount: getDatabaseCount,
	getAllVideoIds: getAllVideoIds,
	getVidData: getVidData,
	insertPref: insertPref,
}

async function getDatabaseCount(table) {

  const sql = `SELECT COUNT(*) FROM ${table}`;
	let vidCount = await db.get(sql);
	return vidCount["COUNT(*)"];

}

async function getAllVideoIds() {
  const queryVals = await db.all("SELECT rowIdNum FROM VideoTable")
  const vals = queryVals.map(obj => obj.rowIdNum)
  return vals
}

async function getVidData(rowIds) {
  let vidData = [];
  for (let rowId of rowIds) {
    let sql = `SELECT * FROM VideoTable WHERE rowIdNum=${rowId}`;
    try {
      let data = await db.get(sql);
      vidData.push(data);
    } catch (e) {
      console.log(`Could not get video: ${e}`);
    }
  }
  return vidData;
}

async function insertPref(prefs) {
  let sql = "INSERT INTO PrefTable (better, worse) VALUES(?, ?)";
  try {
    await db.run(sql, [prefs.better, prefs.worse]);
    console.log(`Inserted into PrefTable: ${prefs}`);
    await showTable("PrefTable");
  } catch (e) {
    console.log(`Could not report preference: ${e}`);
  }
  
}

async function dumpTable(table) {

  let sql = `select * from ${table}`;
  let result = await db.all(sql);
  return result;
}

async function showTable(table) {
  try {
    let tableResult = await dumpTable(table);
    console.log(tableResult);
  } catch (e) {
    console.log(e);
  }
}