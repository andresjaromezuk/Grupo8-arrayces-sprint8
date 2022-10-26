const express = require('express');
const router = express.Router();
const productApiController = require('../../controller/API/productApiController');

router.get('/', productApiController.list)
router.get('/lastProduct', productApiController.lastProduct)
router.get('/:id', productApiController.detail)
router.get('/search', productApiController.search)

module.exports = router;