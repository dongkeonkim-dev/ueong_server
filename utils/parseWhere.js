/**--------------------------------------------------------------------------
   * 조건 문자열을 파싱하여 SQL 조건 문자열과 값 배열을 반환합니다.
   * @param {Object} where - 조건 문자열과 값 배열을 포함하는 객체
   * @param {string} where.condition - 조건 문자열
   * @param {Param[]} where.params - 조건 값 배열
   * @typedef {Object} Where
   * @property {string} condition - WHERE 절 조건 문자열
   * 
   * @typedef {Object} Param
   * @property {string} field - 필드명
   * @property {string} operator - 비교 연산자
   * @property {string|number|Array} value - 비교 값
   * @property {string} [likeLeft] - LIKE 절 왼쪽 와일드카드
   * @property {string} [likeRight] - LIKE 절 오른쪽 와일드카드
   * 
   * @returns {Object} - { sql: string, values: Array }
   */
const parseWhere = (where) => {
  let condition = where.condition;
  let params = where.params;
  const tokenize = (str) => {
    const tokens = [];
    let i = 0;
    while (i < str.length) {
      const char = str[i];
      if (char === '(' || char === ')') {
        tokens.push(char);
        i++;
      } else if (char === '?') {
        tokens.push('?');
        i++;
      } else if (/\s/.test(char)) {
        i++;
      } else {
        const substr = str.substring(i).toUpperCase();
        if (substr.startsWith('AND')) {
          tokens.push('AND');
          i += 3;
        } else if (substr.startsWith('OR')) {
          tokens.push('OR');
          i += 2;
        } else {
          throw new Error(`ParseError: Unexpected token starting at position ${i}`);
        }
      }
    }
    return tokens;
  };

  const shouldAddCondition = (operator, value) => {
    if (value === undefined) return false;
    if (operator.toUpperCase() === 'LIKE' && value === null) return false;
    if (operator.toUpperCase() === 'IN' && (!Array.isArray(value) || value.length === 0 || value.includes(null))) {
      throw new Error(`ParseError: 'IN' operator cannot have null or empty values.`);
    }
    return true;
  };

  const parseTokensToAST = (tokens, params) => {
    let index = 0;

    const parseExpression = () => {
      let node = parseTerm();
      while (index < tokens.length && tokens[index] === 'OR') {
        index++;
        const right = parseTerm();
        node = { type: 'OR', left: node, right };
      }
      return node;
    };

    const parseTerm = () => {
      let node = parseFactor();
      while (index < tokens.length && tokens[index] === 'AND') {
        index++;
        const right = parseFactor();
        node = { type: 'AND', left: node, right };
      }
      return node;
    };

    const parseFactor = () => {
      if (tokens[index] === '(') {
        index++;
        const node = parseExpression();
        if (tokens[index] !== ')') {
          throw new Error('ParseError: Unmatched parentheses in condition string.');
        }
        index++;
        return node;
      } else if (tokens[index] === '?') {
        if (params.length === 0) {
          throw new Error('ParseError: Not enough parameters provided.');
        }
        const param = params.shift();
        index++;
        if (!shouldAddCondition(param.operator, param.value)) {
          return null;
        }
        return { type: 'CONDITION', param };
      } else {
        throw new Error(`ParseError: Unexpected token '${tokens[index]}'`);
      }
    };

    const ast = parseExpression();
    if (index < tokens.length) {
      throw new Error('ParseError: Unexpected tokens at the end of condition string.');
    }
    return ast;
  };

  const simplifyAST = (node) => {
    if (node === null) return null;
    if (node.type === 'CONDITION') return node;

    const left = simplifyAST(node.left);
    const right = simplifyAST(node.right);
    if (left === null) return right;
    if (right === null) return left;

    return { type: node.type, left, right };
  };

  const astToSQL = (node, values) => {
    if (node.type === 'CONDITION') {
      const { field, operator, value, likeLeft = '', likeRight = '' } = node.param;
      if (operator.toUpperCase() === 'IN') {
        const placeholders = value.map(() => '?').join(', ');
        values.push(...value);
        return `${field} IN (${placeholders})`;
      } else if (operator.toUpperCase() === 'LIKE') {
        values.push(`${likeLeft}${value}${likeRight}`);
        return `${field} LIKE ?`;
      } else if (operator === '=' && value === null) {
        return `${field} IS NULL`;
      } else {
        values.push(value);
        return `${field} ${operator} ?`;
      }
    }

    const leftSQL = astToSQL(node.left, values);
    const rightSQL = astToSQL(node.right, values);
    return `(${leftSQL} ${node.type} ${rightSQL})`;
  };

  const tokens = tokenize(condition);
  const paramsCopy = [...params];

  let ast;
  try {
    ast = parseTokensToAST(tokens, paramsCopy);
  } catch (error) {
    throw error;
  }

  const simplifiedAST = simplifyAST(ast);
  if (simplifiedAST === null) return { sql: '1=1', values: [] };

  const values = [];
  const sql = astToSQL(simplifiedAST, values);

  return { sql, values };
};

module.exports = parseWhere;