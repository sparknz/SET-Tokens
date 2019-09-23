const StyleDictionaryPackage = require('style-dictionary');

function getScssConfig(theme){
  return {
    "transformGroup": "scss",
    "buildPath": `dist/scss/`,
    "files": [{
      "destination": `${theme}_variable.scss`,
      "format": "scss/variables",
    }]
  }
}

function getSketchConfig(theme){
  return {
    "buildPath": `dist/sketch/`,
    "transforms": ["attribute/cti", "name/cti/kebab", "color/sketch", "size/rem"],
    "files": [{
      "destination": `${theme}_palettes.sketchpalette`,
      "format": "sketch/palette/v2",
      "filter": (token) => token.name.includes('color')
    }]
  }
}

function getJsConfig(theme){
  return {
    "buildPath": `dist/js/`,
    "transformGroup": "js",
    "files": [{
      "destination": `${theme}.json`,
      "format": "json/nested",
    }]
  }
}

function getStyleDictionaryConfig(theme){
    return {
        "source": [
             "properties/global/**/*.json",
             `properties/themes/${theme}/**/*.json`,
        ],
        "platforms": {
          "scss": getScssConfig(theme),
          "sketch": getSketchConfig(theme),
          "js": getJsConfig(theme)
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