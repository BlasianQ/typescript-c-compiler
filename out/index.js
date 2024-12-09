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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const generate_1 = __importDefault(require("./generate"));
const lexer_1 = __importDefault(require("./lexer"));
const parser_1 = __importDefault(require("./parser"));
const args = process.argv;
if (args.length !== 3) {
    throw Error(`Expecting one argument but ${args.length - 2} were given`);
}
const inPath = args[2].trim();
if (inPath.slice(inPath.length - 2) !== '.c') {
    throw Error('Must have file extension .c');
}
fs.readFile(inPath, 'utf8', (readErr, data) => {
    if (readErr) {
        console.error('Error reading the file:', readErr);
        return;
    }
    const tokens = (0, lexer_1.default)(data);
    const ast = (0, parser_1.default)(tokens);
    const assembly = (0, generate_1.default)(ast);
    const outPath = inPath.slice(0, inPath.length - 2) + ".s";
    fs.writeFile(outPath, assembly, (writeErr) => {
        if (writeErr) {
            console.error('Error writing to the file:', writeErr);
        }
    });
});
