//Default Player Object
const players = (playerName, playerScore) => {
  return { playerName, playerScore };
};

//GameStart Module
const gameStart = (() => {
  let gameBoardContent = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const player1 = players("X", 0);
  const player2 = players("O", 0);
  let currentPlayer = player1;
  let gameRound = 1;

  return { gameBoardContent, player1, player2, gameRound, currentPlayer };
})();

//Game Operator Module
const gameOperator = (() => {
  //Click each square
  const setSquareClick = (squareId, row, col) => {
    const square = document.getElementById(squareId);
    square.addEventListener("click", () => {
      handleSquareClick(square, row, col);
    });
  };

  //What happens for each square Function
  const handleSquareClick = (squareElement, row, col) => {
    if (squareElement.textContent === "") {
      gameStart.gameBoardContent[row][col] = gameStart.player1.playerName;
    }
    console.log(gameStart.gameBoardContent);
  };

  //click events
  const setSquareClickEvents = () => {
    setSquareClick("square1", 0, 0);
    setSquareClick("square2", 0, 1);
    setSquareClick("square3", 0, 2);
    setSquareClick("square4", 1, 0);
    setSquareClick("square5", 1, 1);
    setSquareClick("square6", 1, 2);
    setSquareClick("square7", 2, 0);
    setSquareClick("square8", 2, 1);
    setSquareClick("square9", 2, 2);
  };
  setSquareClickEvents();

  return { setSquareClick, handleSquareClick, setSquareClickEvents };
})();
