import { ASTNode, ExpressionNode, FunctionDeclarationNode, ProgramNode, ReturnNode, StatementNode } from "./ast";
import { Token } from "./token";

/**
 * Transforms list of tokens into a well formed Abstract Syntax Tree based upon a formalized grammar (Syntax Analysis)
 * <program> ::= <function>
 * i.e. a program node consists of a function node
 * @param tokens List of tokens
 * @returns AST root node
 */
export default function parse(tokens: Token[]): ASTNode {
    const program: ProgramNode = {
        type: "program",
        children: parseFunction(tokens)
    }
    return program
}

/**
 * Production Rule (Grammar) :
 * <function> ::= "int" <id> "(" ")" "{" <statement> "}"
 * @param tokens List of tokens
 * @returns FunctionDeclarationNode
 */
function parseFunction(tokens: Token[]): FunctionDeclarationNode {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "int")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`)
    }
    let funcName = tokens.shift();
    if (funcName === undefined || !isTokenOf(funcName, "identifier")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`)
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "(")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`)
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ")")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`)
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "{")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`)
    }

    const func: FunctionDeclarationNode = {
        type: "function",
        name: funcName.value as string,
        children: parseStatement(tokens)
    }

    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", "}")) {
        throw Error(`Unexpected token in function: ${JSON.stringify(tok) || "missing"}`)
    }

    return func;
}

/**
 * Production Rule (Grammar) :
 * <statement> ::= "return" <exp> ";"
 * @param tokens List of tokens
 * @returns FunctionDeclarationNode
 */
function parseStatement(tokens: Token[]): StatementNode {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "keyword", "return")) {
        throw Error(`Unexpected token in statement: ${JSON.stringify(tok) || "missing"}`)
    }
    const statement: StatementNode = {
        type: "statement",
        children: parseExpression(tokens)
    }
    tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "delimiter", ";")) {
        throw Error(`Unexpected token in statement: ${JSON.stringify(tok) || "missing"}`)
    }
    return statement
}

/**
 * Production Rule (Grammar) :
 * <exp> ::= <int>
 * @param tokens List of tokens
 * @returns FunctionDeclarationNode
 */
function parseExpression(tokens: Token[]): ReturnNode {
    let tok = tokens.shift();
    if (tok === undefined || !isTokenOf(tok, "integer")) {
        throw Error(`Unexpected token in expression: ${JSON.stringify(tok) || "missing"}`)
    }
    const exp: ExpressionNode = {
        type: "expression",
        value: tok.value
    }
    const ret: ReturnNode = {
        type: "return",
        children: exp
    }
    return ret
}

// Helper function for token type and value matching
function isTokenOf(token: Token, type: string, value?: string): boolean {
    return token.type === type && (value === undefined || token.value === value);
}
