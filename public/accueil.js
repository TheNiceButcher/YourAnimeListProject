/*Vue.component('anime',{
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
		},
		genre : function (){
			return "Une dinguerie";
		}
	},
	template:
	"<div v-if=to_print()> <a :href=\"lien\">{{anime.nom}}</a>{{moyenne_anime}} {{genre}}<br> </div>"
});*/
var animetop = new Vue({
	el: "#all",
	data:{
		animes: [],
		moyenne : [],
		recherche : '',
		user : {
			connecte : false,
			pseudo : ''
		},
		dernier_import : new Date("1970-11-25")
	},
	methods:{
		getmoyenne : function (id) {
			if (this.moyenne.length != 0)
			{
				for (var i in this.moyenne) {
					if (this.moyenne[i].nanime == id){
						return this.moyenne[i].avg;
					}
				}
			}
			return "Aucune Note";
		},
		afficher : function (anime) {
			return anime.nom.includes(this.recherche);
		}
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
