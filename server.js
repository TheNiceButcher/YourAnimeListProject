const express = require('express');
const server = new express();
const json = require('json');
const fs = require('fs');
var bodyparser = require('body-parser');
const {Client} = require('pg');
const client = new Client({
  user: 'lelouch',
  host: 'postgres',
  database: 'youranimelistdb',
  password: 'pwd',
  port: 5432,
});
client.connect();
/*var animes = [{name: 'Code Geass', nanime: 1}];
var desc = [{nanime: 1, desc: "Histoire d'un jeune homme fort beau gosse"}];
var user = [{username: 'harris', nuser: 1}];*/
server.use(express.static('public'));
server.use(bodyparser.urlencoded({ extended: false }));
/*fs.readFile('bdd.sql', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  client.query(data,function (err1,re){
        if(err1){
                console.log(err1);
                return
        }});
});*/

server.get("/",function (req,res) {
	res.sendFile('accueil.html',{root:"public"});
});
server.get("/animes",function (req,res) {
    //res.json(animes);
    var d = req.query.date;
        var requete = 'SELECT * FROM Animes';
        var r = client.query(requete,function(err,resp){
                if(err){
                        console.log(err);
                        return;
                }
                var r = resp.rows;
                res.json(r);
        });

});
server.post("/ajout_anime",function(req,res){
    console.log("Ajout anime" + req.body.name);
});
server.get("/anime/:id",function(req,res){
    for (var i in desc) {
      var anime = desc[i];
      if (anime.nanime == req.params.id)
      {
        res.json(anime);
        return
      }
    }
    res.send("Error");
});
//Demande de connexion
/*server.post("/connect",function (req,res) {
	console.log("Connexion de " + req.body.pseudo);
	var requete = 'SELECT * FROM Utilisateur WHERE pseudo LIKE \'' + req.body.pseudo + '\' AND mot_de_passe LIKE \'' + req.body.pwd + '\';';
	var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		if (r.length==0)
		{
			res.redirect("/?error=" + req.body.pseudo);
		}
		else
		{
			res.redirect("/home/" + req.body.pseudo);
		}
	});
});*/
//Renvoie les messages
/*server.get("/msg", function (req,res) {
	var d = req.query.date;
	var requete = 'SELECT * FROM Message WHERE d_msg > \'' + req.query.date + '\' ORDER BY nmessage DESC;';
	var r = client.query(requete,function(err,resp){
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});*/
//Renvoie les abonnements
/*server.get("/abos",function (req,res) {
	var d = req.query.pseudo;
	var requete = 'SELECT abonnement AS pseudo FROM Abonnements WHERE abonne LIKE \'' + d + '\';';
	var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		var t = [];
		for (var i in r){
			t.push(r[i].pseudo);
		}
		res.send(t);
	});
});*/
//Publie le message
/*server.post("/publi",function (req,res) {
	const pseudo = req.body.pseudo;
	const msg = req.body.message;
	var requete = 'INSERT INTO Message(pseudo,contenu,d_msg) VALUES (\'' + pseudo + '\',\'' + msg + '\',NOW());'
	client.query(requete,function (err,resp){
		if(err){
			console.log(err);
			return;
		}
	});
});*/
//Renvoie les liens
/*server.get("/avatars",function (req,res) {
	var requete = 'SELECT * FROM Utilisateur;';
	client.query(requete,function (err,resp){
		if(err){
			console.log(err);
			return;
		}
		res.json(resp.rows);
	});
});
server.get("/info_client",function (req,res) {
	var requete = 'SELECT couleur,avatar FROM Utilisateur WHERE pseudo LIKE \'' + req.query.pseudo + '\';';
	client.query(requete,function (err,resp){
		if(err){
			console.log(err);
			return;
		}
		res.json(resp.rows);
	});
});
server.get("/like",function (req,res) {
	var requete = 'SELECT nmessage,COUNT(*) AS NLike FROM LIKES WHERE reaction = 1 GROUP BY nmessage;'
	client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		res.json(resp.rows);
	});
});
server.get("/dislike",function (req,res) {
	var requete = 'SELECT nmessage,COUNT(*) AS NDislike FROM LIKES WHERE reaction = -1 GROUP BY nmessage;'
	client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		res.json(resp.rows);
	});
});
server.get("/react_client",function (req,res) {
	var pseudo = req.query.pseudo;
	var requete = "SELECT nmessage,reaction FROM Likes WHERE pseudo LIKE '" + pseudo + "';";
	client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		res.json(resp.rows);
	});
});
server.get("/abonne",function (req,res) {
	var abonne = req.query.abonne;
	var abonnement = req.query.abonnement;
	var requete = "INSERT INTO Abonnements(abonne,abonnement) VALUES ('" + abonne + "','" +  abonnement + "');";
	client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
	});

});
server.get("/desabonne",function (req,res) {
	var abonne = req.query.abonne;
	var abonnement = req.query.abonnement;
	var requete = "DELETE FROM Abonnements WHERE abonne LIKE '" + abonne + "' AND abonnement LIKE '" +  abonnement + "';";
	client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
	});
});
server.get("/react",function (req,res) {
	var pseudo = req.query.pseudo;
	var nmess = req.query.nmessage;
	var reaction = req.query.reaction;
	var requete = "DELETE FROM LIKES WHERE pseudo LIKE '" + pseudo + "' AND nmessage = " + nmess;
	requete += ";INSERT INTO Likes(nmessage,pseudo,reaction) VALUES (" + nmess + ",'" + pseudo + "'," + reaction +  ");";
	client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		res.json(resp.rows);
	});
});
server.get("/home/:pseudo",function (req,res,next) {
	var requete = 'SELECT * FROM Utilisateur WHERE pseudo LIKE \'' + req.params.pseudo + '\';';
	client.query(requete,function (err,resp){
		if(err){
			console.log(err);
			return;
		}
		if (resp.rows.length == 0)
		{
			next();
		}
		else res.sendFile("twatter.html",{root : "public"});
	});
});
server.get("/edit_profil/:pseudo",function (req,res,next) {
	var requete = 'SELECT * FROM Utilisateur WHERE pseudo LIKE \'' + req.params.pseudo + '\';';
	client.query(requete,function (err,resp){
		if(err){
			console.log(err);
			return;
		}
		if (resp.rows.length == 0)
		{
			next();
		}
		else res.sendFile("modif_profil.html",{root : "public"});
	});
});
server.get("/modif_profil/",function (req,res,next) {
	var pseudo = req.query.pseudo;
	var avatar = req.query.avatar;
	var couleur = req.query.couleur;
	var requete = 'UPDATE Utilisateur SET avatar = \'' + avatar + '\', couleur = \'' + couleur + '\' WHERE pseudo LIKE \'' + pseudo + '\';';
	client.query(requete,function (err,resp){
		if(err){
			console.log(err);
			return;
		}
	});
});
server.get("/rea",function (req,res,next) {
	var pseudo = req.query.pseudo;
	var nmsg = req.query.nmsg;
	console.log(req.query);
	var requete = 'SELECT reaction FROM Likes WHERE pseudo Like \'' + pseudo + '\' AND nmessage = ' + nmsg + ';';
	console.log(requete);
	client.query(requete,function (err,resp){
		if(err){
			console.log(err);
			return;
		}
		if(resp.rows.length == 0)
		{
			res.send([0]);
		}
		else
			res.send([resp.rows[0].reaction]);
	});
});
server.use(function (req,res) {
	res.sendFile("erreur.html",{root:"public"});
});*/
server.listen(8080);
