function getpseudo() {
  var url = window.location.href;
  var i = url.lastIndexOf('user/')+5;
  return url.substring(i);
};
animetop.profil.profil_courant = getpseudo();
$.get("/utilisateur/" + animetop.profil.profil_courant,function (data) {
    infos_user(data);
});
function infos_user(data) {
  var description = data[0].description;
  $("description").html("<p>" + description + "</p>");
}
