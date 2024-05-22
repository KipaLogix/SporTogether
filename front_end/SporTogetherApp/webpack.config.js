const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    config.devServer = {
        proxy: {
            '/api': 'http://127.0.0.1:56789'
        },
        host: '127.0.0.1',
        port: '56789',
    }

    return config;
};