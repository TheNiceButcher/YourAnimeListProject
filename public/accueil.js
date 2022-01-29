Vue.component('anime',{
	props:['anime','genre'],
	methods: {
		to_print : function () {

			return true;
		},
		moyenne : function () {
			return 0;
		}
	},
	template:
	"<div v-if=to_print() class = 'publi'> {{anime.nom}} {{moyenne()}}<br> </div>"
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
				ajout_anime(data)
			});
			this.dernier_import = new Date();
		},500);
	}
});
function ajout_anime(data) {
	animetop.animes = data;
	//animetop.animes.push({name : "HEllo",nanime:2});
};
$(document).ready(function () {
	var url = window.location.href;
	if(url.includes("?error"))
	{
		$("#connexion").append("<div>Connexion impossible</div>");

	}
});
