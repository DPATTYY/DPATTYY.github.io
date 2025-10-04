class Building {
    constructor(scene, data) {
        this.scene = scene;
        this.type = data.type;
        this.name = data.name;
        this.description = data.description;
        this.entrance = data.entrance;

        // Create building sprite (placeholder colored rectangle)
        const color = this.getBuildingColor(data.type);

        this.sprite = scene.add.rectangle(
            data.x * TILE_SIZE * SCALE,
            data.y * TILE_SIZE * SCALE,
            TILE_SIZE * SCALE * 3,
            TILE_SIZE * SCALE * 2,
            color
        );

        this.sprite.setOrigin(0, 0);

        // Add label
        this.label = scene.add.text(
            data.x * TILE_SIZE * SCALE + (TILE_SIZE * SCALE * 1.5),
            data.y * TILE_SIZE * SCALE - 15,
            data.name,
            {
                fontSize: '12px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { x: 4, y: 2 }
            }
        );
        this.label.setOrigin(0.5, 0.5);

        // Create entrance marker (door)
        if (data.entrance) {
            this.door = scene.add.rectangle(
                data.entrance.x * TILE_SIZE * SCALE,
                data.entrance.y * TILE_SIZE * SCALE,
                TILE_SIZE * SCALE,
                TILE_SIZE * SCALE,
                0x8B4513
            );
            this.door.setAlpha(0.7);
        }

        // Make interactive
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => this.enter());
    }

    getBuildingColor(type) {
        switch(type) {
            case BUILDING_TYPES.LAB: return COLORS.LAB;
            case BUILDING_TYPES.LIBRARY: return COLORS.LIBRARY;
            case BUILDING_TYPES.TOWNHALL: return COLORS.TOWNHALL;
            case BUILDING_TYPES.POKEMART: return COLORS.POKEMART;
            default: return 0x666666;
        }
    }

    isAtEntrance(tileX, tileY) {
        if (!this.entrance) return false;
        return this.entrance.x === tileX && this.entrance.y === tileY;
    }

    canEnterFrom(tileX, tileY) {
        if (!this.entrance) return false;

        // Check if player is adjacent to entrance
        const dx = Math.abs(this.entrance.x - tileX);
        const dy = Math.abs(this.entrance.y - tileY);

        return (dx <= 1 && dy === 0) || (dx === 0 && dy <= 1);
    }

    enter() {
        // Call the modal opening function
        if (typeof openModal === 'function') {
            openModal(this.type);
        }
    }

    showHoverEffect() {
        this.sprite.setAlpha(0.8);
        if (this.door) this.door.setAlpha(1);
    }

    hideHoverEffect() {
        this.sprite.setAlpha(1);
        if (this.door) this.door.setAlpha(0.7);
    }

    // Method to replace with actual sprite when you have assets
    setSprite(spriteKey) {
        const oldX = this.sprite.x;
        const oldY = this.sprite.y;

        this.sprite.destroy();

        this.sprite = this.scene.add.sprite(oldX, oldY, spriteKey);
        this.sprite.setOrigin(0, 0);
        this.sprite.setScale(SCALE);
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', () => this.enter());
    }
}
