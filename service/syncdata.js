require('../db/initDB');
const fs = require('fs-extra');
const mongoose = require('mongoose');
const config = require('../config/cfg');

const {postDataPath} = config.tikTok;

let number = 0;
const importTikTok = async(item) => {
    try {
        const post = item;
        post._id = new mongoose.Types.ObjectId;
        console.info(`入库: [ ${++number} ]   ${post.channel}   ${post.account}   ${post.postId}  ${post.title}`);
        await new $post(post).save();
    } catch (e) {
        console.error(e);
        return e;
    }
};


const importBatchTikTok = async() => {
    try {
        const posts = JSON.parse(fs.readFileSync(postDataPath));
        for(const item of posts){
            await importTikTok(item);
        }
        return posts;
    } catch (e) {
        console.error(e);
        return e;
    }
};

importBatchTikTok();
exports.importBatchTikTok = importBatchTikTok;