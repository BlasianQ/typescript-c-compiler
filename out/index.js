"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lexer_1 = __importDefault(require("./lexer"));
const parser_1 = __importDefault(require("./parser"));
const test = `
        int main() {
            return 2;
        }`;
const tokens = (0, lexer_1.default)(test);
console.log(tokens);
const ast = (0, parser_1.default)(tokens);
console.log(ast);
