const BasePage = require('../lib/basePage');
const locators = require('../locators/mainPageLocators')

class MainPage extends BasePage {
  getSearchField = () => this.findByName(locators.searchFieldName);
  getSearchButton = () => this.findByXpath(locators.searchButtonXPath);
  getProducts = () => this.findMultipleByClassName(locators.productsClass);
  getFilterElement = () => this.findMultipleByCssSelector(locators.filterCheckboxCssSelector);

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

  async getProductsTextArray() {
    return this.getProducts().then((products) => {
      products.map(async (product) => {
        return await product.getText()
      })
    })
  }

  selectFilterCheckbox(elementPosition) {
    this.getFilterElement(elementPosition).then((checkbox) => {
      console.log('checkbox');
      console.log(checkbox);
      console.log(checkbox[elementPosition]);
      checkbox[elementPosition].click()
    })
  }
}

module.exports = MainPage;
