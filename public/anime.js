function getnanime() {
  var url = window.location.href;
  var i = url.lastIndexOf('anime/')+6;
  return url.substring(i);
};
const nanime = getnanime();
animetop.anime.anime_courant = nanime;
$.get("/genre",{id : nanime},
  function (data) {
  	get_genre_anime(data);
});
function get_genre_anime(data) {
  for (var i in data) {
      $("#liste_genre").append("<div>" + data[i].genre + "</div>");
}
};
