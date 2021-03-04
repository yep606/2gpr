// const puppeteer = require('puppeteer');
import {saveToWorksheet} from './exsaver.js';
import puppeteer from 'puppeteer'

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

    const final = await page.evaluate(async () => {

        let result = [];
        console.log("start");

        function delay(time) {
            return new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        }

        async function collectInfo() {
            let cards = Array.from(document.getElementsByClassName("_y3rccd"));


            for (const elem of cards) {
                elem.scrollIntoView();
                await elem.click();
                await delay(4000);
                // СБОР ИНФО
                let name = document.getElementsByClassName("_6vzrncr")[0].textContent;
                console.log(name);
                let number = document.querySelectorAll("div[class='_b0ke8'] a[href*='tel:']")[0].href;
                let findSite = () => {
                    let elems = Array.from(document.querySelectorAll("div[class='_49kxlr'] a[class='_vhuumw']"));
                    return elems[elems.length - 1];
                };
                let site = findSite().text;
                let mail = document.querySelectorAll("div[class='_49kxlr'] a[href*='mailto']")[0].href;
                result.push({
                    name,
                    number,
                    site,
                    mail
                })
                console.log("clicked!");
            }

        }

        await collectInfo();

        return result;
    })

    console.log("_____________________________________");
    console.log("____________ENDING___________________");
    console.log(final);
    await saveToWorksheet(final);

}

(async () => {
    await saveToWorksheet([{name: "wa", age: 16},{name: "wa", age: 18},{name: "wa", age: 120}]);
    // await loadPage(url);
})();

