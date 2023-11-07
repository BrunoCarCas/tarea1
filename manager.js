
class ProductManagement {
    constructor() {
      this.products = [];
      this.nextId = 1;
    }
  
    addProduct(name, price, description, code, stock) {
      if (!name || !price || !description ||  !code || !stock) {
        console.error('Todos los items son requeridos');
        return;
      }
  

      if (this.products.some(product => product.code === code)) {
        console.error(`El producto con el codigo ${code} ya existe `);
        return;
      }
  
      const newProduct = {
        id: this.nextId++,
        name,
        price,
        description,
        code,
        stock
      };
      this.products.push(newProduct);
      console.log(`Producto: ${name} registrado correctamente`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
      if (!product) {
        console.error('Producto no encontrado');
        return;
      }
      return product;
    }
  }
  

  const productManager = new ProductManagement();
  
  productManager.addProduct('Pilsen', 150, 'La cerveza de todos', 'C150', 50);
  productManager.addProduct('Doritos', 125, 'Snacks sabor queso', 'S200', 100);
  

  console.log(productManager.getProducts());
  

  console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(2));
  console.log(productManager.getProductById(3));
  
  module.exports = ProductManagement;
  