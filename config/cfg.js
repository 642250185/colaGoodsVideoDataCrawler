const path = require('path');

const config = {
    mongodb: {
        host: '10.0.10.230',
        port: 27017,
        dbname: 'colaGoods'
    },
    tikTok: {
        domain: 'https://aweme.snssdk.com',
        postRoute: '/aweme/v1/aweme/post/',
        followRoute: '/aweme/v1/user/following/list/',
        followCountRoute: 'https://api-eagle.amemv.com/aweme/v1/user/',
        postDataPath: path.join(__dirname, '..', 'data/tikTokPost.json')
    },
    bilibili: {
        domain: 'https://api.vc.bilibili.com',
        postRoute: '/dynamic_svr/v1/dynamic_svr/space_history',
        postDataPath: path.join(__dirname, '..', 'data/bilibiliPost.json')
    },
    budejie: {
        domain: 'http://d.api.budejie.com',
        userInfoRoute: '/user/info',
        postRoute: '/topic/my-topic/budejie-android-7.0.8/',
        postDataPath: path.join(__dirname, '..', 'data/budejiePost.json')
    },
    sohu: {
        domain: 'https://mp.sohu.com',
        postRoute: '/v3/users/news/',
        postDataPath: path.join(__dirname, '..', 'data/sohuPost.json')
    },
    gifShow: {

    },
    toutiao: {
        domain: 'https://lf-hl.snssdk.com',
        postRoute: '/api/feed/profile/v1/',
        followCountRoute: 'https://lg-hl.snssdk.com/user/profile/homepage/v7/',
        postDataPath: path.join(__dirname, '..', 'data/toutiaoPost.json')
    },
    volcano: {
        domain: 'https://api-a.huoshan.com',
        postRoute: '/hotsoon/user/',
        postDataPath: path.join(__dirname, '..', 'data/volcanoPost.json')
    },
    pipixia: {
        domain: 'https://is.snssdk.com',
        postRoute: '/bds/user/publish_list/',
        postDataPath: path.join(__dirname, '..', 'data/pipixiaPost.json')
    },
    bigFish: {
        domain: 'https://mp.dayu.com',
        postRoute: '/mobile/api/getContentList',
        postDataPath: path.join(__dirname, '..', 'data/bigFishPost.json')
    },
    env: function () {
        global.$config = this;
        return global.$config;
    }
};


module.exports = config.env();