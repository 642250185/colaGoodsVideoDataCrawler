const fs = require('fs');
const readline = require('readline');

const filename = 'D:\\colaFiddlerFile\\gifShow.txt';

const r1 = readline.createInterface({
    input: fs.createReadStream(filename, { encoding: 'utf-16le' }),
    crlfDelay: Infinity,
    terminal: true
});
let number = 0;
r1.on('line', (line) => {
    ++number;
    console.info(`[${number}]::: ${line}`)
});


// fs.readFile(filename, 'utf-16le', function(err, data){
//     if(err){
//         console.error(err);
//     } else {
//         console.info(data);
//     }
// });














