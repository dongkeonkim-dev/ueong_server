// utils/zod-extensions.js
const { z } = require('zod');

const Object = (shape) => z.object(shape)
const String = z.string()
const Number = z.coerce.number() // 숫자
const Double = Number // 실수
const Integer = z.coerce.number().int() // 정수
const Natural = z.coerce.number().int().min(1) // 자연수
const Binary = z.coerce.number().int().min(0).max(1) // 0 또는 1
const Email = z.string().email() // 이메일
const Enum = (values) => z.enum(values) // enum

module.exports = {
  Object,
  String,
  Number,
  Double,
  Integer,
  Natural,
  Binary,
  Email,
  Enum,
};