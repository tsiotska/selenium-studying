const BasePage = require('../lib/basePage');
const locators = require('../locators/mainPageLocators')

class MainPage extends BasePage {
  getSearchField = () => this.findByName(locators.searchFieldName);
  getSearchButton = () => this.findByXpath(locators.searchButtonXPath);
  getProducts = () => this.findMultipleByClassName(locators.productsClass);
  getFilterElement = () => this.findByXpath(locators.filterCheckboxXPath);

  async setSearchFieldValue(searchWord) {
    await this.write(await this.getSearchField(), searchWord)
  }

  async getSearchFieldValue() {
    return this.read(await this.getSearchField())
  }

  triggerSearchButtonClick() {
    this.getSearchButton().then((button) => {
      button.click()
    })
  }

  async getProductsArray() {
    return await new this.getProducts()
  }

  async selectFilterCheckbox() {
    const checkbox = await this.getFilterElement()
    await checkbox.click()
    // викидає StaleReferenceException, який я не можу пофіксити
    // await this.driver.sleep(5000)
    return checkbox
  }
}

module.exports = MainPage;
