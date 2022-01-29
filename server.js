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
  password: 'Lemeilleur',
  port: 5432,
});
client.connect();
server.use(express.static('public'));
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
    //res.json(animes);
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
server.get("/list/:pseudo",function(req,res){
  var requete = 'SELECT nanime FROM AnimeList WHERE pseudo = \'' + req.params.pseudo + '\';';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
server.get("/profile/:pseudo",function(req,res){

});
server.get("/note_moy",function(req,res){
  var requete = 'SELECT nanime,AVG(note) FROM NOTES GROUP BY nanime';
  var r = client.query(requete,function (err,resp) {
		if(err){
			console.log(err);
			return;
		}
		var r = resp.rows;
		res.json(r);
	});
});
server.get("/genre/:id",function(req,res){
  var requete = 'SELECT * FROM Genre WHERE nanime = ' + req.params.id + ';';
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
server.use(function (req,res) {
	res.sendFile("erreur.html",{root:"public"});
});
server.listen(8080);
