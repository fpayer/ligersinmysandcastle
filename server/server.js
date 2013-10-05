var http = require("http");
var express = require("express");
var app = express();

var stat = "close";

app.use(express.bodyParser());

http.createServer(app).listen(80);

var options = {
    host : "https://agent.electricimp.com",
    path : "/5lnzpVhsLEK_?status=" + stat
};

app.get("/", function(req, res){
    res.send("");
});

app.post("/", function(req, res){
    var json = req.body.json;
    console.log(req.body);
    json = JSON.parse(json);
    stat = json.stat;
    
    stat = stat == "open" ? 1 : 0;

    http.request("http://agent.electricimp.com/5lnzpVhsLEK_?status=" + stat, function(){}).end();
    res.send("Ok");
});

app.get("/poll", function(req, res){
    res.send(stat);
});
