module.exports = {
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          environment: `./src/environments/${process.env.NODE_ENV}`,
        },
      },
    ],
  ],
};
