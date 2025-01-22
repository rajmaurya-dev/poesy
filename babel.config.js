module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "module:metro-react-native-babel-preset",
        "babel-preset-expo",
        { jsxImportSource: "nativewind" },
      ],
      "nativewind/babel",
    ],
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
  };
};
