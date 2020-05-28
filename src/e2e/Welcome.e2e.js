import puppeteer from 'puppeteer';

let browser;
let page;

beforeAll(async()=>{
    browser = await puppeteer.launch();
    page =  await browser.newPage();
    await page.goto('http://127.0.0.1:8000/');
});

describe('welcome page href test', ()=>{
    it('href test', async()=>{
        await page.waitForSelector('.ant-table-tbody');
        const hrefs = await page.$$eval(".ant-table-tbody .ant-table-row-level-0 td a", el=>{
            let l=[];
            el.forEach(v=>{
                l.push(v.getAttribute('href'));
            })
            return l;
        });
        await page.waitFor(3000);
        const BASE_URL= `http://localhost:${process.env.PORT || 8000}`;
        for(let l of hrefs){
            let res = await page.goto(`${BASE_URL}${l}`);
            expect(res.status()).toBe(200);
        }
        await page.close();
        await browser.close();
    }, 50000);
});