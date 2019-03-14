const _ = require('lodash');
const mongoose = require('mongoose');


const checkPost = async(item) => {
    try {
        // postId 存在为空的情况。
        if(_.isEmpty(item.postId)){
            console.warn(`postId does not exist.`);
            return false;
        }
        let post = await $post.findOne({postId: item.postId});
        if(_.isEmpty(post)){
            return false;
        } else {
            post.nickname       = item.nickname;
            post.playCount      = item.playCount;
            post.collectCount   = item.collectCount;
            post.shareCount     = item.shareCount;
            post.commentCount   = item.commentCount;
            post.likeCount      = item.likeCount;
            post.recommendCount = item.recommendCount;
            await post.save();
            return true;
        }
    } catch (e) {
        console.error(e);
        return e;
    }
};


let number = 0;
const importPost = async(item) => {
    try {
        const checkResult = await checkPost(item);
        if(checkResult){
            console.info(`update the post for postId: ${item.postId}`);
        } else {
            const post = item;
            post._id = new mongoose.Types.ObjectId;
            console.info(`入库: [ ${++number} ]   ${post.channel}   ${post.nickname}   ${post.postId}  ${post.title}`);
            await new $post(post).save();
        }
    } catch (e) {
        console.error(e);
        return e;
    }
};


const importBatchPosts = async(posts) => {
    try {
        for(const item of posts){
            await importPost(item);
        }
        return posts;
    } catch (e) {
        console.error(e);
        return e;
    }
};

exports.importPost = importPost;
exports.importBatchPosts = importBatchPosts;