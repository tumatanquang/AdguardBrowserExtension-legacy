const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [
        ['postcss-svg', {}],
        ['postcss-nested', {}],
        [postcssPresetEnv, { stage: 3, features: { 'nesting-rules': true } }]
    ]
};