 /* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  // presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],

    // ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],

};
