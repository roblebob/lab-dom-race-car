window.onload = function () {
  document
    .getElementById("start-button")
    .addEventListener("click", () => game.start());
  document
    .getElementById("restart-button")
    .addEventListener("click", () => location.reload());

  let game = new Game(500, 500);

  document.onkeydown = (event) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowLeft":
        game.player.directionX -= 1;
        break;
      case "ArrowRight":
        game.player.directionX += 1;
        break;
      case "ArrowUp":
        game.player.directionY -= 1;
        break;
      case "ArrowDown":
        game.player.directionY += 1;
        break;
    }
  };

  document.onkeyup = (event) => {
    game.player.directionX = 0;
    game.player.directionY = 0;
  };
};
