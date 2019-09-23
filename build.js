const StyleDictionaryPackage = require('style-dictionary');

function getStyleDictionaryConfig(theme){
    return {
        "source": [
             "properties/global/**/*.json",
             `properties/themes/${theme}/**/*.json`,
        ],
        "platforms": {
          "scss": {
            "transformGroup": "scss",
            "buildPath": `build/scss/`,
            "files": [{
              "destination": `${theme}_variable.scss`,
              "format": "scss/variables",
            }]
          },
          "sketch": {
            "buildPath": `build/sketch/`,
            "transforms": ["attribute/cti", "name/cti/kebab", "color/sketch", "size/rem"],
            "files": [{
              "destination": `${theme}_palettes.sketchpalette`,
              "format": "sketch/palette/v2",
              "filter": (token) => token.name.includes('color')
            }]
          },
          "js": {
            "buildPath": `build/js/`,
            "transformGroup": "js",
            "files": [{
              "destination": `${theme}.json`,
              "format": "json/nested",
            }]
          }
        }
      }
}

console.log('Build started...');

['pinkGreen', 'purpleOrange', "halloween"].map(function (theme) {
        console.log(`\nProcessing: [${theme}]`);
        const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));
        StyleDictionary.cleanAllPlatforms();
        StyleDictionary.buildAllPlatforms();
        console.log(`\nEnd processing`);
})