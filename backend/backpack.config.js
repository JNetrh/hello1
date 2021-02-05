const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./src/index.ts'];

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    };

    config.module.rules.push({
      test: /\.ts$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
    });

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      include: path.join(__dirname, 'src'),
      loader: 'graphql-tag/loader',
    });

    config.plugins.push(
      new ForkTsCheckerWebpackPlugin({
        async: options.env === 'development',
        typescript: true,
        // useTypescriptIncrementalApi: true,
        // checkSyntacticErrors: true,
        // reportFiles: ['src/**', '!src/**/__tests__/**', '!src/**/?(*.)(spec|test).*'],
      }),
    );

    return config;
  },
};
