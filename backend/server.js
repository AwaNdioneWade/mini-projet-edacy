const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connecté');
  app.listen(process.env.PORT, () =>
    console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`)
  );
}).catch((err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});
const productRoutes = require('./routes/product.routes');
app.use('/api/products', productRoutes);

