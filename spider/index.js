const tikTokSpider = require('./tikTok');
const bilibiliSpider = require('./bilibili');

module.exports = class SpiderFactory {
    static getSpider(channel) {
        switch (channel) {
            case 'tikTok':
                return tikTokSpider;
            case 'bilibili':
                return bilibiliSpider;
            default :
                return ""
        }
    }
};