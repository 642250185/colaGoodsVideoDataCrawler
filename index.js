require('./db/initDB');
const spiderFactory = require('./spider');
const enumerate = require('./utils/enumerate');
const {importBatchPosts} = require('./service/syncdata');


const start = async(channel) => {
    try {
        const spider = spiderFactory.getSpider(channel);

        console.info(`------------------${channel} ------------------ begin`);

        console.info(`Start fetching data......`);
        const posts = await spider.crawlingPosts();

        console.info(`Prepare to import data......`);
        await importBatchPosts(posts);

        console.info(`-------------------${channel} ------------------- end`);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
};


const execute = async() => {
    try {
        const channels = Object.keys(enumerate.channel);
        for(const channel of channels){
            await start(channel);
        }
    } catch (e) {
        console.error(e);
        return e;
    }
    return;
};


const executeSingle = async(channel) => {
    try {
        await start(channel);
    } catch (e) {
        console.error(e);
        return e;
    }
};


executeSingle('toutiao');