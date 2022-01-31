# YourAnimeListProject
Projet pour le compte de l'UE Programmation Distribuée

## Le site YourAnimeList

Le but du site est de répertorier des animes. On peut y créer des listes et attribuer des notes, tout cela visible par tout le monde.


## Fonctionnement du site
### Installation
Le site tourne sur Kubernetes. Pour le déployer, on peut utiliser `minikube`.
On lance alors ce logiciel avec `minikube start`.
Puis, il suffit d'exécuter le script `kuber.sh`, qui permet de créer les différents services Kubernetes.
A la fin, nous avons alors un service NodePort `yal-webapp` qui est le service Web attendu.
Si on utilise `minikube`, on recherche l'adresse du service avec `minikube service`
Pour désinstaller, il faut effectuer la commande `./delete_kuber.sh`.

### Utilisateurs et données du site
Nous avons 2 utilisateurs enregistrées sur YourAnimeList :
- Kira, avec comme mot de passe ryuk,
- Sasuke, mot de passe VILLAGE.

Il y a 2 animes (Code Geass et Death Note).
Kira a dans sa liste Code Geass et l'a noté 5/5.

### Structure du code
Le projet est composé ainsi:
- Les fichiers de configuration .yaml servant au déploiement Kubernetes,
- `server.js` qui gère le back-end du site,
- `package*.json` -> gère les dépendances de NodeJS
- `Dockerfile` : avec la commande `docker build -t nom .` crée un conteneur avec le serveur Web seul (sans la base de données),
- `bdd.sql` permet l'initialisation de la base de données,
- `/public` est un répertoire contenant tous les fichiers nécessaires au serveur Nodejs avec :
    - `accueil.{js,html}` -> gère la page d'accueil et définit les différents champs de Vuejs
    - `anime.css` -> gestion CSS
    - `anime.{js,html}` -> gère les pages des animes
    - `erreur.html` -> gère les erreurs de redirections
    - `profil.{js,html}` -> gère les pages des profils utilisateurs
    - `modif_profil.html` -> gère la modification du profil (avatar,description)
