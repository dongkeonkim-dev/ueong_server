// utils/zod-extensions.js
const { z } = require('zod');
const { ValidationError, DataNotFoundError, AffectedRowsError, InternalServerError } = require('../custom-error');

// 기본 Zod 객체를 감싸는 함수
const Schema = (shape) => z.object(shape)

// 기본 타입 래핑
const Undefined = z.undefined() // undefined
const Boolean_ = z.coerce.boolean() // 불리언
const String_ = z.string()
const Number_ = z.coerce.number() // 숫자
const Double_ = Number_ // 실수
const Integer_ = z.coerce.number().int() // 정수
const Natural_ = z.coerce.number().int().min(1) // 자연수
const Binary_ = z.coerce.number().int().min(0).max(1) // 0 또는 1
const Email_ = z.string().email().max(255) // 이메일
const Enum_ = (values) => z.enum(values) // enum
const Array_ = (type) => z.array(type) // 배열
const Payload = (schema) => Schema({
  username: String_.max(32),
 }) // 페이로드

// 패스스루 객체 정의
const Row = Schema({}).passthrough()// export 안함
const Rows = Array_(Row) // export 안함
const RowExist = Rows.min(1) // export 안함

const SearchTerm = String_.max(45).refine((val) => val.length > 0, {
  message: "검색어는 비어있을 수 없습니다."
})

// GetResult 스키마
const GetResult = Rows.refine((arr) => Rows.safeParse(arr).success, {
  message: "SELECT 쿼리 결과는 배열이어야 합니다."
});

const GetResultExist = RowExist.refine((arr) => RowExist.safeParse(arr).success, {
  message: "데이터가 없습니다."
});

// UpdateResult 스키마
const UpdateResult = Natural_.refine((val) => Integer_.safeParse(val).success, {
  message: "영향받은 행이 없습니다."
})

// CreateResult 스키마
const CreateResult = Array_(Natural_).refine((val) => Array_(Natural_).safeParse(val).success, {
  message: "생성된 행이 없습니다."
});

// DeleteResult 스키마
const DeleteResult = Natural_.refine((val) => Integer_.safeParse(val).success, {
  message: "삭제된 행이 없습니다."
});


// GetResult 유틸리티 함수
const validGet = (data) => {
  const parseResult = GetResult.safeParse(data);
  if (!parseResult.success) {
    throw new ValidationError(parseResult.error.errors);
  }
  return parseResult.data;
};

// GetResultExist 유틸리티 함수
const validGetExist = (data) => {
  const parseResult = GetResultExist.safeParse(data);
  if (!parseResult.success) {
    throw new DataNotFoundError(parseResult.error.errors);
  }
  return parseResult.data;
};

// CreateResult 유틸리티 함수
const validCreate = (data) => {
  const parseResult = CreateResult.safeParse(data);
  if (!parseResult.success) {
    throw new InternalServerError(parseResult.error.errors);
  }
  return parseResult.data;
};

// UpdateResult 유틸리티 함수
const validUpdate = (data) => {
  const parseResult = UpdateResult.safeParse(data);
  if (!parseResult.success) {
    throw new AffectedRowsError(parseResult.error.errors);
  }
  return parseResult.data;
};

// DeleteResult 유틸리티 함수
const validDelete = (data) => {
  const parseResult = DeleteResult.safeParse(data);
  if (!parseResult.success) {
    throw new AffectedRowsError(parseResult.error.errors);
  }
  return parseResult.data;
};

module.exports = {
  Schema,
  Undefined,
  Boolean: Boolean_,
  String: String_,
  Number: Number_,
  Double: Double_,
  Integer: Integer_,
  Natural: Natural_,
  Binary: Binary_,
  Email: Email_,
  Enum: Enum_,
  Array: Array_,
  UpdateResult,
  CreateResult,
  GetResult,
  GetResultExist,
  SearchTerm,
  // 유틸리티 함수 추가
  validGet,
  validGetExist,
  validCreate,
  validUpdate,
  validDelete,
};
