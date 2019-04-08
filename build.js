const StyleDictionaryPackage = require('style-dictionary');
const fs = require('fs');
const deepDiff = require('return-deep-diff');

const config = JSON.parse(fs.readFileSync('./config.json')); 

console.log('Build started...');

const StyleDictionary = require('style-dictionary').extend(config);
StyleDictionary.buildAllPlatforms();

const varitationTypes = fs.readdirSync('./variations');

const base = StyleDictionary.exportPlatform('web/json');
const output = {
    base,
}

varitationTypes.map(function (variationType) {
    console.log('\n==============================================');
    output[variationType] = {};
    fs.readdirSync(`./variations/${variationType}`).map(function (variation) {
        console.log('\n==============================================');
        console.log('Collision from here are normal');
        const myConfig = Object.assign({}, config);
        myConfig.source.push(`variations/${variationType}/${variation}/**/*.json`)
        const StyleDictionaryVariation = require('style-dictionary').extend(config);
        output[variationType][variation] = deepDiff(base, StyleDictionaryVariation.exportPlatform('web/json'), true);
        
    });
})

console.log('\n==============================================');
console.log('Writing tokens with variations');
fs.writeFileSync('./build/web/tokensWithVariations.json', JSON.stringify(output));