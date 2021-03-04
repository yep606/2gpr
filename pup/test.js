async function test(){

    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

async function writeMessage(){
    console.log("DO SOMETHING");
}

await delay(5000);
await writeMessage();

}

test();