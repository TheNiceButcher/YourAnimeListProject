
var animetop = new Vue({
	el: "#all",
	data:{
		animes: [],
		moyenne : [],
		genres : [],
		recherche : '',
		user : {
			connecte : false,
			pseudo : '',
			avatar : '',
			list : [],
			modif_profil : '/yourprofile',
			description : ""
		},
		anime: {
			anime_courant : -1,
			nom_anime : '',
			notes : [],
			anime_in_user_list: false,
			note_user : 'Non Noté'
		},
		profil : {
			profil_courant : "",
			liste : [],
			notes : [],
			description : ""
		},
		dernier_import : new Date("1970-11-25")
	},
	methods:{
		getmoyenne : function (id) {
			if (this.moyenne.length != 0)
			{
				for (var i in this.moyenne) {
					if (this.moyenne[i].nanime == id){
						return this.moyenne[i].round;
					}
				}
			}
			return "Aucune Note";
		},
		afficher : function (anime) {
			return anime.nom.includes(this.recherche);
		},
		lien : function (id) {
			return "/anime/" + id;
		},
		getgenre : function(id){
			var result = '';
			for (var i in this.genres) {
				if (this.genres[i].nanime == id){
					result += this.genres[i].genre + ",";
				}
			}
			return result;
		},
		getnameanime : function () {
			for (var i in this.animes) {
				if (this.animes[i].nanime === this.anime_courant) {
					return this.animes[i].nom;
				}
			}
		},
		est_dans_liste_user : function (nanime) {
			for(var i = 0; i < this.user.list.length; i++)
			{
				if(this.user.list[i].nanime == nanime)
					return true;
			}
			return false;
		},
		retrait_liste : function (nanime) {
			$.post("/retrait_liste/" + this.user.pseudo,{nanime : nanime},function(data){

			});
		},
		ajout_list : function(nanime) {
			$.post("/ajout_liste/" + this.user.pseudo,{nanime : nanime},function(data){

			});
		},
		lien_profil : function(pseudo){
			return "/user/" + pseudo;
		},
		change_note : function(idanime,notes){
			var r = "pseudo=" + idanime + "&avatar=" + this.user.avatar + "&description=" + this.user.description;
			$.ajax({
			  url: '/modif_note',
			  type: 'PUT',
			  data: r,
			  success: function(data) {
					alert("Modifications enregistrées");
			  }
			});
		},
		retour_sauver : function () {
			var r = "pseudo=" + this.user.pseudo + "&avatar=" + this.user.avatar + "&description=" + this.user.description;
			$.ajax({
			  url: '/modif_profil',
			  type: 'PUT',
			  data: r,
			  success: function(data) {
					alert("Modifications enregistrées");
			  }
			});
		}
	},

	mounted: function () {
		setInterval(() => {
			var d = this.dernier_import;
			$.get("/animes/",function (data) {
				animes(data);
			});
			$.get("/note_moy",function (data) {
				moyenne(data);
			});
			$.get("/genres",function(data){
				genre(data);
			});
			if (this.anime.anime_courant != -1)
			{
				$.get("/notes",{id :this.anime.anime_courant},function(data){
					notes(data);
				});
			};
			if(this.user.connecte){
				$.get("/list",{pseudo : this.user.pseudo},function(data){
					listeanime(data);
				});
			};
			this.dernier_import = new Date();
		},1000);
	}
});
function animes(data) {
	animetop.animes = data;
	if (animetop.anime.anime_courant != -1)
	{
		for (var i in animetop.animes)
		{
			if (animetop.animes[i].nanime == animetop.anime.anime_courant)
			{
				animetop.anime.nom_anime = animetop.animes[i].nom.slice();
				return
			}
		}
	}
};
function moyenne(data) {
  animetop.moyenne = data;
};
function genre(data) {
	animetop.genres = data;
}
function notes(data){
	animetop.anime.notes = data;
	if (animetop.user.connecte)
	{
		for (var i in data){
			if(data[i].pseudo == animetop.user.pseudo)
			{
				animetop.anime.note_user = data[i].note;
			}
		}
	}
}
function listeanime(data){
	animetop.user.list = data;
	for (var i in data){
		if (data[i].nanime == animetop.anime.anime_courant)
		{
			animetop.user.anime_in_user_list = true;
			return
		}
	}
	animetop.user.anime_in_user_list = false;
}

$(document).ready(function () {
	var url = window.location.href;
	if(url.includes("?error"))
	{
		$("#connexion").append("<div>Connexion impossible</div>");

	}
});
function get_name_client() {
	var url = window.location.href;
	const cookie = document.cookie;
	if(cookie != ""){
		var i = cookie.lastIndexOf('=')+1;
		animetop.user.connecte = true;
		animetop.user.pseudo = cookie.substring(i);
		$.get("/info_user",{pseudo : animetop.user.pseudo},function(data){
				mis_a_jouruser(data);
			});
		function mis_a_jouruser(data){
			console.log(data[0].description);
			animetop.user.description = data[0].description;
			animetop.user.avatar = data[0].avatar;
		}
		}
	};
get_name_client();
if(animetop.user.connete){
	$.get("/info_user",{pseudo : animetop.user.pseudo},function(data){
		mis_a_jouruser(data);
	});
	function mis_a_jouruser(data){
		console.log(data[0].description);
		animetop.user.description = data[0].description;
		animetop.user.avatar = data[0].avatar;
	}
}
