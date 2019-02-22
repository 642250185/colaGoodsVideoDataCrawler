const _ = require('lodash');
const _path = require('path');
const fs = require('fs-extra');
const request = require('superagent');
const config = require('../../config/cfg');
const sleep = require('js-sleep/js-sleep');
const users = require('../../file/volcano/users');
const emumerate = require('../../utils/enumerate');
const {formatDate} = require('../../utils/dateUtil');


const {domain, postRoute,  postDataPath} = config.pipixia;


let number = 0;
const getUserPosts = async(cursor, plist) => {
    try {
        ++number;
        if(_.isEmpty(plist)){
            plist = [];
            cursor = 0
        }
        const api_version = 1;
        const list_type = 9;
        const feed_count = 0;
        const user_id = 78879322297;
        const direction = 1;
        const iid = 64074149621;
        const device_id = 58841463340;
        const ac = "wifi";
        const channel = "oppo";
        const aid = 1319;
        const app_name = "super";
        const version_code = 158;
        const version_name = "1.5.8";
        const device_platform = "android";
        const ssmix = "a";
        const device_type = "PBAM00";
        const device_brand = "OPPO";
        const language = "zh";
        const os_api = 27;
        const os_version = "8.1.0";
        const uuid = 58841463340;
        const openudid = "13aa0c456860da73";
        const manifest_version_code = 158;
        const resolution = "720*1520";
        const dpi = 320;
        const update_version_code = 1583;
        const _rticket = 1550720937241;
        const ts = (new Date).getTime();
        const as = "a285d1c629aa8caf1e4655";
        const cp = "11abcf509deb69fde2ayOg";
        const mas = "00b12cc8d7b701ce563e24cb173ae53a7e9393531399b359b9f923";

        const path = `${domain}${postRoute}?api_version=${api_version}&cursor=${cursor}&list_type=${list_type}&feed_count=${feed_count}&user_id=${user_id}&direction=${direction}&iid=${iid}&device_id=${device_id}&ac=${ac}&channel=${channel}&aid=${aid}&app_name=${app_name}&version_code=${version_code}&version_name=${version_name}&device_platform=${device_platform}&ssmix=${ssmix}&device_type=${device_type}&device_brand=${device_brand}&language=${language}&os_api=${os_api}&os_version=${os_version}&uuid=${uuid}&openudid=${openudid}&manifest_version_code=${manifest_version_code}&resolution=${resolution}&dpi=${dpi}&update_version_code=${update_version_code}&_rticket=${_rticket}&ts=${ts}&as=${as}&cp=${cp}&mas=${mas}`;
        console.info(`path >>>: `, path);
        await sleep(1000 * 5);  // 限制频率以防被皮皮虾屏蔽
        let result = await request.get(path);
        result = JSON.parse(result.text);
        const {status_code, message, prompt, time, data} = result;
        const arr_dataList = data.data;
        const _cursor = data.cursor;
        const {refresh_cursor, loadmore_cursor, has_more} = _cursor;
        let collectCount = 0; let recommendCount = 0; const _plist = [];
        for(const item of arr_dataList){
            const content = item.item;
            const id = content.item_id;
            const create_time = content.create_time;
            const {share, stats} = content;
            const title = share.title;
            _plist.push({
                channel         : emumerate.channel.pipixia,
                nickname        : "鲤锦开箱",
                postId          : id,
                title           : title,
                playCount       : stats.play_count,     // 播放量
                collectCount    : collectCount,         // 收藏量
                shareCount      : stats.share_count,    // 转发量 | 分享量
                commentCount    : stats.comment_count,  // 评论量
                likeCount       : stats.like_count,     // 点赞量
                recommendCount  : recommendCount,       // 推荐数
                fansCount       : 0,                    // 粉丝数
                dateTime        : formatDate(new Date(Number(create_time * 1000)))
            });
            console.info(`number: ${number}  渠道: ${emumerate.channel.pipixia}  账号: "鲤锦开箱"  postId: ${id}  播放量: ${stats.play_count}   粉丝数: 0   收藏量: ${collectCount}  转发量: ${stats.share_count}  评论量: ${stats.comment_count}  点赞量: ${stats.like_count}  推荐量: 0  日期: ${create_time}  标题: ${title} `);
        }
        plist = plist.concat(_plist);
        console.info(`has_more: ${has_more},  loadmore_cursor: ${loadmore_cursor}`);
        if(has_more){
            return await getUserPosts(loadmore_cursor, plist);
        } else {
            return plist;
        }
    } catch (e) {
        console.error(e);
        return [];
    }
};

getUserPosts();