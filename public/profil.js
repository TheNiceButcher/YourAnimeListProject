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
  console.log(data);
  var description = data[0].description;
  animetop.profil.description = description;
  animetop.profil.avatar = data[0].avatar;
  var list = [];
  for (var i in data)
  {
    list.push({nanime : data[i].nanime,nom : data[i].nom});
  }
  animetop.profil.liste = list;

}
