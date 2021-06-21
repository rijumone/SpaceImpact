class Laser extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'laser');
  }

  fire(x, y) {
    this.body.reset(x, y);

    this.setActive(true);
    this.setVisible(true);

    this.setVelocityX(700);
  }

}


class LaserGroup extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 99,
      key: 'laser',
      active: false,
      visible: false,
      classType: Laser,
    });
  }

  fireLaser(x, y) {
    const laser = this.getFirstDead(false);

    if (laser) {
      laser.fire(x, y);
    }
  }
}

class SpaceScene extends Phaser.Scene {
  constructor() {
    super();

    this.ship;
    this.laserGroup;
    this.alienShipGroup;
    this.inputKeys;
  }

  preload() {
    this.load.image('laser', 'static/img/player_primary_weapon.png');
    this.load.image('player_ship', 'static/img/player_ship.png');
    this.load.image('alien_ship_0', 'static/img/alien_ship_0.png');
  }

  create() {
    this.laserGroup = new LaserGroup(this);

    this.addShip();
    this.addAlienShips(2);
    this.addEvents();
    this.addColliders();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  addShip() {
    this.ship = this.physics.add.image(80, 240, 'player_ship');
  }

  addAlienShips(n){
    this.alienShipGroup = this.physics.add.group();

    for (let i = 1; i <= 2; i++) {
      var alienShip0 = this.alienShipGroup.create(
        (700 / i), 100, 'alien_ship_0');
      alienShip0.setVelocity(-100, 50);
    }
  }

  addColliders(){
    this.physics.add.collider(
      this.ship, this.alienShipGroup, this.playerHit, null, this);
  }

  playerHit(){
    this.physics.pause();
  }

  addEvents() {
    // Firing bullets should also work on enter / spacebar press
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    ];
  }

  fireLaser() {
    this.laserGroup.fireLaser(this.ship.x + 50, this.ship.y);
  }

  update() {
    let vel = 400
    if (this.cursors.left.isDown) {
      this.ship.setVelocityX(-vel);
      this.ship.setVelocityY(0);
    }
    else if (this.cursors.right.isDown) {
      this.ship.setVelocityX(vel);
      this.ship.setVelocityY(0);
    }
    else if (this.cursors.up.isDown) {
      this.ship.setVelocityX(0);
      this.ship.setVelocityY(-vel);
    }
    else if (this.cursors.down.isDown) {
      this.ship.setVelocityX(0);
      this.ship.setVelocityY(vel);
    } else {
      this.ship.setVelocityX(0);
      this.ship.setVelocityY(0);
    }

    // Loop over all keys
    this.inputKeys.forEach(key => {
      // Check if the key was just pressed, and if so -> fire the bullet
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.fireLaser();
      }
    });
  }
}


var config = {
  type: Phaser.AUTO,  // renderer
  width: 840,         // dimensions
  height: 480,
  // scene: {            // default scene
  //   preload: preload,
  //   create: create,
  //   update: update
  // },
  scene: SpaceScene,
  backgroundColor: '#72B01D',
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 }, // else ship falls off screen :'D
      debug: false
    }
  },

};

var player_ship;
var alien_ship_0s;
var cursors;

var game_vars = {
  player_ship_velocity: 200,
}

function preload() {
  this.load.image('player_ship', 'static/img/player_ship.png');
  this.load.image('alien_ship_0', 'static/img/alien_ship_0.png');
}

function create() {
  player_ship = this.physics.add.image(80, 240, 'player_ship');
  alien_ship_0s = this.physics.add.group();

  for (i = 1; i <= 2; i++) {
    var alien_ship_0 = alien_ship_0s.create(
      (700 / i), 100, 'alien_ship_0');
    alien_ship_0.setVelocity(-100, 50);
  }

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(
    player_ship, alien_ship_0s, alien_hit_player, null, this);
}

function update() {
  vel = game_vars.player_ship_velocity
  if (cursors.left.isDown) {
    player_ship.setVelocityX(-vel);
    player_ship.setVelocityY(0);
  }
  else if (cursors.right.isDown) {
    player_ship.setVelocityX(vel);
    player_ship.setVelocityY(0);
  }
  else if (cursors.up.isDown) {
    player_ship.setVelocityX(0);
    player_ship.setVelocityY(-vel);
  }
  else if (cursors.down.isDown) {
    player_ship.setVelocityX(0);
    player_ship.setVelocityY(vel);
  } else {
    player_ship.setVelocityX(0);
    player_ship.setVelocityY(0);
  }
}

function alien_hit_player() {
  this.physics.pause();
  console.log('Man down!')
}

// config being passed to instance of Phaser.game object
var game = new Phaser.Game(config);
