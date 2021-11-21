const {Builder, By, until, Capabilities} = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
// let o = new chrome.Options();
// o.addArguments('disable-infobars');
// o.setUserPreferences({credential_enable_service: false});

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const Page = function () {
  this.driver = new Builder()
    .forBrowser('chrome')
    .withCapabilities(Capabilities.chrome())
    .build();

  this.visit = async function (theUrl) {
    return await this.driver.get(theUrl);
  };

  this.quit = async function () {
    return await this.driver.quit();
  };

  this.findById = async function (id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 5000, 'Looking for element');
    return await this.driver.findElement(By.id(id));
  };

  this.findMultipleByClassName = async function (className) {
    await this.driver.wait(until.elementLocated(By.className(className)), 5000, 'Looking for elements');
    return await this.driver.findElements(By.className(className));
  };

  this.findByName = async function (name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 5000, 'Looking for element');
    return await this.driver.findElement(By.name(name));
  };

  this.findByXpath = async function (xpath) {
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 5000, 'Looking for element');
    return await this.driver.findElement(By.xpath(xpath));
  };

  // fill input web elements
  this.write = async function (el, txt) {
    return await el.sendKeys(txt);
  };
};

module.exports = Page;
