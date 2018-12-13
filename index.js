const spiderFactory = require('./spider');


const test = async(channel) => {
    try {
        const spider = spiderFactory.getSpider(channel);
        await spider.crawlingPosts();


    } catch (e) {
        console.error(e);
        return e;
    }
};


test("tikTok");