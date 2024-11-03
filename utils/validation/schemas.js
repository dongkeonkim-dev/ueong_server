const { Integer, Natural, String, Double, Enum, Binary, Object, Email, Undefined, Schema } = require('./custom-zod-types');

class Schemas {
  // 실제 스키마--------------------------------
  User = Schema({
    user_id: Natural,
    username: String.max(32),
    password: String.max(45), // hashed: 60
    nickname: String.max(45),
    email: Email,
    is_active: Binary.default(1),
    profile_photo_url: String.nullable().optional(),
    authority: Enum(['일반회원', '관리자']).default('일반회원'), // default '일반회원' // DB 설정 해야함.
  })

  Post = Schema({
    // extend 위쪽은 DB와 동일
    post_id: Natural,
    post_title: String.max(255),
    category_id: Natural,
    price: Natural,
    emd_id: Natural,
    desired_trading_location_latitude: Double,
    desired_trading_location_longitude: Double,
    desired_trading_location_detail: String,
    text: String.max(1023),
    is_active: Binary.optional(), // default 1
    status: Enum(['거래대기', '거래완료']).optional(), // default '거래대기'
    // 입력 불가
    create_at: Undefined, // default CURRENT_TIMESTAMP
    writer_id: Undefined, // writer_username을 변환해서 사용.
  })
  .extend({
    // 입력 유효
    writer_username: String.max(32),
  });

  Favorite = Schema({
    user_id: Natural,
    post_id: Natural,
  })

  MyVillage = Schema({
    user_id: Natural,
    emd_id: Natural,
  })

  AddressEmd = Schema({
    emd_id: Natural,
    emd_name: String.max(45),
    sgg_id: Natural,
    emd_latitude: Double,
    emd_longitude: Double,
  });

  AddressSgg = Schema({
    sgg_id: Natural,
    sgg_name: String.max(45),
    sd_id: Natural,
  });

  AddressSd = Schema({
    sd_id: Natural,
    sd_name: String.max(45),
  });

  Photo = Schema({
    photo_id: Natural,
    post_id: Natural.optional(),
    photo_path: String.max(255),
  });

  ArModel = Schema({
    ar_model_id: Natural,
    post_id: Natural,
    ar_model_directory: String.max(255),
  });

  PostSearchHistory = Schema({
    post_search_history_id: Natural,
    user_id: Natural,
    search_term: String.max(45),
    search_time: Undefined,
  })

  omitUserId(schema) {
    return schema.omit({ user_id: true });
  }

  // 가상 스키마--------------------------------
  Search = Schema({
    search_term: String.max(45).default(''),
  });
}
const schemas = new Schemas();
module.exports = schemas;
