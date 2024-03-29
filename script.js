// const config = {
//     type: Phaser.AUTO,
//     width: 800,
//     height: 600,
//     physics: {
//         default: 'arcade',
//         arcade: {
//             debug: false
//         }
//     },
//     scene: {
//         preload: preload,
//         create: create,
//         update: update
//     }
// };

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [ Stage1 ],
};

let game = new Phaser.Game(config);
// let player, cursor, bullet, brick;
// let playerBulletLive = false;
// let playerDirection = 'up';

// function preload() {
//     this.load.image('brick', 'assets/wall_bricks/wall_bricks.png');
//     this.load.image('brickTop', 'assets/wall_bricks/wall_bricks_top.png');
//     this.load.image('bullet', 'assets/bullet.png');
//     this.load.image('tile1', 'assets/bgr_tile_01.png');
//     this.load.image('tile2', 'assets/bgr_tile_02.png');
//     this.load.spritesheet('tank', 'assets/player_tank/player_tank.png', {
//         frameHeight: 100,
//         frameWidth: 100
//     })
// }

// function create() {
//     for (let x = 0; x < 8; x++) {
//         for (let y = 0; y < 6; y++) {
//             if ((x+y) % 2 === 0) {
//                 this.add.image(x*100+50, y*100+50, 'tile1');
//             } else {
//                 this.add.image(x*100+50, y*100+50, 'tile2');
//             }
            
//         }
//     }

//     bricks = this.physics.add.staticGroup();
//     bricks.create(400, 300, 'brick');

//     player = this.physics.add.sprite(400, 600, 'tank');
//     player.setCollideWorldBounds(true);
   
//     this.anims.create({
//         key: 'left',
//         frames: this.anims.generateFrameNumbers('tank', { start: 4, end: 5 }),
//         frameRate: 10,
//         repeat: -1
//     });

//     this.anims.create({
//         key: 'right',
//         frames: this.anims.generateFrameNumbers('tank', { start:2, end:3 }),
//         frameRate: 10,
//         repeat: -1
//     });

//     this.anims.create({
//         key: 'up',
//         frames: this.anims.generateFrameNumbers('tank', { start:0, end:1 }),
//         frameRate: 10,
//         repeat: -1
//     });

//     this.anims.create({
//         key: 'down',
//         frames: this.anims.generateFrameNumbers('tank', { start:6, end:7 }),
//         frameRate: 10,
//         repeat: -1
//     });

//     cursor = this.input.keyboard.createCursorKeys();

//     this.physics.add.collider(player, bricks);
// }

// function update() {
//     if (cursor.left.isDown) {
//         playerDirection = 'left';
//         player.setVelocityY(0);
//         player.setVelocityX(-160);
//         player.anims.play('left', true);
//     } else if (cursor.right.isDown) {
//         playerDirection = 'right';
//         player.setVelocityY(0);
//         player.setVelocityX(160);
//         player.anims.play('right', true);
//     } else if (cursor.up.isDown) {
//         playerDirection = 'up'
//         player.setVelocityX(0);
//         player.setVelocityY(-160);
//         player.anims.play('up', true);
//     } else if (cursor.down.isDown) {
//         playerDirection = 'down';
//         player.setVelocityX(0);
//         player.setVelocityY(160);
//         player.anims.play('down', true);
//     } else {
//         player.setVelocityX(0);
//         player.setVelocityY(0);
//         player.anims.stop();
//     }

//     if (this.input.keyboard.checkDown(cursor.space, 1000) && !playerBulletLive) {
//         playerBulletLive = true;
//         switch(playerDirection) {
//             case 'up':
//                 bullet = this.physics.add.image(player.x, player.y - 50, 'bullet');
//                 bullet.setVelocityY(-600);
//                 bullet.direction = playerDirection;
//                 break;
//             case 'down':
//                 bullet = this.physics.add.image(player.x, player.y + 50, 'bullet');
//                 bullet.angle = 180;
//                 bullet.setVelocityY(600);
//                 bullet.direction = playerDirection;
//                 break;
//             case 'left':
//                 bullet = this.physics.add.image(player.x - 50, player.y, 'bullet');
//                 bullet.angle = -90;
//                 bullet.setVelocityX(-600);
//                 bullet.direction = playerDirection;
//                 break;
//             case 'right':
//                 bullet = this.physics.add.image(player.x + 50, player.y, 'bullet');
//                 bullet.angle = 90;
//                 bullet.setVelocityX(600);
//                 bullet.direction = playerDirection;
//                 break;
//         }
//         bullet.setCollideWorldBounds(true);
//         this.physics.add.overlap(bricks, bullet, bulletBrickHit, null, this);
//     }

//     if (bullet != null) {
//         if (bullet.body.onCeiling() || bullet.body.onFloor() || bullet.body.onWall()) {
//             bulletBoundsHit();
//         }
//     }
// }

// function bulletBoundsHit() {
//     playerBulletLive = false;
//     bullet.disableBody(true, true);
//     bullet = null;
// }

// function bulletBrickHit(bullet, brick) {
//     console.log(brick);
//     switch(bullet.direction) {
//         case 'up':
//             brick.setCrop(0, 0, 100, 50);
//             brick.setSize(100, 50);
//             break;
//         case 'down':
//             brick.setCrop(0, 0, 100, 50);
//             brick.setSize(100, 50);
//             brick.y += 50;
//             brick.body.y += 50;
//             break;
//         case 'left':
//             // brick.setCrop(50, 0, 50, 100);
//             // brick.body.setSize(50, 100);
//             break;
//         case 'right':
//             // brick.setCrop(50, 0, 50, 100);
//             // brick.body.setSize(50, 100);
//             break;
//     }
    
// }