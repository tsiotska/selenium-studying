const {Builder, By, until, Capabilities} = require('selenium-webdriver');
const chromedriver = require('chromedriver');
const chrome = require('selenium-webdriver/chrome');
let o = new chrome.Options();
o.addArguments('--start-maximized');
// o.addArguments('--kiosk');
o.setUserPreferences({credential_enable_service: false});
chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

class BasePage {
  constructor() {
    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(o)
      .withCapabilities(Capabilities.chrome())
      .build();
  }

  visit = async function (theUrl) {
    return await this.driver.get(theUrl);
  };

  quit = async function () {
    return await this.driver.quit();
  };

  findById = async function (id) {
    await this.driver.wait(until.elementLocated(By.id(id)), 5000, 'Looking for element');
    return await this.driver.findElement(By.id(id));
  };

  findMultipleByClassName = async function (className) {
    await this.driver.wait(until.elementLocated(By.className(className)), 5000, 'Looking for elements');
    return await this.driver.findElements(By.className(className));
  };

  findByName = async function (name) {
    await this.driver.wait(until.elementLocated(By.name(name)), 5000, 'Looking for element');
    return await this.driver.findElement(By.name(name));
  };

  findByXpath = async function (xpath) {
    await this.driver.wait(until.elementLocated(By.xpath(xpath)), 5000, 'Looking for element');
    return await this.driver.findElement(By.xpath(xpath));
  };

  findMultipleByCssSelector = async function (selector) {
    await this.driver.wait(until.elementLocated(By.css(selector)), 5000, 'Looking for element');
    return await this.driver.findElements(By.css(selector));
  };

  // fill input web elements
  write = async function (el, txt) {
    return await el.sendKeys(txt);
  };
  // get value

  read = async function (el) {
    return await el.getAttribute("value");
  };
}

module.exports = BasePage;
