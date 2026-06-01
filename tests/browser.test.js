const { Builder, By } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;

jest.setTimeout(1000 * 60 * 5);

beforeAll(async () => {
    console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

afterAll(async () => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();

        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

test('push button changes the text', async () => {
    let push = await driver.findElement(By.id('push'));

    await push.click();

    let alert = await driver.switchTo().alert();
    await alert.sendKeys("Hej");
    await alert.accept();

    let text = await driver.findElement(By.id('top_of_stack')).getText();

    expect(text).toEqual("Hej");
});

test('Texten ska vara Hej då', async () => {
    let text = await driver.findElement(By.id('top_of_stack')).getText();

    expect(text).toEqual("Hej då");
});