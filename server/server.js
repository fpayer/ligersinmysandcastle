var http = require("http");
var express = require("express");
var twilio = require("twilio");
var fs = require("fs");
var path = require("path");

var zip = "02139";
var desiredTemp = 68;
var insideTemp = 66;
var stat = "close";

var app = express();
app.use(express.bodyParser());

http.createServer(app).listen(80);

callback = function(response){
    var resp = "";

    response.on("data", function(chunk){
        resp += chunk;
    });

    response.on("end", function(){
        var json = JSON.parse(resp);

        var currentTemp = json.current_observation.temp_f;
        var currentPrecip = json.current_observation.precip_1hr_in;
        var currentWind = json.current_observation.wind_mph;
        var currentHumid = json.current_observation.humidity;
        var futureTemp = json.hourly_forecast[0].temp.english;
        var futureRain = json.hourly_forecast[0].pop;
        var futureSnow = json.hourly_forecast[0].snow.english;
        var futureWind = json.hourly_forecast[0].wspd.english;
        var futureHumid = json.hourly_forecast[0].humdity;

        checkParams({
            "currentTemp" : currentTemp,
            "currentPrecip" : currentPrecip,
            "currentWind" : currentWind,
            "currentHumid" : currentHumid,
            "futureTemp" : futureTemp,
            "futureRain" : futureRain,
            "futureSnow" : futureSnow,
            "futureWind" : futureWind,
            "futureHumid" : futureHumid
        });
    });
};

checkParams = function(params){
    currentTemp = params.currentTemp;
    currentPrecip = params.currentPrecip;
    currentWind = params.currentWind;
    currentHumid = params.currentHumid;
    futureTemp = params.futureTemp;
    futureRain = params.futureRain;
    futureSnow = params.futureSnow;
    futureWind = params.futureWind;
    futureHumid = params.futureHumid;


    //If current raining or in proper temp range
    if (currentPrecip > 0 ||
        (insideTemp > currentTemp && insideTemp < desiredTemp) ||
        (insideTemp < currentTemp && insideTemp > desiredTemp))
        http.request("http://agent.electricimp.com/5lnzpVhsLEK_?status=0", function(){}).end();
    //If going to rain/snow
    else if (futureRain >= 50 || futureSnow > 0)
        http.request("http://agent.electricimp.com/5lnzpVhsLEK_?status=0", function(){}).end();
    //If not raining and not in proper temp range
    else if (currentPrecip == 0 && 
        ((insideTemp > currentTemp && insideTemp > desiredTemp) ||
        (insideTemp < currentTemp && insideTemp < desiredTemp)))
        http.request("http://agent.electricimp.com/5lnzpVhsLEK_?status=1", function(){}).end();
};

app.get("/", function(req, res){
    res.send("");
});


app.post("/", function(req, res){
    var json = req.body.json;
    console.log(req.body);
    json = JSON.parse(json);
    stat = json.stat;

    var flag = stat == "open" ? 1 : 0;

    http.request("http://agent.electricimp.com/5lnzpVhsLEK_?status=" + flag
, function(){}).end();
    res.send("Ok");
});

app.get("/poll", function(req, res){
    res.send(stat);
});

app.post("/text", function(req, res){
    var json = req.body.Body;
    console.log(json);
    var message = "";

   if(json.toLowerCase().indexOf('open') != -1) {
        stat = 1
        message = "Your window has been opened successfully."
    } else if(json.toLowerCase().indexOf('clos') != -1) {
        stat = 0
        message = "Your window has been closed successfully."
    }

    var twiml = new twilio.TwimlResponse();
    twiml.message(message)

    res.type('text/xml');
    res.send(twiml.toString());

    http.request("http://agent.electricimp.com/5lnzpVhsLEK_?status=" + stat, function(){}).end();
    res.send("Ok");
});

app.get("/admin*", function(req, res){
    console.log(req.url);
    var base = "./admin/";
    var branch = "";
    var contentType = "text/html";
    if(req.url == "/admin" || req.url == "/admin/")
        branch = "admin.html";
    else
        branch = req.url.substring(7);

    var extname = path.extname(branch);
    switch(extname) {
        case '.js' : 
            contentType = "text/javascript";
            break;
        case ".css" :
            contentType = "text/css";
            break;
        case ".jpg" : 
            contentType = "image/jpeg";
            break;
        case ".png" :
            contentType = "image/png";
            break;
    }

    var filePath = base+branch;
    if (path.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': contentType});
                    res.end(content, 'utf-8');
                }
            });
        }
        else {
            res.writeHead(500);
            res.end();
        }
    }));
});

setTimeout(function() {
    http.request("http://api.wunderground.com/api/28bef9a745907290/conditions/hourly/q/" + zip + ".json", callback).end();
}, 1000);

