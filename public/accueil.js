
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
			modif_profil : '/yourprofil/'
		},
		anime: {
			anime_courant : -1,
			nom_anime : '',
			notes : [],
		},
		profil : {
			profil_courant : "",
			liste : [],
			notes : ""
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
		}
	},

	mounted: function () {
		setInterval(() => {
			var d = this.dernier_import;
			$.get("/animes/",function (data) {
				ajout_anime(data);
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
			}
			this.dernier_import = new Date();
		},1000);
	}
});
function ajout_anime(data) {
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
		console.log("Cookie present");
		var i = cookie.lastIndexOf('=')+1;
		animetop.user.connecte = true;
		animetop.user.pseudo = cookie.substring(i);
		animetop.user.modif_profil += animetop.user.pseudo;
	}
};
get_name_client();
