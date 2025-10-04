class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.tileX = x;
        this.tileY = y;

        // Create player sprite
        this.sprite = scene.add.sprite(
            x * TILE_SIZE * SCALE,
            y * TILE_SIZE * SCALE,
            'player'
        );
        this.sprite.setScale(2); // Scale up 2x for visibility

        // Enable physics
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);

        // Movement state
        this.isMoving = false;
        this.targetX = this.sprite.x;
        this.targetY = this.sprite.y;
        this.direction = 'down';

        // Create animations
        this.createAnimations();

        // Set initial idle frame
        this.sprite.setFrame(1); // Middle frame of walk_down (row 1)

        // Input keys
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.wasd = {
            up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            interact: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            enter: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        };
    }

    createAnimations() {
        // Only create animations if they don't exist yet
        if (!this.scene.anims.exists('walk_down')) {
            // Walk down (frames 0-2)
            this.scene.anims.create({
                key: 'walk_down',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: -1
            });

            // Walk left (frames 3-5)
            this.scene.anims.create({
                key: 'walk_left',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
                frameRate: 10,
                repeat: -1
            });

            // Walk right (frames 6-8)
            this.scene.anims.create({
                key: 'walk_right',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
                frameRate: 10,
                repeat: -1
            });

            // Walk up (frames 9-11)
            this.scene.anims.create({
                key: 'walk_up',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    getIdleFrame() {
        // Return middle frame for each direction
        switch(this.direction) {
            case 'down': return 1;
            case 'left': return 4;
            case 'right': return 7;
            case 'up': return 10;
            default: return 1;
        }
    }

    update() {
        if (this.isMoving) {
            this.handleGridMovement();
        } else {
            this.handleInput();
        }
    }

    handleInput() {
        let moveX = 0;
        let moveY = 0;

        // Check arrow keys and WASD
        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            moveX = -1;
            this.direction = 'left';
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            moveX = 1;
            this.direction = 'right';
        } else if (this.cursors.up.isDown || this.wasd.up.isDown) {
            moveY = -1;
            this.direction = 'up';
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            moveY = 1;
            this.direction = 'down';
        }

        if (moveX !== 0 || moveY !== 0) {
            const newTileX = this.tileX + moveX;
            const newTileY = this.tileY + moveY;

            // Check if move is valid (within bounds and not collision)
            if (this.canMoveTo(newTileX, newTileY)) {
                this.startMovement(newTileX, newTileY);
            }
        } else {
            // No keys pressed - show idle frame
            this.sprite.stop();
            this.sprite.setFrame(this.getIdleFrame());
        }

        // Check interact keys
        if (Phaser.Input.Keyboard.JustDown(this.wasd.interact) ||
            Phaser.Input.Keyboard.JustDown(this.wasd.enter)) {
            this.interact();
        }
    }

    canMoveTo(tileX, tileY) {
        // Check bounds
        if (tileX < 0 || tileX >= MAP_LAYOUT[0].length ||
            tileY < 0 || tileY >= MAP_LAYOUT.length) {
            return false;
        }

        // Check collision tile
        if (MAP_LAYOUT[tileY][tileX] === 2) {
            return false;
        }

        return true;
    }

    startMovement(newTileX, newTileY) {
        this.isMoving = true;
        this.tileX = newTileX;
        this.tileY = newTileY;
        this.targetX = newTileX * TILE_SIZE * SCALE;
        this.targetY = newTileY * TILE_SIZE * SCALE;

        // Play walk animation for current direction
        this.sprite.play(`walk_${this.direction}`, true);
    }

    handleGridMovement() {
        const speed = PLAYER_SPEED;
        const distance = Phaser.Math.Distance.Between(
            this.sprite.x, this.sprite.y,
            this.targetX, this.targetY
        );

        if (distance < 2) {
            // Snap to grid
            this.sprite.x = this.targetX;
            this.sprite.y = this.targetY;
            this.isMoving = false;

            // Stop animation and show idle frame
            this.sprite.stop();
            this.sprite.setFrame(this.getIdleFrame());
        } else {
            // Move towards target
            const angle = Phaser.Math.Angle.Between(
                this.sprite.x, this.sprite.y,
                this.targetX, this.targetY
            );

            this.sprite.body.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }

        if (!this.isMoving) {
            this.sprite.body.setVelocity(0, 0);
        }
    }

    interact() {
        // Get tile in front of player
        let checkX = this.tileX;
        let checkY = this.tileY;

        switch(this.direction) {
            case 'up': checkY -= 1; break;
            case 'down': checkY += 1; break;
            case 'left': checkX -= 1; break;
            case 'right': checkX += 1; break;
        }

        // Emit interaction event
        this.scene.events.emit('playerInteract', checkX, checkY);
    }

    getTilePosition() {
        return { x: this.tileX, y: this.tileY };
    }

}
