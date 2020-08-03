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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});

module.exports = app;
