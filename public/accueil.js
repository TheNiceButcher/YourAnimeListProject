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
		genres : [],
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
			$.get("/genres",function(data){
				genre(data);
			})
			this.dernier_import = new Date();
		},1000);
	}
});
function ajout_anime(data) {
	animetop.animes = data;
};
function moyenne(data) {
  animetop.moyenne = data;
};
function genre(data) {
	animetop.genres = data;
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
	if(url.includes('/home/')){
		var i = url.lastIndexOf('/')+1;
		animetop.user.connected = true;
		animetop.user.pseudo = url.substring(i);
		/*twatter.client.modif_profil += twatter.client.pseudo;*/
	}
};
get_name_client();
