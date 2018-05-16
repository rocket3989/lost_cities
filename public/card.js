const colors = ['#3090E0','#C0C000','#30C030','#C0E0F0','#E05040'];
function card(index){ 
  this.owner = 0; //owner 0=deck(or table) 1=p1 2= p2
  this.index = index; //index in deck
  this.played = false; //play is in hand(or in the deck)
  this.value = index % 12; // numerical value of the card
  this.suit = Math.floor(index/12); //the suit of the card
  
  //constructor

  this.showFull = function(posx,posy){
    //stroke('#5090B0');
    stroke(colors[this.suit]);
    strokeWeight(3);
    fill(0);
    rect(posx,posy,cardWidth,cardHeight,12);
    fill(colors[this.suit]);
    
    strokeWeight(1);
    text(this.valueDisp(),posx+9,posy+12);
    text(this.valueDisp(),posx+cardWidth-9,posy+cardHeight-5);
  }
  this.showCenter = function(posx,posy){
    stroke(colors[this.index]);
    strokeWeight(3);
    fill(0);
    rect(posx,posy,cardWidth,cardHeight,12);
    fill(colors[this.index]);

  }
  this.valueDisp = function(){
    return this.value > 8 ? 'I' : 10 - this.value;
  }
}