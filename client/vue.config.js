module.exports = {
  pwa: {
    name: 'Yuki',
    themeColor: '#b000e5',
    msTileColor: '#b000e5',
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      navigateFallback: "/index.html",
      runtimeCaching: [
        {
          urlPattern: new RegExp('^http://localhost:5000/yuki-a30e7/us-central1/api/'), //Add slash?
          handler: "networkFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
};
