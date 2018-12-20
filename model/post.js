const mongoose = require('mongoose');
const Schema = mongoose.Schema;

exports.post = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    },
    channel: String,
    nickname: String,
    postId: String,
    title: String,
    playCount: Number,
    collectCount: Number,
    shareCount: Number,
    commentCount: Number,
    likeCount: Number,
    recommendCount: Number,
    status: {
        type: Boolean,
        default: false,
    },
    dateTime: {
        type: Date
    },
    createTime: {
        type: Date,
        default: Date.now,
        index: true
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false,
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});




