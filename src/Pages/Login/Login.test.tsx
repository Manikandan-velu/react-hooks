import puppeteer from "puppeteer"; 

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/login");
    await page.setViewport({ width: 1707, height: 800 })
});

test("Login Fails with Validation messages", async () => {    
    await page.waitForSelector('[data-test="email"]');
    await page.click('[data-test="email"]');
    await page.keyboard.type('some@email.com');
    await page.click('[data-test="password"]');
    await page.keyboard.type('passward');
    await page.click('[data-test="loginForm"]');
    await page.waitForSelector('[data-testid="login-form"]');
    await page.waitForSelector(".text-danger");
    await page.waitFor(1000);
    await page.screenshot({path:"test-screen/errormessage.png", fullPage: true},);
    const message = await page.$eval("h2", e => e.innerHTML);
    expect(message).toBeTruthy()
});


test("User Login Successfully", async ()=> {
    await page.reload();
    await page.screenshot({path:'test-screen/login.png', fullPage: true});
    await page.waitForSelector('[data-test="email"]');
    await page.click('[data-test="email"]');
    await page.keyboard.type('tamilselvan@mailinator.com');
    await page.click('[data-test="password"]');
    await page.keyboard.type('Staller123#');
    await page.screenshot({path:'test-screen/filled.png', fullPage: true});
    await page.click('[data-test="loginForm"]');
    await page.waitForSelector('[data-testid="login-form"]');    
    await page.waitFor(2000);
    await page.screenshot({path:"test-screen/submitmessage.png", fullPage: true});
    page = await browser.newPage();
    await page.goto("http://localhost:3000/list");
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain('Add New');
});

test("has Horses List loaded", async ()=> {
    page = await browser.newPage();
    await page.goto("http://localhost:3000/list");
    await page.setViewport({ width: 1707, height: 800 })
    const text = (await page.$$('.MuiGrid-item')).length;
    expect(text).toBeCloseTo(1); 
    await page.screenshot({path:'test-screen/horslist.png', fullPage: true}); 
    const element = await page.$('[data-test="editHorse"]');
    await element?.click();    
    await page.screenshot({path:'test-screen/editform.png'});
    await page.waitFor(1000);    
    let searchInput = await page.$('[data-test="horse_name"]');
    await searchInput?.click({clickCount: 3});
    await searchInput?.press('Backspace');
    await page.waitForSelector('[data-test="horse_name"]');
    await page.click('[data-test="horse_name"]');    
    await page.keyboard.type('new horse Name');
    await page.click('[data-test="owner"]');
    await page.keyboard.type('new owner');
    await page.screenshot({path:'test-screen/editformfilled.png', fullPage: true});
    await page.click('[data-test="horseSubmit"]');
    await page.waitFor(1000);
    await page.screenshot({path:"test-screen/horseSubmitmessage.png", fullPage: true});
})

afterAll(() => {
    browser.close();
  });
