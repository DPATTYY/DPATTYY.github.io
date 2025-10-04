# 🎮 Pokémon-Style Interactive Portfolio

An interactive portfolio website inspired by classic Game Boy Pokémon games. Navigate a pixel-art town using a character sprite and explore different buildings to discover portfolio content.

## ✨ Features

- **Retro RPG Movement**: Grid-based character movement using arrow keys or WASD
- **Interactive Buildings**: 4 unique buildings serving as portfolio sections
  - 🔬 **Tech Lab** - Projects and case studies
  - 📚 **Library** - About me, bio, and CV
  - 🏛️ **Town Hall** - Work experience and leadership
  - 🛒 **PokéMart** - Fun extras, hobbies, and easter eggs
- **Pokémon-Style Dialogue System**: Classic typewriter text boxes for interactions
- **Collision Detection**: Can't walk through buildings or water
- **Responsive Modal System**: Clean portfolio content display
- **Pixel Art Aesthetic**: Retro Game Boy/Advance inspired styling

## 🚀 Quick Start

### Option 1: Direct Browser Open
1. Simply open `index.html` in a modern web browser
2. No server required for basic functionality!

### Option 2: Local Server (Recommended)
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server -p 8000
```

Then navigate to `http://localhost:8000`

## 🎯 Controls

- **Arrow Keys** or **WASD**: Move character
- **Space** or **Enter**: Interact with objects/advance dialogue
- **Mouse Click**: Click buildings to enter directly
- **ESC**: Close modals
- **P**: Easter egg surprise!

## 📁 Project Structure

```
pokemon-portfolio/
├── index.html              # Main HTML entry point
├── css/
│   └── styles.css         # All styling (modals, dialogue, responsive)
├── src/
│   ├── main.js            # Phaser game configuration
│   ├── utils/
│   │   └── constants.js   # Game constants and data
│   ├── objects/
│   │   ├── Player.js      # Player character logic
│   │   ├── Building.js    # Building interaction system
│   │   └── DialogueBox.js # Dialogue system
│   └── scenes/
│       ├── PreloadScene.js # Asset loading
│       └── TownScene.js    # Main game scene
└── assets/                 # Your sprites go here
    ├── sprites/
    │   ├── player.png     # Character spritesheet
    │   ├── lab.png        # Building sprites
    │   ├── library.png
    │   ├── townhall.png
    │   └── pokemart.png
    ├── tilesets/
    │   └── town.png       # Map tileset
    └── audio/             # Optional sound effects
```

## 🎨 Adding Your Own Sprites

Currently, the game uses colored placeholders. To add your custom pixel art:

### 1. Character Sprite
- Create a 16x16px spritesheet with 4 rows (down, up, left, right)
- Each row should have 3 frames for walk animation
- Save as `assets/sprites/player.png`

### 2. Replace Player Graphics
In `src/scenes/PreloadScene.js`, uncomment:
```javascript
this.load.spritesheet('player', 'assets/sprites/player.png', {
    frameWidth: 16,
    frameHeight: 16
});
```

In `src/scenes/TownScene.js`, call:
```javascript
this.player.setSprite('player');
```

### 3. Building Sprites
- Create PNG images for each building
- Recommended size: 48x32px (3 tiles wide, 2 tiles tall)
- Save in `assets/sprites/`

Load in `PreloadScene.js`:
```javascript
this.load.image('lab', 'assets/sprites/lab.png');
this.load.image('library', 'assets/sprites/library.png');
```

Replace in `TownScene.js`:
```javascript
this.buildings.forEach(building => {
    building.setSprite(building.type);
});
```

### 4. Map Tileset
- Create a tileset image with grass, path, and water tiles
- Size: 16x16px per tile
- Use Tiled map editor or modify `MAP_LAYOUT` in `constants.js`

## 🛠️ Customization Guide

### Update Portfolio Content
Edit the modal content in `index.html` (lines 30-120):
```javascript
const content = {
    lab: `...your projects HTML...`,
    library: `...your bio HTML...`,
    townhall: `...your experience HTML...`,
    pokemart: `...your extras HTML...`
};
```

### Modify Town Layout
Edit `MAP_LAYOUT` in `src/utils/constants.js`:
- `0` = Grass (walkable)
- `1` = Path (walkable)
- `2` = Collision/Water (blocked)

### Change Building Positions
Edit `BUILDINGS_DATA` in `src/utils/constants.js`:
```javascript
{
    x: 5,           // Tile X position
    y: 3,           // Tile Y position
    type: 'lab',    // Building type
    name: 'Tech Lab',
    description: 'Your description',
    entrance: { x: 6, y: 5 } // Door position
}
```

### Adjust Colors
Modify `COLORS` object in `src/utils/constants.js`

## 🎭 Advanced Features

### Add Animations
The `Player.js` class includes an `createAnimations()` method ready for spritesheets:
```javascript
// Automatically creates walk_down, walk_up, walk_left, walk_right
// And idle_down, idle_up, idle_left, idle_right
```

### Add NPCs or Signs
Create new interactable objects in `TownScene.js`:
```javascript
const sign = this.add.rectangle(x, y, size, size, color);
// Add to collision checking in handlePlayerInteraction()
```

### Add Sound Effects
Uncomment audio loading in `PreloadScene.js`:
```javascript
this.load.audio('step', 'assets/audio/step.mp3');
this.load.audio('interact', 'assets/audio/interact.mp3');
```

Play in appropriate methods:
```javascript
this.sound.play('step');
```

## 📱 Responsive Design

The game automatically scales to fit the browser window while maintaining aspect ratio. CSS includes mobile-friendly styles for modals and dialogue boxes.

## 🐛 Troubleshooting

**Game doesn't load:**
- Check browser console for errors
- Ensure all file paths are correct
- Use a local server instead of opening HTML directly

**Sprites don't appear:**
- Verify file paths in PreloadScene.js
- Check that images are in correct format (PNG)
- Ensure spritesheet dimensions match frame sizes

**Movement feels laggy:**
- Adjust `PLAYER_SPEED` in `src/utils/constants.js`
- Reduce `SCALE` value if performance is poor

## 🎨 Sprite Resources

Free pixel art resources:
- [OpenGameArt.org](https://opengameart.org/)
- [itch.io Game Assets](https://itch.io/game-assets/free)
- [Kenney.nl](https://kenney.nl/assets)
- [Pokémon Essentials](https://www.pokecommunity.com/showthread.php?t=267243)

## 📝 License

This project is open source. Feel free to use, modify, and distribute as needed for your portfolio.

## 🤝 Credits

- Built with [Phaser 3](https://phaser.io/)
- Inspired by Game Freak's Pokémon games
- Pixel art font: [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)

---

**Enjoy building your interactive portfolio! 🎮✨**

For questions or issues, feel free to reach out or open an issue on GitHub.
