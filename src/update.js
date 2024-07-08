import globals from './globals.js';
import { updateAndResetImages, printCenterImages } from './helpers.js';

function update(time, delta) {
    if (globals.isButtonPressed) {
        updateAndResetImages(globals.imageObjects, globals.imageKeys, globals.scrollSpeed, globals.imageSpacing, globals.config.height, this);
        updateAndResetImages(globals.imageObjects2, globals.imageKeys, globals.scrollSpeed, globals.imageSpacing, globals.config.height, this);
        updateAndResetImages(globals.imageObjects3, globals.imageKeys, globals.scrollSpeed, globals.imageSpacing, globals.config.height, this);

        if (globals.scrollSpeed > 0) {
            setTimeout(() => {
                globals.scrollSpeed -= 0.25;
            }, 2000);
        } else if (globals.scrollSpeed <= 0) {
            globals.scrollSpeed = 0;
            globals.isButtonPressed = false;
            printCenterImages();
        }
    }
}

export { update };