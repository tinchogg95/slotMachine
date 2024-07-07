import globals from './globals.js';

function generateImages(scene, imageKeys, imageObjects, xOffset, imageSpacing, totalImages, originX) {
    const config = scene.sys.game.config;

    for (let i = 0; i < totalImages; i++) {
        let randomIndex = Phaser.Math.Between(0, imageKeys.length - 1);
        let image = scene.add.image(config.width / 2 + xOffset, i * imageSpacing, imageKeys[randomIndex]).setOrigin(originX, 0.5);
        image.setScale(2.8);
        imageObjects.push(image);
    }
}

function updateAndResetImages(imageObjects, scrollSpeed, imageSpacing, screenHeight) {
    imageObjects.forEach(image => {
        image.y += scrollSpeed;

        if (image.y > screenHeight + imageSpacing) {
            image.y = -imageSpacing;
        }
    });
}

function printCenterImages() {
    const tolerance = 105;
    const centerPosition = 300;
    const centerImages = [];

    markCenterImages(globals.imageObjects, centerPosition, tolerance, centerImages);
    markCenterImages(globals.imageObjects2, centerPosition, tolerance, centerImages);
    markCenterImages(globals.imageObjects3, centerPosition, tolerance, centerImages);

    console.log('Center images:', centerImages);
    const firstImage = centerImages[0];
    let areAllTheSame = true;
    centerImages.forEach(imageSelected => {
        if (firstImage !== imageSelected) {
            areAllTheSame = false;
        }
    });
    if (areAllTheSame) {
        globals.rabbitMoney.setActive(true).setVisible(true);
        globals.textWinner.setActive(true).setVisible(true);
    } else {
        globals.sadFace.setActive(true).setVisible(true);
        globals.textWinner.setText("YOU LOSE");
        globals.textWinner.setActive(true).setVisible(true);
    }
}

function markCenterImages(imageArray, centerPosition, tolerance, centerImages) {
    imageArray.forEach(image => {
        if (Math.abs(image.y - centerPosition) <= tolerance) {
            centerImages.push(image.texture.key);
            image.setTint(0xff0000);
        }
    });
}

export { generateImages, updateAndResetImages, printCenterImages, markCenterImages };
