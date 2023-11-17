exports.config = {
    specs: ['./e2e/src/*spec.js'],
    capabilities: {
        browserName: 'firefox',
    },
    directConnect: true,
    baseUrl: 'http://localhost:8100/',
    onPrepare: function () {
        browser.driver.manage().timeouts().implicitlyWait(2000);
      },
}