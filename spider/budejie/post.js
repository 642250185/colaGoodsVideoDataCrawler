const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const sleep = require('js-sleep/js-sleep');
const config = require('../../config/cfg');
const emumerate = require('../../utils/enumerate');
const cookies = require('../../file/budejie/Cookies');

const {domain, postRoute, postDataPath, userInfoRoute} = config.budejie;

const getFollowerCount = async(cookie) => {
    try{
        let followerCount = 0;
        const market = "c-oppo";
        const ver = "7.0.8";
        const visiting = 22960283;
        const os = "8.1.0";
        const appname = "baisibudejie";
        const client = "android";
        const id = 22960283;
        const udid = "860083046316050";
        const mac = "02%3A00%3A00%3A00%3A00%3A00";
        const path = `${domain}${userInfoRoute}?market=${market}&ver=${ver}&visiting=${visiting}&os=${os}&appname=${appname}&client=${client}&id=${id}&udid=${udid}&mac=${mac}`;
        try {
            let result = await request.get(path).set("cookie", cookie.value);
            result = JSON.parse(result.text);
            followerCount = result.fans_count;
        } catch (e) {
            followerCount = 0;
        }
        return followerCount;
    } catch (e) {
        console.error(e);
        return 0;
    }
};


let number = 0;
const getUserPosts = async(cookie, fansCount, index, plist) => {
    try {
        ++number;
        if(_.isEmpty(plist)){
            index = 0;
            plist = [];
        }
        await sleep(1000 * 5);  // 限制频率以防被budejie屏蔽
        // 请求地址
        const path = `${domain}${postRoute}${index}-20.json?`;
        let result = await request.get(path).set("cookie", cookie.value);
        result = JSON.parse(result.text);
        const {info, list} = result;
        const {count, np} = info;
        if(count === 0){
            return plist;
        }
        let collectCount = 0; let recommendCount = 0; const _plist = [];
        for(const item of list){
            let playCount = 0;
            if(!_.isEmpty(item.video)){
                playCount = item.video.playcount
            }
            _plist.push({
                channel         : emumerate.channel.budejie,
                nickname        : cookie.key,
                postId          : item.id,
                title           : item.text,
                playCount       : playCount,                    // 播放量
                collectCount    : collectCount,                 // 收藏量
                shareCount      : item.forward,                 // 转发量 | 分享量
                commentCount    : item.comment,                 // 评论量
                likeCount       : item.up,                      // 点赞量
                recommendCount  : recommendCount,               // 推荐数
                fansCount       : fansCount,                    // 粉丝数
                dateTime        : item.passtime                 // 时间
            });
            console.info(`${number}  渠道: ${emumerate.channel.budejie}  昵称: ${cookie.key}  postId: ${item.id}  播放量: ${playCount}  收藏量: ${collectCount}  分享量: ${item.forward}  评论量: ${item.comment}  点赞量: ${item.up}  推荐数: ${recommendCount}  时间: ${item.passtime}  标题: ${item.text}`);
        }
        plist = plist.concat(_plist);
        index = np;
        return await getUserPosts(cookie, fansCount, index, plist);
    } catch (e) {
        console.error(e);
        return e;
    }
};


const getAllUserPosts = async() => {
    try {
        let posts = [];
        for(const cookie of cookies){
            const fansCount = await getFollowerCount(cookie);
            const post = await getUserPosts(cookie, fansCount);
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
        console.info('budejiePosts.Size: ', postsData.length);
        await fs.ensureDir(_path.join(postDataPath, '..'));
        fs.writeFileSync(postDataPath, JSON.stringify(postsData, null, 4));
        return postsData;
    } catch(e) {
        console.error(e);
        return [];
    }
};


exports.crawlingPosts = crawlingPosts;