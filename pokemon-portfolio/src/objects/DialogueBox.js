class DialogueBox {
    constructor(scene) {
        this.scene = scene;
        this.isActive = false;
        this.htmlElement = document.getElementById('dialogue-box');
        this.textElement = document.getElementById('dialogue-text');
        this.currentText = '';
        this.textIndex = 0;
        this.typewriterSpeed = 30; // milliseconds per character
        this.typewriterTimer = null;

        // Setup input listener for advancing dialogue
        this.setupInput();
    }

    setupInput() {
        this.scene.input.keyboard.on('keydown-SPACE', () => {
            if (this.isActive) {
                this.advance();
            }
        });

        this.scene.input.keyboard.on('keydown-ENTER', () => {
            if (this.isActive) {
                this.advance();
            }
        });
    }

    show(text) {
        this.currentText = text;
        this.textIndex = 0;
        this.isActive = true;
        this.htmlElement.classList.remove('hidden');
        this.textElement.textContent = '';

        // Start typewriter effect
        this.startTypewriter();
    }

    startTypewriter() {
        if (this.typewriterTimer) {
            clearInterval(this.typewriterTimer);
        }

        this.typewriterTimer = setInterval(() => {
            if (this.textIndex < this.currentText.length) {
                this.textElement.textContent += this.currentText[this.textIndex];
                this.textIndex++;
            } else {
                clearInterval(this.typewriterTimer);
                this.typewriterTimer = null;
            }
        }, this.typewriterSpeed);
    }

    advance() {
        // If still typing, show full text immediately
        if (this.typewriterTimer) {
            clearInterval(this.typewriterTimer);
            this.typewriterTimer = null;
            this.textElement.textContent = this.currentText;
        } else {
            // Text fully displayed, close dialogue
            this.hide();
        }
    }

    hide() {
        this.isActive = false;
        this.htmlElement.classList.add('hidden');
        this.textElement.textContent = '';

        if (this.typewriterTimer) {
            clearInterval(this.typewriterTimer);
            this.typewriterTimer = null;
        }
    }

    isShowing() {
        return this.isActive;
    }
}
