import puppeteer from 'puppeteer';


describe('World Page Test', ()=>{
    let browser;
    let page;
    beforeAll(async ()=>{
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
        });
        page =  await browser.newPage();
        await page.goto('http://127.0.0.1:8000/world');
    });
    it('world list search should return empty', async ()=>{
        await page.waitForSelector(".ant-table-thead", 'visible');
        await page.click('.ant-table-thead .ant-dropdown-trigger');
        await page.waitForSelector(".ant-dropdown", "visible");
        await page.click(".ant-table-filter-dropdown div input");
        await page.type(".ant-table-filter-dropdown div input", "12345");
        await page.click(".ant-table-filter-dropdown div .ant-btn-primary");
        await page.waitFor(1500); //wait for 1.5s
        expect(await page.$$(".ant-table-tbody tr")).toHaveLength(0);
        expect(await page.$eval(".ant-table-placeholder .ant-empty p", el=>(el.textContent))).toBe("暂无数据");
        
    })
})