const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const Page = require('../pageObjects/mainPageObject')

chai.use(chaiAsPromised);

(async function example() {
  try {
    describe('KTC search automated testing', async function () {
      this.timeout(50000);
      let driver, page;

      beforeEach(async () => {
        page = new Page();
        driver = page.driver;
        await page.visit('https://ktc.ua/');
      });

      afterEach(async () => {
        await page.quit();
      });

      it("set 'навушники' as search string properly", async () => {
        const searchWord = "Навушники"
        await page.setSearchFieldValue(searchWord)
        const fieldValue = await page.getSearchFieldValue()
        expect(fieldValue).to.equal(searchWord)
      });


      it("search 'навушники' properly", async () => {
        const searchWord = "Навушники"
        await page.setSearchFieldValue(searchWord)
        await page.triggerSearchButtonClick()
        const products = await page.getProductsArray()
        for (let i = 0; i < products.length; i++) {
          const text = await products[i].getText()
          expect(text).to.contain(searchWord)
        }
      });

      it("it filters products", async () => {
        const searchWord = "Навушники"
        const filterText = '1more'
        await page.setSearchFieldValue(searchWord)
        await page.triggerSearchButtonClick()
        const checkbox = await page.selectFilterCheckbox()
        const filterElemText = await checkbox.getText()
        expect(filterElemText).to.contain(filterText)
        const products = await page.getProductsArray()
        for (let i = 0; i < products.length; i++) {
          const text = await products[i].getText()
          expect(text).to.contain(filterText)
        }
      })
    });
  } catch (err) {
    console.log(new Error(err.message));
  }
})();
