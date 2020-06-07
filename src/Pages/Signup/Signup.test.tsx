import puppeteer from "puppeteer"; 

let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/signup");
  });

  test("has title text", async () => {
    await page.waitForSelector("h2");
  
    const header = await page.$eval("h2", e => e.innerHTML);
    expect(header).toBe("Signup");
  });


  test("has disable button", async () => {
    await page.waitForSelector("button");
  
    const header = await page.$('button[disabled]');
    expect(header).toBeTruthy();
  });


  afterAll(() => {
    browser.close();
  });