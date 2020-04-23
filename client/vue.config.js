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
          urlPattern: new RegExp('^https://us-central1-yuki-a30e7.cloudfunctions.net/api'), //Add slash?
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
