const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(300000000);

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:8000/user/login');
    await page.type('#userName', 'Cautious');
    await page.type('#password', 'hxx');
    await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
    console.log("login succeed");
    await page.goto('http://localhost:8000/weekly');

});

describe('weekly test' ,()=> {

    it('subscribe test', async () => {

        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector("#root > div > section > section > div > main > div > div > div:nth-child(4) > div > div > button", 'visible');
        await page.click('#root > div > section > section > div > main > div > div > div:nth-child(4) > div > div > button');
        console.log("click subscribe button");

        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div:nth-child(1) > div.ant-transfer-list-body > div > ul > li:nth-child(3) > span.ant-tree-checkbox > span', 'visible');
        await page.click('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div:nth-child(1) > div.ant-transfer-list-body > div > ul > li:nth-child(3) > span.ant-tree-checkbox > span');
        console.log('select hebei province');

        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div:nth-child(1) > div.ant-transfer-list-body > div > ul > li:nth-child(4) > span.ant-tree-checkbox > span', 'visible');
        await page.click('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div:nth-child(1) > div.ant-transfer-list-body > div > ul > li:nth-child(4) > span.ant-tree-checkbox > span');
        console.log('select shanxi province');

        await page.waitFor(1000); //wait for 1s
        // await page.keyboard.press('Space');
        await page.waitForSelector('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div.ant-transfer-operation > button:nth-child(1)', 'visible');
        console.log('here');
        await page.click('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div.ant-transfer-operation > button:nth-child(1)');
        console.log('select > button');

        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > div > button.ant-btn.ant-btn-primary > span', 'visible');
        await page.click('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > div > button.ant-btn.ant-btn-primary > span');
        console.log('confirm');

        const a_text = await page.$eval('#root > div > section > section > div > main > div > div > div.ant-col.ant-col-20.ant-col-offset-2 > div > div > div.ant-collapse-header',
            a => a.innerText);
        expect(a_text).toBe('河北省');
        console.log(a_text);

        const b_text = await page.$eval('#root > div > section > section > div > main > div > div > div.ant-col.ant-col-20.ant-col-offset-2 > div > div:nth-child(2) > div',
            a => a.innerText);
        expect(b_text).toBe('山西省');

    });

    it('undo subscribe test', async () => {
        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector("#root > div > section > section > div > main > div > div > div:nth-child(4) > div > div > button", 'visible');
        await page.click('#root > div > section > section > div > main > div > div > div:nth-child(4) > div > div > button');
        console.log("click subscribe button");

        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div:nth-child(3) > div.ant-transfer-list-body > ul > div:nth-child(1) > li > label > span > input', 'visible');
        await page.click('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div:nth-child(3) > div.ant-transfer-list-body > ul > div:nth-child(1) > li > label > span > input');
        console.log("undo subscribe hebei province");

        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div.ant-transfer-operation > button:nth-child(2) > i', 'visible');
        await page.click('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > div > div > div.ant-transfer-operation > button:nth-child(2) > i');
        console.log('select < button');

        await page.waitFor(1000); //wait for 1s
        await page.waitForSelector('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > div > button.ant-btn.ant-btn-primary > span', 'visible');
        await page.click('body > div:nth-child(5) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > div > button.ant-btn.ant-btn-primary > span');
        console.log('confirm');

        await page.waitFor(2000); //wait for 2s
        const a_text = await page.$eval('#root > div > section > section > div > main > div > div > div.ant-col.ant-col-20.ant-col-offset-2 > div > div > div.ant-collapse-header',
            a => a.innerText);
        expect(a_text).toBe('山西省');
        await page.click('#root > div > section > section > div > main > div > div > div.ant-col.ant-col-20.ant-col-offset-2 > div > div > div.ant-collapse-header');

        page.close();
        browser.close();
    });

});


