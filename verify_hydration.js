const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  console.log('--- Visiting Home Page ---');
  await page.goto('http://localhost:3000');
  await page.waitForTimeout(2000);

  console.log('--- Visiting Entry Page ---');
  await page.goto('http://localhost:3000/entry/59/');
  await page.waitForTimeout(2000);

  await browser.close();
})();
