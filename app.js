var express = require('express');

var productRouter = require('./routes/product');
var cors = require('cors')
var app = express();


app.use(cors())

/*app.get('/', function (req, res) {
    res.send('Hello World!');
});*/

app.use('/', productRouter);

//module.exports = app;


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
