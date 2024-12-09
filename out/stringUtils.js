"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWhitespace = isWhitespace;
exports.isDelimiter = isDelimiter;
exports.isOperator = isOperator;
exports.isDigit = isDigit;
exports.isInteger = isInteger;
exports.isFloat = isFloat;
exports.isWord = isWord;
exports.isSingleLineComment = isSingleLineComment;
function isWhitespace(s) {
    return s.length === 1 && /\s/.test(s);
}
function isDelimiter(s) {
    return [";", ",", "(", ")", "{", "}"].includes(s);
}
function isOperator(s) {
    return "+-=/*%<>!&|".includes(s);
}
function isDigit(s) {
    return /^\d$/.test(s);
}
function isInteger(s) {
    return /^\d+$/.test(s);
}
function isFloat(s) {
    const floatRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
    return floatRegex.test(s);
}
function isWord(s) {
    return /^[a-zA-Z_]$/.test(s);
}
function isSingleLineComment(index, s) {
    return index + 1 < s.length && s[index] === "/" && s[index + 1] === "/";
}
