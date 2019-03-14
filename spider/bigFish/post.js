const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const config = require('../../config/cfg');
const sleep = require('js-sleep/js-sleep');

const Cookies = require('../../file/bigFish/Cookies');
const emumerate = require('../../utils/enumerate');
const {formatDate} = require('../../utils/dateUtil');

const {domain, postRoute,  postDataPath} = config.bigFish;


let number = 0;
const getUserPosts = async(username, cookie, plist, page) => {
    try {
        ++number;
        if(_.isEmpty(plist)){
            page = 1;
            plist = [];
        }
        const _rid = "427cfe476679499f9bbfb489ed05c608";
        const size = 10;
        const category = "all";
        const ts = 1551152629550;

        const path = `${domain}${postRoute}?_rid=${_rid}&page=${page}&size=${size}&category=${category}&_=${ts}`;
        let result = await request.get(path).set('Cookie', cookie);
        result = JSON.parse(result.text);
        const {dataList} = result;
        const {data, totalPage, metadata} = dataList;
        if(data.length === 0){
            return plist;
        }
        const {total} = metadata;
        console.info(`total: ${total}, totalPage: ${totalPage}`);
        let collectCount = 0; const _plist = [];
        for(const item of data){
            const {content_id, title, publish_at, _incrs} = item;
            const {play, share, comment, like, recommend} = _incrs;
            _plist.push({
                channel         : emumerate.channel.bigFish,
                nickname        : username,
                postId          : content_id,
                title           : title,
                playCount       : play,                 // 播放量
                collectCount    : collectCount,         // 收藏量
                shareCount      : share,                // 转发量 | 分享量
                commentCount    : comment,              // 评论量
                likeCount       : like,                 // 点赞量
                recommendCount  : recommend,            // 推荐数
                fansCount       : 0,                    // 粉丝数
                dateTime        : publish_at
            });
            console.info(`number: ${number}  渠道: ${emumerate.channel.bigFish}  账号: ${username}  postId: ${content_id}  播放量: ${play}   粉丝数: 0   收藏量: ${collectCount}  转发量: ${share}  评论量: ${comment}  点赞量: ${like}  推荐量: ${recommend}  日期: ${publish_at}  标题: ${title} `);
        }
        plist = plist.concat(_plist);
        if(page <= totalPage){
            page++;
            return await getUserPosts(username, cookie, plist, page);
        } else {
            return plist;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
};


const getAllUserPosts = async() => {
    try {
        let final = [];
        for(const item of Cookies){
            const {key, value} = item;
            const userPostsData = await getUserPosts(key, value);
            final = final.concat(userPostsData);
        }
        console.info(`final.Size: `, final.length);
        return final;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const crawlingPosts = async() => {
    try {
        const postsData = await getAllUserPosts();
        console.info(`bigFishPosts.Size: `, postsData.length);
        await fs.ensureDir(_path.join(postDataPath, '..'));
        fs.writeFileSync(postDataPath, JSON.stringify(postsData, null, 4));
        return postsData;
    } catch (e) {
        console.error(e);
        return [];
    }
};


exports.crawlingPosts = crawlingPosts;