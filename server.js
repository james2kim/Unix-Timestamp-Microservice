// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});



Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
if(!Date.now) Date.now = function() { return new Date(); }
Date.time = function() { return Date.now().getUnixTime(); }


// Time Stamp Microservice 
app.get("/api/timestamp/:date_string",(req,res) => {
 
// Store route param value into variable   
const value = req.params.date_string

// ParseInt the value of the string and return back to string
const num = parseInt(value)
const stringNum = num.toString()
const endTime = new Date().getTime()



// Scenario 1: If no route parameter was passed, we create a new date using the current date and return the proper json 
  if (!value) 
  {
    const date = new Date()
    res.json({unix:date.getTime(), utc:date.toUTCString()})
  } 

// Scenario 2: If the route parameter is not a date but a unix timestamp 
// If the string is the same as the value, the string was a number to begin with
// We also need to check to see that if the string is a number, it is a valid timestamp between 0 and the current timestamp 
// If these conditions match, return proper json   
  else if (stringNum === value && num >= 0 && num <= endTime) 
  {
    
    const date = new Date(parseInt(value))
    res.json({unix:parseInt(value), utc:date.toUTCString()})
  } 
    

// Default Scenario: If a route parameter was passed and it is not a unix timestamp, check to see if it is valid date, if it is, return json 
  else 
    {
      const date = new Date(value)
          // it is a date
        if (isNaN(date.getTime())) {  
        // date is not valid
          res.json({error:'Invalid Date'})
        } else {
        // date is valid
         res.json({unix:date.getTime(),utc:date.toUTCString()})
        }
    }
  
})



// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});