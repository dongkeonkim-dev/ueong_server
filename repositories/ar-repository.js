// Server/Models/Posts.js
const db = require('../utils/db/knex');
const { Photo } = require('../utils/db/models');
const { validCreate, validGet, validUpdate } = require('../utils/validation/custom-zod-types');
const { log } = require('../utils/log');

class AR {

    static async getModelByPostId(postId) {
        //const query = db.select('*').from('ar_models').where('post_id', postId);
        //eturn query;
    }


}
module.exports = AR;
