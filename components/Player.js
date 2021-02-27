class Player {
  static lastId = 0;
  constructor(name) {
    this.name = name;
    this.id = ++Player.lastId;
  }
}

export default Player;
