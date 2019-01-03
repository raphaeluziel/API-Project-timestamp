// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// your first API endpoint... 
// is it now on github?
app.get("/api/timestamp/:data_string?", function (req, res) {
  var timestamp = req.path.replace("/api/timestamp/", "");
  var isValid = true;
  if (timestamp == "") {timestamp = new Date();}
  else if (timestamp.search("-") >= 0) {timestamp = new Date(timestamp);}
  else if (timestamp.search(/\d+/g) >=0) {timestamp = new Date(Number(timestamp));}
  else isValid = false;
  if (isValid) {
    var utc = timestamp; utc = utc.toUTCString(); console.log(utc);
    var unix = timestamp; unix = unix.getTime(); console.log(unix);
    res.json({unix: unix, utc: utc});
  }
  else{
    res.json({error: "Invalid Date"});
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});