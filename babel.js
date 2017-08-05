'use strict';

var preset = {
  presets: [
    [require.resolve('babel-preset-env'), { modules: false }],
    require.resolve('babel-preset-react'),
  ],
  plugins: [
    // class { handleThing = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),

    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [
      require.resolve('babel-plugin-transform-object-rest-spread'),
      {
        useBuiltIns: true,
      },
    ],
    // Adds syntax support for import()
    require.resolve('babel-plugin-syntax-dynamic-import'),
    // Add support for async/await
    require.resolve('babel-plugin-transform-runtime'),
  ],
};

var env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
  throw new Error(
    'NODE_ENV nor BABEL_ENV set. Valid values are "development", ' +
      '"test", and "production". Instead, received: ' +
      JSON.stringify(env) +
      '.'
  );
}

if (env === 'development') {
  preset.plugins.push.apply(preset.plugins, [
    // Adds component stack to warning messages
    require.resolve('babel-plugin-transform-react-jsx-source'),
  ]);
}

if (env === 'production') {
  preset.plugins.push.apply(preset.plugins, [
    require.resolve('babel-plugin-transform-react-remove-prop-types'),
  ]);
}

module.exports = preset;
