Vue.component('anime',{
	props:['anime','moyenne'],
	methods: {
			to_print : function () {

				return true;
			},
		},
		computed : {
			moyenne_anime : function () {
				if (this.moyenne.length != 0)
				{
					for (var i in this.moyenne) {
						if (this.moyenne[i].nanime == this.anime.nanime){
							return this.moyenne[i].avg;
						}
					}
				}
				return "Aucune Note";
		},
		lien : function () {
			return "/anime/" + this.anime.nanime;
		}
	},
	template:
	"<div v-if=to_print() class = 'publi'> <a :href=\"lien\">{{anime.nom}}</a> {{moyenne_anime}}<br> </div>"
});
var animetop = new Vue({
	el: "#all",
	data:{
		animes: [],
		moyenne : [],
		dernier_import : new Date("1970-11-25")
	},
	//Toutes les 500 ms, on voit s'il y a des nouveaux messages
	mounted: function () {
		setInterval(() => {
			var d = this.dernier_import;
			$.get("/animes/",function (data) {
				ajout_anime(data);
			});
			$.get("/note_moy",function (data) {
				moyenne(data);
			});
			this.dernier_import = new Date();
		},500);
	}
});
function ajout_anime(data) {
	animetop.animes = data;
	//animetop.animes.push({name : "HEllo",nanime:2});
};
function moyenne(data) {
  animetop.moyenne = data;
}
$(document).ready(function () {
	var url = window.location.href;
	if(url.includes("?error"))
	{
		$("#connexion").append("<div>Connexion impossible</div>");

	}
});
