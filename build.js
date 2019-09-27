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
    "transforms": ["attribute/cti", "name/cti/kebab", "color/sketch"],
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
    "transformGroup": "web",
    "files": [{
      "destination": `${theme}.json`,
      "format": "json/nested",
    }]
  }
}

function getDocsConfig(theme){
  return {
    "buildPath": `dist/docs/`,
    "transformGroup": "web",
    "files": [{
      "destination": `${theme}.json`,
      "format": "json/flat",
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
          "js": getJsConfig(theme),
          "docs": getDocsConfig(theme),
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