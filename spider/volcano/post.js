const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const config = require('../../config/cfg');
const sleep = require('js-sleep/js-sleep');
const users = require('../../file/volcano/users');
const emumerate = require('../../utils/enumerate');
const {formatDate} = require('../../utils/dateUtil');


const {domain, postRoute,  postDataPath} = config.volcano;


let number = 0;
const getUserPosts = async(userId, username, plist, timeCode) => {
    try {
        ++number;
        let timeParams = `max_time`;
        let req_from = "feed_loadmore";
        if(_.isEmpty(plist)){
            plist = [];
            timeParams = 'min_time';
            req_from = "enter_auto";
        }
        let timeParamsCode = timeCode;

        let offset = 20;
        let count = 20;
        const ad_user_agent = "com.ss.android.ugc.live%2F570+%28Linux%3B+U%3B+Android+8.1.0%3B+zh_CN%3B+PBAM00%3B+Build%2FOPM1.171019.026%3B+Chrome%29";
        const live_sdk_version = 570;
        const iid = 63889714920;
        const device_id = 58838615711;
        const ac = "wifi";
        const channel = "oppo";
        const aid = 1112;
        const app_name = "live_stream";
        const version_code = 570;
        const version_name = "5.7.0";
        const device_platform = "android";
        const ssmix = "a";
        const device_type = "PBAM00";
        const device_brand = "OPPO";
        const language = "zh";
        const os_api = 27;
        const os_version = "8.1.0";
        const openudid = "cff77562f33d7a27";
        const manifest_version_code = 570;
        const resolution = "720*1520";
        const dpi = 320;
        const update_version_code = 5704;
        const _rticket = 1550645024419;
        const ab_version = "391710%2C727428%2C712302%2C691843%2C715928%2C691945%2C741592%2C704096%2C709965%2C743060%2C714438%2C692223%2C706102%2C735573%2C724579%2C745168%2C677240%2C557631%2C674566%2C743734%2C739936%2C710143%2C747043%2C742902%2C736846%2C746627%2C726133%2C661940%2C747497%2C699742%2C374107%2C705072%2C633217%2C747984%2C714582%2C679568%2C689929%2C734849%2C652861%2C737679%2C735442%2C299909%2C736836%2C384502%2C457535%2C665355%2C682009%2C735475%2C724497";
        const ts = 1550645025;
        const as = "a2b54f36a152cc571c4777";
        const cp = "f82cc95316cc6378e2QuYy";
        const mas = "0093ac84ec0ad1f53121e10a062011278b2e4a0648262a2ab2";

        const path = `${domain}${postRoute}${userId}/items/?${timeParams}=${timeParamsCode}&offset=${offset}&count=${count}&req_from=${req_from}&ad_user_agent=${ad_user_agent}&live_sdk_version=${live_sdk_version}&iid=${iid}&device_id=${device_id}&ac=${ac}&channel=${channel}&aid=${aid}&app_name=${app_name}&version_code=${version_code}&version_name=${version_name}&device_platform=${device_platform}&ssmix=${ssmix}&device_type=${device_type}&device_brand=${device_brand}&language=${language}&os_api=${os_api}&os_version=${os_version}&openudid=${openudid}&manifest_version_code=${manifest_version_code}&resolution=${resolution}&dpi=${dpi}&update_version_code=${update_version_code}&_rticket=${_rticket}&ab_version=${ab_version}&ts=${ts}&as=${as}&cp=${cp}&mas=${mas}`;
        console.info(`path >>>: `, path);
        let result = await request.get(path);
        result = JSON.parse(result.text);
        let {data, extra, status_code} = result;
        console.info(`data.size: `, data.length);
        const {has_more, max_time, total} = extra;
        console.info(`has_more: ${has_more},  max_time: ${max_time}`);
        let collectCount = 0; let recommendCount = 0; const _plist = [];
        for(const item of data){
            const content = item.data;
            const {stats} = content;
            _plist.push({
                channel         : emumerate.channel.volcano,
                nickname        : username,
                postId          : content.id,
                title           : content.description,
                playCount       : stats.play_count,     // 播放量
                collectCount    : collectCount,         // 收藏量
                shareCount      : stats.share_count,    // 转发量 | 分享量
                commentCount    : stats.comment_count,  // 评论量
                likeCount       : stats.digg_count,     // 点赞量
                recommendCount  : recommendCount,       // 推荐数
                fansCount       : 0,                    // 粉丝数
                dateTime        : formatDate(new Date(Number(content.create_time * 1000)))
            });
            console.info(`number: ${number}  渠道: ${emumerate.channel.volcano}  账号: ${username}  postId: ${content.id}  播放量: ${stats.play_count}   粉丝数: 0   收藏量: ${collectCount}  转发量: ${stats.share_count}  评论量: ${stats.comment_count}  点赞量: ${stats.digg_count}  推荐量: 0  日期: ${content.create_time}  标题: ${content.description} `);
        }
        plist = plist.concat(_plist);
        if(has_more){
            return await getUserPosts(userId, username, plist, max_time);
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
        for(const item of users){
            const {userId, username} = item;
            const userPostsData = await getUserPosts(userId, username);
            final = final.concat(userPostsData);
        }
        return final;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const crawlingPosts = async() => {
    try {
        const postsData = await getAllUserPosts();
        console.info(`volcanoPosts.Size: `, postsData.length);
        await fs.ensureDir(_path.join(postDataPath, '..'));
        fs.writeFileSync(postDataPath, JSON.stringify(postsData, null, 4));
        return postsData;
    } catch (e) {
        console.error(e);
        return [];
    }
};


exports.crawlingPosts = crawlingPosts;