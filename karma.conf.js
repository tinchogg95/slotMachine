module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            './node_modules/phaser/dist/phaser.js', // Añadir Phaser si no lo has hecho ya
            'src/*.js',
            'tests/*.js',
            { pattern: 'assets/*.png', watched: false, included: false, served: true },
            { pattern: 'assets/*.jpg', watched: false, included: false, served: true },
        ],
        preprocessors: {
            'src/*.js': ['webpack'],
            'tests/*.js': ['webpack']
        },
        webpack: {
            // Configuración de webpack si es necesario
        },
        browsers: ['Chrome'],
        singleRun: true,
        reporters: ['progress']
    });
};
