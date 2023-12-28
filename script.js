let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
let msgContainer = document.querySelector(".msg-container");
let newGameButton = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

let turnO = true; //Player X, Player O
let count = 0; //To check Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//To generate the patterns
boxes.forEach((box) => {
   box.addEventListener("click",() => {
    if(turnO === true){
      //Player O
      box.innerText = "O";
      box.style.color = "red";
      turnO = false;
    } else{
      //Player X
      box.innerText = "X";
      box.style.color = "black";
      turnO = true;
    }
    box.disabled = true; //to disable the double tap of a button
    count++; //To increment the clicked buttons  
 
  //To check the draw
    let isWinner = checkWinner();   
    if(count === 9 && !isWinner){
      drawGame();
    }
  });
});

//To display the draw game
const drawGame = () => {
  msg.innerText = "It's a Draw!!";
  msgContainer.classList.remove("hide");
  disableButtons();
};

//Checking the Winner
const checkWinner = () => {
  for(let pattern of winPatterns){
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText; 
    let pos3 = boxes[pattern[2]].innerText;

    if(pos1 != "" && pos2 != "" && pos3 !=""){
      if(pos1 === pos2 && pos2 === pos3){
        displayWinner(pos1);
      }
    } 
  }
};

//To display the winner
const displayWinner = (winner) => {
  msg.innerText = `Congratulations, The Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableButtons();
};

//To disable the empty buttons after winning
const disableButtons = () => {
  for(let box of boxes){
    box.disabled = true;
  }
};

//To enable the buttons to click after reset or new game
const enableButtons = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
};

//Reset button function
const resetGame = () =>{
  turnO = true;
  count = 0;
  enableButtons();
  msgContainer.classList.add("hide");
};

newGameButton.addEventListener("click",resetGame); //new game button click
resetBtn.addEventListener("click",resetGame); //reset button click