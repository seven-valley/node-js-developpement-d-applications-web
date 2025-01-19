const express = require('express');
const router = express.Router();
const Film = require('../models/Film.js');
router.post('/', (req, res, next) => {
    // delete req.body._id;
    console.log(req.body);
     const film = new Film({
       ...req.body
     });
     film.save()
       .then(() => res.status(201).json({ message: 'Film saved !'}))
       .catch(error => res.status(400).json({ error }));
   });
 
   router.get('/', (req, res, next) => {
     Film.find()
       .then(films => res.status(200).json(films))
       .catch(error => res.status(400).json({ error }));
   });
 
   router.delete('/:id', (req, res, next) => {
     Film.deleteOne({ _id: req.params.id })
       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
       .catch(error => res.status(400).json({ error }));
   });

   router.put('/:id', (req, res, next) => {
     Film.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
       .catch(error => res.status(400).json({ error }));
   }); 

   module.exports = router;