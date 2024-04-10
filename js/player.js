class Player extends Component {
  constructor(gameScreen, left, top, width, height) {
    super(gameScreen, left, top, width, height, "../images/car.png");
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

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    )
      return true;

    return false;
  }
}
