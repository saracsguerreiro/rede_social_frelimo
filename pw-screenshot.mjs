import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1400, height: 900 });

await page.goto('http://localhost:5173');
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/screen-login.png' });
console.log('LOGIN DONE');

const loginHasInput = await page.locator('input').count();
const loginBtnText = await page.locator('button').allTextContents();
console.log('Inputs on login:', loginHasInput);
console.log('Buttons on login:', loginBtnText);

await page.click('button:has-text("Entrar")');
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/screen-feed.png' });
console.log('FEED DONE');

const bodyText = await page.textContent('body');
const checks = ['Feed Oficial','Mensagens','Próximos Eventos','Votação a Decorrer','Circular','URGENTE','Daniel Chapo','Novos na Rede','Os Seus Espaços'];
for (const c of checks) console.log(c+':', bodyText.includes(c));

const imgs = await page.locator('img').all();
for (const img of imgs) { const src = await img.getAttribute('src'); console.log('IMG:', src); }

await browser.close();
