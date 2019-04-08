const path = require('path');
const fs = require('fs');

const themes = [
'purple-orange',
'pink-green',
'green-orange',
'pink-purple',
'purple-green',
'orange-pink',
]



function createTheme(_themeName, inverse) {
    const themeName = _themeName + (inverse ? '.inverse' : '');
    console.log(_themeName)
    const [_primary, _secondary] = _themeName.split('-');
    const themeFolder = path.resolve(`./variations/themes/${themeName}`)
    let primary, secondary;
    if(inverse) {
        primary = _secondary;
        secondary = _primary;
    } else {
        primary = _primary;
        secondary = _secondary;
    }

    const theme = {
        "color": {
          "base": {
            "primary": {
              "base": { "value": `{color.brand.${primary}.base.value}` },
              "light": { "value": `{color.brand.${primary}.light.value}` },
              "dark": { "value": `{color.brand.${primary}.dark.value}` }
            },
            "secondary": {
              "base": { "value": `{color.brand.${secondary}.base.value}` },
              "light": { "value": `{color.brand.${secondary}.light.value}` },
              "dark": { "value": `{color.brand.${secondary}.dark.value}` }
            }
          }
        }
      }

    return fs.promises.mkdir(themeFolder, { recursive: true }).then(() => {
        return fs.promises.writeFile(path.resolve(themeFolder, `${themeName}.json`), JSON.stringify(theme));
    });
}

console.log('Creating Themes');
module.exports = Promise.all(themes.map((theme) => {
    return Promise.all([createTheme(theme, false),
    createTheme(theme, true)]);
})).then(() => console.log('Done generating themes'));