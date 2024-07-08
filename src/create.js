import { generateImages } from './helpers.js';
import globals from './globals.js';

const WINNER_MESSAGE = '¡YOU WIN!';
const FONT_FAMILY = 'Bebas Neue';

// 
function create() {
    const config = this.sys.game.config;
    // space between images
    const imageSpacing = 200;
    // total of images. The more images there are, the more random it will be.
    const totalImages = 500;
    const centerPosition = config.height / 2;

    globals.textWinner = this.add.text(325, 350, WINNER_MESSAGE, { fontFamily: FONT_FAMILY, fontSize: '48px', color: '#FFD700' });
    const imageKeys = ["image1", "image2", "image3"];
    // create images
    this.add.image(400, 300, 'background');
    let rightArrow = this.add.image(60, 300, 'arrow');
    let leftArrow = this.add.image(730, 300, 'arrow');
    let widthImages = 110; 
    leftArrow.setScale(0.25);
    leftArrow.rotation = Math.PI;
    rightArrow.setScale(0.25);

    globals.rabbitMoney = this.add.image(400, 100, 'rabbitMoney');
    globals.sadFace = this.add.image(400, 200, 'sadFace');
    globals.sadFace.setScale(0.25);

    //create animations

    this.tweens.add({
        targets: [globals.rabbitMoney, globals.sadFace],
        y: 400,
        duration: 2000,
        ease: 'Linear',
        repeat: 1,
        yoyo: true
    });

    //hide some images to show them later
    globals.sadFace.setActive(true).setVisible(false);
    globals.rabbitMoney.setActive(true).setVisible(false);
    globals.textWinner.setActive(true).setVisible(false);

    // create the 3 reels of random images
    generateImages(this, imageKeys, globals.imageObjects, 0, imageSpacing, totalImages, 1.5);
    generateImages(this, imageKeys, globals.imageObjects2, widthImages, imageSpacing, totalImages, 1.0);
    generateImages(this, imageKeys, globals.imageObjects3, 2 * widthImages, imageSpacing, totalImages, 0.5);

    //create buttons

    globals.restartButton = this.add.image((config.width / 2), config.height - 50, "restartButton").setOrigin(0.5, 0.5).setInteractive();
    globals.restartButton.setScale(0.75);
    globals.restartButton.setActive(true).setVisible(false);

    globals.spinButton = this.add.image((config.width / 2), config.height - 50, "spinButton").setOrigin(0.5, 0.5).setInteractive();
    globals.spinButton.setScale(0.75);

    globals.restartButton.on('pointerdown', () => {
        location.reload();
    });

    globals.spinButton.on('pointerdown', () => {
        globals.isButtonPressed = true;
        globals.scrollSpeed = 25;
        globals.spinButton.setActive(true).setVisible(false);

    });
    // bring images to the top

    this.children.bringToTop(globals.spinButton);
    this.children.bringToTop(rightArrow);
    this.children.bringToTop(leftArrow);
    this.children.bringToTop(globals.rabbitMoney);
    this.children.bringToTop(globals.textWinner);
    this.children.bringToTop(globals.sadFace);
    this.children.bringToTop(globals.restartButton);

}

export { create };
