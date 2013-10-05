var http = require("http");
var express = require("express");
var app = express();

var stat = "close";

app.use(express.bodyParser());

http.createServer(app).listen(80);

callback = function(response){

}
app.get("/", function(req, res){
    res.send("");
});

app.post("/", function(req, res){
    var json = req.body.json;
    console.log(req.body);
    json = JSON.parse(json);
    stat = json.stat;
    
    res.send(stat);
});

app.get("/poll", function(req, res){
    res.send(stat);
});
