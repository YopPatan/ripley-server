var express = require('express');
var redis = require('redis');

var sessionService = require('../services/session');
var ripleyService = require('../services/ripley');

var router = express.Router();
var client = redis.createClient({host: '127.0.0.1', port: 6379, enable_offline_queue: false});

const CACHE_PRODUCT = 'ripley:product_';
const CACHE_CATALOG = 'ripley:products';
const CACHE_TIME = 1200;

client.on('error', (error) => {
    console.error('redis: ' + error);
});

router.get('/:sku', function(req, res) {
    if (req.headers.token === undefined) {
        res.status(400).json();
    }
    sessionService.isActive(req.headers.token).then(isActive => {
        if (isActive) {
            client.get(CACHE_PRODUCT + req.params.sku, (error, cache) => {
                if (cache) {
                    res.json(JSON.parse(cache));
                } else {
                    ripleyService.getProduct(req.params.sku).then(product => {
                        client.setex(CACHE_PRODUCT + req.params.sku, CACHE_TIME, product);
                        res.json(product);
                    });
                }
            });
        } else {
            res.status(403).json();
        }
    });
});

router.get('/', function(req, res) {
    if (req.headers.token === undefined) {
        res.status(400).json();
    }
    sessionService.isActive(req.headers.token).then(isActive => {
        if (isActive) {
            client.get(CACHE_CATALOG, (error, cache) => {
                if (cache) {
                    res.json(JSON.parse(cache));
                } else {
                    ripleyService.getProducts().then(products => {
                        client.setex(CACHE_CATALOG, CACHE_TIME, products);
                        res.json(products);
                    });
                }
            });
        } else {
            res.status(403).json();
        }
    });
});

module.exports = router;
