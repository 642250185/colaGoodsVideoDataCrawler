const path = require('path');

const config = {
    mongodb: {
        host: '127.0.0.1',
        port: 27017,
        dbname: 'colaGoods'
    },
    tikTok: {
        domain: 'https://aweme.snssdk.com',
        postRoute: '/aweme/v1/aweme/post/',
        followRoute: '/aweme/v1/user/following/list/',
        postDataPath: path.join(__dirname, '..', 'data/tikTok/post.json')
    },
    gifShow: {

    },
    env: function () {
        global.$config = this;
        return global.$config;
    }
};


module.exports = config.env();