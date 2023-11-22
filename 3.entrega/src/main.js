import express from 'express';

import ProductManager from "./PM.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const productManager = new ProductManager('./productos.txt');

app.get('/', (req, res) => {
  res.send(`<h1 style="color:green";>Bienvenido a la app <h1>`);
});

app.get('/products', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const limit = parseInt(req.query.limit);
  
      if (!isNaN(limit) && limit > 0) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
      } else {
        res.json(products);
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

  app.get('/products/:pid', async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const productId = parseInt(req.params.pid);
  
      if (!isNaN(productId)) {
        const product = products.find(p => p.id === productId);
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      } else {
        res.status(400).json({ error: 'ID no valido' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

  
app.get('*', (req, res) => {
  res.send("Error 404");
});

app.listen(PORT, () => {
  console.log(`Servidor ON por el puerto: ${PORT}`);
});