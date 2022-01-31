const express = require('express');
const server = new express();
const json = require('json');
const fs = require('fs');
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
var bodyparser = require('body-parser');
const {Client} = require('pg');
const client = new Client({
  user: 'lelouch',
  host: 'localhost',
  database: 'youranimelistdb',
  password: 'Lemeilleur',
  port: 5432,
});
client.connect();
server.use(express.static('public'));
server.use(cookieparser());
server.use(bodyparser.urlencoded({ extended: false }));
fs.readFile('bdd.sql', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  client.query(data,function (err1,re){
        if(err1){
                console.log(err1);
                return
        }});
});
server.get("/",function (req,res) {
	res.sendFile('accueil.html',{root:"public"});
});
server.get("/animes",function (req,res) {
    var d = req.query.date;
    var requete = 'SELECT * FROM Animes;';
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
server.get("/anime/:id",function(req,res,next){
  var requete = 'SELECT nanime FROM Animes WHERE nanime = ' + req.params.id + ';';
  var r = client.query(requete,function (err,resp) {
    if(err){
      console.log(err);
      return;
    }
    var r = resp.rows;
    if (resp.rows.length == 0)
		{
			next();
		}
		else {
      res.sendFile("anime.html",{root : "public"});
    }
  });
});
server.get("/list",function(req,res){
  var requete = 'SELECT nanime FROM AnimeList WHERE pseudo LIKE \'' + req.query.pseudo + '\';';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
server.get("/user/:pseudo",function(req,res,next){
  var requete = 'SELECT pseudo FROM Utilisateur WHERE pseudo = \'' + req.params.pseudo + '\';';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		if (r.length==0)
		{
			next();
		}
		else
		{
			res.sendFile('profil.html',{root: "public"});
		}
	});
});
server.get("/note_moy",function(req,res){
  var requete = 'SELECT nanime,ROUND(CAST(AVG(note) AS NUMERIC),2) FROM NOTES GROUP BY nanime';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
server.get("/genres",function (req,res) {
  var requete = 'SELECT * FROM Genre';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
server.get("/genre",function(req,res){
  var requete = 'SELECT * FROM Genre WHERE nanime = ' + req.query.id + ';';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
server.get("/home/:pseudo",function (req,res,next) {
  console.log(req.cookies);
  if (req.cookies.username !== req.params.pseudo){
    next();
  }
  else {
  var requete = 'SELECT * FROM Utilisateur WHERE pseudo LIKE \'' + req.params.pseudo + '\';';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		if (r.length==0)
		{
			next();
		}
		else
		{
			res.sendFile("accueil.html",{root:"public"});;
		}
	});
}
});
server.get("/utilisateur/:pseudo",function (req,res) {
  var requete = 'SELECT * FROM Utilisateur NATURAL JOIN AnimeList NATURAL JOIN Animes WHERE pseudo LIKE \'' + req.params.pseudo + '\';';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
//Demande de connexion
server.post("/connect",function (req,res) {
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
      res.cookie("username", req.body.pseudo);
			res.redirect("/home/" + req.body.pseudo);
		}
	});
});
server.get("/logout",function (req,res) {
  res.clearCookie("username");
  return res.redirect("/");
})
server.get("/notes",function(req,res){
  var requete = 'SELECT * FROM Notes WHERE nanime = ' + req.query.id + ';';
	var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
server.post("/ajout_liste/:pseudo/",function (req,res) {
  var id_anime = req.body.nanime;
  console.log(req.body.nanime);
  var requete = "INSERT INTO AnimeList(pseudo,nanime) VALUES (\'" + req.params.pseudo + "\', " + id_anime + ");";
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
  })
});
server.post("/retrait_liste/:pseudo/",function (req,res) {
  var id_anime = req.body.nanime;
  console.log(req.body.nanime);
  var requete = "DELETE FROM AnimeList WHERE pseudo LIKE \'" + req.params.pseudo + "\' AND nanime = " + id_anime + ";";
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
  })
});
server.get("/yourprofile/",function (req,res,next) {
  console.log(req.cookies.username);
  if(req.cookies.username == undefined)
  {
    next();
  }
  else
  res.sendFile("modif_profil.html",{root:"public"});
});
server.put("/modif_profil",function(req,res){
  var p = req.body;
  var requete = "UPDATE Utilisateur SET avatar ='" + p.avatar + "', description = '" + p.description + "';";
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
  });
});
server.get("/info_user",function (req,res) {
  var requete = 'SELECT description,avatar FROM Utilisateur WHERE pseudo LIKE \'' + req.query.pseudo + '\';';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
    res.json(resp.rows);
  });
});
server.use(function (req,res) {
	res.sendFile("erreur.html",{root:"public"});
});
server.listen(8080);
