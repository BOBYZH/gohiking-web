module.exports = {
    plugins: [
        {
            plugin: require('craco-plugin-scoped-css')
        }
    ],
    configure: {
        output: { // for github pages
            publicPath: process.env.NODE_ENV === 'production'
                ? '/gohiking-web/'
                : '/'
        }
    }
}
