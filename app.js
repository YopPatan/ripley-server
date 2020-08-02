var express = require('express');
var cors = require('cors')

var productRouter = require('./routes/product');

var app = express();
app.use(cors());
app.use(express.json());

app.use('/product', productRouter);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
