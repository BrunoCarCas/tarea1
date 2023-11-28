import{Router} from "express";
import {ProductManagerFile} from "../managers/ProductManagerFiles.js";


const path = "products.jsnon";
const router = Router();
const productManagerFile = new ProductManagerFile(path);

router.get(`/`, async (req,res) => {
    const products = await productManagerFile.getProducts();
    res.send({
        status:"succes",
        productos: products
    })
    
})
router.get(`/:pid`, async (req,res) => {
    res.send({
        status:"succes",
        msg:"ruta getid products"
    })
    
})
router.post(`/`, async (req,res) => {

    const product = req.body;
    const products = await productManagerFile.createProduct(product);
    
    res.send({
        status:"succes",
        msg:"producto creado ",
        productos: products
    })
})
router.put(`/:pid`, async (req,res)=>{
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:`ruta put products ${pid}`
    })
})
router.delete(`/:pid`, async (req,res) => {
    const pid = req.params.pid;

    res.send({
        status:"succes",
        msg:`ruta delete products ${pid}`
    })
    
})

export{router as productRouter}