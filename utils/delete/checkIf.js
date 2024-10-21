const { ValidationError } = require('../custom-error')

/**
 * @class CheckIf
 * @description 유효성 검사를 위한 클래스
 * @param {any} value - 검사할 값
 * @returns {CheckIf} - CheckIf 인스턴스
 * @example
 */
class CheckIf {
  constructor(value = null) {
    this.value = value;
    this.currentSchema = null; 
    this.result = null;
    this.return = null;
    this.toString = () => {
      return String(Boolean(this.return))
    }
    this.valueOf = () => Boolean(this.return);
    this[Symbol.toPrimitive] = () => {
      return Boolean(this.return); 
    };
  }

  is(schema) {
    this.currentSchema = schema; // 스키마 저장
    const result = schema.safeParse(this.value); // 전체 결과 객체를 할당
    this.result = result;
    this.return = result.success;
    return this;
  }

  elseThrow(errStatus = 400) {
    if (!this.valid) {
      if (!this.result || !this.result.error) {
        console.log(`CheckIf.elseThrow: No result or error`);
        throw new ValidationError([{ field: 'unknown', message: 'Unknown validation error', code: 'unknown_error' }], errStatus);
      }

      const errors = this.result.error.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message,
        code: error.code
      }));
      console.log(`CheckIf.elseThrow: Throwing ValidationError with errors: ${JSON.stringify(errors)}`);
      throw new ValidationError(errors, errStatus);
    }
  }
}

//   validate(condition, errMessage, errStatus = 400) {
//     if (!condition) {
//       throw new HttpError(errMessage, errStatus);
//     }
//   }

//   matches(schema) {
//     return schema.parse(this.value)
//   }

//   itMustBeBut(fieldName, condition, presentValue){
//     return `${fieldName}은 ${condition}이어야 합니다. 현재 값: ${presentValue}`
//   }

//   // initFunc(value, type) {
//   //   const func = () => value;
//   //   func.toString = () => {
//   //     return String(value)
//   //   }
//   //   func.valueOf = () => value;
//   //   func[Symbol.toPrimitive] = () => {
//   //     switch (type) {
//   //       case 'number': return Number(value); // 숫자로 변환
//   //       case 'string': return String(value); // 문자열로 변환
//   //       case 'boolean': return Boolean(value); // 불리언으로 변환
//   //       case 'date': return value.getTime(); // 날짜일 경우 타임스탬프 반환
//   //       default: return value;
//   //     }
//   //   };
//   //   return func;
//   // }

//   initFunc(value) {
//     const func = () => value;
//     func.toString = () => {
//       return String(value); 
//     };
//     func.valueOf = () => value;
//     func[Symbol.toPrimitive] = () => {
//       if (z.boolean().safeParse(this.value).success) return Boolean(value);
//       if (z.number().safeParse(this.value).success) return Number(value);
//       if (z.date().safeParse(this.value).success) return value.getTime();
//       if (z.string().safeParse(this.value).success) return String(value);
//       return value;
//     };
//     return func;
//   }

//   addMethod(func, method, methodName = method.name || 'subFunc') {
//     func[methodName] = method;
//     return func;
//   }

//   get is(schema) {
//     return schema.safeParse(this.value).success
//   }

//   matches(schema) {
//     _ = schema.parse(this.value)
//   }

//   get isNull() {
//     const returnValue = this.is(z.null())
//     const isNull = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.matches(z.null())
//       //this.validate(returnValue, this.itMustBeBut(fieldName, 'null', this.value), errStatus);
//     }
//     this.addMethod(isNull, elseThrow, elseThrow.name )
//     return isNull;
//   }

//   get isNotNull() {
//     const returnValue = this.is(z.any().optional())
//     const isNotNull = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, 'null이 아닌 값', this.value), errStatus);
//     }
//     this.addMethod(isNotNull, elseThrow, elseThrow.name )
//     return isNotNull;
//   }

//   get isUndefined() {
//     const returnValue = this.is(z.optional())
//     const isUndefined = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, 'undefined', this.value), errStatus);
//     }
//     this.addMethod(isUndefined, elseThrow, elseThrow.name )
//     return isUndefined;
//   }

