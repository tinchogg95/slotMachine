import { updateAndResetImages, printCenterImages } from './helpers.js';
import globals from './globals.js';

function update(time, delta) {
    if (globals.isButtonPressed) {
        const config = this.sys.game.config;
        const imageSpacing = 200;

        updateAndResetImages(globals.imageObjects, globals.scrollSpeed, imageSpacing, config.height);
        updateAndResetImages(globals.imageObjects2, globals.scrollSpeed, imageSpacing, config.height);
        updateAndResetImages(globals.imageObjects3, globals.scrollSpeed, imageSpacing, config.height);

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
