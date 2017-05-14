module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['> 5%', 'last 2 versions'],
        }),
        require('postcss-import')({async: true}),
        require('postcss-nested')(),
        require('postcss-extend')(),
        require('postcss-simple-vars')(),
        require('postcss-quantity-queries')(),
        require('postcss-custom-media')({
            extensions: {
                '--phone': '(min-width: 544px)',
                '--tablet': '(min-width: 768px)',
                '--desktop': '(min-width: 992px)',
                '--large-desktop': '(min-width: 1200px)',
            },
        }),
        require('postcss-font-magician')(),
    ],
}
