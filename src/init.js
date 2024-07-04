const config = {
    width: 800,
    height: 600,
    parent: "game-container",
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

var game = new Phaser.Game(config);

let imageObjects = []; // Array to hold image objects
const totalImages = 50; // Total number of images in the list
const imageSpacing = 100; // Spacing between images
const scrollSpeed = 2; // Speed of scrolling

function preload() {
     // Array to hold image objects for the first list
    let imageObjects1 = [];
    // Array to hold image objects for the second list
    let imageObjects2 = []; 
    // Array to hold image objects for the third list
    let imageObjects3 = []; 
    // Load images into the game
    this.load.image("image1", "./assets/lemon.jpg");
    this.load.image("image2", "./assets/bananas.jpg");
    this.load.image("image3", "./assets/watermelon.jpg");
    // Load the spin button image
    this.load.image("spinButton", "./assets/spinButton.jpeg"); 
}

function create() {
    // Array of image keys
    const imageKeys = ["image1", "image2", "image3"];
      // Add the spin button and position it to the left
      let spinButton = this.add.image(50, config.height /2, "spinButton").setOrigin(0.5, 0.5).setInteractive();
    // Generate a random order of images for a list of 50 items
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let image = this.add.image(config.width / 2, i * imageSpacing, imageKeys[randomIndex]).setOrigin(0.5, 0.5);
        let image2 = this.add.image(config.width / 2, i * imageSpacing, imageKeys[randomIndex]).setOrigin(2.5, 0.5);
        imageObjects.push(image);
        imageObjects.push(image2);
    }
    
}

function update(time, delta) {
    // Update position of each image
    imageObjects.forEach(image => {
        image.y += scrollSpeed;

        // Reset position if image moves out of the screen
        if (image.y > config.height + imageSpacing) {
            image.y = -imageSpacing;
        }
    });
}
