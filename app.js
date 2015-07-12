var express = require("express");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, "")));

app.get("/", function(request, response){
    console.log("it works")
    response.sendFile(path.join(__dirname, "pages/index.html"));
});

app.get("/myGame", function(request, response){
    console.log("loading")
    response.sendFile(path.join(__dirname, "pages/example.html"));
});

    app.post("/score", function(request, response){
        var name = request.body.fullName;
        var email = request.body.email;
        var score = request.body.score;

        var database = csv.createCsvFileWriter("scores.csv", {"flags": "a"});
        var data = [name,email,score];

        database.writeRecord(data);
        database.writeStream.end();

        response.send("Thanks " + name + ",your score has been recorded!")

});



var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Bob's Flappy Bird listening at http://%s:%s", host, port);
});
