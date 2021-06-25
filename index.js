var express = require('express');
var app = express();
var fs = require("fs");
var port = process.env.PORT || 3000;

app.get('/rev', function (req, res) {
   var text='<html>'+'<head></head><body>'+54
   '</body></html>'
   res.send(text);
})

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})