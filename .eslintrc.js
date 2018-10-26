module.exports = {
  extends: [
    "airbnb",
    "plugin:prettier/recommended"
  ],
  env: {
    node: true,
    browser: true,
    jquery: true,
    mocha: true
  },
  globals: {
    google: true,
    handleLocationError: true,
    infoWindow: true,
    map: true
  }
};
