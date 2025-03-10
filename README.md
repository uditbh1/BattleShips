# 🛳️ Battleship Game  

A modern, interactive web-based Battleship game where Player 1 takes on either **a second player** or **the Computer** in a strategic naval battle. Place your ships, take your shots, and sink the enemy fleet!  

🎉 **[Play the Game Here!](https://uditbh1.github.io/BattleShips/)** 🎉  

---

## 🚀 Features  

- **Two Game Modes:**  
    - 🆚 **Player vs Player**  
    - 🤖 **Player vs Computer**  
- **Smart Ship Placement:** Ships fit perfectly on the board without overlap.  
- **Real-time Visual Feedback:**  
    - **🟦 Placed Ships:** Always visible on Player 1’s board.  
    - **💥 Hits:** Always visible on both boards.  
    - **❌ Misses:** Always visible on both boards.  
- **Computer AI:** Smart, non-repeating attacks.  
- **Interactive UI:**  
    - Hover effects on the opponent’s board for targeting.  
    - Click cells to attack.  
    - Clear updates on hits and misses.  
- **Turn-based Gameplay:** Automatically switches turns and declares the winner.  

---

## 🧑‍💻 Tech Stack  

- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**  
- **Jest (Testing)**  

---

## 🧪 Test-Driven Development (TDD)  

This project follows the principles of **Test-Driven Development (TDD)** using **Jest**.  
All core functionalities, including player actions, board behavior, and ship placement, are fully covered by unit tests.  

Test files are located in the `tests` folder and mirror the `src` folder structure:  

```
📁 src                  📁 tests  
├── gameboard.js        ├── gameboard.test.js  
├── player.js           ├── player.test.js  
└── ship.js             └── ship.test.js  
```

To run the test suite:  
```bash
npm test
```

---

## 🎮 Game Modes  

1. **Player vs Player:**  
   - Each player takes turns attacking the other’s board.  
   - Player 1’s ships are always visible on their board.  
   - Hits and misses are shown on both boards throughout the game.  

2. **Player vs Computer:**  
   - Player 1’s ships are always visible.  
   - Computer’s ships are hidden from view.  
   - Computer attacks automatically after Player 1’s turn.  

---

## 📂 Project Structure  

```
📁 BattleShips
├── 📁 dist                        # Compiled and bundled files
│   ├── 📁 game_setup              # Game setup scripts
│   │   ├── ComputerGameSetup.js   # Computer ship placement logic
│   │   ├── PlayerGameSetup.js     # Player 1 ship placement logic
│   │   ├── StartGame.js           # Player vs Player game logic
│   │   └── StartGameComputer.js   # Player vs Computer game logic
├── 📁 node_modules                # Dependencies
├── 📁 src                         # Core game functionality
│   ├── gameboard.js               # Gameboard class
│   ├── player.js                  # Player class
│   └── ship.js                    # Ship class
├── 📁 tests                       # Jest test files
│   ├── gameboard.test.js          # Tests for Gameboard
│   ├── player.test.js             # Tests for Player
│   └── ship.test.js               # Tests for Ship
├── .gitignore                     # Git ignore config
├── babel.config.js                # Babel configuration
├── index.html                     # Main HTML file
├── index.js                       # Entry point for JavaScript
├── jest.config.js                 # Jest configuration
├── package-lock.json              # Lockfile for dependencies
├── package.json                   # Project dependencies and scripts
├── style.css                      # Game styles
└── webpack.config.js              # Webpack configuration
```

---

## 🕹️ How to Play  

1. **Choose a Game Mode:**  
   - **Player vs Player** or **Player vs Computer**.  

2. **Start the Game:**  
   - Player 1’s ships are automatically placed and always visible.  
   - Computer’s ships (in PvC mode) remain hidden.  

3. **Take Your Shot:**  
   - Hover over the opponent’s board to highlight cells.  
   - Click a cell to fire your shot.  
   - Hit = **💥 Success** | Miss = **❌ Fail**  

4. **Switch Turns:**  
   - After Player 1 attacks, Player 2 or the Computer takes their turn.  

5. **Victory or Defeat:**  
   - The first player to sink all the opponent’s ships wins.  
   - A winner alert pops up when the game ends.  

---

## 🛠️ Setup  

1. **Clone the repo:**  
```bash
git clone https://github.com/uditbh1/BattleShips.git
```

2. **Navigate into the project:**  
```bash
cd BattleShips
```

3. **Install dependencies:**  
```bash
npm install
```

4. **Run the game:**  
```bash
npx webpack serve
```

---

## 🐛 Known Issues & Improvements  

- **[ ]** Add difficulty levels for Computer AI.  
- **[ ]** Implement a ship placement screen for Player 1.  
- **[ ]** Add sound effects for hits, misses, and ship sinking.  

---

## 🤝 Contributing  

Got an idea or found a bug? PRs and issues are welcome!  

1. **Fork the repo**  
2. **Create a feature branch:**  
```bash
git checkout -b feature/new-feature
```
3. **Commit changes:**  
```bash
git commit -m "Add new feature"
```
4. **Push:**  
```bash
git push origin feature/new-feature
```
5. **Open a Pull Request**  

---

💡 *May your aim be true and your ships unsinkable!* 🌊⚓  
