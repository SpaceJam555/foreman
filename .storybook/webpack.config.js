const path = require('path');

// Use storybook's default configuration with our customizations
module.exports = (baseConfig, env, defaultConfig) => {

  // overwrite storybook's default import rules
  defaultConfig.module.rules = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
    {
      test: /(\.png|\.gif)$/,
      loader: 'url-loader?limit=32767'
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
          includePaths: [
            // teach webpack to resolve patternfly dependencies
            path.resolve(__dirname, '..', 'node_modules', 'patternfly', 'dist', 'sass'),
            path.resolve(__dirname, '..', 'node_modules', 'bootstrap-sass', 'assets', 'stylesheets'),
            path.resolve(__dirname, '..', 'node_modules', 'font-awesome-sass', 'assets', 'stylesheets')
          ]
        }
      }]
    },
    {
      test: /\.md$/,
      loaders: ['raw-loader']
    },
    {
      test: /(\.ttf|\.woff|\.woff2|\.eot|\.svg|\.jpg)$/,
      loaders: ['url-loader']
    },
    {
      test: /\.stories\.js$/,
      loaders: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: {
              prettierConfig: {
                parser: "babel" //The default prettier parser
              },
            },
        }
      ],
      enforce: 'pre',
    },
  ]

  defaultConfig.resolve = {
    modules: [
      path.join(__dirname, '..', 'webpack'),
      path.join(__dirname, '..', 'node_modules'),
      'node_modules/',
    ],
  };

  return defaultConfig;
};
