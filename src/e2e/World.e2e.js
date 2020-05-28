import puppeteer from 'puppeteer';

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

describe('World Page Test', ()=>{
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
    it('world list search reset', async ()=>{
        await page.waitForSelector(".ant-table-thead", 'visible');
        await page.click('.ant-table-thead .ant-dropdown-trigger');
        await page.waitForSelector(".ant-dropdown", "visible");
        const resetbtn = await page.$$(".ant-table-filter-dropdown div button");
        await resetbtn[1].click();
        expect(await page.$$(".ant-table-tbody .ant-table-row-level-0")).toHaveLength(7);
    })
    it('world list search level0', async ()=>{
        await page.waitForSelector(".ant-table-thead", 'visible');
        await page.click('.ant-table-thead .ant-dropdown-trigger');
        await page.waitForSelector(".ant-dropdown", "visible");
        await page.click(".ant-table-filter-dropdown div input");
        await page.type(".ant-table-filter-dropdown div input", "非洲");
        await page.click(".ant-table-filter-dropdown div .ant-btn-primary");
        await page.waitFor(1500); //wait for 1.5s
        expect(await page.evaluate('document.querySelector(".ant-table-tbody tr").getAttribute("data-row-key")')).toBe('非洲');
        expect(await page.$$(".ant-table-tbody tr td span mark")).toHaveLength(1);
    })
    it('world list search level1', async()=>{
        await page.waitForSelector(".ant-table-thead", 'visible');
        await page.click('.ant-table-thead .ant-dropdown-trigger');
        await page.waitForSelector(".ant-dropdown", "visible");
        await page.click(".ant-table-filter-dropdown div input");
        await page.keyboard.press('Backspace');
        await page.keyboard.press('Backspace');
        await page.type(".ant-table-filter-dropdown div input", "美国");
        await page.click(".ant-table-filter-dropdown div .ant-btn-primary");
        await page.waitFor(1500); //wait for 1.5s
        expect(await page.evaluate('document.querySelector(".ant-table-tbody tr").getAttribute("data-row-key")')).toBe('北美洲');
        await page.click(".ant-table-tbody tr td .ant-table-row-expand-icon");
        const a = await page.$$(".ant-table-tbody .ant-table-row-level-1 td");
        a.forEach((v, i)=>{
            if(page.evaluate(el=>el.getAttribute('data-row-key'), v) ==='美国'){
                expect(v.$$('span mark')).toHaveLength(1);
            }
        })

    })
});

describe('World Page href test', ()=>{
    const testPage = link => async ()=>{
        console.log(link);
        let res = await page.goto(link);
        expect(res.status()!== 404).toBeTruthy();
    };
    it('href test', async()=>{
        await page.waitForSelector(".antd-pro-pages-welcome-countrydetailssidemenu", 'visible');
        const hrefs = await page.$$eval(".antd-pro-pages-welcome-countrydetailssidemenu .ant-menu-item a", el=>{
            let l=[];
            el.forEach((v)=>{
                l.push(v.getAttribute('href'));
            })
            return l;
        });
        await page.waitFor(2000);
        const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;
        for(let l of hrefs){
            let res = await page.goto(`${BASE_URL}${l}`);
            expect(res.status()).not.toBe(404);
        }
    })    
});