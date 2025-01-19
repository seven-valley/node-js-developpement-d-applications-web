# mise en place d'un authentification

- Mise en place d'un systeme de cryptage 
- pour stocker un hash du mot de passe
- le package de cryptage que l'on va utiliser s'appelle <code>bcrypt</code>
- non reversible le hash
- on verifie si les 2 hash corresponde à la mm chaine de caractere



## :one: Création du models Users

<code>user.js</code>

```js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: { type: String, required: true ,unique:true},
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
```

## :two: création des controllers
Nous allons installer bcrypt pour <code> sign up</code>
```
npm install bcrypt
```

Nous allons installer jwt json Web Token  pour <code> login</code>
```
npm install jsonwebtoken
```
<code>user.js</code>

```js
const jwt = require('jsonwebtoken');
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
           }
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                           { userId: user._id },
                           'RANDOM_TOKEN_SECRET',
                           { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};
```

# :tree: 
Creation du router
<code>user.js</code>

```js
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
module.exports = router;
```

# :four: 
Modifier <code>App.js</code>

```js
const userRoutes = require('./routes/user');
\\...
app.use('/api/user', userRoutes);
```