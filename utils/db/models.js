// Server/utils/models.js
const Model = require('./model');
const { log } = require('../log');

const {
  Post: PostSchema,
  Favorite: FavoriteSchema,
  User: UserSchema,
  AddressEmd: AddressEmdSchema,
  AddressSgg: AddressSggSchema,
  AddressSd: AddressSdSchema,
  MyVillage: MyVillageSchema,
  Photo: PhotoSchema,
  PostSearchHistory: PostSearchHistorySchema,
} = require('../validation/schemas');
const db = require('./knex');

//본명 스키마--------------------------------
class User extends Model {
  constructor() {
    super('users', UserSchema);
    this.column(
      'user_id',
      (username) => db(this.name)
        .select('user_id')
        .where('username', username)
        .first()
    );
  }
}

class Favorite extends Model {
  constructor() {
    super('favorite', FavoriteSchema);
    this.column('is_favorite', `${this.name}.user_id IS NOT NULL`);
  }
}

//별칭 스키마--------------------------------
class Writer extends Model {
  constructor() {
    const user = new User();
    super('writer', UserSchema, user.name);

    this.column('writer_username', `${this.name}.username`);
  }
}

class FavoriteCount extends Model {
  constructor() {
    super('favorite_count_table');

    const favorite = new Favorite();
    this.table = db(favorite.table)
      .select(favorite.post_id)
      .count('* as favorite_count')
      .groupBy(favorite.post_id)

    this.column('post_id');
    this.column('favorite_count', `COALESCE(${this.name}.favorite_count, 0)`);
  }
}

const Emd = new Model('address_emd', AddressEmdSchema);
const Sgg = new Model('address_sgg', AddressSggSchema);
const Sd = new Model('address_sd', AddressSdSchema);

class Address extends Model {
  constructor() {
    super('address');
    this.column('emd_id', Emd.emd_id);
    this.column(
      'fullAddress',
      `
        CONCAT(
        ${Sd.sd_name}, " ",
        ${Sgg.sgg_name}, " ",
        ${Emd.emd_name}
      )`);
  }
}

module.exports = {
  //테이블과 같음
  Post: new Model('post', PostSchema),
  MyVillage: new Model('my_village', MyVillageSchema),
  Photo : new Model('photo', PhotoSchema),
  PostSearchHistory : new Model('post_search_history', PostSearchHistorySchema),
  //별칭
  Emd,
  Sgg,
  Sd,
  //메서드 오버라이드
  User: new User(),
  //가상테이블
  FavoriteCount: new FavoriteCount(),
  Favorite: new Favorite(),
  Writer: new Writer(),
  Address: new Address(),
};
