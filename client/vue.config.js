module.exports = {
  pwa: {
    name: 'Yki',
    themeColor: '#b000e5',
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      //runtimeCaching:
    }
  }
}
