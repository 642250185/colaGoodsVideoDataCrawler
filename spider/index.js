const tikTokSpider = require('./tikTok');

module.exports = class SpiderFactory {
    static getSpider(channel) {
        switch (channel) {
            case 'tikTok':
                return tikTokSpider;
            default :
                return ""
        }
    }
};