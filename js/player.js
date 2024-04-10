class Player {
  constructor(gameScreen, left, top, width, height) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;

    this.element = document.createElement("img");
    this.element.src = "../images/car.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.gameScreen.appendChild(this.element);

    this.minMargin = 10;
    this.directionX = 0;
    this.directionY = 0;
    this.lives = 3;
    this.score = 0;
  }

  move() {
    this.left = this.clamp(
      this.left + this.clamp(this.directionX, -3, 3),
      this.minMargin,
      this.gameScreen.offsetWidth - this.width - this.minMargin
    );
    this.top = this.clamp(
      this.top + this.clamp(this.directionY, -3, 3),
      this.minMargin,
      this.gameScreen.offsetHeight - this.height - this.minMargin
    );

    this.updatePosition();
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
