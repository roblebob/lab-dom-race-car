class Game {
  constructor(width, height) {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");

    this.width = width;
    this.height = height;
    this.obstacles = [];
    this.gameEndScreenscore = 0;
    this.gameEndScreenlives = 3;

    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrecuency = Math.round(1000 / 60);

    this.statsDisplay = {
      score: document.querySelector("#score"),
      lives: document.querySelector("#lives"),
    };
    this.player = new Player(this.gameScreen, 200, 500, 100, 150);
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(
      () => this.gameLoop(), // this.gameLoop().bind(this)
      this.gameLoopFrecuency
    );
  }

  gameLoop() {
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);
    }
  }

  update() {
    this.player.move();
    this.obstacles.forEach((obstacle) => {
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        this.removeObstacle(obstacle);
        this.player.lives--;
        this.statsDisplay.lives.innerHTML = this.player.lives;
      }

      if (obstacle.top > this.gameScreen.offsetHeight) {
        this.removeObstacle(obstacle);
        this.player.score++;
        this.statsDisplay.score.innerHTML = this.player.score;
      }
    });

    if (!this.obstacles.length && !this.newObstacleIsComingTimeout) {
      this.newObstacleIsComingTimeout = setTimeout(() => {
        this.obstacles.push(new Obstacle(this.gameScreen));
        clearTimeout(this.newObstacleIsComingTimeout);
        this.newObstacleIsComingTimeout = undefined;
      }, 1000);
    }

    if (this.player.lives <= 0) {
      this.endGame();
    }
  }

  removeObstacle(obstacle) {
    obstacle.element.remove();
    this.obstacles.splice(this.obstacles.indexOf(obstacle), 1);
  }

  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove);
    this.gameIsOver = true;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
