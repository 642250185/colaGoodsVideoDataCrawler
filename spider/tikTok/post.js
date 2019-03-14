const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const config = require('../../config/cfg');
const sleep = require('js-sleep/js-sleep');
const emumerate = require('../../utils/enumerate');
const {formatDate} = require('../../utils/dateUtil');
const followUsers = require('../../file/tikTok/followUsers');
const {domain, postRoute, followRoute, postDataPath, followCountRoute} = config.tikTok;

// 获取抖音所有关注的用户
const getFollowingUser = async() => {
    try {
        const user_id = 108699289509;
        const maxTime = 1544600501;
        const count = 20;
        const _offset = 0;
        const source_type= 2;
        const retry_type = "no_retry";
        const iid = 53894084754;
        const device_id = 58838615711;
        const ac = "wifi";
        const channel = "oppo";
        const aid = 1128;
        const app_name = "aweme";
        const version_code = 360;
        const version_name = "3.6.0";
        const device_platform = "android";
        const ssmix = "a";
        const device_type = "PBAM00";
        const device_brand = "OPPO";
        const language = "zh";
        const os_api = 27;
        const os_version = "8.1.0";
        const uuid = 860083046316050;
        const openudid = "cff77562f33d7a27";
        const manifest_version_code = 360;
        const resolution = "720*1520";
        const dpi = 320;
        const update_version_code = 3602;
        const _rticket = 1544600501389;
        const ts = 1544600501;
        const js_sdk_version = "1.5.4";
        const as = "a1e55b21e55b3cabf04255";
        const cp = "b4b0c652540412bbe1_eMi";
        const mas = "0173e5711b88118a108eae38bdee731837acac4c2c0c664686c6cc";
        const path = `${domain}${followRoute}?user_id=${user_id}&max_time=${maxTime}&count=${count}&offset=${_offset}&source_type=${source_type}&retry_type=${retry_type}&iid=${iid}&device_id=${device_id}&ac=${ac}&channel=${channel}&aid=${aid}&app_name=${app_name}&version_code=${version_code}&version_name=${version_name}&device_platform=${device_platform}&ssmix=${ssmix}&device_type=${device_type}&device_brand=${device_brand}&language=${language}&os_api=${os_api}&os_version=${os_version}&uuid=${uuid}&openudid=${openudid}&manifest_version_code=${manifest_version_code}&resolution=${resolution}&dpi=${dpi}&update_version_code=${update_version_code}&_rticket=${_rticket}&ts=${ts}&js_sdk_version=${js_sdk_version}&as=${as}&cp=${cp}&mas=${mas}`;
        let result = await request.get(path);
        result = JSON.parse(result.text);
        console.info('result: ', result);
        const {has_more, followings} = result;
        const followingsUser = [];
        for(const item of followings){
            const {uid, nickname} = item;
            console.info(`uid: ${uid},  nickname: ${nickname}`);
            followingsUser.push({uid, nickname});
        }
        return followingsUser;
    } catch (e) {
        console.error(e);
        return [];
    }
};


const getFollowerCount = async(uid) => {
    try {
        let followerCount = 0;
        const user_id = uid;
        const retry_type = "no_retry";
        const mcc_mnc = "";
        const iid = "55780387811";
        const device_id = "58838615711";
        const ac = "wifi";
        const channel = "oppo";
        const aid = "1128";
        const app_name = "aweme";
        const version_code = 390;
        const version_name = "3.9.0";
        const device_platform = "android";
        const ssmix = "a";
        const device_type = "PBAM00";
        const device_brand = "OPPO";
        const language = "zh";
        const os_api = 27;
        const os_version = "8.1.0";
        const uuid = "860083046316050";
        const openudid = "cff77562f33d7a27";
        const manifest_version_code = 390;
        const resolution = "720*1520";
        const dpi = 320;
        const update_version_code = 3902;
        const _rticket = 1546411465465;
        const ts = 1546411465;
        const js_sdk_version = "1.6.4";
        const as = "a1e50542e9ccec0d8c2933";
        const cp = "55cecb5698c621d6e1Sy[c";
        const mas = "01faf6d0b718aa1ea745675860217610d6cccc9c4cc61c260cc6a6";
        const path = `${followCountRoute}?user_id=${user_id}&retry_type=${retry_type}&mcc_mnc=${mcc_mnc}&iid=${iid}&device_id=${device_id}&ac=${ac}&channel=${channel}&aid=${aid}&app_name=${app_name}&version_code=${version_code}&version_name=${version_name}&device_platform=${device_platform}&ssmix=${ssmix}&device_type=${device_type}&device_brand=${device_brand}&language=${language}&os_api=${os_api}&os_version=${os_version}&uuid=${uuid}&openudid=${openudid}&manifest_version_code=${manifest_version_code}&resolution=${resolution}&dpi=${dpi}&update_version_code=${update_version_code}&_rticket=${_rticket}&ts=${ts}&js_sdk_version=${js_sdk_version}&as=${as}&cp=${cp}&mas=${mas}`;
        let result = await request.get(path);
        result = JSON.parse(result.text);
        const {status_code, user} = result;
        if(status_code === 0){
            let totalFollowers = 0;
            const {followers_detail} = user;
            for(const followerChannle of followers_detail){
                totalFollowers = totalFollowers + followerChannle.fans_count;
            }
            followerCount = totalFollowers;
        }
        return followerCount;
    } catch (e) {
        console.error(e);
        return 0
    }
};


