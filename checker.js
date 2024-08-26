// @ts-check

const { SimpleNameMatcher } = require("./SimpleNameMatcher");


/**
 * @param {import(".").ICase[]} cases 
 * @returns 
 */
function checker(cases) {
  const matcher = new SimpleNameMatcher();
  
  /** @type {import(".").ICaseResult[]} */
  const result = [];
  cases.forEach((test, index) => {
    try {
      const score = matcher.compareNames(test.keyword_1, test.keyword_2);
      console.log(`Test Case ${index + 1}: ${score.toFixed(2)}% (Expected: ${test.expected}%)`);
      result.push({
        keyword_1: test.keyword_1,
        keyword_2: test.keyword_2,
        expected: test.expected,
        score: score,
        is_success: score >= test.expected,
      });
    } catch (error) {
      console.error(`Test Case ${index + 1} Error: ${error?.message}`);
      result.push({
        keyword_1: test.keyword_1,
        keyword_2: test.keyword_2,
        expected: test.expected,
        score: 0,
        is_success: false,
      });
    }
  });

  return result;
}

module.exports = { checker };
