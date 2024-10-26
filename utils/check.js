const logger = require('./logger');

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class Check {
  constructor(value = null) {
    this.update(value);
  }

  update(newValue) {
    this.value = newValue;
    this.type = typeof newValue;
  }

  validate(condition, errMessage, errStatus = 400) {
    if (!condition) {
      throw new HttpError(errMessage, errStatus);
    }
  }

  createValidator(isValid, assertFn) {
    const validator = () => isValid;
    validator.assert = assertFn;
    validator.toString = () => String(isValid);
    return validator;
  }

  get isValid() {
    const isValid = this.value !== null && this.value !== undefined;
    return this.createValidator(isValid, (fieldName, errStatus = 400) => {
      this.validate(isValid, `${fieldName}는 유효한 값이어야 합니다. ${this.value}`, errStatus);
    });
  }

  get isFound() {
    const isFound = this.value !== null && this.value !== undefined;
    return this.createValidator(isFound, (fieldName, condition, errStatus = 404) => {
      new Check(condition).isObject.assert('조건',500)
      const conditionString = Object.entries(condition)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(', ');
      this.validate(isFound, `${fieldName}을 찾을 수 없습니다. ${conditionString}`, errStatus);
    });
  }

  // get areFound() {
  //   const validator = (fieldName) => {
  //     this.isArray.assert(fieldName, 500);
  //     return this.value.length > 0
  //   };

  //   validator.assert = (fieldName, min = null, max =, errStatus = 400) => {
  //     const invalidFields = Object.entries(this.value)
  //       .filter(([_, value]) => !new Check(value).isValid())
  //       .map(([key]) => key);

  //     if (invalidFields.length) {
  //       throw new HttpError(
  //         `다음 필드들이 유효하지 않습니다: ${invalidFields.join(', ')}`,
  //         errStatus
  //       );
  //     }
  //   };

  //   validator.toString = () => String(validator());
  //   return validator;
  // }


  get areValid() {
    const validator = () => {
      this.isObject.assert(fieldName, 500)

      return Object.entries(this.value).every(([_, value]) => 
        new Check(value).isValid()
      );
    };

    validator.assert = (errStatus = 400) => {
      const invalidFields = Object.entries(this.value)
        .filter(([_, value]) => !new Check(value).isValid())
        .map(([key]) => key);

      if (invalidFields.length) {
        throw new HttpError(
          `다음 필드들이 유효하지 않습니다: ${invalidFields.join(', ')}`,
          errStatus
        );
      }
    };

    validator.toString = () => String(validator());
    return validator;
  }

  get isString() {
    const isStr = this.type === 'string';
    return this.createValidator(isStr, (fieldName, errStatus = 400) => {
      this.validate(isStr, `${fieldName}는 문자열이어야 합니다; ${this.value}`, errStatus);
    });
  }

  get isNumber() {
    const isNum = this.type === 'number';
    return this.createValidator(isNum, (fieldName, errStatus = 400) => {
      this.validate(isNum, `${fieldName}는 숫자이어야 합니다; ${this.value}`, errStatus);
    });
  }

  get isBoolean() {
    const isBool = this.type === 'boolean';
    return this.createValidator(isBool, (fieldName, errStatus = 400) => {
      this.validate(isBool, `${fieldName}는 불린 값이어야 합니다; ${this.value}`, errStatus);
    });
  }

  get isArray() {
    const isArr = Array.isArray(this.value);
    return this.createValidator(isArr, (fieldName, errStatus = 400) => {
      this.validate(isArr, `${fieldName}는 배열이어야 합니다; ${this.value}`, errStatus);
    });
  }

  get isObject() {
    const isObj = this.type === 'object' && this.value !== null && !Array.isArray(this.value);
    return this.createValidator(isObj, (fieldName, errStatus = 400) => {
      this.validate(isObj, `${fieldName}는 객체이어야 합니다; ${this.value}`, errStatus);
    });
  }

  get isDate() {
    const isDate = this.value instanceof Date;
    return this.createValidator(isDate, (fieldName, errStatus = 400) => {
      this.validate(isDate, `${fieldName}는 날짜 객체이어야 합니다; ${this.value}`, errStatus);
    });
  }

  get string() {
    const length = () => this.value.length;
    const inRange = length.inRange = (min, max) => {

      if (check(min).isValid() && this.value.length < min) {
        return false
      }
      if (check(max).isValid() && this.value.length > max) {
        return false
      }
      return true
    }

    inRange.assert = (fieldName, min = null, max = null) => {
      this.isString.assert(fieldName, 500);
  
      if (check(min).isValid()) {
        this.validate(
          this.value.length >= min,
          `${fieldName} 문자열의 길이가 ${min} 이상이어야 합니다; ${this.value}`
        );
      }
  
      if (check(max).isValid()) {
        this.validate(
          this.value.length <= max,
          `${fieldName} 문자열의 길이가 ${max} 이하이어야 합니다; ${this.value}`
        );
      }
    };
  
    length.toString = () => String(this.value.length);
  
    return { length };
  }

  get array() {
    const length = () => this.value.length;
    const inRange = length.inRange = (min, max) => {

      if (check(min).isValid() && this.value.length < min) {
        return false
      }
      if (check(max).isValid() && this.value.length > max) {
        return false
      }
      return true
    }
    inRange.assert = (fieldName, min = null, max = null) => {

      if (check(min).isValid()) {
        this.validate(
          this.value.length >= min,
          `${fieldName} 배열의 원소가 ${min}개 이상이어야 합니다; ${this.value}`
        );
      }
  
      if (check(max).isValid()) {
        this.validate(
          this.value.length <= max,
          `${fieldName} 배열의 원소가 ${max}개 이하이어야 합니다; ${this.value}`
        );
      }
    };
  
    length.log = (fieldName) => {
      logger(`${fieldName} 배열 원소 갯수: ${this.value.length}`);
      return length;
    };
  
    length.toString = () => String(this.value.length);
  
    return { length };
  }
  
  get boolean() {
    const validator = (expected) => this.value === expected;
  
    validator.assert = (fieldName, expected) => {
      this.isBoolean.assert(fieldName, 500);
      this.validate(
        this.value === expected,
        `${fieldName}는 ${expected}이어야 합니다; ${this.value}`
      );
    };
  
    validator.toString = () => String(this.value);
  
    // isTrue와 isFalse에도 assert를 연결합니다.
    const isTrue = () => validator(true);
    isTrue.assert = (fieldName) => {
      validator.assert(fieldName, true);
    };

    const isFalse = () => validator(false);
    isFalse.assert = (fieldName) => {
      validator.assert(fieldName, false);
    };
    return { isTrue, isFalse };
  }
}

const check = new Proxy(Check, {
  apply(target, thisArg, args) {
    return new target(...args);
  },
});

module.exports = { HttpError, check };
