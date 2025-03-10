import Player from "./src/player";
import "./style.css";
import PlayerGameSetup from "./game_setup/PlayerGameSetup";
import StartGame from "./game_setup/StartGame";
import ComputerGameSetup from "./game_setup/ComputerGameSetup";
import StartGameComputer from "./game_setup/StartGameComputer";

// Re-attach event listeners for selecting game modes
const player2ModeBtn = document.getElementById("player2-mode-btn");
const computerModeBtn = document.getElementById("computer-mode-btn");

player2ModeBtn.addEventListener("click", async () => {
  const Player1 = new Player();
  await PlayerGameSetup(Player1, 1);
  console.log(Player1);
  const Player2 = new Player();
  await PlayerGameSetup(Player2, 2);
  await StartGame(Player1, Player2);
  Player1.reset()
  Player2.reset()
  location.reload();
});

computerModeBtn.addEventListener("click", async () => {
  const Player1 = new Player();
  await PlayerGameSetup(Player1, 1);
  const Computer = new Player();
  await ComputerGameSetup(Computer)
  console.log(Computer)
  await StartGameComputer(Player1, Computer);
  Player1.reset()
  Computer.reset()
  location.reload()
});
