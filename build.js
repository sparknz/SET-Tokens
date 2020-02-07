const StyleDictionaryPackage = require("style-dictionary");

StyleDictionaryPackage.registerTransform({
    name: "name/cti/human",
    type: "name",
    transformer: function(prop, options) {
        const path = [options.prefix]
            .concat(prop.path)
            .join(" ")
            .trim();
        return path;
    }
});

StyleDictionaryPackage.registerFormat({
    name: "newFormat",
    formatter: function(dictionary, config) {
        let out = "";
        const properties = Object.values(dictionary.properties);
        for (p of properties) {
            const cs = Object.entries(p);
            for ([key, value] of cs) {
                out += `export enum ${key} { 
                    ${Object.keys(value)
                        .map(key => `I${key} = '${key}'`)
                        .toString()}
                }`;
            }
        }

        return out;
    }
});

function getScssConfig(theme) {
    return {
        transformGroup: "scss",
        buildPath: `dist/scss/`,
        files: [
            {
                destination: `${theme}_variable.scss`,
                format: "scss/variables"
            }
        ]
    };
}

function getSketchConfig(theme) {
    return {
        buildPath: `dist/sketch/`,
        transforms: ["attribute/cti", "name/cti/kebab", "color/sketch"],
        files: [
            {
                destination: `${theme}_palettes.sketchpalette`,
                format: "sketch/palette/v2",
                filter: token => token.name.includes("color")
            }
        ]
    };
}

function getJsConfig(theme) {
    return {
        buildPath: `dist/js/`,
        transformGroup: "web",
        files: [
            {
                destination: `${theme}.json`,
                format: "json/nested"
            }
        ]
    };
}

function getDocsConfig(theme) {
    return {
        buildPath: `dist/docs/`,
        transforms: ["attribute/cti", "name/cti/human", "color/css"],
        files: [
            {
                destination: `${theme}.json`,
                format: "json/flat"
            }
        ]
    };
}

function getInterfaceConfig(theme) {
    return {
        buildPath: `dist/interface/`,
        transforms: ["attribute/cti", "name/cti/human", "color/css"],
        files: [
            {
                destination: `${theme}.ts`,
                format: "newFormat"
            }
        ]
    };
}

function getStyleDictionaryConfig(theme) {
    return {
        source: [
            "properties/global/**/*.json",
            `properties/themes/${theme}/**/*.json`
        ],
        platforms: {
            scss: getScssConfig(theme),
            sketch: getSketchConfig(theme),
            js: getJsConfig(theme),
            docs: getDocsConfig(theme),
            typescriptInterfaces: getInterfaceConfig(theme)
        }
    };
}

console.log("Build started...");

["default", "halloween"].map(function(theme) {
    console.log(`\nProcessing: [${theme}]`);
    const StyleDictionary = StyleDictionaryPackage.extend(
        getStyleDictionaryConfig(theme)
    );
    StyleDictionary.cleanAllPlatforms();
    StyleDictionary.buildAllPlatforms();
    console.log(`\nEnd processing`);
});
