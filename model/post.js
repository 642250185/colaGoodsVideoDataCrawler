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
    playCount: {
        type: Number,
        default: 0
    },
    collectCount: {
        type: Number,
        default: 0
    },
    shareCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    recommendCount: {
        type: Number,
        default: 0
    },
    fansCount: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false,
    },
    group: {
        type: Number,
        default: 0
    },
    verifier: {
        type: Number,
        default: 0
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




