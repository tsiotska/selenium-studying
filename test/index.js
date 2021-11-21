const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const Page = require('../lib/basePage')
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
        const searchField = await page.findByName("q")
        await searchField.sendKeys(searchWord)
        const fieldValue = await searchField.getAttribute("value")
        expect(fieldValue).to.equal(searchWord)
      });


      it("search 'навушники' properly", async () => {
        const searchWord = "навушники"
        const searchField = await page.findByName("q")
        await searchField.sendKeys(searchWord)
        const searchButton = await page.findByXpath("//button[contains(text(),'Пошук')]")
        await searchButton.click()
        const products = await page.findMultipleByClassName('loop__container')
        products.forEach(async (product) => {
          const text = await product.getText()
          console.log('text');
          console.log(text);
          expect(text).to.equal(searchWord)
        })
      });
    });
  } catch (err) {
    console.log(new Error(err.message));
  }
})();
