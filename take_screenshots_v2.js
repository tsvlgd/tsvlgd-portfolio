const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const url = 'http://localhost:8081/';
const outputDir = '/home/mehfooj/Desktop/Desktop/tsvlgd-portfolio/design-audit/after/';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 }
];

const pagesToShot = [
  { name: 'home', selector: '[data-nav-link]:nth-child(1)', wait: 500, bothThemes: true },
  { name: 'resume', selector: '[data-nav-link]:nth-child(2)', wait: 500, bothThemes: true },
  { name: 'portfolio', selector: '[data-nav-link]:nth-child(3)', wait: 500, bothThemes: false },
];

(async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  
  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    for (const p of pagesToShot) {
      if (vp.name === 'mobile' && p.name === 'portfolio') {
        continue; // Mobile portfolio not explicitly requested, but could add.
      }
      
      try {
        if (vp.name === 'mobile') {
          // Open mobile menu if not home
          if (p.name !== 'home') {
            await page.click('#mobile-nav-toggle');
            await new Promise(r => setTimeout(r, 300));
            const mobileLinks = await page.$$('.mobile-drawer-link');
            for (const link of mobileLinks) {
              const text = await page.evaluate(el => el.textContent, link);
              if (text.toLowerCase() === p.name) {
                await link.click();
                break;
              }
            }
          }
        } else {
          // Desktop click
          const links = await page.$$('.navbar-link, .nav-link');
          for (const link of links) {
            const text = await page.evaluate(el => el.textContent, link);
            if (text.toLowerCase() === p.name) {
              await link.click();
              break;
            }
          }
        }
        
        await new Promise(r => setTimeout(r, p.wait));

        if (p.bothThemes) {
          // Dark Theme (default)
          await page.evaluate(() => {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
          });
          await new Promise(r => setTimeout(r, 200));
          await page.screenshot({ 
            path: path.join(outputDir, `${vp.name}_${p.name}_dark.png`),
            fullPage: true 
          });
          console.log(`Saved screenshot: ${vp.name}_${p.name}_dark.png`);

          // Light Theme
          await page.evaluate(() => {
            document.body.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
          });
          await new Promise(r => setTimeout(r, 200));
          await page.screenshot({ 
            path: path.join(outputDir, `${vp.name}_${p.name}_light.png`),
            fullPage: true 
          });
          console.log(`Saved screenshot: ${vp.name}_${p.name}_light.png`);

          // Reset to dark
          await page.evaluate(() => {
            document.body.removeAttribute("data-theme");
            localStorage.setItem("theme", "dark");
          });
        } else {
          await page.screenshot({ 
            path: path.join(outputDir, `${vp.name}_${p.name}.png`),
            fullPage: true 
          });
          console.log(`Saved screenshot: ${vp.name}_${p.name}.png`);
        }
      } catch (err) {
        console.error(`Failed on ${vp.name}_${p.name}:`, err.message);
      }
    }
  }

  await browser.close();
})();
