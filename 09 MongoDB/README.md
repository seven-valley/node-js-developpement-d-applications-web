## Installez mongoose
<img src="../img/9/mongoose.webp" width="250">

```
npm i mongoose
```

Une fois l'installation terminée, importez <code>mongoose</code> dans votre fichier <code>app.js</code> 
```js
const mongoose = require('mongoose');
```

Juste en dessous de votre déclaration de constante app,ajoutez la ligne suivante.  
Veillez à remplacer l'adresse SRV par la vôtre, et la chaîne <PASSWORD> par votre mot de passe utilisateur MongoDB :

```js
mongoose.connect('mongodb+srv://augure:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
```

# les schemas de données
Utilisez mongoose c'est la possibilité de créer des schémas de données.  

Les schemas vont permettre de respecter modèle de données.
Cel apermet d'avoir un code plus robuste.

# Creation de notre premier schema
```
|-- projets-node
        |-- projet-6-mongo-db
            |-- frontend
            |-- backend
                |-- models
                    |-- Film.js
```
Création du répertoire <code>models</code> 
Création du fichier <code>Film.js</code>  
**Films.js**
```js
const mongoose = require('mongoose');

const filmSchema = mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  note: { type: Number, required: true },
});

module.exports = mongoose.model('Film', thingSchema);
```