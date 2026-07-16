import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173');
await page.waitForTimeout(1500);
const body = await page.textContent('body');
console.log('Has cartao field:', body.includes('cartão de militante') || body.includes('N.º de cartão'));
console.log('Has senha field:', body.includes('Senha'));
console.log('Has Entrar button:', body.includes('Entrar'));
// Click Entrar without filling
await page.click('button:has-text("Entrar")');
await page.waitForTimeout(1200);
const body2 = await page.textContent('body');
console.log('Logged in:', body2.includes('Feed Oficial'));
console.log('No Resumo card:', !body2.includes('Resumo'));
console.log('No Quotas em dia in feed:', !body2.includes('Quotas em dia'));
await browser.close();
console.log('DONE');
