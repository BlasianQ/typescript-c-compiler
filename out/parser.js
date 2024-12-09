"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parse;
/**
 * Transforms list of tokens into a well formed Abstract Syntax Tree based upon a formalized grammar (Syntax Analysis)
 * <program> ::= <function>
 * i.e. a program node consists of a function node
 * @param tokens List of tokens
 * @returns AST root node
 */
function parse(tokens) {
    const program = {
        type: "program",
        children: parseFunction(tokens)
    };
    return program;
}
/**
 * Production Rule (Grammar) :
 * <function> ::= "int" <id> "(" ")" "{" <statement> "}"
 * @param tokens List of tokens
 * @returns FunctionDeclarationNode
 */
function parseFunction(tokens) {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "int")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`);
    }
    let funcName = tokens.shift();
    if (funcName === undefined || !isTokenOf(funcName, "identifier")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`);
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "(")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`);
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ")")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`);
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "{")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`);
    }
    const func = {
        type: "function",
        name: funcName.value,
        children: parseStatement(tokens)
    };
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "}")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`);
    }
    return func;
}
/**
 * Production Rule (Grammar) :
 * <statement> ::= "return" <exp> ";"
 * @param tokens List of tokens
 * @returns FunctionDeclarationNode
 */
function parseStatement(tokens) {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "return")) {
        throw Error(`Unexpected token in statement: ${JSON.stringify(tok) || "missing"}`);
    }
    const statement = {
        type: "statement",
        children: parseExpression(tokens)
    };
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ";")) {
        throw Error(`Unexpected token in statement: ${JSON.stringify(tok) || "missing"}`);
    }
    return statement;
}
/**
 * Production Rule (Grammar) :
 * <exp> ::= <int>
 * @param tokens List of tokens
 * @returns FunctionDeclarationNode
 */
function parseExpression(tokens) {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "integer")) {
        throw Error(`Unexpected token in expression: ${JSON.stringify(tok) || "missing"}`);
    }
    const exp = {
        type: "expression",
        value: tok.value
    };
    const ret = {
        type: "return",
        children: exp
    };
    return ret;
}
// Helper function for token type and value matching
function isTokenOf(token, type, value) {
    return token.type === type && (value === undefined || token.value === value);
}
