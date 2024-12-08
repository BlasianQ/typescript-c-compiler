import { Token } from "./token";
import { ASTNode, ProgramNode, FunctionDeclarationNode, StatementNode, ReturnNode, ExpressionNode, AssignNode } from "./ast";

export default function parse(tokens: Token[]): ASTNode {
    const prog: ProgramNode = {
        children: parseFunction(tokens)
    }
    return prog
}

function parseFunction(tokens: Token[]): FunctionDeclarationNode {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "int")) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    console.log(tok)
    let funcName = tokens.shift();
    if (funcName === undefined || !("identifier" in funcName)) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    tok = tokens.shift()
    if (tok === undefined || !isTokenOf(tok, "delimiter", "(")) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    console.log(tok)
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ")")) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    console.log(tok)
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "{")) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    console.log(tok)

    const func: FunctionDeclarationNode = {
        name: funcName.identifier,
        children: parseStatement(tokens)
    }

    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "}")) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    console.log(tok)

    return func;
}

function parseStatement(tokens: Token[]): StatementNode {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "return")) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    console.log(tok)
    // tok = tokens.shift();
    // if (tok === undefined || !("integer" in tok)) {
    //     throw Error(`Unexpected token in function: ${tok}`)
    // }
    // console.log(tok)
    const statement: StatementNode = {
        children: parseExpression(tokens)
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ";")) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    console.log(tok)
    return statement
}

function parseExpression(tokens: Token[]): ReturnNode {
    let tok = tokens.shift();
    if (tok === undefined || !("integer" in tok)) {
        throw Error(`Unexpected token in function: ${tok}`)
    }
    const exp: ExpressionNode = {
        value: tok.integer
    }
    const ret: ReturnNode = {
        children: exp
    }
    // tok = tokens.shift();
    // if (tok === undefined || !isTokenOf(tok, "delimiter", ";")) {
    //     throw Error(`Unexpected token in function: ${tok}`)
    // }
    return ret
}

function isTokenOf(token: Token, key: string, value: string | number): boolean {
    return key in token && token[key as keyof typeof token] === value;
}
