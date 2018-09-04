class Stage1 extends Phaser.Scene {
	constructor() {
		super({key: 'Stage1'});
		this.player = null;
		this.cursor = null;
		this.bullet = null;
		this.brick = null;
		this.playerBulletLive = false;
		this.playerDirection = 'up';
	}

	preload() {
	    this.load.image('brick', 'assets/wall_bricks/wall_bricks.png');
	    this.load.image('brickTop', 'assets/wall_bricks/wall_bricks_top.png');
	    this.load.image('bullet', 'assets/bullet.png');
	    this.load.image('tile1', 'assets/bgr_tile_01.png');
	    this.load.image('tile2', 'assets/bgr_tile_02.png');
	    this.load.spritesheet('tank', 'assets/player_tank/player_tank.png', {
	        frameHeight: 100,
	        frameWidth: 100
	    })
	}

	create() {
	    for (let x = 0; x < 8; x++) {
	        for (let y = 0; y < 6; y++) {
	            if ((x+y) % 2 === 0) {
	                this.add.image(x*100+50, y*100+50, 'tile1');
	            } else {
	                this.add.image(x*100+50, y*100+50, 'tile2');
	            }
	            
	        }
	    }

	    this.bricks = this.physics.add.staticGroup();
	    this.bricks.create(400, 300, 'brick');

	    this.player = this.physics.add.sprite(400, 600, 'tank');
	    this.player.setCollideWorldBounds(true);
	   
	    this.anims.create({
	        key: 'left',
	        frames: this.anims.generateFrameNumbers('tank', { start: 4, end: 5 }),
	        frameRate: 10,
	        repeat: -1
	    });

	    this.anims.create({
	        key: 'right',
	        frames: this.anims.generateFrameNumbers('tank', { start:2, end:3 }),
	        frameRate: 10,
	        repeat: -1
	    });

	    this.anims.create({
	        key: 'up',
	        frames: this.anims.generateFrameNumbers('tank', { start:0, end:1 }),
	        frameRate: 10,
	        repeat: -1
	    });

	    this.anims.create({
	        key: 'down',
	        frames: this.anims.generateFrameNumbers('tank', { start:6, end:7 }),
	        frameRate: 10,
	        repeat: -1
	    });

	    this.cursor = this.input.keyboard.createCursorKeys();

	    this.physics.add.collider(this.player, this.bricks);
	}

	update(delta) {
	    if (this.cursor.left.isDown) {
	        this.playerDirection = 'left';
	        this.player.setVelocityY(0);
	        this.player.setVelocityX(-160);
	        this.player.anims.play('left', true);
	    } else if (this.cursor.right.isDown) {
	        this.playerDirection = 'right';
	        this.player.setVelocityY(0);
	        this.player.setVelocityX(160);
	        this.player.anims.play('right', true);
	    } else if (this.cursor.up.isDown) {
	        this.playerDirection = 'up'
	        this.player.setVelocityX(0);
	        this.player.setVelocityY(-160);
	        this.player.anims.play('up', true);
	    } else if (this.cursor.down.isDown) {
	        this.playerDirection = 'down';
	        this.player.setVelocityX(0);
	        this.player.setVelocityY(160);
	        this.player.anims.play('down', true);
	    } else {
	        this.player.setVelocityX(0);
	        this.player.setVelocityY(0);
	        this.player.anims.stop();
	    }

	    if (this.input.keyboard.checkDown(this.cursor.space, 1000) && !this.playerBulletLive) {
	        this.playerBulletLive = true;
	        switch(this.playerDirection) {
	            case 'up':
	                this.bullet = this.physics.add.image(this.player.x, this.player.y - 50, 'bullet');
	                this.bullet.setVelocityY(-600);
	                this.bullet.direction = this.playerDirection;
	                break;
	            case 'down':
	                this.bullet = this.physics.add.image(this.player.x, this.player.y + 50, 'bullet');
	                this.bullet.angle = 180;
	                this.bullet.setVelocityY(600);
	                this.bullet.direction = this.playerDirection;
	                break;
	            case 'left':
	                this.bullet = this.physics.add.image(this.player.x - 50, this.player.y, 'bullet');
	                this.bullet.angle = -90;
	                this.bullet.setVelocityX(-600);
	                this.bullet.direction = this.playerDirection;
	                break;
	            case 'right':
	                this.bullet = this.physics.add.image(this.player.x + 50, this.player.y, 'bullet');
	                this.bullet.angle = 90;
	                this.bullet.setVelocityX(600);
	                this.bullet.direction = this.playerDirection;
	                break;
	        }
	        this.bullet.setCollideWorldBounds(true);
	        this.physics.add.overlap(this.bricks, this.bullet, this.bulletBrickHit, null, this);
	    }

	    if (this.bullet != null) {
	        if (this.bullet.body.onCeiling() || this.bullet.body.onFloor() || this.bullet.body.onWall()) {
	            this.bulletBoundsHit();
	        }
	    }
	}
	bulletBoundsHit() {
	    this.playerBulletLive = false;
	    this.bullet.disableBody(true, true);
	    this.bullet = null;
	}

	bulletBrickHit(bullet, brick) {
	    // console.log(brick);
	    switch(bullet.direction) {
	        case 'up':
	            brick.setCrop(0, 0, brick.body.width, brick.body.height - 25);
	            brick.setSize(brick.body.width, brick.body.height - 25);
	            break;
	        case 'down':
	            brick.setCrop(0, 0, brick.body.width, brick.body.height - 25);
	            brick.setSize(brick.body.width, brick.body.height - 25);
	            brick.y += 25;
	            brick.body.y += 25;
	            break;
	        case 'left':
	            brick.setCrop(0, 0, brick.body.width - 25, brick.body.height);
	            brick.setSize(brick.body.width - 25, brick.body.height);
	            break;
	        case 'right':
	            brick.setCrop(0, 0, brick.body.width - 25, brick.body.height);
	            brick.setSize(brick.body.width - 25, brick.body.height);
	            brick.x += 25;
	            brick.body.x += 25;
	            break;
	    }
	    if (brick.body.width == 0 || brick.body.height == 0) {
	    	brick.disableBody(true, true);
	    }
	    
	}
}