"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parse;
function parse(tokens) {
    const prog = {
        children: parseFunction(tokens)
    };
    return prog;
}
function parseFunction(tokens) {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "int")) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    console.log(tok);
    let funcName = tokens.shift();
    if (funcName === undefined || !("identifier" in funcName)) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "(")) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    console.log(tok);
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ")")) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    console.log(tok);
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "{")) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    console.log(tok);
    const func = {
        name: funcName.identifier,
        children: parseStatement(tokens)
    };
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "}")) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    console.log(tok);
    return func;
}
function parseStatement(tokens) {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "return")) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    console.log(tok);
    // tok = tokens.shift();
    // if (tok === undefined || !("integer" in tok)) {
    //     throw Error(`Unexpected token in function: ${tok}`)
    // }
    // console.log(tok)
    const statement = {
        children: parseExpression(tokens)
    };
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ";")) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    console.log(tok);
    return statement;
}
function parseExpression(tokens) {
    let tok = tokens.shift();
    if (tok === undefined || !("integer" in tok)) {
        throw Error(`Unexpected token in function: ${tok}`);
    }
    const exp = {
        value: tok.integer
    };
    const ret = {
        children: exp
    };
    // tok = tokens.shift();
    // if (tok === undefined || !isTokenOf(tok, "delimiter", ";")) {
    //     throw Error(`Unexpected token in function: ${tok}`)
    // }
    return ret;
}
function isTokenOf(token, key, value) {
    return key in token && token[key] === value;
}
