var express = require('express');
const axios = require('axios');

var router = express.Router();

router.get('/:sku', function(req, res) {

    axios.get('https://simple.ripley.cl/api/v2/products/' + req.params.sku)
        .then(response => {
            resProduct = response.data;

            var product = {
                sku: resProduct.partNumber,
                name: resProduct.name,
                short: resProduct.shortDescription,
                fullImage: resProduct.fullImage,
                images: resProduct.images,
                prices: resProduct.prices,
                longDescription: resProduct.longDescription,
                attributes: resProduct.attributes,
                warranties: resProduct.warranties
            }
            res.json(product);
        })
        .catch(error => {
            console.log(error);
        });

});

router.get('/', function(req, res) {
    const skuProducts = [
        '2000376979472p', 'MPM00008910464', '2000377670330p',
        'mpm00009409794', '2000373897021p', '2000361083795p',
        '2000361188544p', '2000375766370p', 'mpm00009267582',
        '2000376164809p', '2000379128242p', '2000379497140p',
        '2000377607749p', 'mpm00001116602', 'mpm00009582948',
        'mpm00000096350', 'mpm00010027550', 'mpm00008910486'
    ];

    let requestProducts = skuProducts.map(item => {
        return axios.get('https://simple.ripley.cl/api/v2/products/' + item)
    });

    axios.all(requestProducts).then(responseProducts => {
        let products = responseProducts.map(item => {
            let resProduct = item.data;

            let brandAttr = resProduct.attributes.find(attr => attr.name === 'Marca');

            let product = {
                sku: resProduct.partNumber,
                name: resProduct.name,
                short: resProduct.shortDescription,
                fullImage: resProduct.fullImage,
                prices: resProduct.prices,
                brand: brandAttr.value
            }
            return product;
        });
        res.json(products);
    });

});

module.exports = router;