//   get isDefined() {
//     const returnValue = this.is(z.any().nullable())
//     const isDefined = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, 'undefined가 아닌 값', this.value), errStatus);
//     }
//     this.addMethod(isDefined, elseThrow, elseThrow.name )
//     return isDefined;
//   }

//   get isNil() {
//     const returnValue = this.is(z.nullable().optional())
//     const isNil = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, 'null 또는 undefined', this.value), errStatus);
//     }
//     this.addMethod(isNil, elseThrow, elseThrow.name )
//     return isNil;
//   }

//   get isAny() {
//     const returnValue = this.is(z.any())
//     const isAny = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       //this.validate(returnValue, this.itMustBeBut(fieldName, 'null 또는 undefined가 아닌 값', this.value), errStatus);
//       this.matches(z.any())
//     }
//     this.addMethod(isAny, elseThrow, elseThrow.name )
//     return isAny;
//   }

//   get isString() {
//     this.isAny.elseThrow('isString()의 부모', 500)
//     const returnValue = this.type === 'string';
//     const isString = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '문자열', this.value), errStatus);
//     }
//     this.addMethod(isString, elseThrow, 'elseThrow');
//     return isString;
//   }

//   get isNumber() {
//     this.isAny.elseThrow('isNumber()의 부모', 500)
//     const returnValue = this.type === 'number';
//     const isNumber = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '숫자', this.value), errStatus);
//     }
//     this.addMethod(isNumber, elseThrow, 'elseThrow');
//     return isNumber
//   }

//   get isBoolean() {
//     this.isAny.elseThrow('isBoolean()의 부모', 500)
//     const returnValue = this.type === 'boolean';
//     const isBoolean = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '불리언', this.value), errStatus);
//     }
//     this.addMethod(isBoolean, elseThrow, 'elseThrow');
//     return isBoolean
//   }

//   get isArray() {
//     this.isAny.elseThrow('isArray()의 부모', 500)
//     const returnValue = this.type === 'array';
//     const isArray = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '배열', this.value), errStatus);
//     }
//     this.addMethod(isArray, elseThrow, 'elseThrow');
//     return isArray
//   }

//   get isObject() {
//     this.isAny.elseThrow('isObject()의 부모', 500)
//     const returnValue = this.type === 'object';
//     const isObject = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '객체', this.value), errStatus);
//     }
//     this.addMethod(isObject, elseThrow, 'elseThrow');
//     return isObject
//   }

//   get isDate() {
//     this.isAny.elseThrow('isDate()의 부모', 500)
//     const returnValue = this.type === 'date';
//     const isDate = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '날짜 객체', this.value), errStatus);
//     }
//     this.addMethod(isDate, elseThrow, 'elseThrow');
//     return isDate
//   }

//   get isTrue() {
//     this.isBoolean.elseThrow('isTrue()의 부모', 500)
//     const returnValue = this.value === true;
//     const isTrue = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '참', this.value), errStatus);
//     }
//     this.addMethod(isTrue, elseThrow, 'elseThrow');
//     return isTrue
//   }

//   get isFalse() {
//     this.isBoolean.elseThrow('isFalse()의 부모', 500)
//     const returnValue = this.value === false;
//     const isFalse = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(returnValue, this.itMustBeBut(fieldName, '거짓', this.value), errStatus);
//     }
//     this.addMethod(isFalse, elseThrow, 'elseThrow');
//     return isFalse
//   }

//   // get isFound() {
//   //   const returnValue = this.type != 'null' && this.type != 'undefined'
//   //   const isFound = this.initFunc(returnValue, 'boolean');
//   //   const elseThrow = (fieldName, condition, errStatus = 404) => {
//   //     new CheckIf(condition).isObject.elseThrow('조건',500)
//   //     const conditionString = Object.entries(condition)
//   //                   .map(([key, value]) => `${key}: ${value}`)
//   //                   .join(', ');
//   //     this.validate(isFound, `${fieldName}을 찾을 수 없습니다. ${conditionString}`, errStatus);
//   //   }
    
