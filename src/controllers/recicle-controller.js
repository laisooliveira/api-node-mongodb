const recicleModel = require('../models/recicle');
const productModel = require('../models/product');


const adicionarProdutos = async (req, res, next) => {
    try{
        const {products} = req.body; 
        console.log(req.userId);
        const recicle = await recicleModel.create({user: req.userId});

        await Promise.all(products.map(async product => {
            const prod = new productModel({...product, recicle: recicle._id});

            await prod.save();
            recicle.products.push(prod);       
        }));
        await recicle.save();
        return res.send({recicle});
    }
    catch(err){
        console.log(err);
        return res.status(400).send({ error: 'Error ao cadastrar produtos no carrinho' });
    }
}


module.exports ={
  adicionarProdutos
}