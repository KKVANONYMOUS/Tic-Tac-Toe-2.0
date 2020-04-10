$(window).on('load',function(){
	$('#playerInfo').modal('show');

let huNamevalue;
let aiNamevalue="Computer's";

let Turndisplay=document.getElementById('Turndisplay');

let huSymbol;
let huSymbolValue;
let aisymbolValue;
let currentPlayer;
let board=[["","",""],
           ["","",""],
           ["","",""]
           ];
let row;
let column;


inputNstore=()=>{
	//extracting human name value
	huNamevalue=document.getElementById('player').value;
   if(huNamevalue=="")
     {
     huNamevalue="Your";
     }
    else
     huNamevalue=huNamevalue+"'s";

  //extracting symbol value
  huSymbol=$("input[name='symbol']:checked");
  huSymbolValue=huSymbol.val();
  aisymbolValue = (huSymbolValue=="X")? "O":"X";

}

addSymbol=(event)=>{
   let id=event.getAttribute('id');
   let cell=document.getElementById(id);
   if(cell.innerText==""){
   	currentPlayer=huSymbolValue;
   	cell.innerText=currentPlayer;
   	row=rowNo(id);
   	column=colNo(id);
   	board[row][column]=currentPlayer;
   	currentPlayer=aisymbolValue;
   }
   aiMove();
  let result=checkWinner(board);
   if(result==huSymbolValue)
   	alert(huNamevalue + "won");
   if(result==aisymbolValue)
   	alert(aiNamevalue + "won");
   if(result==draw)
   	alert("Game tie");
   
}



//aiMove funtion
aiMove=()=>{
let bestScore=-Infinity;
let move;
for(let i=0;i<3;i++){
	for(let j=0;j<3;j++){
		if(board[i][j]==""){
			board[i][j]=aisymbolValue;
			let score=minimax(board,0,false);
			board[i][j]="";
			if(score>bestScore){
				bestScore=score;
				move={i,j};
			}
		}
	}
}
board[move.i][move.j]=aisymbolValue;
console.log(board);
let bestSpot;
if(move.i==0 && move.j==0)
bestSpot=0;
if(move.i==0 && move.j==1)
bestSpot=1;
if(move.i==0 && move.j==2)
bestSpot=2;
if(move.i==1 && move.j==0)
bestSpot=3;
if(move.i==1 && move.j==1)
bestSpot=4;
if(move.i==1 && move.j==2)
bestSpot=5;
if(move.i==2 && move.j==0)
bestSpot=6;
if(move.i==2 && move.j==1)
bestSpot=7;
if(move.i==2 && move.j==2)
bestSpot=8;

document.getElementById(bestSpot).innerText=aisymbolValue;
}

let scores={
	aisymbolValue:10,
    huSymbolValue:-10,
	draw:0
};

//minimax function
minimax=(board,depth,isMaximizing)=>{
	let result=checkWinner(board);
	if(result!==null){
		if (result==huSymbolValue)
		{
			return scores[huSymbolValue];
		}
	else if(result==aisymbolValue)
		{
			return scores[aisymbolValue];
		}
	else if(result==draw) 
		{
			return scores[draw];
		}
		
	}

   if(isMaximizing)
   {
   	let bestScore=-Infinity;
    for(let i=0;i<3;i++){
	for(let j=0;j<3;j++){
		if(board[i][j]==""){
			board[i][j]=aisymbolValue;
			let score=minimax(board,depth + 1,false);
			board[i][j]="";
			if(score>bestScore){
				bestScore=score;
			}
			
		}
	}
 }
return bestScore;
   }
 else{
 		let bestScore=Infinity;
    for(let i=0;i<3;i++){
	for(let j=0;j<3;j++){
		if(board[i][j]==""){
			board[i][j]=huSymbolValue;
			let score=minimax(board,depth + 1,true);
			board[i][j]="";
			if(score<bestScore){
				bestScore=score;
			}
		}
	}
}
return bestScore;
 }  

}


//checking winner
 let draw="tie";
checkWinner=(board)=>{
	let winner=null;
	
        for(let i=0;i<3;i++){
        	if(board[i][0] != "" && board[i][0] == board[i][1] &&  board[i][1]==board[i][2])
           { winner=board[i][0];
           	// if (board[i][0]==aisymbolValue)
           	// 	{
           	// 		winner = aisymbolValue;
           	// 	}
           	// else if(board[i][0]==huSymbolValue)
           	// 	{
           	// 		winner = huSymbolValue;
           	// 	}
           }
           
        }
        for(let j=0;j<3;j++){
        	if(board[0][j] != "" && board[0][j] == board[1][j] && board[1][j]==board[2][j])
           {
           	winner=board[0][j];
           	// if (board[0][j]==aisymbolValue)
           	// 	{
           	// 		winner = aisymbolValue;
           	// 	}
           	// else if(board[0][j]==huSymbolValue)
           	// 	{
           	// 		winner = huSymbolValue;
           	// 	}
           }
        }
        if(board[0][0] != "" && board[0][0] == board[1][1] && board[1][1] == board[2][2])
       { winner=board[0][0];
           	// if (board[0][0]==aisymbolValue)
           	// 	{
           	// 		winner = aisymbolValue;
           	// 	}
           	// else if(board[0][0]==huSymbolValue)
           	// 	{
           	// 		winner = huSymbolValue;
           	// 	}
           }
        if(board[0][2] != "" && board[0][2] == board[1][1] && board[1][1] == board[2][0])
        {
        	winner=board[2][0];
           // 	if (board[0][2]==aisymbolValue)
           // 		{
           // 			winner = aisymbolValue;
           // 		}
           // else if(board[0][2]==huSymbolValue)
           // 		{
           // 			winner = huSymbolValue;
           // 		}
           }

         let availSpots=0;
        
         for(let i=0;i<3;i++)
    {
    	for(let j=0;j<3;j++)
    	{
    		if(board[i][j]==""){
    			availSpots++;
    		}
    	}
    }
         if(winner==null && availSpots==0){
         	return draw;
         }
         else{
         	return winner;
         }
   
}

resetBoard=()=>{
board=[
          ["","",""],
          ["","",""],
          ["","",""]
          ];
 // Turndisplay.innerText=p1nameValue + "'s Turn";
var boxes=document.querySelectorAll('.box');
var i;
for(i=0;i<boxes.length;i++){
	boxes[i].innerText=' '; 
} 

}

colNo=(e)=>{
	return  e % 3;
}

rowNo=(e)=>{
	return Math.floor(e/3);
}

});