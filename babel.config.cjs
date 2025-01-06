module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          lib: 'ES2021',
          esModule: true,
        },
      },
    ],
    '@babel/preset-typescript',
  ],
};
