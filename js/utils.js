function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function checkForCharacterCollision({
  characters,
  player,
  characterOffset = { x: 0, y: 0 }
}) {
  player.interactionAsset = null
  // monitor for character collision
  for (let i = 0; i < characters.length; i++) {
    const character = characters[i]

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...character,
          position: {
            x: character.position.x + characterOffset.x,
            y: character.position.y + characterOffset.y
          }
        }
      })
    ) {
      player.interactionAsset = character
      break
    }
  }
}

function checkForBuildingCollision({ buildings, player }) {
  player.nearBuilding = null
  // monitor for building collision
  for (let i = 0; i < buildings.length; i++) {
    const building = buildings[i]

    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: building
      })
    ) {
      player.nearBuilding = building
      break
    }
  }
}

// Modal control variables
let isModalOpen = false

function openModal(modalId) {
  const modal = document.getElementById(modalId)
  const fadeOverlay = document.querySelector('#overlappingDiv')

  if (modal && fadeOverlay) {
    // Play door opening sound
    if (audio && audio.doorOpen) {
      audio.doorOpen.play()
    }

    // Fade to black
    gsap.to(fadeOverlay, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        // Show modal after fade completes
        modal.classList.add('show')
        isModalOpen = true

        // Fade back to transparent to reveal modal
        gsap.to(fadeOverlay, {
          opacity: 0,
          duration: 0.3
        })
      }
    })
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  const fadeOverlay = document.querySelector('#overlappingDiv')

  if (modal && fadeOverlay) {
    // Fade to black
    gsap.to(fadeOverlay, {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        // Hide modal after fade completes
        modal.classList.remove('show')
        isModalOpen = false

        // Fade back to transparent to reveal game
        gsap.to(fadeOverlay, {
          opacity: 0,
          duration: 0.3
        })
      }
    })
  }
}
