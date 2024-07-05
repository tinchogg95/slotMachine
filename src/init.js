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
const totalImages = 24; // Total number of images in the list
const imageSpacing = 200; // Spacing between images
let scrollSpeed = 25; // Speed of scrolling
let isButtonPressed = false; // Flag to check if the button is pressed
const centerPosition = config.height / 2; // Central position of the screen

function preload() {
    // Load images into the game
    this.load.image("image1", "./assets/lemon.jpg");
    this.load.image("image2", "./assets/bananas.jpg");
    this.load.image("image3", "./assets/watermelon.jpg");
    this.load.image("spinButton", "./assets/spinButton.jpeg");
}

function create() {
    // Array of image keys
    const imageKeys = ["image1", "image2", "image3"];
    // Add the spin button and position it to the left
    let spinButton = this.add.image(200, config.height / 2, "spinButton").setOrigin(0.5, 0.5).setInteractive();
    
    // Add event listener for the button
    spinButton.on('pointerdown', () => {
        isButtonPressed = true;
        scrollSpeed = 25; // Reset scroll speed when button is pressed
    });

    // Generate a random order of images for a list of 50 items
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let imagee = this.add.image(config.width / 2, i * imageSpacing, imageKeys[randomIndex]).setOrigin(0.9, 0.5);
        imagee.setScale(2.9);
        imageObjects.push(imagee);
    }
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let imagee2 = this.add.image(config.width / 2 + 150, i * imageSpacing, imageKeys[randomIndex]).setOrigin(0.7, 0.5);
        imagee2.setScale(2.9);
        imageObjects.push(imagee2);
    }
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let imagee3 = this.add.image(config.width / 2 + 300, i * imageSpacing, imageKeys[randomIndex]).setOrigin(0.5, 0.5);
        imagee3.setScale(2.9);
        imageObjects.push(imagee3);
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
    if (isButtonPressed) {
       

        // Decrease the scroll speed progressively
        if (scrollSpeed > 0) {
            scrollSpeed -= 0.25;
        } else if (scrollSpeed <= 0) {
            scrollSpeed = 0;
            isButtonPressed = false;
            printCenterImages();
        }
    }
}

function printCenterImages() {
    const tolerance = 75; // Tolerance to consider an image at the center
    let centerImages = [];

    imageObjects.forEach(image => {
        if (Math.abs(image.y - centerPosition) <= tolerance) {
            centerImages.push(image.texture.key);
        }
    });

    console.log('Center images:', centerImages);
}
