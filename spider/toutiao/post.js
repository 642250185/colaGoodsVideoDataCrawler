const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const config = require('../../config/cfg');
const sleep = require('js-sleep/js-sleep');
const users = require('../../file/toutiao/users');
const emumerate = require('../../utils/enumerate');
const {formatDate} = require('../../utils/dateUtil');
const {domain, postRoute, postDataPath, followCountRoute} = config.toutiao;


const getFollowerCount = async(uid) => {
    try {
        let followerCount = 0;
        // 基础参数
        const user_id               = uid;
        const refer                 = "";
        const iid                   = 56352186865;
        const device_id             = 58838615711;
        const ac                    = "wifi";
        const channel               = "oppo-cpa";
        const aid                   = 13;
        const app_name              = "news_article";
        const version_code          = 704;
        const version_name          = "7.0.4";
        const device_platform       = "android";
        const ab_version            = "679616%2C664543%2C666150%2C341314%2C486952%2C651365%2C662176%2C488913%2C676958%2C672522%2C675823%2C571130%2C665175%2C674049%2C639001%2C612192%2C641906%2C170988%2C643893%2C679235%2C659018%2C374119%2C665496%2C644564%2C673032%2C629936%2C655402%2C678020%2C550042%2C435216%2C603542%2C659215%2C678791%2C649426%2C521963%2C614097%2C677131%2C522766%2C666019%2C416055%2C665544%2C622022%2C558140%2C555255%2C679175%2C471406%2C603443%2C596391%2C660507%2C598626%2C644855%2C603384%2C603397%2C603404%2C603405%2C638928%2C677671%2C673955%2C646564%2C656461%2C661907%2C662644%2C668775%2C673945%2C629152%2C607361%2C609338%2C666964%2C635529%2C662099%2C641414%2C664496%2C669192%2C678052%2C676111%2C679154%2C678861%2C622716%2C669401%2C621629%2C675139%2C640997%2C641079%2C668774%2C679516%2C672753%2C469019%2C674225%2C554836%2C549647%2C644131%2C472443%2C31210%2C572465%2C675212%2C656826%2C644057%2C615292%2C606548%2C678554%2C673168%2C678279%2C546700%2C672345%2C677144%2C281300%2C664117%2C677808%2C325615%2C678477%2C665473%2C669033%2C625066%2C652952%2C663952%2C664311%2C638336%2C467515%2C671188%2C669159%2C679100%2C631638%2C595556%2C679519%2C669426%2C670151%2C661454%2C654123%2C655711%2C658932%2C660830%2C673761%2C656557%2C633487%2C662684%2C661781%2C457481%2C649401%2C672483%2C655989%2C648317";
        const ab_client             = "a1%2Cc4%2Ce1%2Cf1%2Cg2%2Cf7";
        const ab_group              = "94569%2C102751%2C181428";
        const ab_feature            = "94569%2C102751";
        const abflag                = 3;
        const ssmix                 = "a";
        const device_type           = "PBAM00";
        const device_brand          = "OPPO";
        const language              = "zh";
        const os_api                = "27";
        const os_version            = "8.1.0";
        const uuid                  = 860083046316050
        const openudid              = "cff77562f33d7a27";
        const manifest_version_code = 704;
        const resolution            = "720*1520";
        const dpi                   = 320;
        const update_version_code   = 70412;
        const _rticket              = 1546505160967;
        const plugin                = 26958;
        const pos                   = "5r_-9Onkv6e_eyoseAEueCUfv7G_8fLz-vTp6Pn4v6esrK6zpKmppK2psb_x_On06ej5-L-nr6-zqK6tpaSxv_zw_O3e9Onkv6e_eyoseAEueCUfv7G__PD87dHy8_r06ej5-L-nrKyus6SppKWsqLG__PD87dH86fTp6Pn4v6evr7Oor6qlqKrg";
        const fp                    = "9rT_P2KbJ2TrFlHSPlU1F2meJlxb";
        const tma_jssdk_version     = "1.7.1.4";
        const rom_version           = "coloros_v5.1_pbam00_11_a.13";
        const ts                    = 1546505160;
        const as                    = "a245dc6218cc5c3b5d4355";
        const mas                   = "006e317224c0aa834325cd22aa4549145982c0e44606686e83";
        const path = `${followCountRoute}?user_id=${user_id}&refer=${refer}&iid=${iid}&device_id=${device_id}&ac=${ac}&channel=${channel}&aid=${aid}&app_name=${app_name}&version_code=${version_code}&version_name=${version_name}&device_platform=${device_platform}&ab_version=${ab_version}&ab_client=${ab_client}&ab_group=${ab_group}&ab_feature=${ab_feature}&abflag=${abflag}&ssmix=${ssmix}&device_type=${device_type}&device_brand=${device_brand}&language=${language}&os_api=${os_api}&os_version=${os_version}&uuid=${uuid}&openudid=${openudid}&manifest_version_code=${manifest_version_code}&resolution=${resolution}&dpi=${dpi}&update_version_code=${update_version_code}&_rticket=${_rticket}&plugin=${plugin}&pos=${pos}&fp=${fp}&tma_jssdk_version=${tma_jssdk_version}&rom_version=${rom_version}&ts=${ts}&as=${as}&mas=${mas}`;
        try {
            let result = await request.get(path);
            result = JSON.parse(result.text);
            const {data, errno, message} = result;
            if(errno === 0){
                const {followers_count} = data;
                followerCount = followers_count;
            } else {
                console.warn(`error: ${errno},   message: ${message}`);
            }
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
const getUserPosts = async(userId, username, fansCount, maxCursor, plist) => {
    try {
        ++number;
        // 基础参数
        if(_.isEmpty(plist)){
            plist = [];
            maxCursor = 0;
        }
        const category              = "profile_all";
        let visited_uid             = userId;
        const stream_api_version    = 88;
        const count                 = 20;
        let _offset                 = maxCursor;
        const iid                   = 54360348960;
        const device_id             = 58838615711;
        const ac                    = "wifi";
        const channel               = "oppo-cpa";
        const aid                   = 13;
        const app_name              = "news_article";
        const version_code          = 703;
        const version_name          = "7.0.3";
        const device_platform       = "android";
        const ab_version            = "611285%2C647153%2C341314%2C486952%2C642201%2C488913%2C630692%2C571130%2C641923%2C638879%2C639001%2C239095%2C612192%2C641906%2C170988%2C493249%2C643893%2C642337%2C594601%2C374119%2C642665%2C644564%2C606504%2C642295%2C633720%2C633799%2C550042%2C435216%2C603542%2C586992%2C642975%2C644635%2C627128%2C521963%2C614097%2C522766%2C416055%2C621360%2C646594%2C642530%2C639580%2C643099%2C622022%2C558140%2C555255%2C640008%2C635502%2C471406%2C603443%2C596391%2C550817%2C630577%2C598626%2C644845%2C631351%2C634911%2C646251%2C603384%2C603397%2C603404%2C603405%2C642637%2C642679%2C648144%2C646564%2C629152%2C607361%2C609338%2C326532%2C644515%2C609315%2C647297%2C641414%2C645871%2C648286%2C646383%2C637859%2C637165%2C644946%2C622716%2C618346%2C644072%2C621629%2C622134%2C622968%2C647009%2C640997%2C641079%2C643790%2C631607%2C633139%2C469019%2C643837%2C645513%2C601742%2C554836%2C549647%2C644131%2C472443%2C31210%2C572465%2C644057%2C615292%2C606548%2C442255%2C642613%2C644040%2C647315%2C630218%2C546700%2C644509%2C281300%2C633176%2C632886%2C622042%2C325615%2C642450%2C634871%2C646070%2C625066%2C645032%2C647564%2C498375%2C638336%2C467515%2C645472%2C644238%2C631638%2C648270%2C595556%2C647930%2C640690%2C589102%2C633487%2C457481%2C648317";
        const ab_client             = "a1%2Cc4%2Ce1%2Cf1%2Cg2%2Cf7";
        const ab_group              = "94569%2C102751%2C181428";
        const ab_feature            = "94569%2C102751";
        const abflag                = 3;
        const ssmix                 = "a";
        const device_type           = "PBAM00";
        const device_brand          = "OPPO";
        const language              = "zh";
        const os_api                = 27;
        const os_version            = "8.1.0";
        const uuid                  = 860083046316050;
        const openudid              = "cff77562f33d7a27";
        const manifest_version_code = 703;
        const resolution            = "720*1520";
        const dpi                   = 320;
        const update_version_code   = 70315;
        const _rticket              = 1544771649921;
        const plugin                = 26958;
        const pos                   = "5r_-9Onkv6e_eyoseAEueCUfv7G_8fLz-vTp6Pn4v6esrK6zpKmppK-ksb_x_On06ej5-L-nr6-zqK6tqquqsb_88Pzt3vTp5L-nv3sqLHgBLnglH7-xv_zw_O3R8vP69Ono-fi_p6ysrrOkqKysqqixv_zw_O3R_On06ej5-L-nr6-zqK-lpKqv4A%3D%3D";
        const fp                    = "9rT_P2KbJ2TrFlHSPlU1F2meJlxb";
        const tma_jssdk_version     = "1.4.1.0";
        const rom_version           = "coloros_v5.1_pbam00_11_a.13";
        const ts                    = 1544771649;
        const as                    = "a21535c1a1e4aca8834355";
        const mas                   = "00d4d16ae92807c14ba3baec1c841b2b987cd505e806686efc";
        if(number !== 1 ){
            console.warn(`休眠5秒后继续......`);
        }
        await sleep(1000 * 5);  // 限制频率以防被今日头条屏蔽
        const path = `${domain}${postRoute}?category=${category}&visited_uid=${visited_uid}&stream_api_version=${stream_api_version}&count=${count}&offset=${_offset}&iid=${iid}&device_id=${device_id}&ac=${ac}&channel=${channel}&aid=${aid}&app_name=${app_name}&version_code=${version_code}&version_name=${version_name}&device_platform=${device_platform}&ab_version=${ab_version}&ab_client=${ab_client}&ab_group=${ab_group}&ab_feature=${ab_feature}&abflag=${abflag}&ssmix=${ssmix}&device_type=${device_type}&device_brand=${device_brand}&language=${language}&os_api=${os_api}&os_version=${os_version}&uuid=${uuid}&openudid=${openudid}&manifest_version_code=${manifest_version_code}&resolution=${resolution}&dpi=${dpi}&update_version_code=${update_version_code}&_rticket=${_rticket}&plugin=${plugin}&pos=${pos}&fp=${fp}&tma_jssdk_version=${tma_jssdk_version}&rom_version=${rom_version}&ts=${ts}&as=${as}&mas=${mas}`;
        let result = await request.get(path);
        result = JSON.parse(result.text);
        let {message, data, has_more, offset, tail} = result;
        console.info(`message: ${message}, has_more: ${has_more}, offset: ${offset}, tail: ${tail}`);
        data = JSON.parse(JSON.stringify(data));
        const _plist = [];
        for(const item of data){
            const content = JSON.parse(item.content);
            // 定义基础变量
            let title = "", playCount = 0, collectCount = 0;
            let shareCount = 0, commentCount = 0, likeCount = 0, createTime = "";
            // 存在为空的情况
            if(!_.isEmpty(content.raw_data)){
                const {raw_data} = content;
                // title 跟 createTime 在 raw_data节点下。
                title           = raw_data.title;
                createTime      = formatDate(new Date(Number(raw_data.create_time * 1000)));
                // 存在返回数据不一直
                if(_.isEmpty(raw_data.comment_base)){
                    const {action} = raw_data;
                    playCount       = action.play_count;
                    collectCount    = action.bury_count;
                    shareCount      = action.share_count;
                    commentCount    = action.comment_count;
                    likeCount       = action.digg_count;
                } else {
                    const commentBase = raw_data.comment_base;
                    const commentBaseAction = commentBase.action;
                    // 挂载在 comment_base 节点之下。
                    playCount       = commentBaseAction.play_count;
                    collectCount    = commentBaseAction.bury_count;
                    shareCount      = commentBaseAction.share_count;
                    commentCount    = commentBaseAction.comment_count;
                    likeCount       = commentBaseAction.digg_count;
                }
            }
            _plist.push({
                channel         : emumerate.channel.toutiao,
                nickname        : username,
                postId          : content.id,
                title           : title,
                playCount       : playCount,    // 播放量
                collectCount    : collectCount, // 收藏量
                shareCount      : shareCount,   // 转发量 | 分享量
                commentCount    : commentCount, // 评论量
                likeCount       : likeCount,    // 点赞量
                recommendCount  : 0,            // 推荐数
                fansCount       : fansCount,    // 粉丝数
                dateTime        : createTime    // 时间
            });
            console.info(`number: ${number}  渠道: ${emumerate.channel.toutiao}  账号: ${username}  postId: ${content.id}  播放量: ${playCount}   粉丝数: ${fansCount}   收藏量: ${collectCount}  转发量: ${shareCount}  评论量: ${commentCount}  点赞量: ${likeCount}  推荐量: 0  日期: ${createTime}  标题: ${title} `);
        }
        plist = plist.concat(_plist);
        if(has_more){
            return await getUserPosts(userId, username, fansCount, offset, plist);
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
        for(const user of users){
            const {userId, username} = user;
            const fansCount = await getFollowerCount(userId);
            const userPostsData = await getUserPosts(userId, username, fansCount);
            console.info(`>>>>> username: ${username},  posts.length:`, userPostsData.length);
            final = final.concat(userPostsData);
            break;
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
        console.info('toutiaoPosts.Size: ', postsData.length);
        await fs.ensureDir(_path.join(postDataPath, '..'));
        fs.writeFileSync(postDataPath, JSON.stringify(postsData, null, 4));
        return postsData;
    } catch(e) {
        console.error(e);
        return [];
    }
};


exports.crawlingPosts = crawlingPosts;