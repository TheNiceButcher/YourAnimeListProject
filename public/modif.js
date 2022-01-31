
$("input[type='color']").change(function () {
	$(".jumbotron").css({"background-color":$(this).val()});
	animetop.user.couleur = $(this).val();
});
$("#color-defaut").click(function () {
	$("input[type='color']").val("#E9ECEF");
	animetop.user.couleur = "#E9ECEF";
	$(".jumbotron").css({"background-color":"#E9ECEF"});
});
$("#home_client").attr("href","/home/" + animetop.user.pseudo);
$("#home_client").attr("value",animetop.user.couleur);
