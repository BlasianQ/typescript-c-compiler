"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tokenize;
const utils = __importStar(require("./stringUtils"));
/**
 * Lexes a given file string input by tokenizing each character sequence (Lexical Analysis)
 * @param input file content
 * @returns list of Tokens
 */
function tokenize(input) {
    // TODO: Add processComment function
    const keywords = new Set(["auto", "break", "case", "char", "const", "continue", "default", "do",
        "double", "else", "enum", "extern", "float", "for", "goto", "if", "int",
        "long", "register", "return", "short", "signed", "sizeof", "static",
        "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while"]);
    /**
     * Processes input into keyword or identifier token
     * @param startIndex of input
     * @returns Tuple of Keyword or Identifier Token and  endIndex of token
     */
    function processWord(startIndex) {
        let endIndex = startIndex + 1;
        while (endIndex < input.length && /^[a-zA-Z0-9_]$/.test(input[endIndex])) {
            endIndex++;
        }
        const word = input.substring(startIndex, endIndex);
        return keywords.has(word) ? [{ keyword: word }, endIndex] : [{ identifier: word }, endIndex];
    }
    /**
     * Processes input into operator token
     * @param startIndex of input
     * @returns Tuple of Operator Token and endIndex of token
     */
    function processOperator(startIndex) {
        let endIndex = startIndex + 1;
        while (endIndex < input.length && utils.isOperator(input[endIndex])) {
            endIndex++;
        }
        const op = input.substring(startIndex, endIndex);
        if (["+", "-", "*", "/", "%", "++", "--"].includes(op)) {
            return [{ arithmetic: op }, endIndex];
        }
        else if (["<", "<=", ">", ">=", "==", "!=", "&&", "||", "!"].includes(op)) {
            return [{ relational: op }, endIndex];
        }
        else if (["=", "-=", "+=", "*=", "/=", "%="].includes(op)) {
            return [{ assignment: op }, endIndex];
        }
        else {
            throw Error(`Ivalid operator: ${op}`);
        }
    }
    /**
     * Processes input into string token
     * @param startIndex of input
     * @returns Tuple of string token and endIndex of token
     */
    function processString(startIndex) {
        // TODO: add functionality for baskslash
        startIndex++;
        let endIndex = startIndex;
        while (endIndex < input.length && input[endIndex] !== "\"") {
            endIndex++;
        }
        if (endIndex >= input.length) {
            throw Error("Missing clossing quotation: \"");
        }
        const str = input.substring(startIndex, endIndex);
        return [{ string: str }, endIndex + 1];
    }
    /**
     * Processes input into character token
     * @param startIndex of input
     * @returns Tuple of character token and endIndex of token
     */
    function processCharacter(startIndex) {
        // TODO: add functionality for baskslash
        startIndex++;
        let endIndex = startIndex;
        while (endIndex < input.length && input[endIndex] !== "\'") {
            endIndex++;
        }
        if (endIndex >= input.length) {
            throw Error("Missing clossing quotation: \'");
        }
        // char type in C allows for multiple characters, but it is advised not to do this
        const charSequence = input.substring(startIndex, endIndex);
        return [{ string: charSequence }, endIndex + 1];
    }
    /**
     * Processes input into integer of float token
     * @param startIndex of input
     * @returns Tuple of Integer of Float Token and endIndex of token
     */
    function processNumber(startIndex) {
        let endIndex = startIndex + 1;
        while (endIndex < input.length && /[.\deE]/.test(input[endIndex])) {
            endIndex++;
        }
        const numLiteral = input.substring(startIndex, endIndex);
        if (utils.isInteger(numLiteral)) {
            return [{ integer: parseInt(numLiteral) }, endIndex];
        }
        if (utils.isFloat(numLiteral)) {
            return [{ float: parseFloat(numLiteral) }, endIndex];
        }
        throw Error(`Invalid number: ${numLiteral}`);
    }
    function example(i) {
        const t = { keyword: "you" };
        return t;
    }
    // Main tokenize function logic:
    const tokens = [];
    let i = 0;
    while (i < input.length) {
        const char = input[i];
        let token;
        if (utils.isWhitespace(char)) {
            i++;
        }
        else if (utils.isDelimiter(char)) {
            i++;
            tokens.push({ delimiter: char });
        }
        else if (char === "\"") {
            [token, i] = processString(i);
            tokens.push(token);
        }
        else if (char === "\'") {
            [token, i] = processCharacter(i);
            tokens.push(token);
        }
        else if (utils.isOperator(char)) {
            [token, i] = processOperator(i);
            tokens.push(token);
        }
        else if (utils.isDigit(char)) {
            [token, i] = processNumber(i);
            tokens.push(token);
        }
        else if (utils.isWord(char)) {
            [token, i] = processWord(i);
            tokens.push(token);
        }
        else {
            throw Error(`Unrecognized character: ${char}`);
        }
    }
    return tokens;
}
