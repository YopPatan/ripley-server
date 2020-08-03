var express = require('express');
var cors = require('cors')

var authRouter = require('./routes/auth');
var productRouter = require('./routes/product');

var app = express();
app.use(cors());
app.use(express.json());

app.use("/", express.static(__dirname + '/client/dist/ripley-site'));
app.use("/login", express.static(__dirname + '/client/dist/ripley-site'));

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);

app.listen(8080, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
