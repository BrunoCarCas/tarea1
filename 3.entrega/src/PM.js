import { promises as fs } from 'fs'
export default class ProductManager{
    constructor(path){
    
    this.path=path
    this.products=[]
    }
/*
    getProducts(){
        return this.products
    }
    */
    async getProducts () {
        try{
            const productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
            console.log(productos)
        } catch(error){
            console.error('Error: ',error)
        }
    }
    /*
    getProductById(id){
        let product = this.products.find(prod => prod.id == id)
        if(product){  
            return product
        }
        return "Error"
    }
    */

   async getProductById(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prod = products.find(producto => producto.id === id)
        if (prod) {
            console.log(prod)
        } else {
            console.log("Producto no existe")
        }
    }


   /* addProducts(product){

        if (!product.title || !product.descripcion || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error("Error! los campos son obligatorios!");
            return;
        }

          //console.log(product.title);


        if(this.products.find(prod => prod.code == product.code)){
            return "El producto ya existe"
        }
        if(product.code != "" || product.stock >= 0){
            this.products.push(product)
        } else{
            return "No puedo cargar un producto vacio"
        }
    }*/
    async addProduct(product){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (products.find(producto => producto.id == product.id)) {
            return "Producto ya agregado"
        }
        products.push(product)
        await fs.writeFile(this.path, JSON.stringify(products))
    }
    async updateProduct(id,nombre){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(prod => prod.id === id)
    
        if (indice != -1) {
            products[indice].title = nombre
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log("Producto no encontrado")
        }
    }

    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.id != id)
        await fs.writeFile(this.path, JSON.stringify(prods))
    }
}
class Product {
    constructor(title,descripcion,price,thumbnail,code,stock){
        this.title=title
        this.descripcion=descripcion
        this.price=price
        this.code=code
        this.stock=stock
        this.id = Product.incrementarId()
    }
    static incrementarId(){
        if(this.idIncrement){
            this.idIncrement++
        } else{
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}
const producto1 = new Product("Pilsen 1L","Cerveza 100% uruguaya",250,"3",100)
const producto2 = new Product("Doritos 250gr","Snacks con sabor a queso",200,"4",50)


const productManager = new ProductManager('./productos.txt')



console.log(productManager.getProducts())
