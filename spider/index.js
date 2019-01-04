const tikTokSpider = require('./tikTok');
const bilibiliSpider = require('./bilibili');
const budejieSpider = require('./budejie');
const sohuSpider = require('./sohu');
const toutiaoSpider = require('./toutiao');

module.exports = class SpiderFactory {
    static getSpider(channel) {
        switch (channel) {
            case 'tikTok':
                return tikTokSpider;
            case 'bilibili':
                return bilibiliSpider;
            case 'budejie':
                return budejieSpider;
            case 'sohu':
                return sohuSpider;
            case 'toutiao':
                return toutiaoSpider;
            default :
                return ""
        }
    }
};