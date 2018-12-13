const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const sleep = require('js-sleep/js-sleep');
const config = require('../../config/cfg');
const emumerate = require('../../utils/enumerate');
const {domain, postRoute, postDataPath} = config.bilibili;

let number = 0;
const getUserPosts = async(plist) =>{
    try {
        ++number;
        if(_.isEmpty(plist)){
            plist = [];
        }
        const _device = "android";
        const _hwid = "ekouGy5LckUnEycfYx9jBj8Ial5qUmFWZlM2BmJXYg";
        const access_key = "6839d3cb9f3496737061a374ea3a10c1";
        const appkey = "1d8b6e7d45233436";
        const build = 5350000;
        const host_uid = 383460727;
        const mobi_app = "android";
        const offset_dynamic_id = 0;
        const page = 1;
        const platform = "android";
        const qn = 32;
        const src = "yingyongbao";
        const trace_id = 20181210111500016;
        const ts = 1544411716000;
        const version = "5.35.0.5350000";
        const video_meta = "fnver%3A0%2Cqn%3A32%2Cfnval%3A16";
        const visitor_uid = 383460727;
        const sign = "9cd43ec0badb5dfc4a9c776940e208d3";
        const path = `${domain}${postRoute}?_device=${_device}&_hwid=${_hwid}&access_key=${access_key}&appkey=${appkey}&build=${build}&host_uid=${host_uid}&mobi_app=${mobi_app}&offset_dynamic_id=${offset_dynamic_id}&page=${page}&platform=${platform}&qn=${qn}&src=${src}&trace_id=${trace_id}&ts=${ts}&version=${version}&video_meta=${video_meta}&visitor_uid=${visitor_uid}&sign=${sign}`;
        let result = await request.get(path);
        result = JSON.parse(result.text);
        // console.info('result:', result);
        const {code, msg, message, data} = result;
        const {has_more, fold_mgr, attentions, cards} = data;
        const nickname = "男山无颜祖";
        let collectCount = 0; let recommendCount = 0; const _plist = [];
        for(const item of cards){
            let {card, desc} = item;
            card = JSON.parse(card);
            _plist.push({
                channel         : emumerate.channel.bilibili,
                account         : nickname,
                postId          : desc.dynamic_id,
                title           : card.desc,
                playCount       : card.stat.view,       // 播放量
                collectCount    : collectCount,         // 收藏量
                shareCount      : card.stat.share,      // 转发量 | 分享量
                commentCount    : card.stat.reply,      // 评论量
                likeCount       : card.stat.like,       // 点赞量
                recommendCount  : recommendCount,       // 推荐数
                dateTime        : card.pubdate          // 时间
            });
            console.info(`number: ${number}  渠道: ${emumerate.channel.bilibili}  账号: ${nickname}  postId: ${desc.dynamic_id}  播放量: ${card.stat.view}  收藏量: ${collectCount}  转发量: ${card.stat.share}  评论量: ${card.stat.reply}  点赞量: ${card.stat.like}  推荐量: ${recommendCount}  日期: ${card.pubdate}  标题: ${card.desc} `);
        }
        plist = plist.concat(_plist);
        if(has_more){
            return await getUserPosts(plist);
        } else {
            return plist;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
};


const crawlingPosts = async() => {
    try {
        const postsData = await getUserPosts();
        console.info('postsData.size: ', postsData.length);
        await fs.ensureDir(_path.join(postDataPath, '..'));
        fs.writeFileSync(postDataPath, JSON.stringify(postsData, null, 4));
        return postsData;
    } catch(e) {
        console.error(e);
        return [];
    }
};


exports.crawlingPosts = crawlingPosts;