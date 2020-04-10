$(window).on('load',function(){
	$('#playerInfo').modal('show');
   //the above code to dsiplay modal as soon as page loads

//declaring and initialising various variables
var huNamevalue;
var aiNamevalue="Computer's";

var Turndisplay=document.getElementById('Turndisplay');

var huSymbol;
var huSymbolValue;
var aisymbolValue;

var turn;
var origboard=["","","","","","","","",""];
         
          
var row;
var column;
var id;
var nameDisplay;

inputNstore=()=>{
   huNamevalue=document.getElementById('player').value;
   if(huNamevalue==""){
huNamevalue="Your";
}
else
huNamevalue=huNamevalue+"'s";
   Turndisplay.innerText=huNamevalue + " Turn";
    nameDisplay=huNamevalue;


//storing the symbol of player 1
 huSymbol=$("input[name='symbol']:checked");
huSymbolValue=huSymbol.val();
aisymbolValue = (huSymbolValue=="X")? "O":"X";
turn=huSymbolValue;

}

addSymbol=(event)=>{
	id=event.getAttribute('id');
var box=document.getElementById(id);
if(box.innerText=="")
    {
	box.innerText=turn;
 
	
    origboard[id]=turn;
    console.log(origboard);
     nameDisplay = aiNamevalue;
	Turndisplay.innerText= nameDisplay + "'s Turn";

	 turn=aisymbolValue;

     aiMove(origboard,aisymbolValue);
    
    origboard[id]=turn;

     turn=huSymbolValue;

      nameDisplay = huNamevalue;
	Turndisplay.innerText= nameDisplay + "'s Turn";

    }

}

//computerMove function 
aiMove=(origboard,aisymbolValue)=>{

	var bestSpot=minimax(origboard,aisymbolValue).index;
	document.getElementById(bestSpot).innerText=aisymbolValue;
}

minimax=(newBoard, player)=>{

var availSpots = blankBox(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, huSymbolValue)){
     return {score:-10};
     
  }
	else if (winning(newBoard, aisymbolValue)){
    return {score:10};
    
	}
  else if (availSpots.length === 0){
  	return {score:0};
  	
  }

// an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++){
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
  	move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == aisymbolValue){
      var result = minimax(newBoard, huSymbolValue);
      move.score = result.score;
    }
    else{
      var result = minimax(newBoard, aisymbolValue);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

// if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if(player === aisymbolValue){
    var bestScore = -10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }else{

// else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for(var i = 0; i < moves.length; i++){
      if(moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

// return the chosen move (object) from the array to the higher depth
  return moves[bestMove];

}

 blankBox=(board)=>{
 	var i;
 	var emptySpot= new Array();
 	for(i=0;i<9;i++){
 		if(board[i]!="X" && board[i]!="O")
 		{
 			emptySpot.push(i);
 		}

 	}
 	return emptySpot;
  
}


 winning=(board, player)=>{
 if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
    } else {
        return false;
    }
}

colNo=()=>{
	return  id % 3;
}

rowNo=()=>{
	return Math.floor(id/3);
}
});