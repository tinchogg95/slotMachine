// tests/create.spec.js
import globals from '../src/globals.js';
import { create, printCenterImages, updateAndResetImages, markCenterImages, generateImages } from '../src/create';

describe('Slot Machine Tests', function() {
  let scene;

  beforeEach(function() {
    scene = {
      sys: {
        game: {
          config: {
            width: 800,
            height: 600
          }
        }
      },
      add: {
        image: jasmine.createSpy('image').and.callFake(function(x, y, key) {
          return { x, y, key, setOrigin: function() {}, setScale: function() {}, setActive: function() {}, setVisible: function() {} };
        })
      }
    };

    globals.imageObjects = [];
    globals.imageObjects2 = [];
    globals.imageObjects3 = [];
  });

  it('should generate images correctly', function() {
    const imageKeys = ["image1", "image2", "image3"];
    generateImages(scene, imageKeys, globals.imageObjects, 0, 200, 10, 1.5);

    expect(globals.imageObjects.length).toBe(10);
    expect(scene.add.image).toHaveBeenCalled();
  });

  it('should update and reset images correctly', function() {
    globals.imageObjects = [{ y: 580 }, { y: 600 }, { y: 620 }];
    updateAndResetImages(globals.imageObjects, 10, 200, 600);

    expect(globals.imageObjects[0].y).toBe(590);
    expect(globals.imageObjects[2].y).toBe(-200);
  });

  it('should mark center images correctly', function() {
    const centerImages = [];
    globals.imageObjects = [{ y: 295, texture: { key: 'image1' }, setTint: function() {} }, { y: 305, texture: { key: 'image2' }, setTint: function() {} }];
    spyOn(globals.imageObjects[0], 'setTint');
    spyOn(globals.imageObjects[1], 'setTint');

    markCenterImages(globals.imageObjects, 300, 10, centerImages);

    expect(centerImages.length).toBe(2);
    expect(globals.imageObjects[0].setTint).toHaveBeenCalledWith(0xff0000);
    expect(globals.imageObjects[1].setTint).toHaveBeenCalledWith(0xff0000);
  });

  it('should print center images correctly', function() {
    globals.imageObjects = [{ y: 295, texture: { key: 'image1' }, setTint: function() {} }];
    globals.imageObjects2 = [{ y: 300, texture: { key: 'image1' }, setTint: function() {} }];
    globals.imageObjects3 = [{ y: 305, texture: { key: 'image1' }, setTint: function() {} }];
    globals.rabbitMoney = { setActive: function() {}, setVisible: function() {} };
    globals.textWinner = { setActive: function() {}, setVisible: function() {}, setText: function() {} };
    globals.sadFace = { setActive: function() {}, setVisible: function() {} };
    globals.spinButton = { setActive: function() {}, setVisible: function() {} };
    globals.restartButton = { setActive: function() {}, setVisible: function() {} };

    spyOn(globals.rabbitMoney, 'setActive');
    spyOn(globals.rabbitMoney, 'setVisible');
    spyOn(globals.textWinner, 'setActive');
    spyOn(globals.textWinner, 'setVisible');
    spyOn(globals.textWinner, 'setText');
    spyOn(globals.sadFace, 'setActive');
    spyOn(globals.sadFace, 'setVisible');
    spyOn(globals.spinButton, 'setActive');
    spyOn(globals.spinButton, 'setVisible');
    spyOn(globals.restartButton, 'setActive');
    spyOn(globals.restartButton, 'setVisible');

    printCenterImages();

    expect(globals.rabbitMoney.setActive).toHaveBeenCalledWith(true);
    expect(globals.rabbitMoney.setVisible).toHaveBeenCalledWith(true);
    expect(globals.textWinner.setActive).toHaveBeenCalledWith(true);
    expect(globals.textWinner.setVisible).toHaveBeenCalledWith(true);
    expect(globals.sadFace.setActive).not.toHaveBeenCalled();
    expect(globals.sadFace.setVisible).not.toHaveBeenCalled();
    expect(globals.spinButton.setActive).toHaveBeenCalledWith(false);
    expect(globals.restartButton.setActive).toHaveBeenCalledWith(true);
  });
});
