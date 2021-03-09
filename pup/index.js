import { saveToWorksheet } from './exsaver.js';
import puppeteer from 'puppeteer'

// const url = 'https://2gis.ru/';

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadPage(url, subject, num) {
    const browser = await puppeteer.launch({
        headless: false, // false: enables one to view the Chrome instance in action
        defaultViewport: null, // (optional) useful only in non-headless mode
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitFor('input[placeholder="Поиск в 2ГИС"]');
    await page.click('input[placeholder="Поиск в 2ГИС"]');
    await page.type('input[placeholder="Поиск в 2ГИС"]', subject);

    await timeout(5000);
    console.log("HELLO!");
    await page.keyboard.press(String.fromCharCode(13));
    await timeout(5000);
    console.log("done 1 meth");

    //СБОР КАРТОЧЕК ОРГАНИЗАЦИЙ
    console.log("START!");

    const final = await page.evaluate(async (num) => {
        let result = [];
        let pageNum = 1;
        console.log("start");

        function delay(time) {
            return new Promise(function (resolve) {
                setTimeout(resolve, time)
            });
        }

        function findName() {
            var nodeName = document.getElementsByClassName("_6vzrncr");
            if (!nodeName.length)
                return "Name undefined";
            return nodeName[0].textContent;
        };

        function findNumber() {
            var nodeNumber = document.querySelectorAll("div[class='_b0ke8'] a[href*='tel:']");
            if (!nodeNumber.length)
                return "Number undefined";

            return nodeNumber[0].href.slice(4); //num format: tel:+74******* -> +74********
        };

        function findSite() {
            var nodeSite = document.querySelectorAll("div[class='_49kxlr'] a[class='_vhuumw']");
            if (!nodeSite.length)
                return "Site undefined";
            let sites = Array.from(nodeSite);
            return sites[sites.length - 1].text;
        };

        function findMail() {
            var nodeMail = document.querySelectorAll("div[class='_49kxlr'] a[href*='mailto']");
            if (!nodeMail.length)
                return "Mail undefined";
            return nodeMail[0].href.slice(7); //mail format: mailto:***@*** -> ***@***
        };

        async function collectInfo() {
            let cards = Array.from(document.getElementsByClassName("_y3rccd"));
            let name, number, site, mail;

            for (const elem of cards) {
                elem.scrollIntoView();
                await elem.click();
                await delay(3000);

                // СБОР ИНФО
                name = findName();
                console.log(name);
                number = findNumber();
                site = findSite();
                mail = findMail();

                result.push({
                    name,
                    number,
                    site,
                    mail
                })
                console.log("clicked!");
            }
        }

        for (let i = 0; i < num; i++) {
            if (pageNum > 1) {
                let buttons = Array.from(document.getElementsByClassName("_n5hmn94"));
                buttons[buttons.length - 1].click();
                await delay(3000);
                console.log("ВЫПОЛНИЛОСЬ УСЛОВИЕ ПАУЗЫ");
            }
            console.log("Current page -> " + pageNum++);
            await collectInfo();

        }

        return result;
    }, num)

    console.log("_____________________________________");
    console.log("____________ENDING___________________");
    console.log(final);
    console.log("Собрано элементов: " + final.length)
    await browser.close();
    await saveToWorksheet(final);
}

export async function start(city, subject, num) {
    await loadPage(`https://2gis.ru/${city}`, subject, num);
};





