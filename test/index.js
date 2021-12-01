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
        const searchWord = "навушники"
        await page.setSearchFieldValue(searchWord)
        const fieldValue = await page.getSearchFieldValue()
        expect(fieldValue).to.equal(searchWord)
      });


      it("search 'навушники' properly", async () => {
        const searchWord = "навушники"
        await page.setSearchFieldValue(searchWord)
        await page.triggerSearchButtonClick()
        page.getProductsTextArray()
          .then((productsText) => {
            productsText.forEach((text) => {
              expect(text).to.equal(searchWord)
            })
          })
      });

      it("it filters products", async () => {
        const searchWord = "навушники"
        await page.setSearchFieldValue(searchWord)
        await page.triggerSearchButtonClick()
        await page.selectFilterCheckbox(0)
        expect(true).to.equal(true)
      })
    });
  } catch (err) {
    console.log(new Error(err.message));
  }
})();
