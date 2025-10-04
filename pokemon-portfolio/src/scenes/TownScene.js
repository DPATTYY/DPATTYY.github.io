class TownScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TownScene' });
    }

    create() {
        // Set world bounds
        const worldWidth = MAP_LAYOUT[0].length * TILE_SIZE * SCALE;
        const worldHeight = MAP_LAYOUT.length * TILE_SIZE * SCALE;
        this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

        // Create the map
        this.createMap();

        // Create buildings
        this.buildings = [];
        BUILDINGS_DATA.forEach(buildingData => {
            const building = new Building(this, buildingData);
            this.buildings.push(building);

            // Add hover effects
            building.sprite.on('pointerover', () => building.showHoverEffect());
            building.sprite.on('pointerout', () => building.hideHoverEffect());
        });

        // Create player at position (100, 100) in pixel coordinates
        // Convert to tile coordinates (assuming TILE_SIZE * SCALE)
        const startTileX = Math.floor(100 / (TILE_SIZE * SCALE));
        const startTileY = Math.floor(100 / (TILE_SIZE * SCALE));
        this.player = new Player(this, startTileX, startTileY);

        // Create dialogue box
        this.dialogueBox = new DialogueBox(this);

        // Setup camera
        this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        this.cameras.main.startFollow(this.player.sprite, true, 0.1, 0.1);

        // Handle player interactions
        this.events.on('playerInteract', this.handlePlayerInteraction, this);

        // Add instructions text
        this.createInstructions();

        // Easter egg - press 'P' for surprise
        this.input.keyboard.on('keydown-P', () => {
            this.dialogueBox.show('You found the secret! Try exploring every corner of the town!');
        });
    }

    createMap() {
        const tileSize = TILE_SIZE * SCALE;

        for (let y = 0; y < MAP_LAYOUT.length; y++) {
            for (let x = 0; x < MAP_LAYOUT[y].length; x++) {
                const tileType = MAP_LAYOUT[y][x];
                let color;

                switch(tileType) {
                    case 0: // Grass
                        color = COLORS.GRASS;
                        break;
                    case 1: // Path
                        color = COLORS.PATH;
                        break;
                    case 2: // Collision/Water
                        color = COLORS.COLLISION;
                        break;
                }

                const tile = this.add.rectangle(
                    x * tileSize,
                    y * tileSize,
                    tileSize,
                    tileSize,
                    color
                );
                tile.setOrigin(0, 0);

                // Add subtle variation for grass tiles
                if (tileType === 0 && Math.random() > 0.9) {
                    tile.setAlpha(0.9);
                }
            }
        }
    }

    createInstructions() {
        const instructions = this.add.text(10, 10,
            'Arrow Keys/WASD: Move | Space/Enter: Interact | Click Buildings to Enter',
            {
                fontSize: '14px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { x: 8, y: 4 }
            }
        );
        instructions.setScrollFactor(0);
        instructions.setDepth(1000);
    }

    handlePlayerInteraction(tileX, tileY) {
        // Check if interacting with a building entrance
        for (let building of this.buildings) {
            if (building.isAtEntrance(tileX, tileY)) {
                building.enter();
                return;
            }

            // Check if near building to show description
            if (building.canEnterFrom(this.player.tileX, this.player.tileY)) {
                const isFacingEntrance =
                    (this.player.direction === 'up' && tileY < this.player.tileY) ||
                    (this.player.direction === 'down' && tileY > this.player.tileY) ||
                    (this.player.direction === 'left' && tileX < this.player.tileX) ||
                    (this.player.direction === 'right' && tileX > this.player.tileX);

                if (isFacingEntrance) {
                    this.dialogueBox.show(building.description);
                    return;
                }
            }
        }

        // Check for special tiles or signs
        const tileType = MAP_LAYOUT[tileY] ? MAP_LAYOUT[tileY][tileX] : null;

        if (tileType === 2) {
            this.dialogueBox.show('The water sparkles in the sunlight. You can\'t go this way!');
        } else if (tileType === 0 && Math.random() > 0.7) {
            const messages = [
                'Nothing here... or is there?',
                'You found some grass! Exciting!',
                'A wild portfolio appears!',
                'This town is peaceful. Its people, kind.'
            ];
            this.dialogueBox.show(messages[Math.floor(Math.random() * messages.length)]);
        }
    }

    update() {
        // Don't update player if dialogue is active or modal is open
        if (!this.dialogueBox.isShowing() &&
            document.getElementById('modal-overlay').classList.contains('hidden')) {
            this.player.update();
        }
    }

}
