var cards = [];
var centerCards = [];
var deal = [];
var dealtCards = 0;
var cardWidth;
var cardHeight;
var hand = [];
var state = 1;
const cardTop = 15;
const cardSide = 20;
const handStart = 100;

function preload(){
	fontCard = loadFont("./libraries/CardChar.TTF");
}
//handling the dom

document.getElementById("Create Room").onclick = function(){ startGame(1) };
document.getElementById("Join Room").onclick = function(){ startGame(0) };


function startGame(type){

	var elem = document.getElementById('inputField');
	elem.parentNode.removeChild(elem);// kill the room selector

	for(i = 0; i < 60; i++){
		cards.push(new card(i));
		deal.push(i);
	}

	shuffleCards();
	

  for(i = 0; i < 8; i++){
  	cards[deal[2*i]].owner = 1;
  	cards[deal[2*i+1]].owner = 2;
  	dealtCards += 2;
  }

	update();
}

function shuffleCards(){
	for (var i = deal.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = deal[i];
		deal[i] = deal[j];
		deal[j] = temp;
  }
  dealtCards = 0;
}

/*
function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
	cardSize();
	redraw();
}



function cardSize(){
	cardWidth = width*.18;
	cardWidth = cardWidth > 100 ? 100 : cardWidth < 40 ? 40 : cardWidth;
	cardHeight = height - (25 * cardTop + 30);
	cardHeight = cardHeight > 150 ? 150 : cardHeight < 30 ? 30 : cardHeight;
}




function mouseClicked(){
	var cardSel = -1;
	if(mouseY>height-cardTop-10){
		if (mouseX>handStart&&mouseX<handStart+cardWidth+(hand.length-1)*cardSide){
			cardSel = Math.floor((mouseX-handStart)/cardSide);
			cardSel = cardSel > hand.length-1 ? hand.length-1 : cardSel;
		}
	}
	if(cardSel >= 0){
		hand[cardSel].played = true;
		if(dealtCards < cards.length){
			cards[deal[dealtCards]].owner = 1;
			dealtCards++;
		}
	}
	redraw();
}
*/


function sortSuit(owner,played){
	var suits = [[],[],[],[],[]];
	cards.filter(function(d){return d.owner == owner && d.played == played}).forEach(function(d){
		suits[d.suit].push(d);
	})
	return suits
}

function update() {
	if(state){
		xspacing = (width - (cardWidth*5))/10;

		hand = cards.filter(function(d){return d.owner == 1 && d.played == false})
		hand.forEach(function(d,i){
			d.showFull(100 + cardSide * i,height - cardTop-10);
		});

		sortSuit(1,true).forEach(function(d,i){
			d.forEach(function(e,j){
				e.showFull(xspacing*(2*i+1)+cardWidth*i,12*cardTop+5+cardTop*(d.length-j));
			});
		});

		sortSuit(2,false).forEach(function(d,i){
			d.forEach(function(e,j){
				e.showFull(xspacing*(2*i+1)+cardWidth*i,12*cardTop+5-cardTop*(d.length-j));
			});
		});


		/*
		played.forEach(function(d){
			if (lastSuit != d.suit){
				lastSuit = d.suit;
				suitSeen = 0;
			}
			d.showFull(xspacing*(2*d.suit+1)+cardWidth*d.suit,12*cardTop+5+cardTop*(suits[d.suit]-suitSeen));
			suitSeen++;
		});
	  
	  

		
		cards.forEach(function(d,i){
			d.showFull(xspacing,12*cardTop+5+cardTop*(12-i));
		});
		
		cards.forEach(function(d,i){
			d.showFull(xspacing*3+cardWidth,12*cardTop+5-cardTop*(12-i));
		})
		*/
		centerCards.forEach(function(d,i){
			d.showCenter(xspacing*(2*i+1)+cardWidth*i,12*cardTop+5);
		})
	}
}