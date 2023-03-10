module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      'inline-dotenv',
      [
        'module-resolver',
        {
          alias: {
            src: './src',
          },
        },
      ],
      ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ['@babel/plugin-proposal-private-methods', { loose: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 16,
          },
        },
      ],
      [
        '@babel/preset-typescript',
        {
          allExtensions: true,
          isTSX: true,
          optimizeConstEnums: true,
        },
      ],
    ],
  };
};
