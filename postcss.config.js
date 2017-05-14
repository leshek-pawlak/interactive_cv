module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                '> 5%',
                'last 2 versions',
            ],
        }),
        require('postcss-import')({
            async: true,
        }),
        require('postcss-nested')(),
        require('postcss-extend')(),
        require('postcss-simple-vars')(),
        require('postcss-quantity-queries')(),
        require('postcss-font-magician')(),
    ],
}
