const knex = require('../knex'); // DB 연결 파일
const parseWhere = require('../parseWhere');

const DBHelper = {
  /**--------------------------------------------------------------------------
   * @param {Object} where

   * @typedef {Object} Where
   * @property {string} condition - WHERE 절 조건 문자열
   * @property {Param[]} params - WHERE 절 조건 파라미터 배열
   * 
   * @typedef {Object} Param
   * @property {string} field - 필드명
   * @property {string} operator - 비교 연산자
   * @property {string|number|Array} value - 비교 값
   * @property {string} [likeLeft] - LIKE 절 왼쪽 와일드카드
   * @property {string} [likeRight] - LIKE 절 오른쪽 와일드카드
   * 
   * @typedef {Object} Limit
   * @property {number} offset - OFFSET 값
   * @property {number} pageSize - LIMIT 값
   * 
   * @returns {Object} - { sql: string, values: Array }
   * 
   * @example
   * const where = {
   *  condition: "(? OR ?) AND (? OR ?)",
   * params: [
   *  { field: "name", operator: "LIKE", value: "John", likeLeft: "%", likeRight: "%" },
   *  { field: "office_num", operator: "=", value: null },
   *  { field: "permission", operator: "IN", value: ["manager", "admin"] }
   *  //추가 예정 기능
   *  { field: "role_name", operator: "=", value: 
   *     {subQuery: "SELECT role_name FROM approval_role WHERE role_id = ?", value: 1} }
   * ]
   */

  /**--------------------------------------------------------------------------
   * SELECT 쿼리를 실행합니다.
   * @param {string} selectFromJoin - SELECT와 JOIN 절을 포함한 문자열
   * @param {Object} where - WHERE 절 조건 객체
   * @param {string} groupBy - GROUP BY 절
   * @param {Object} limit - LIMIT와 OFFSET 객체
   * @returns {Array} - 쿼리 결과
   */
  search: async (selectFromJoin, where = null, groupBy = null, limit = null, connection = knex) => {
    let query = selectFromJoin;
    const params = [];

    // WHERE 절 조건 생성 (parseCondition을 이용)
    if (where && where.condition && where.params) {
      const { sql: whereSQL, values } = parseWhere(where);
      if (whereSQL.trim()) { // whereSQL이 비어있지 않은 경우에만 WHERE 절 추가
        query += ` WHERE (${whereSQL})`;
        params.push(...values);
      }
    }

    if (groupBy) {
      query += ` GROUP BY ${groupBy}`;
    }

    // LIMIT와 OFFSET 처리 (optional)
    if (limit) {
      query += ` LIMIT ?, ?`;
      params.push(limit.offset, limit.pageSize);
    }

    // 쿼리 및 파라미터 출력
    console.log('Executing query:', query);
    console.log('With parameters:', params);

    // 쿼리 실행
    const [result] =  await knex.raw(query, params);
    return result;
  },

  /**--------------------------------------------------------------------------
   * 테이블의 데이터를 업데이트합니다.
   * @param {string} table - 테이블 이름
   * @param {Object} body - 업데이트할 데이터 객체
   * @param {Object} where - WHERE 절 조건 객체
   * @returns {Object} - 업데이트 결과
   */
  patch: async (table, body, where, connection = knex) => {
    let query = `UPDATE ${table} SET `;

    const columns = Object.keys(body);
    query += columns.map(column => `${column} = ?`).join(', ');
    const params = Object.values(body);

    // where 객체는 { login_id: 'user123' } 같은 형태
    const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
    query += ` WHERE ${whereClause}`;
    params.push(...Object.values(where));

    // 쿼리 및 파라미터 출력
    console.log('Executing query:', query);
    console.log('With parameters:', params);

    const [result] = await knex.raw(query, params);
    return result;
  },

  /**--------------------------------------------------------------------------
   * 테이블에 새 데이터를 삽입합니다.
   * @param {string} table - 테이블 이름
   * @param {Object} body - 삽입할 데이터 객체
   * @returns {Object} - 삽입 결과
   */
  insert: async (table, body, connection = knex) => {
    let query = `INSERT INTO ${table} (`;
    const columns = Object.keys(body);

    const params = [];
    const valuePlaceholders = columns.map((column) => {
      const value = body[column];
      if (typeof value === 'object' && value.subQuery) {
        // 서브쿼리와 서브쿼리 파라미터를 처리
        params.push(...(value.params || [])); // 서브쿼리의 파라미터 추가
        return `(${value.subQuery})`; // 서브 쿼리를 직접 삽입
      } else {
        // 일반 값은 ? 플레이스홀더 사용
        params.push(value);
        return '?';
      }
    });
    query += columns.join(', ') + ') VALUES (';
    query += valuePlaceholders.join(', ') + ')';

    // 쿼리 및 파라미터 출력
    console.log('Executing query:', query);
    console.log('With parameters:', params);

    const [result] = await knex.raw(query, params);
    return result;
  },


  /**--------------------------------------------------------------------------
   * 특정 조건에 맞는 데이터를 삭제합니다.
   * @param {string} table - 테이블 이름
   * @param {Object} where - WHERE 절 조건 객체
   * @returns {Object} - 삭제 결과
   */
  delete: async (table, where, connection = knex) => {
    // WHERE 절 조건 생성
    const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
    const params = Object.values(where);

    // DELETE 쿼리 생성
    let query = `DELETE FROM ${table} WHERE ${whereClause}`;

    // 쿼리 및 파라미터 출력
    console.log('Executing query:', query);
    console.log('With parameters:', params);

    // 쿼리 실행
    const [result] = await knex.raw(query, params);
    return result;
  },

   /**--------------------------------------------------------------------------
   * 트랜잭션을 시작합니다.
   * @returns {Promise<import('mysql2/promise').Connection>} - 트랜잭션을 위한 커넥션 객체
   */
   beginTransaction: async () => {
    const connection = await knex.getConnection();
    await connection.beginTransaction();
    return connection;
  },

  /**--------------------------------------------------------------------------
   * 트랜잭션을 커밋합니다.
   * @param {import('mysql2/promise').Connection} connection - 트랜잭션 커넥션 객체
   */
  commit: async (connection) => {
    await connection.commit();
    connection.release();
  },

  /**--------------------------------------------------------------------------
   * 트랜잭션을 롤백합니다.
   * @param {import('mysql2/promise').Connection} connection - 트랜잭션 커넥션 객체
   */
  rollback: async (connection) => {
    if (!connection) {
      return;
    }
    await connection.rollback();
    connection.release();
  },
};

module.exports = DBHelper;