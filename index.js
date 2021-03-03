const { lstat } = require('fs');
const puppeteer = require('puppeteer');


const url = 'https://2gis.ru/moscow';

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadPage(url) {
    const browser = await puppeteer.launch({
        headless: false, // false: enables one to view the Chrome instance in action
        defaultViewport: null, // (optional) useful only in non-headless mode
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitFor('input[placeholder="Поиск в 2ГИС"]');
    // await page.evaluate(val => document.querySelector(
    //     'input[placeholder="Поиск в 2ГИС"]').value = val, "школы английского");
    await page.click('input[placeholder="Поиск в 2ГИС"]');
    await page.type('input[placeholder="Поиск в 2ГИС"]', "Школы английского");
    await timeout(5000);
    console.log("HELLO!");
    await page.keyboard.press(String.fromCharCode(13));
    await timeout(5000);
    console.log("done 1 meth");

    //СБОР КАРТОЧЕК ОРГАНИЗАЦИЙ
    console.log("START!");

    console.log(await page.evaluate(() => {
        let result = [];
        console.log("start");
        let cards = Array.from(document.getElementsByClassName("_y3rccd"));
        cards.forEach(elem => {
            elem.click();   
            let name = document.getElementsByClassName("_6vzrncr")[0].textContent;
            let number = document.querySelectorAll("div[class='_b0ke8'] a[href*='tel:']")[0].href;

            
            let site = document.getElementsByClassName("_6vzrncr")[0].textContent;
            let mail = document.getElementsByClassName("_6vzrncr")[0].textContent; 
        })
        
    }))

    console.log(nodes);


}

loadPage(url);
