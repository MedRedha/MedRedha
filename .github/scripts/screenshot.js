const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const imagePath = "./prayer-widget.png";

  console.log("Starting browser...");
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  const widgetUrl = "https://timesprayer.com/widgets.php?frame=1&lang=en&name=berlin&avachang=true";

  console.log(`Navigating to ${widgetUrl}...`);
  await page.goto(widgetUrl, { waitUntil: "networkidle0" });

  await page.waitForSelector("#boxframeprayer");
  const element = await page.$("#boxframeprayer");

  if (element) {
    console.log("Element found. Taking screenshot...");
    await element.screenshot({ path: imagePath });
    console.log(`Screenshot saved to ${imagePath}`);
  } else {
    console.error("Widget element #boxframeprayer not found.");
  }

  await browser.close();
  console.log("Browser closed.");
})();
