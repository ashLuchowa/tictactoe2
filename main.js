//++++ Default Player Object ++++//
const players = (playerName, playerScore) => {
  return { playerName, playerScore };
};

//---- GameStart Module ----//
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
  let player1Score = document.querySelector("#player1-score");
  let player2Score = document.querySelector("#player2-score");
  player1Score.classList.add("updateScoreUI");

  return {
    gameBoardContent,
    player1,
    player2,
    gameRound,
    currentPlayer,
    player1Score,
    player2Score,
  };
})();

//---- Game Operator Module ----//
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
      gameStart.gameBoardContent[row][col] = gameStart.currentPlayer.playerName;
      squareElement.textContent = gameStart.currentPlayer.playerName;
    }
    //Change current player UI color
    if (gameStart.currentPlayer === gameStart.player1) {
      gameStart.currentPlayer = gameStart.player2;
      gameStart.player1Score.classList.remove("updateScoreUI");
      gameStart.player2Score.classList.add("updateScoreUI");
    } else {
      gameStart.currentPlayer = gameStart.player1;
      gameStart.player1Score.classList.add("updateScoreUI");
      gameStart.player2Score.classList.remove("updateScoreUI");
    }
    gameConclusion.winCondition(squareElement.textContent);
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

  return { setSquareClick, handleSquareClick };
})();

//---- Game Conclusion Module ----//
const gameConclusion = (() => {
  const winCondition = (playerID) => {
    ((gameStart.gameBoardContent[0][0] === playerID && gameStart.gameBoardContent[0][1] === playerID && gameStart.gameBoardContent[0][2] === playerID)
    || (gameStart.gameBoardContent[1][0] === playerID && gameStart.gameBoardContent[1][1] === playerID && gameStart.gameBoardContent[1][2] === playerID)
    || (gameStart.gameBoardContent[2][0] === playerID && gameStart.gameBoardContent[2][1] === playerID && gameStart.gameBoardContent[2][2] === playerID)
    || (gameStart.gameBoardContent[0][0] === playerID && gameStart.gameBoardContent[1][0] === playerID && gameStart.gameBoardContent[2][0] === playerID)
    || (gameStart.gameBoardContent[0][1] === playerID && gameStart.gameBoardContent[1][1] === playerID && gameStart.gameBoardContent[2][1] === playerID)
    || (gameStart.gameBoardContent[0][2] === playerID && gameStart.gameBoardContent[1][2] === playerID && gameStart.gameBoardContent[2][2] === playerID)
    || (gameStart.gameBoardContent[0][0] === playerID && gameStart.gameBoardContent[1][1] === playerID && gameStart.gameBoardContent[2][2] === playerID)
    || (gameStart.gameBoardContent[2][0] === playerID && gameStart.gameBoardContent[1][1] === playerID && gameStart.gameBoardContent[0][2] === playerID)) ? playerWinResult(playerID) : console.log('No');
  }

  const playerWinResult = (playerID) => {
    if (playerID === "X") {
      gameStart.player1.playerScore++;
    } else {
      gameStart.player2.playerScore++;
    }
    updateUI.updateScore();
    // updateRound();
    nextRoundBtn();
  };

  //Next Round Modal
  const nextRoundBtn = () => {
    const blurBackground = document.querySelector(".blur-background");
    const nextRoundModal = document.querySelector(".next-round-btn");
    const nextBtn = document.querySelector(".next-round-btn button");

    setTimeout(() => {
      blurBackground.style.display = "flex";
      blurBackground.style.filter = "blur(8px)";
      nextRoundModal.style.display = "flex";
    }, 400);

    nextBtn.addEventListener("click", () => {
      resetMainBoard();
      blurBackground.style.display = "none";
      nextRoundModal.style.display = "none";
    });
  };

  //Reset Board
  const resetMainBoard = () => {
    gameStart.gameBoardContent = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => (square.textContent = ""));
  };

  return { winCondition, resetMainBoard };
})();

//---- Update UI for Round & Score Module ----//
const updateUI = (() => {
  const updateScore = () => {
    let player1Score = document.querySelector("#player1-score");
    let player2Score = document.querySelector("#player2-score");
    player1Score.classList.add("updateScoreUI");
    player1Score.textContent = `Player X: ${gameStart.player1.playerScore}`;
    player2Score.textContent = `Player O: ${gameStart.player2.playerScore}`;
  };

  return { updateScore };
})();
