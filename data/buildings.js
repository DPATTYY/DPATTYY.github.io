// Building interaction zones
// Player ALWAYS stays at screen position {x: 488, y: 254}
// The world moves, not the player
// So buildings need to be at screen coordinates too!
const buildingsData = [
  {
    id: 'aboutme',
    name: 'About Me',
    position: { x: 470, y: 240 }, // Right on top of player
    width: 80,
    height: 80,
    modalId: 'aboutMeModal'
  },
  {
    id: 'projects',
    name: 'Projects',
    position: { x: 300, y: 200 }, // To the left of player
    width: 100,
    height: 100,
    modalId: 'projectsModal'
  }
]
