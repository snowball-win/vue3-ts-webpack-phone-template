const path = require("path");

module.exports = ({ file }) => {
    const width = file.dirname.includes(path.join('node_modules',  'vant')) ? 375 : 750;

    return {
        plugins: {
            autoprefixer: {},
            "postcss-px-to-viewport": {
                 unitToConvert: 'px',
                 viewportWidth: width,
                 unitPrecision: 3,
                 propList: ['*'],
                 viewportUnit: 'vw',
                 fontViewportUnit: 'vw',
                 selectorBlackList: [],
                 minPixelValue: 1,
                 mediaQuery: false,
                 replace: true,
                 exclude: [],
                 landscape: false,
                 landscapeUnit: 'vw',
                 landscapeWidth: 2048
             }  
        }
    } 
}