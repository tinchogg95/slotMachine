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

let imageObjects =  []; // Array to hold image objects
let imageObjects2 = []; // Array to hold image objects
let imageObjects3 = []; // Array to hold image objects

const totalImages = 500; // Total number of images in the list, the more images there are the more random it will be
const imageSpacing = 200; // Spacing between images
let scrollSpeed = 25; // Speed of scrolling
let isButtonPressed = false; // Flag to check if the button is pressed
const centerPosition = config.height / 2; // Central position of the screen
let rabbitMoney;
let textWinner;
let spinButton;
let restartButton;
let sadFace;


function preload() {
    // Load images into the game
    this.load.image("background", "./assets/background.jpg");
    this.load.image("arrow", "./assets/blue-arrow.png");
    this.load.image("image1", "./assets/lemon.jpg");
    this.load.image("image2", "./assets/bananas.jpg");
    this.load.image("image3", "./assets/watermelon.jpg");
    this.load.image("spinButton", "./assets/blue-spin-button.png");
    this.load.image("restartButton", "./assets/restart_button.png");
    this.load.image("sadFace", "./assets/sadFace.png");
    this.load.image("rabbitMoney", "./assets/rabbit_money.gif");
}

function create() {
    textWinner = this.add.text(325, 350, '¡YOU WIN!', { fontFamily: 'Bebas Neue', fontSize: '48px', color: '#FFD700'});
    // Array of image keys
    const imageKeys = ["image1", "image2", "image3"];
    // Add the background image
    this.add.image(400, 300, 'background');
    let rightArrow = this.add.image(60, 300, 'arrow');
    let leftArrow = this.add.image(730, 300, 'arrow');
    // Set the image widths so they are uniform
    let widthImages = 110; 
    leftArrow.setScale(0.25);
    leftArrow.rotation = Math.PI;
    rightArrow.setScale(0.25);

    rabbitMoney = this.add.image(400, 100, 'rabbitMoney');
    sadFace = this.add.image(400, 200, 'sadFace');
    sadFace.setScale(0.25);

    this.tweens.add({
        targets: rabbitMoney, sadFace,
        y: 400,        // Nueva posición en y
        duration: 2000,  // Duración en milisegundos
        ease: 'Linear',  // Tipo de interpolación (ease)
        repeat: 1,       // Número de repeticiones (-1 para bucle infinito)
        yoyo: true       // Hace que el tween regrese al punto de inicio al final
    });
    sadFace.setActive(true).setVisible(false);
    rabbitMoney.setActive(true).setVisible(false);
    textWinner.setActive(true).setVisible(false);

    // Generate a random order of images for three lists of 24 items each
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let lemonImage = this.add.image(config.width / 2 , i * imageSpacing, imageKeys[randomIndex]).setOrigin(1.5, 0.5);
        lemonImage.setScale(2.8);
        imageObjects.push(lemonImage);
    }
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let bananasImage = this.add.image(config.width / 2 + widthImages, i * imageSpacing, imageKeys[randomIndex]).setOrigin(1.0, 0.5);
        bananasImage.setScale(2.8);
        imageObjects2.push(bananasImage);
    }
    
    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let watermelon = this.add.image(config.width / 2 + 2*(widthImages), i * imageSpacing, imageKeys[randomIndex]).setOrigin(0.5, 0.5);
        watermelon.setScale(2.8);
        imageObjects3.push(watermelon);
    }

    // Add the spin button and position it to the left and bring it to the front
    let spinButton = this.add.image((config.width / 2), config.height - 50, "spinButton").setOrigin(0.5, 0.5).setInteractive();
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
    this.children.bringToTop(rabbitMoney);
    this.children.bringToTop(textWinner);
    this.children.bringToTop(sadFace);
}

function update(time, delta) {
    

    if (isButtonPressed) {
            // Update position of each image
    imageObjects.forEach(image => {
        image.y += scrollSpeed;

        // Reset position if image moves out of the screen
        
        if (image.y > config.height + imageSpacing) {
            image.y = -imageSpacing;
        }
    });
    imageObjects2.forEach(image => {
        image.y += scrollSpeed;
        
        // Reset position if image moves out of the screen
        if (image.y > config.height + imageSpacing) {
            image.y = -imageSpacing;
        }
    });
    imageObjects3.forEach(image => {
        image.y += scrollSpeed;

        // Reset position if image moves out of the screen
        if (image.y > config.height + imageSpacing) {
            image.y = -imageSpacing;
        }
    });

        // Decrease the scroll speed progressively
        if (scrollSpeed > 0) {
            setTimeout(() => {
                scrollSpeed -= 0.25;
            }, 2000);
           //
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
    let allTheSame = true;
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

    imageObjects2.forEach(image => {
        if (Math.abs(image.y - centerPosition) <= tolerance) {
            centerImages.push(image.texture.key);   
            // Add a border or effect to mark the center images
            image.setTint(0xff0000); // Example: Red tint to mark center images
        } else {
            // Reset any previous marking or effect
            image.clearTint();
        }
    });

    imageObjects3.forEach(image => {
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
    firstImage = centerImages[0];
    var areAllTheSame = true;
    centerImages.forEach(imageSelected => {
        if(firstImage != imageSelected){
            areAllTheSame = false;
        }
    });
    if (areAllTheSame){
        rabbitMoney.setActive(true).setVisible(true);
        textWinner.setActive(true).setVisible(true);
    }else{
        sadFace.setActive(true).setVisible(true);
        textWinner.setText("YOU LOSE");
        textWinner.setActive(true).setVisible(true);
    }
}