//   //   this.addMethod(isFound, elseThrow, 'elseThrow');
//   //   return isFound;
//   // }

//   // get areFound() {
//   //   this.isArray.elseThrow(`${areFound.name}의 부모`, 500)
//   //   const returnValue = this.length.inRange(1)
//   //   const areFound = this.initFunc(returnValue, 'boolean');
//   //   const elseThrow = (fieldName, errStatus = 400) => {
//   //     this.validate(areFound, `${fieldName}을 찾을 수 없습니다. 열 수: ${returnValue}`, errStatus);
//   //   }
//   //   this.addMethod(areFound, elseThrow, 'elseThrow');
//   //   return areFound;
//   // }

//   // get areNotNil() {
//   //   this.isObject.elseThrow('areNotNil()의 부모', 500)
//   //   const returnValue = Object.values(this.value).every(value => new CheckIf(value).isAny())
//   //   const areNotNil = this.initFunc(returnValue, 'boolean');
//   //   const elseThrow = (fieldName, errStatus = 400) => {
//   //     const nilFields = Object.entries(this.value)
//   //     .filter((value) => new CheckIf(value).isNil())
//   //     .map(([key]) => key);
//   //     if (nilFields) {
//   //       throw new HttpError(`${fieldName}의 다음 필드들이 정의되지 않았습니다: ${nilFields.join(', ')}`, errStatus);
//   //     }
//   //   }
//   //   this.addMethod(areNotNil, elseThrow, 'elseThrow');
//   //   return areNotNil;
//   // }

//   get hasLength() {
//     this.isAny.elseThrow('hasLength()의 부모', 500)
//     const returnValue = this.isString() || this.isArray() || this.isObject()
//     const hasLength = this.initFunc(returnValue, 'boolean');
//     const elseThrow = (fieldName, errStatus = 400) => {
//       this.validate(hasLength, this.itMustBeBut(fieldName, '문자열, 배열, 혹은 객체', this.value), errStatus);
//     }
//     this.addMethod(hasLength, elseThrow, 'elseThrow')
//     return hasLength;
//   }

//   get length() {
//     this.hasLength.elseThrow('length()의 부모', 500);

//     const returnLength = this.isObject() ? Object.keys(this.value).length : this.value.length;
//     const lengthFunc = this.initFunc(returnLength, 'number');

//     const inRange = (min = null, max = null) => {
//       this.hasLength.elseThrow('length.inRange()의 부모', 500)
//       let returnInRange = true
//       if (new CheckIf(min).isAny){
//         new CheckIf(min).isNumber.elseThrow('inRange: min값')
//         if(returnLength < min) {
//           returnInRange = false
//         }
//       }
//       if (new CheckIf(max).isAny){
//         new CheckIf(min).isNumber.elseThrow('inRange: max값')
//         if(returnLength > max) {
//           returnInRange = false
//         }
//       }
//       const inRangeFunc = this.initFunc(returnInRange, 'boolean');

//       const elseThrow = (fieldName, min = null, max = null, errStatus = 400) => {
//         this.hasLength.elseThrow('length.inRange.elseThrow()의 부모', 500)
//         new CheckIf(fieldName).isString.elseThrow('length.inRange.elseThrow(): fieldName', 500)
//         if (new CheckIf(min).isDefined){
//           new CheckIf(min).isNumber.elseThrow('inRange: min값')
//         }

//         if (this.isString()) fieldName += '문자열의 길이';
//         else if (this.isArray()) fieldName += '배열의 크기';
//         else if (this.isObject()) fieldName += '객체 요소 갯수';

//         const conditionString = ""
//         conditionString += new CheckIf(min).isAny ? ` ${min}이상` : ""
//         conditionString += new CheckIf(min).isAny ? ` ${max}이하` : ""
//         this.validate(returnInRange, this.itMustBeBut(fieldName, conditionString, this.value));
//       };

//       this.addMethod(inRangeFunc, elseThrow, 'elseThrow');
//       return inRangeFunc;
//     };

//     this.addMethod(lengthFunc, inRange, 'inRange');
//     return lengthFunc;
//   }
// }

const checkIf = (value) => new CheckIf(value)

module.exports = { checkIf };