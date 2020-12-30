const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: {
        enabled: process.env.NODE_ENV !== "development",
        mode: 'all',
        content: ['./index.html', './src/**/*.vue', './src/**/*.js'],
    },
    // theme: {
    //   extend: {
    //     // here's how to extend fonts if needed
    //     fontFamily: {
    //       sans: [...defaultTheme.fontFamily.sans],
    //     },
    //   },
    // },
    plugins: [
        // require('@tailwindcss/ui')({
        //   layout: 'sidebar',
        // }),
        require('@tailwindcss/typography'),
    ],
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
}
