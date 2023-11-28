import{Router} from "express";
import {CartManagerFiles} from "../managers/CartManagerFiles.js";


const path = "carts.jsnon";
const router = Router();
const cartManagerFiles = new CartManagerFiles(path);

router.get(`/`, async (req,res) => {
    const carts = await cartManagerFiles.getCarts();
    res.send({
        status:"succes",
        carritos: carts
    })
})
router.get(`/:cid`, async (req,res) => {
    const cid = req.params.cid;
    res.send({
        status:"succes",
        msg:"ruta getid cart"
    })
    
})
router.post(`/:cid/product/:pid`, async (req,res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    res.send({
        status:"succes",
        msg:"ruta post cart cart"
    })
})
router.post(`/`, async (req,res) => {
    res.send({
        status:"succes",
        msg:`ruta post agrego al cart cart: pid: ${pid} cid:${cid}`
    })
})
router.put(`/:cid`, async (req,res)=>{
    const cid = req.params.cid;
    res.send({
        status:"succes",
        msg:`ruta put cart ${pid}`
    })
})
router.delete(`/:cid`, async (req,res) => {
    const cid = req.params.cid;

    res.send({
        status:"succes",
        msg:`ruta delete del cart products ${cid}`
    })
    
})

export{router as cartRouter}