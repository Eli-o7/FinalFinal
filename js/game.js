let score = 0; // Puntaje global
let gameStarted = false;

// Función para iniciar el juego
function startGame() {
  console.log("startGame called, gameStarted:", gameStarted);
  if (gameStarted) return;

  gameStarted = true;
  const startBtn = document.getElementById("start-game-btn");
  
  // Modificar clases del botón al iniciar
  startBtn.textContent = "Juego Iniciado";
  startBtn.disabled = true;
  startBtn.classList.add("bg-gray-400", "cursor-not-allowed", "hover:bg-gray-400");
  startBtn.classList.remove("bg-blue-600", "hover:bg-blue-700"); 

  // Iniciar spawn de comidas. CORRECCIÓN: Llamar a spawnCoin() e INTERVALO con spawnCoin()
  console.log("Starting Hamburguesa spawn...");
  spawnCoin();
  setInterval(spawnCoin, 3000); // <-- CORREGIDO: Usar spawnCoin
}

document.addEventListener("DOMContentLoaded", function () {
  const player = document.querySelector(".game-player");
  const gameContainer = document.querySelector(".game-container");
  
  
  if (!player || !gameContainer) {
      console.error("Player or Game Container element not found.");
      return;
  }
  
  const gameWidth = gameContainer.clientWidth;
  const gameHeight = gameContainer.clientHeight;

  
  let playerX = gameWidth / 2 - 15; 
  let playerY = gameHeight / 2 - 15;
  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;

  
  player.dataset.moveWidth = gameWidth;
  player.dataset.moveHeight = gameHeight;
});

document.addEventListener("keydown", function (event) {
  if (!gameStarted) return; 

  const player = document.querySelector(".game-player");
  const moveWidth = parseFloat(player.dataset.moveWidth);
  const moveHeight = parseFloat(player.dataset.moveHeight);
  
  
  collectCoins(); 
  
  let playerX = parseInt(player.style.left);
  let playerY = parseInt(player.style.top);

  switch (event.key) {
    case "ArrowUp":
      if (playerY > 0) {
        playerY -= 10;
      }
      break;
    case "ArrowDown":
      if (playerY < moveHeight - 30) {
        playerY += 10;
      }
      break;
    case "ArrowLeft":
      if (playerX > 0) {
        playerX -= 10;
      }
      break;
    case "ArrowRight":
      if (playerX < moveWidth - 30) {
        playerX += 10;
      }
      break;
    default:
      return;
  }

  player.style.left = `${playerX}px`;
  player.style.top = `${playerY}px`;
});

function spawnCoin() {
  // CORRECCIÓN: Mantener el nombre de la función consistente
  console.log("spawnCoin (Hamburguesa) called, gameStarted:", gameStarted); 
  if (!gameStarted) return;

  // CORRECCIÓN: Usamos la clase 'coin' que es la definida en tu HTML/CSS
  const coin = document.createElement("div"); 
  coin.classList.add("coin"); 
  
  const gameContainer = document.querySelector(".game-container");

  if (!gameContainer) {
    console.error("Game container not found!");
    return;
  }

  const gameWidth = gameContainer.clientWidth;
  const gameHeight = gameContainer.clientHeight;

  
  const coinX = Math.random() * (gameWidth - 24);
  const coinY = Math.random() * (gameHeight - 24);
  coin.style.left = `${coinX}px`;
  coin.style.top = `${coinY}px`;

  console.log("Spawning coin at:", coinX, coinY);
  gameContainer.appendChild(coin);

  
  setTimeout(() => {
    if (coin.parentNode) {
      coin.remove();
      console.log("Coin removed after timeout");
    }
  }, 5000);
}


function collectCoins() {
  const player = document.querySelector(".game-player");
  // CORRECCIÓN: Volvemos a usar la clase 'coin' ya que es la que se añade en spawnCoin
  const coins = document.querySelectorAll(".coin"); 
  
  const scoreBox = document.getElementById("score-box"); 

  coins.forEach((coin) => {
    const coinRect = coin.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    
    if (
      playerRect.x < coinRect.x + coinRect.width &&
      playerRect.x + playerRect.width > coinRect.x &&
      playerRect.y < coinRect.y + coinRect.height &&
      playerRect.y + playerRect.height > coinRect.y
    ) {
      coin.remove();
      score++;
      
      
      if (scoreBox) {
          scoreBox.value = score.toString().padStart(2, '0');
      }
    }
  });
}