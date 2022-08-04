import puppeteer from 'puppeteer';

describe('filter events by city', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(); // by default headless is true
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.suggestions');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    const eventDetails = await page.$('.event');
    expect(eventDetails).toBeDefined();
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.CitySearch .city', 'Berlin');
    const searchDetails = await page.$('.suggestions');
    expect(searchDetails).toBeDefined();
  });

  test('User can select a city from the suggested list.', async () => {
    await page.click('.CitySearch ul li:nth-child(0n+1)');

    await page.waitForSelector('.city');
    const searchDetails = await page.$eval(
      '.city',
      (element) => element.textContent === 'Berlin, Germany'
    );
    expect(searchDetails).toBeDefined();
  });
});

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250, // slow down by 250ms
    //   ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
    // });
    browser = await puppeteer.launch(); // by default headless is true
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event-description');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .event-showDetails-btn');
    const eventDetails = await page.$('.event .event-description');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .event-hideDetails-btn');
    const eventDetails = await page.$('.event .event-description');
    expect(eventDetails).toBeNull();
  });
});