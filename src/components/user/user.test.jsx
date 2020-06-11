const puppeteer = require('puppeteer');

let browser;
let page;

jest.setTimeout(3000000);

describe('register test' ,()=> {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
        });
        page = await browser.newPage();
    });

    it('register succeed', async () => {
        await page.waitFor(1500); //wait for 1.5s
        await page.goto('http://127.0.0.1:8000/user/register');
        await page.type('#username', 'Cautious');
        await page.type('#email', '17307130334@fudan.edu.cn');
        // make psw visible
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > span > span.ant-input-suffix > i > svg');
        await page.type('#password1', 'hxx');
        await page.type('#password2', 'hxx');
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(5) > div > div > span > button');
        // const a_text = await page.$eval('body > div:nth-child(6) > div',a => a.innerText);
        await page.waitForSelector('body > div:nth-child(6) > div > span > div > div','visible');
        const a_text = await page.$eval('body > div:nth-child(6) > div > span > div > div',a => a.innerText);
        console.log('注册状态：',a_text);
        expect(a_text).toBe('请登入邮箱完成注册');
    });

});

describe('login test' ,()=> {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
        });
        page = await browser.newPage();
    });

    it('username not exist', async () => {
        await page.goto('http://localhost:8000/user/login');
        await page.type('#userName', 'user_404');
        await page.type('#password', '404');
        // click login button
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
        const a_text = await page.$eval('body > div:nth-child(6) > div',a => a.innerText);
        console.log("登陆状态:",a_text);
        expect(a_text).toBe('登录失败');
    });

    it('incorrect psw', async () => {
        await page.goto('http://localhost:8000/user/login');
        await page.type('#userName', 'Cautious');
        // make psw visible
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(2) > div > div > span > span > span.ant-input-suffix > i > svg');
        await page.type('#password', 'wrong_psw');
        // click login button
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
        const a_text = await page.$eval('body > div:nth-child(6) > div',a => a.innerText);
        console.log("登陆状态:",a_text);
        expect(a_text).toBe('登录失败');
    });

    it('login succeed', async () => {
        await page.goto('http://localhost:8000/user/login');
        await page.type('#userName', 'Cautious');
        // make psw visible
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(2) > div > div > span > span > span.ant-input-suffix > i > svg');
        await page.type('#password', 'hxx');
        // click login button
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
        const a_text = await page.$eval('body > div:nth-child(6) > div',a => a.innerText);
        console.log("登陆状态:",a_text);
        expect(a_text).toBe('登录成功');
    });

    it('change', async () => {
        //to do: 登陆时候 不会检查新旧密码是否相同
        await page.goto('http://localhost:8000/user/change');
        await page.type('#oldpsw', 'hxx');
        await page.type('#newpsw', 'HXX');
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
        await page.waitFor(1000); //wait for 1s
        //修改密码成功，页面跳转到登陆页
        const url = page.url();
        expect(url).toBe('http://localhost:8000/user/login');
    });
});


describe('change test' ,()=> {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 80,
        });
        page = await browser.newPage();
    });

    it('login first', async () => {
        await page.waitFor(1500); //wait for 1s
        await page.goto('http://localhost:8000/user/login');
        await page.type('#userName', 'Cautious');
        // make psw visible
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(2) > div > div > span > span > span.ant-input-suffix > i > svg');
        await page.type('#password', 'hxx');
        // click login button
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
        const a_text = await page.$eval('body > div:nth-child(6) > div',a => a.innerText);
        console.log("登陆状态:",a_text);
        expect(a_text).toBe('登录成功');
    });

    it('change', async () => {
        //to do: 登陆时候 不会检查新旧密码是否相同
        await page.goto('http://localhost:8000/user/change');
        await page.type('#oldpsw', 'hxx');
        await page.type('#newpsw', 'HXX');
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
        await page.waitFor(1000); //wait for 1s
        //修改密码成功，页面跳转到登陆页
        const url = page.url();
        expect(url).toBe('http://localhost:8000/user/login');
    });

    it('login again with new psw', async () => {
        await page.goto('http://localhost:8000/user/login');
        await page.type('#userName', 'Cautious');
        // make psw visible
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(2) > div > div > span > span > span.ant-input-suffix > i > svg');
        await page.type('#password', 'HXX');
        // click login button
        await page.click('#root > div > div.antd-pro-layouts-user-layout-content > div.antd-pro-pages-user-login-style-main > form > div:nth-child(3) > div > div > span > button');
        const a_text = await page.$eval('body > div:nth-child(6) > div',a => a.innerText);
        console.log("登陆状态:",a_text);
        expect(a_text).toBe('登录成功');
    });

});




