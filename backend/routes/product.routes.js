const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const productController = require('../controllers/productController');

// ➕ Créer un produit
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.status(201).json({ message: 'Produit créé avec succès', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

// ✅ Récupérer tous les produits
router.get('/', async (req, res) => {
  try {
    const produits = await Product.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json({ message: 'Produit mis à jour', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
});

router.delete('/:id', productController.deleteProduct);

module.exports = router;
