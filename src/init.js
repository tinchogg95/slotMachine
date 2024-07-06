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
const imageSpacing = 200; // Spacing between images
let scrollSpeed = 25; // Speed of scrolling
let isButtonPressed = false; // Flag to check if the button is pressed
const centerPosition = config.height / 2; // Central position of the screen

function preload() {
    // Load images into the game
    this.load.image("background", "./assets/background.jpg");
    this.load.image("arrow", "./assets/blue-arrow.png");
    this.load.image("image1", "./assets/lemon.jpg");
    this.load.image("image2", "./assets/bananas.jpg");
    this.load.image("image3", "./assets/watermelon.jpg");
    this.load.image("spinButton", "./assets/blue-spin-button.png");
}

function create() {
    // Array of image keys
    const imageKeys = ["image1", "image2", "image3"];
    // Add the background image
    let background = this.add.image(400, 300, 'background');
    let rightArrow = this.add.image(60, 300, 'arrow');
    let leftArrow = this.add.image(730, 300, 'arrow');
    leftArrow.setScale(0.25);
    leftArrow.rotation = Math.PI;
    rightArrow.setScale(0.25);

    // Generate a random order of images for three lists of 24 items each
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let imagee = this.add.image(config.width / 2 + 10, i * imageSpacing, imageKeys[randomIndex]).setOrigin(1.5, 0.5);
        imagee.setScale(2.8);
        imageObjects.push(imagee);
    }
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let imagee2 = this.add.image(config.width / 2 + 110, i * imageSpacing, imageKeys[randomIndex]).setOrigin(1.0, 0.5);
        imagee2.setScale(2.8);
        imageObjects.push(imagee2);
    }
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let imagee3 = this.add.image(config.width / 2 + 210, i * imageSpacing, imageKeys[randomIndex]).setOrigin(0.5, 0.5);
        imagee3.setScale(2.8);
        imageObjects.push(imagee3);
    }

    // Add the spin button and position it to the left and bring it to the front
    let spinButton = this.add.image((config.width / 2) + 30, config.height - 50, "spinButton").setOrigin(0.5, 0.5).setInteractive();
    spinButton.setScale(0.75);
    // Add event listener for the button
    spinButton.on('pointerdown', () => {
        isButtonPressed = true;
        scrollSpeed = 25; // Reset scroll speed when button is pressed
    });

    // Ensure the spin button is brought to the front
    this.children.bringToTop(spinButton);
    this.children.bringToTop(rightArrow);
    this.children.bringToTop(leftArrow);

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
    const tolerance = 105; // Tolerance to consider an image at the center
    let centerImages = [];

    imageObjects.forEach(image => {
        if (Math.abs(image.y - centerPosition) <= tolerance) {
            centerImages.push(image.texture.key);   
            // Add a border or effect to mark the center images
            image.setTint(0xff0000); // Example: Red tint to mark center images
        } else {
            // Reset any previous marking or effect
            image.clearTint();
        }
    });
    
    console.log('Center images:', centerImages);
    centerImages.forEach(centerImg  => {
        console.log(centerImg.x);
        console.log(centerImg.y);
    })
}