let number = 0;
const _getUserPosts = async(uid, nickname, fansCount, maxCursor, plist) => {
    try {
        ++number;
        // 基础参数
        if(_.isEmpty(plist)){
            plist = [];
            maxCursor = 0;
        }
        const user_id = uid;
        const count = 20;
        const retry_type = "no_retry";
        const iid = 53457257665;
        const device_id = 58252748187;
        const ac = "wifi";
        const channel = "oppo";
        const aid = 1128;
        const app_name = "aweme";
        const version_code = 360;
        const version_name = "3.6.0";
        const device_platform = "android";
        const ssmix = "a";
        const device_type = "PAFM00";
        const device_brand = "OPPO";
        const language = "zh";
        const os_api = 27;
        const os_version = "8.1.0";
        const uuid = 863008045337291;
        const openudid = "11a8fc5edf520c51";
        const manifest_version_code = 360;
        const resolution = "1080*2340";
        const dpi = 480;
        const update_version_code = 3602;
        const _rticket = 1544253543192;
        const ts = 1544253542;
        const js_sdk_version = "1.2.2";
        const as = "a1d587b0f6e68c10db2888";
        const cp = "7365c0586dbb0f0ce1Ysaa";
        const mas = "01c761c85d15d90ca643e6cfd9ed0599441c1c1c4c46260c8cc61c";
        await sleep(1000 * 5);  // 限制频率以防被tikTok屏蔽
        // 请求地址
        const path = `${domain}${postRoute}?max_cursor=${maxCursor}&user_id=${user_id}&count=${count}&retry_type=${retry_type}&iid=${iid}&device_id=${device_id}&ac=${ac}&channel=${channel}&aid=${aid}&app_name=${app_name}&version_code=${version_code}&version_name=${version_name}&device_platform=${device_platform}&ssmix=${ssmix}&device_type=${device_type}&device_brand=${device_brand}&language=${language}&os_api=${os_api}&os_version=${os_version}&uuid=${uuid}&openudid=${openudid}&manifest_version_code=${manifest_version_code}&resolution=${resolution}&dpi=${dpi}&update_version_code=${update_version_code}&_rticket=${_rticket}&ts=${ts}&js_sdk_version=${js_sdk_version}&as=${as}&cp=${cp}&mas=${mas}`;
        let result = await request.get(path);
        result = JSON.parse(result.text);
        const {status_code, min_cursor, max_cursor, has_more, aweme_list, extra, log_pb} = result;
        console.info(`aweme_list: %j`, aweme_list);
        let collectCount = 0; let recommendCount = 0; const _plist = [];
        for(const item of aweme_list){
            const {statistics} = item;
            _plist.push({
                channel         : emumerate.channel.tikTok,
                nickname        : nickname,
                postId          : item.aweme_id,
                title           : item.desc,
                playCount       : statistics.play_count,    // 播放量
                collectCount    : collectCount,             // 收藏量
                shareCount      : statistics.share_count,   // 转发量 | 分享量
                commentCount    : statistics.comment_count, // 评论量
                likeCount       : statistics.digg_count,    // 点赞量
                recommendCount  : recommendCount,           // 推荐数
                fansCount       : fansCount,                // 粉丝数
                dateTime        : formatDate(new Date(Number(item.create_time * 1000)))          // 时间
            });
            console.info(`number: ${number}  渠道: ${emumerate.channel.tikTok}  账号: ${nickname}  postId: ${item.aweme_id}  播放量: ${statistics.play_count}   粉丝数: ${fansCount}   收藏量: ${collectCount}  转发量: ${statistics.share_count}  评论量: ${statistics.comment_count}  点赞量: ${statistics.digg_count}  推荐量: ${recommendCount}  日期: ${item.create_time}  标题: ${item.desc} `);
        }
        plist = plist.concat(_plist);
        if(has_more){
            return await _getUserPosts(uid, nickname, fansCount, max_cursor, plist);
        } else {
            return plist;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
};


const getUserPosts = async(uid, nickname, fansCount, maxCursor, plist) => {
    const _domain = `https://aweme-hl.snssdk.com`;
    const _openRoute = `/aweme/v1/forward/list/?`;

    const user_id = uid;
    ++number;
    // 基础参数
    if(_.isEmpty(plist)){
        plist = [];
        maxCursor = 0;
    }
    const min_cursor = 0;
    const count = 20;
    const ts = 1551873411;
    const js_sdk_version = "1.10.4";
    const app_type = "normal";
    const manifest_version_code = 530;
    const _rticket = 1551873412213;
    const ac = "wifi";
    const device_id = 58838615711;
    const iid = 65298980704;
    const mcc_mnc = 46001;
    const os_version = "8.1.0";
    const channel = "oppo";
    const version_code = 530;
    const device_type = "PBAM00";
    const language = "zh";
    const uuid = 860083046316050;
    const resolution = "720*1520";
    const openudid = "cff77562f33d7a27";
    const update_version_code = 5302;
    const app_name = "aweme";
    const version_name = "5.3.0";
    const os_api = 27;
    const device_brand = "OPPO";
    const ssmix = "a";
    const device_platform = "android";
    const dpi = 320;
    const aid = 1128;
    const as = "a155cb973388ccb5af4866";
    const cp = "b587cb5e33f67656e1auOy";
    const mas = "01a5754fa463d5edee0e91458905ad8b376c6c1c2c6686ac46c6c6";
    const path = `${_domain}${_openRoute}user_id=${user_id}&max_cursor=${maxCursor}&min_cursor=${min_cursor}&count=${count}&ts=${ts}&js_sdk_version=${js_sdk_version}&app_type=${app_type}&manifest_version_code=${manifest_version_code}&_rticket=${_rticket}&ac=${ac}&device_id=${device_id}&iid=${iid}&mcc_mnc=${mcc_mnc}&os_version=${os_version}&channel=${channel}&version_code=${version_code}&device_type=${device_type}&language=${language}&uuid=${uuid}&resolution=${resolution}&openudid=${openudid}&update_version_code=${update_version_code}&app_name=${app_name}&version_name=${version_name}&os_api=${os_api}&device_brand=${device_brand}&ssmix=${ssmix}&device_platform=${device_platform}&dpi=${dpi}&aid=${aid}&as=${as}&cp=${cp}&mas=${mas}`;
    let result = await request.get(path);
    result = JSON.parse(result.text);
    const {max_cursor, has_more, dongtai_list} = result;
    console.info(`max_cursor: ${max_cursor},   has_more: ${has_more},   dongtai_list: ${dongtai_list}`);
    let collectCount = 0; let recommendCount = 0; const _plist = [];
    for(const item of dongtai_list){
        const {aweme} = item;
        const {aweme_id, desc, statistics, create_time} = aweme;
        _plist.push({
            channel         : emumerate.channel.tikTok,
            nickname        : nickname,
            postId          : aweme_id,
            title           : desc,
            playCount       : statistics.play_count,    // 播放量
            collectCount    : collectCount,             // 收藏量
            shareCount      : statistics.share_count,   // 转发量 | 分享量
            commentCount    : statistics.comment_count, // 评论量
            likeCount       : statistics.digg_count,    // 点赞量
            recommendCount  : recommendCount,           // 推荐数
            fansCount       : fansCount,                // 粉丝数
            dateTime        : formatDate(new Date(Number(create_time * 1000)))          // 时间
        });
        console.info(`number: ${number}  渠道: ${emumerate.channel.tikTok}  账号: ${nickname}  postId: ${aweme_id}  播放量: ${statistics.play_count}   粉丝数: 0   收藏量: ${collectCount}  转发量: ${statistics.share_count}  评论量: ${statistics.comment_count}  点赞量: ${statistics.digg_count}  推荐量: ${recommendCount}  日期: ${create_time}  标题: ${desc} `);
    }
    plist = plist.concat(_plist);
    if(has_more){
        return await getUserPosts(uid, nickname, fansCount, max_cursor, plist);
    } else {
        return plist;
    }
};


const getAllUserPosts = async() => {
    try {
        let final = [];
        for(const user of followUsers){
            console.info(`user: %j`, user);
            const fansCount = await getFollowerCount(user.uid);
            console.info(`fansCount: %d`, fansCount);
            const userPostsData = await getUserPosts(user.uid, user.nickname, fansCount);
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
        console.info('tikTokPosts.Size: ', postsData.length);
        await fs.ensureDir(_path.join(postDataPath, '..'));
        fs.writeFileSync(postDataPath, JSON.stringify(postsData, null, 4));
        return postsData;
    } catch(e) {
        console.error(e);
        return [];
    }
};


exports.crawlingPosts = crawlingPosts;