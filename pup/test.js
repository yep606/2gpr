import puppeteer from 'puppeteer'

const url = 'https://2gis.ru/moscow';

async function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadPage(url, subject) {
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

    const buttons = await page.$$("._n5hmn94");

    // console.log(buttons);
    buttons[0].click();
    console.log(buttons.length + " длина ");

    page.evaluate(async() => {

         async function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }   

            let buttons = Array.from(document.getElementsByClassName("_n5hmn94"));
            buttons[buttons.length - 1].click();
            await timeout(4000);
            console.log(document.getElementsByClassName("_y3rccd"));
            document.getElementsByClassName("_y3rccd")[0].click();

    })

    const elems = await page.$$("._y3rccd");
    console.log(elems);
    
}

    await loadPage(url, "школы английского");