# Module 12 - Mise en place d'un router et des controllers





## :one: Mise en place du routers
Création du répertoire <code>routes</code>  
Les routes son définies dans : <code>films.js</code>
```js
const express = require("express");
const router = express.Router();
const filmCtrl = require("../controllers/film");

router.post("/", filmCtrl.createFilm);
router.get("/", filmCtrl.getFilm);
router.delete("/:id", filmCtrl.deleteFilm);
router.put("/:id", filmCtrl.modifyFilm);

module.exports = router;
```

## :two: Mise à jours de app.js
```js
const filmRoutes = require('./routes/film');
// ...
//----------------------------------------------
app.use(express.json()); // body parser
//----------------------------------------------
// ...

//-----------------------------------------
app.use('/api/film', filmRoutes);
//-----------------------------------------
```
---------------------
```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// on importes les routes
const filmRoutes = require('./routes/film');
//----------------------------------------------
app.use(express.json()); // body parser
//----------------------------------------------

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

//-----------------------------------------
app.use('/api/film', filmRoutes);
//-----------------------------------------

module.exports = app;
```

## :three: Mise en place des controllers
Création du répertoire <code>controllers</code>    
<code>film.js</code>

```js
const express = require('express');

const Film = require('../models/Film.js');
exports.createFilm = (req, res, next) => {
    // delete req.body._id;
    console.log(req.body);
     const film = new Film({
       ...req.body
     });
     film.save()
       .then(() => res.status(201).json({ message: 'Film saved !'}))
       .catch(error => res.status(400).json({ error }));
   }

  exports.getFilm =   (req, res, next) => {
    Film.find()
      .then(films => res.status(200).json(films))
      .catch(error => res.status(400).json({ error }));
  }

  exports.deleteFilm =  (req, res, next) => {
    Film.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  }

  exports.modifyFilm =  (req, res, next) => {
    Film.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }
  ```

