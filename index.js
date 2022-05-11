'use strict'
// index.js
// This is our main server file

// A static server using Node and Express
const express = require("express");

// local modules
const db = require("./sqlWrap");
const win = require("./pickWinner");


// gets data out of HTTP request body 
// and attaches it to the request object
const bodyParser = require('body-parser');


/* might be a useful function when picking random videos */
function getRandomInt(max) {
  let n = Math.floor(Math.random() * max);
  // console.log(n);
  return n;
}


/* start of code run on start-up */
// create object to interface with express
const app = express();

// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  next();
})
// make all the files in 'public' available 
app.use(express.static("public"));

// if no file specified, return the main page
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/compare.html");
});

// Get JSON out of HTTP request body, JSON.parse, and put object into req.body
app.use(bodyParser.json());


app.get("/getWinner", async function(req, res) {
  console.log("getting winner");
  try {
  // change parameter to "true" to get it to computer real winner based on PrefTable 
  // with parameter="false", it uses fake preferences data and gets a random result.
  // winner should contain the rowId of the winning video.
  let winner = await win.computeWinner(8,false);

  // you'll need to send back a more meaningful response here.
  res.json({});
  } catch(err) {
    res.status(500).send(err);
  }
});

app.get("/getTwoVideos", async (req, res) => {
  /* 
  This should pick two distict random videos (that is, not the same), 
  and send an array containing their VideoTable data in the HTTP response. 
  Notice the handy function "getRandomInt" at the top of "index.js".
  */

  let allVidIds = await getAllVideoIds()

  // get random video IDs, no duplicates
  let indices = [null, null]
  indices[0] = getRandomInt(allVidIds.length)
  do {
    indices[1] = getRandomInt(allVidIds.length)
  } while (indices[1] == indices[0])

  let rowIds = indices.map(i => allVidIds[i])
  let vidData = await getVidData(rowIds)
  
  res.send(vidData)

  // query for both videos to compare, return their VideoTable Data in response
});


// Page not found
app.use(function(req, res){
  res.status(404); 
  res.type('txt'); 
  res.send('404 - File '+req.url+' not found'); 
});

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});

//----------------------DATABASE--------------------------

async function getDatabaseCount() {

	const query = "SELECT COUNT(*) FROM VideoTable";
	let vidCount = await db.get(query);
	return vidCount;

}

async function getAllVideoIds() {
  const queryVals = await db.all("SELECT rowIdNum FROM VideoTable")
  const vals = queryVals.map(obj => obj.rowIdNum)
  return vals
}

async function getVidData(rowIds) {
  let vidData = [];
  for (let rowId of rowIds) {
    let query = `SELECT * FROM VideoTable WHERE rowIdNum=${rowId}`;
    try {
      let data = await db.get(query);
      vidData.push(data);
    } catch (e) {
      console.log(`Could not get video: ${e}`);
    }
  }
  return vidData;
}