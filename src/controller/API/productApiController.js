const {Product, Image, Type, Size, Category, Fee} = require('../../database/models')
const { Op } = require("sequelize");

const productApiController = { 

	list: async  (req, res) => {

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        let meta={status:'success', length:0}

        try {
            let products = await Product.findAndCountAll({include})
            let plantas = await Product.findAndCountAll({where: {typeId: 1}, include})
            let macetas = await Product.findAndCountAll({where: {typeId: 2}, include})
            let cuidados = await Product.findAndCountAll({where: {typeId: 3}, include})
            
            meta.length = products.count
            meta.plantasLength = plantas.count
            meta.macetasLength = macetas.count
            meta.cuidadosLength = cuidados.count
            /* let data = {products: products.rows} */

            
            let data = []
            
            products.rows.forEach(product =>{
                 data.push({
                    product,
                    url: `http://localhost:3000/api/products/${product.id}`
                })
            })
            
            
            res.status(200).json({meta, data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
		 
    }, 
    
    detail: async  (req, res) => {

        const  include = ['Type', 'Size', 'Category', 'Images', 'Fee']

        let id = req.params.id

        try {
            let product = await Product.findByPk(id, {include})

            /* let imgs = product.Images.forEach(image =>{
                `http://localhost:3000/images/${image.name}`
            })
            console.log(imgs) */
            data = {
                product,
                //ARRAY NI IDEA
                imgUrl : [`http://localhost:3000/images/${product.Images[0].name}`, `http://localhost:3000/images/${product.Images[1].name}`]
            }
            res.status(200).json({data}) 
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
		 
    }
}

module.exports = productApiController