var axios = require('axios');
var moment = require('moment');

const API_RIPLEY_PATH = 'https://simple.ripley.cl/api/v2/products';
const BRAND_ATTR_NAME = 'Marca';

const ripley = {
    getProduct: (sku) => {
        return axios.get(API_RIPLEY_PATH + '/' + sku).then(res => {
            if ((Math.random() * 100) < 15) {
                throw new Error('simulator');
            }
            return ripley.parseProduct(res.data);
        }).catch(error => {
            console.error('<' + moment().format() + '> ' + error);
            if (error.message === 'simulator') {
                return ripley.getProduct(sku);
            }
            return {};
        });
    },

    getProducts: () => {
        const skuProducts = [
            '2000376979472p', 'MPM00008910464', '2000378503248p',
            'mpm00009409794', '2000373897021p', '2000361083795p',
            '2000379273102p', '2000375766370p', 'mpm00009267582',
            '2000376164809p', '2000379128242p', '2000379497140p',
            '2000377607749p', 'mpm00001116602', 'mpm00009582948',
            'mpm00000096350', 'mpm00010027550', 'mpm00008910486'
        ];

        return axios.get(API_RIPLEY_PATH + '?partNumbers=' + skuProducts.join(',')).then(responseProducts => {
            if ((Math.random() * 100) < 15) {
                throw new Error('simulator');
            }
            //console.log('responseProducts', responseProducts.data);
            let products = responseProducts.data.map(item => {
                return ripley.parseProduct(item);
            });
            return products;
        }).catch(error => {
            console.error('<' + moment().format() + '> ' + error);
            if (error.message === 'simulator') {
                return ripley.getProducts();
            }
            return {};
        });
    },

    parseProduct: (originProduct) => {
        let brandAttr = originProduct.attributes.find(attr => attr.name === BRAND_ATTR_NAME);

        var finalProduct = {
            sku: originProduct.partNumber,
            brand: brandAttr.value,
            name: originProduct.name,
            short: originProduct.shortDescription,
            fullImage: originProduct.fullImage,
            images: originProduct.images,
            prices: originProduct.prices,
            longDescription: originProduct.longDescription,
            attributes: originProduct.attributes,
            warranties: originProduct.warranties
        }

        return finalProduct;
    }
};

module.exports = ripley;
