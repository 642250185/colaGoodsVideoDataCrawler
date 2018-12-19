const lo = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const sleep = require('js-sleep/js-sleep');
const config = require('../../config/cfg');
const emumerate = require('../../utils/enumerate');
const cookies = require('../../file/sohu/Cookies');

const {domain, postRoute, postDataPath} = config.sohu;

let number = 0;
const getUserPosts = async(cookie, pno, plist) => {
    try {
        if(lo.isEmpty(plist)){
            pno = 1;
            plist = [];
        }
        let psize = 10;
        const newsType = 1;
        const statusType = 1;
        const _ = 1544428695702;
        const accountId = 100298135;
        await sleep(1000 * 5);  // 限制频率以防被sohu屏蔽
        // 请求地址
        const path = `${domain}${postRoute}?newsType=${newsType}&statusType=${statusType}&pno=${pno}&psize=${psize}&accountId=${accountId}&_=${_}`;
        let result = await request.get(path).set('cookie', cookie.value);
        result = JSON.parse(result.text);
        const {news, totalCount} = result;
        let collectCount = 0; let recommendCount = 0; const _plist = [];
        for(const item of news){
            _plist.push({
                channel         : emumerate.channel.sohu,
                account         : cookie.key,
                postId          : item.id,
                title           : item.title,
                playCount       : item.pv,                      // 播放量
                collectCount    : collectCount,                 // 收藏量
                shareCount      : 0,                            // 转发量 | 分享量
                commentCount    : item.cmt,                     // 评论量
                likeCount       : 0,                            // 点赞量
                recommendCount  : recommendCount,               // 推荐数
                dateTime        : item.createdTime              // 时间
            });
            console.info(`${++number}  渠道: ${emumerate.channel.sohu}  昵称: ${cookie.key}  postId: ${item.id}  播放量: ${item.pv}  收藏量: ${collectCount}  分享量: 0  评论量: ${item.cmt}  点赞量: 0  推荐数: ${recommendCount}  时间: ${item.createdTime}  标题: ${item.title}`);
        }
        plist = plist.concat(_plist);
        const pageSum = Math.ceil(totalCount / psize);
        pno++;
        if(pno >= pageSum){
            return plist;
        } else {
            return await getUserPosts(cookie, pno, plist);
        }
    } catch (e) {
        console.error(e);
        return e;
    }
};


const getAllUserPosts = async() => {
    try {
        let posts = [];
        for(const cookie of cookies){
            const post = await getUserPosts(cookie);
            posts = posts.concat(post);
        }
        return posts;
    } catch (e) {
        console.error(e);
        return e;
    }
};


const crawlingPosts = async() => {
    try {
        const postsData = await getAllUserPosts();
        console.info('sohuPosts.Size: ', postsData.length);
        await fs.ensureDir(_path.join(postDataPath, '..'));
        fs.writeFileSync(postDataPath, JSON.stringify(postsData, null, 4));
        return postsData;
    } catch(e) {
        console.error(e);
        return [];
    }
};


exports.crawlingPosts = crawlingPosts;