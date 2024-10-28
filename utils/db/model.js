// utils/table.js
const db = require('./knex'); // Knex 인스턴스 임포트

class Model {
  constructor(name = null, schema = null, subQuery = null, column = null) {
    this.subQuery = subQuery;
    this.name = name;
    this.all = `${this.name}.*`;
    if (schema){
      this.columnsInSchema(schema);
    }
    if (column){
      this.columns(column);
    }
  }

  // 스키마에 정의된 열 이름 불러오기
  columnsInSchema(schema) {
    for (const key in schema.shape) {
      if (!(key in this.constructor.prototype)) {
        Object.defineProperty(this.constructor.prototype, key, {
          get: function () {
            return `${this.name}.${key}`;
          },
          enumerable: true,
          configurable: true, // 오버라이드를 허용
        });
      }
    }
  }

  // 열 삭제
  deleteColumn(columnName) {
    const prototype = this.constructor.prototype;
    const property = Object.getOwnPropertyDescriptor(prototype, columnName);
    if (property) {
      delete prototype[columnName];
      delete prototype[`${columnName}As`];
    }
  }

  // 열 정의, 오버라이드
  column(columnName, expression = null) {
    this.deleteColumn(columnName);
    Object.defineProperty(this.constructor.prototype, columnName, {
      get () {
        if (expression == null){
          return `${this.name}.${columnName}`;
        }
        if (typeof expression == 'string'){
          return db.raw(`${expression}`);
        }
        return expression;
      },
      enumerable: true,
      configurable: true,
    });
    Object.defineProperty(this.constructor.prototype, `${columnName}As`, {
      get () {
        if (typeof expression == 'string'){
          return db.raw(`${expression} AS ${columnName}`);
        }
        return expression;
      },
      enumerable: true,
      configurable: true,
    });
  }

  // 열 여러개 한번에 정의
  columns(columns) {
    Object.entries(columns).forEach(([key, expression]) => {
      this.column(key, expression);
    });
  }

  // 서브쿼리 AS 별칭 반환
  get table() {
    if (this.subQuery){
      if (typeof this.subQuery == 'string'){
        return `${this.subQuery} AS ${this.name}`;
      } else {
        return this.subQuery.as(this.name);
      }
    }
    return this.name;
  }

  // 서브쿼리 설정
  set table(subQuery) {
    this.subQuery = subQuery;
  }
}

module.exports = Model;
