/*
@title - Mario Bros
@author - Thibault
@date - 13/06/2016
*/

$(function(){
	// variables
	var moveRightB = true;
	var moveLeftB = true;
	var jumpB = true;
	var score = -1;
	var jumpSound = $("audio")[0];
	var coinSound = $("audio")[1];
	//incrémentation et affichage du score
	function moneyScore(){
		score++;
		$(".score").html(score);
	}
	moneyScore();
	//deplacement à droite
	function moveRight(){
		$(".marioMoveR").removeClass("marioMoveR").addClass("mario");
		$(".mario").animate({left: "+=5"}, 10);
		$(".mario").removeClass("mario").addClass("marioMoveR");
		moveRightB  = false;
	};
	//déplacement à gauche
	function moveLeft(){
		$(".marioMoveL").removeClass("marioMoveL").addClass("mario");
		$(".mario").animate({left: "-=5"}, 10);
		$(".mario").removeClass("mario").addClass("marioMoveL");
		moveLeftB  = false;
	};
	//mario arrête de courrir
	function stopRunningR(){
		if(!moveRightB){
			$(".marioMoveR").removeClass("marioMoveR").addClass("mario");
			moveRightB = true;
		}	
	};
	function stopRunningL(){
		if(!moveLeftB){
			$(".marioMoveL").removeClass("marioMoveL").addClass("mario");
			moveLeftB = true;
		}	
	};
	setInterval(stopRunningL, 400);
	setInterval(stopRunningR, 400);
	//saut
	function jump(){
		jumpSound.play();
		jumpB = false;
		//redescente
		function backDown(){
			$(".marioJump").animate({top: "+=100"}, 360, "swing", stopJump);
		}
		function stopJump(){
			$(".marioJump").removeClass("marioJump").addClass("mario");
		}

		$(".mario").removeClass("mario").addClass("marioJump");
		$(".marioJump").animate({top: "-=100"}, 400, "swing", backDown);
		//evite le cumul des sauts en restant appuyé sur la touche
		setTimeout(function(){jumpB = true}, 800);
	};
	//defilement de la map
	function defile(){
		$(".mario").removeClass("mario").addClass("marioMoveR");
		$(".map").animate({left: "-=5"},10);
		moveRightB  = false;
	}
	// ecoute du clavier
	$(document).keydown(function(e){
		switch (e.keyCode){
			case 38: // flèche haut
				if(jumpB){
					jump();
				}	
				break;
			case 37: // flèche gauche
				//enregistrement de la position
				var posX = $(".mario").position();
				if(posX !== undefined){
					var posX = $(".mario").position();
				}
				else{
					var posX = $(".marioMoveL").position();
				}
				//si mario n'est pas au bord de la map, alors il bouge
				if(posX.left > 5){
					moveLeft();
					break;
				}
				else{
					break;
				}
			case 39: // flèche droite
				//enregistrment de la position
				var posX = $(".mario").position();
				var mapX = $(".map").position();
				var money1X = $(".money1").position();
				if(posX !== undefined){
					var posX = $(".mario").position();
				}
				else{
					var posX = $(".marioMoveR").position();
				}
				if(money1X !== undefined){
					if ((posX.left >= money1X.left - 5) && (posX.left <= money1X.left + 5)){
						moneyScore();
						coinSound.play();
						$(".money1").removeClass();
					}
				}
				//si mario n'est pas au milieu de l'écran,
				//il bouge de lui même
				if(posX.left < 190){
					moveRight();
					break;
				}
				//s'il est au mileu de l'écran,
				//la map bouge et mario reste au milieu
				else if (posX.left >= 190 && mapX.left > -875) {
					defile();
				}
				else{
					break;
				}
		}
	})
});