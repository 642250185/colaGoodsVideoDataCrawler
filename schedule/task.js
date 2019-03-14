require('../db/initDB');
const fs = require('fs');
const readline = require('readline');
const schedule = require('node-schedule');
const emumerate = require('../utils/enumerate');
const {importPost} = require('../service/syncdata');


const file_gifShow = 'D:\\colaFiddlerFile\\gifShow.txt';
const file_tikTok = 'D:\\colaFiddlerFile\\tikTok.txt';

const getGifShowPosts = async() => {
    try {

        // 创建流对象
        const item = readline.createInterface({
            input: fs.createReadStream(file_gifShow, { encoding: 'utf-16le' }),
            crlfDelay: Infinity,
            terminal: true
        });

        // 监听文件行末尾换行
        item.on('line', async(line) => {
            const item = line.split(",");
            const post = {
                channel         : emumerate.channel.gifShow,
                nickname        : item[4],               // 帐号
                postId          : item[0],               // 帖子ID
                title           : item[5],               // 标题
                playCount       : item[2],               // 播放量
                collectCount    : 0,                     // 收藏量
                shareCount      : 0,                     // 转发量 | 分享量
                commentCount    : item[3],               // 评论量
                likeCount       : item[1],               // 点赞量
                recommendCount  : 0,                     // 推荐数
                fansCount       : 0,                     // 粉丝数
                dateTime        : item[6]
            };
            // 入库
            await importPost(post);
        });
        return [];
    } catch (e) {
        console.error(e);
        return [];
    }
};


const getTikTokPosts = async() => {
    try {

        // 创建流对象
        const item = readline.createInterface({
            input: fs.createReadStream(file_tikTok, { encoding: 'utf-16le' }),
            crlfDelay: Infinity,
            terminal: true
        });

        // 监听文件行末尾换行
        item.on('line', async(line) => {
            const item = line.split(",");
            const post = {
                channel         : emumerate.channel.tikTok,
                nickname        : item[4],               // 帐号
                postId          : item[0],               // 帖子ID
                title           : item[5],               // 标题
                playCount       : item[2],               // 播放量
                collectCount    : 0,                     // 收藏量
                shareCount      : item[1],               // 转发量 | 分享量
                commentCount    : item[3],               // 评论量
                recommendCount  : 0,                     // 推荐数
                fansCount       : 0,                     // 粉丝数
            };
            // 入库
            await importPost(post);
        });
        return [];
    } catch (e) {
        console.error(e);
        return [];
    }
};


schedule.scheduleJob('*/30 * * * *', async () => {
    try {
        console.info(`--------->> start Task <<---------`);
        await getGifShowPosts();
        await getTikTokPosts();
        return;
    } catch (e) {
        console.error(e);
        return e;
    }
});