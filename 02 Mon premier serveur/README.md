# 02 - Mon premier serveur
```
|-- projets-node
        |-- projet-1
            |-- frontend
            |-- backend
```
##  Initialiser le projet
Dans le dossier **back-end**  
Je vais donc naviguez dans le dossier back-end
```
cd back-end
```
Je vais initialiser un nouveau projet node  
```
npm init
```
La seul chose que l'on vas changer
c'est  le entry point en **server.js**  
  
On a bien un fichier **package.json**
qui contiendra des informations sur tous les packages et
tous les outils que l'on va intégrer à notre projet node

## Installez les packages depuis package.json
```
npm i
```

```
npm install
```
pensez canard !  
## Préparer son porjet pour Github avec Git
```
git init
```
## What is the role of the package-lock.json?
It stores an exact, versioned dependency tree rather than using starred versioning like package.json

## le fichier .gitignore
création du fichier **.gitignore**
on viens préciser de ne pas uploader le répertoires
<code>./node_modules/</code>
car il peut être reconstruit avec <code>npm install</code>
  
constenu du fichier .gitignore :
```
node_modules
```

## Mon premier serveur
objectif :
- Ecouter des requêtes HTTP
- Réponrde au requêtes HTTP

Nous allons créer le fichier <code>serveur.js</code>
```js
// Importez le package HTTP natif de Node
const http = require('http');
// A chaque l'on va envoyer une requete
// cette fonction est appelle
const server = http.createServer((req, res) => {
    res.end('bonjour je suis le serveur !');
});
// le serveur doit écouter attendre les requete envoyer
// sur le port 3000
server.listen(process.env.PORT || 3000);
```
1 - **Importez** le package **HTTP** natif de Node et l'utilisez pour créer un serveur, en passant une fonction qui sera exécutée à chaque appel effectué vers ce serveur.

 2 - <code>createServer</code>
 Cette fonction reçoit les objets <code>request</code> et <code>response</code> en tant qu'arguments. 

3 - <code>end</code> 
Nous utilisont la méthode <code>end</code> de la réponse pour renvoyer une réponse de type string à l'appelant.

Enfin je lance le serveur
```
node server
```

## Installez nodemon
![nodedemon](../img/nodemon.webp)
https://www.npmjs.com/package/nodemon
Pour évitez d'arrêter et relancer le serveur,  
dès que l'on fait une modification
Nous allons utilser **nodemon**
```
npm install -g nodemon
```
**OU**
```
npm i -g nodemon
```
Maintenat au lieu d'utiliser <code>node server</code> pour démarrer votre serveur, vous pouvez utiliser <code>nodemon server</code>

```
nodemon server
```