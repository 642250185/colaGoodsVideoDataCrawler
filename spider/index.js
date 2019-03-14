const tikTokSpider = require('./tikTok');
const bilibiliSpider = require('./bilibili');
const budejieSpider = require('./budejie');
const sohuSpider = require('./sohu');
const toutiaoSpider = require('./toutiao');
const volcanoSpider = require('./volcano');
const pipixiaSpider = require('./pipixia');
const bigFishSpider = require('./bigFish');

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
            case 'volcano':
                return volcanoSpider;
            case 'pipixia':
                return pipixiaSpider;
            case 'bigFish':
                return bigFishSpider;
            default :
                return ""
        }
    }
};