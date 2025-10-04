class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        // Display loading text
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const loadingText = this.add.text(centerX, centerY, 'Loading...', {
            fontSize: '32px',
            fill: '#fff'
        });
        loadingText.setOrigin(0.5);

        // Create loading bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - 160, centerY + 50, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(centerX - 150, centerY + 60, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load player spritesheet
        this.load.spritesheet('player', 'assets/sprites/player.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        // Load other assets when available
        // this.load.image('lab', 'assets/sprites/lab.png');
        // this.load.image('library', 'assets/sprites/library.png');
        // this.load.image('townhall', 'assets/sprites/townhall.png');
        // this.load.image('pokemart', 'assets/sprites/pokemart.png');
        // this.load.image('tileset', 'assets/tilesets/town.png');
    }

    create() {
        // Start the main town scene
        this.scene.start('TownScene');
    }
}
