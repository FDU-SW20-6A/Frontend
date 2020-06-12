import puppeteer from 'puppeteer';

let browser;
let page;


beforeAll(async ()=>{
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
    });
    page =  await browser.newPage();
    await page.goto('http://127.0.0.1:8000/nearby');
});

describe('Nearby Page Test', ()=>{
    it('search', async ()=>{
        await page.waitForSelector(".amap-maps", 'visible');
        await page.waitForSelector(".ant-input-search", 'visible');
        await page.click(".ant-input-search input");
        await page.type(".ant-input-search input", "复旦大学");
        await page.click(".ant-input-search .ant-btn-primary");
        await page.waitForSelector(".amap-zoomcontrol", 'visible');
        await page.click(".amap-zoomcontrol .amap-zoom-touch-minus");
        await page.click(".amap-zoomcontrol .amap-zoom-touch-minus");
        await page.waitFor(1500); //wait for 1.5s
        expect(await page.$$(".amap-marker")).toHaveLength(11);

        await page.waitForSelector(".amap-zoomcontrol", 'visible');
        await page.click(".amap-zoomcontrol .amap-zoom-touch-plus");
        await page.click(".amap-zoomcontrol .amap-zoom-touch-plus");
        await page.type(".ant-input-search input", "张江校区");
        await page.click(".ant-input-search .ant-btn-primary");
        await page.click(".amap-zoomcontrol .amap-zoom-touch-minus");
        await page.click(".amap-zoomcontrol .amap-zoom-touch-minus");
        await page.waitFor(1500); //wait for 1.5s
        expect(await page.$$(".amap-marker")).toHaveLength(11);
    })
});