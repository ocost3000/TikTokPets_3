'use strict'

const db = require("./sqlWrap")

async function getDatabaseCount() {
	const query = "SELECT COUNT(*) FROM VideoTable";
	let vidCount = await db.get(query);
	return vidCount;
}

module.exports = dbHelp