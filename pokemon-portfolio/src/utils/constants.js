// Game constants
const TILE_SIZE = 16;
const SCALE = 3; // Pixel scale multiplier
const PLAYER_SPEED = 100;

// Building types
const BUILDING_TYPES = {
    LAB: 'lab',
    LIBRARY: 'library',
    TOWNHALL: 'townhall',
    POKEMART: 'pokemart'
};

// Building positions and data
const BUILDINGS_DATA = [
    {
        x: 5,
        y: 3,
        type: BUILDING_TYPES.LAB,
        name: 'Tech Lab',
        description: 'A high-tech laboratory where groundbreaking projects come to life!',
        entrance: { x: 6, y: 5 }
    },
    {
        x: 12,
        y: 3,
        type: BUILDING_TYPES.LIBRARY,
        name: 'Library',
        description: 'Learn about the trainer\'s journey and achievements.',
        entrance: { x: 13, y: 5 }
    },
    {
        x: 5,
        y: 9,
        type: BUILDING_TYPES.TOWNHALL,
        name: 'Town Hall',
        description: 'Discover the trainer\'s work history and leadership experience.',
        entrance: { x: 6, y: 11 }
    },
    {
        x: 12,
        y: 9,
        type: BUILDING_TYPES.POKEMART,
        name: 'PokéMart',
        description: 'Fun extras, hobbies, and hidden surprises await!',
        entrance: { x: 13, y: 11 }
    }
];

// Map layout (0 = grass, 1 = path, 2 = collision/water)
const MAP_LAYOUT = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,2,2,2,2,0,0,0,2,2,2,2,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

// Colors for placeholder graphics
const COLORS = {
    GRASS: 0x4CAF50,
    PATH: 0xD2B48C,
    COLLISION: 0x2196F3,
    LAB: 0xFF5722,
    LIBRARY: 0x9C27B0,
    TOWNHALL: 0xFFC107,
    POKEMART: 0x03A9F4,
    PLAYER: 0xFF0000
};
