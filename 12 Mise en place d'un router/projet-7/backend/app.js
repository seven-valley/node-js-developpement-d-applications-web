const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

console.log('aa');
const filmRoutes = require('./routes/film');

app.use(express.json()); // body parser
mongoose.connect('mongodb+srv://augure:ldJKDUXNxvMsmwaZ@cluster0.ytemn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
console.log('abc');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//app.use(bodyParser.json());
app.use('/api/film', filmRoutes);

module.exports = app;