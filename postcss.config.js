const autoprefixer = require('autoprefixer'); //требуется автопрефикс
const cssnano = require('cssnano'); //требуется css нано

module.exports = {
    plugins: [autoprefixer,
        cssnano({ preset: 'default' })
    ]
};