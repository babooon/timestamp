var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
    
    var unix, natural;
    var input = decodeURI(req.url).substring(1);
    
    if (input == ""){
        res.end("Please pass a string that contains either a unix timestamp or a natural language date!");
    }
    
    if (!isNaN(parseInt(input)))
        var date = new Date(parseInt(input)*1000);
    else
        var date = new Date(input);

    
    if (isNaN(date.valueOf())){
        natural = null;
        unix = date.valueOf();
    }else{
        natural = date.toDateString();
        unix = date.valueOf()/1000;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    res.end(JSON.stringify({ 
        unix: unix,
        natural: natural
    }));
});

server.listen(8080);