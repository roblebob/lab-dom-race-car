class Obstacle extends Component {
  constructor(gameScreen) {
    super(
      gameScreen,
      Math.floor(Math.random() * 300 + 70),
      0,
      100,
      150,
      "../images/redCar.png"
    );
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }
}
