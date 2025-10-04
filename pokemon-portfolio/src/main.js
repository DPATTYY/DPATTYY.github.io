// Handle intro banner animation and removal
window.addEventListener('DOMContentLoaded', () => {
    const introBanner = document.getElementById('intro-banner');

    // Wait 3 seconds, then fade out
    setTimeout(() => {
        introBanner.classList.add('fade-out');

        // Remove banner after fade out animation completes (800ms)
        setTimeout(() => {
            introBanner.remove();

            // Initialize the Phaser game after banner is removed
            initGame();
        }, 800);
    }, 3000);
});

function initGame() {
    // Phaser Game Configuration
    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'phaser-game',
        backgroundColor: '#87CEEB',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: [PreloadScene, TownScene],
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };

    // Initialize the game
    const game = new Phaser.Game(config);

    // Make game globally accessible for modal control
    window.game = game;
}
