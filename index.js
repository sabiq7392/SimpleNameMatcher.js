const { checker } = require("./checker");
const { testCases } = require("./test_case");

/**
 * @typedef {{ keyword_1: string, keyword_2: string, expected: number }} ICase
 */

/** 
 * @typedef {{ keyword_1: string, keyword_2: string, expected: number, score: number, is_success: boolean }} ICaseResult
 */


const result = checker(testCases);

console.log("Result: ", result)
