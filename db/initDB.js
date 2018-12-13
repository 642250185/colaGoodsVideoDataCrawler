const mongoose = require('mongoose');
const config = require('../config/cfg');

const {host, port, dbname} = config.mongodb;

mongoose.connect(`mongodb://${host}:${port}/${dbname}`);
mongoose.Promise = global.Promise;
global.$mongoose = mongoose;

/**
 * 设置数据源
 */
const syncDB = () => {
    const {post} = require('../model/post');
    global['$post'] = mongoose.model('post', post, 'post');
};

syncDB();