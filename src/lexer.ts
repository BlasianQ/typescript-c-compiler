import { Token } from "./token";
import * as utils from "./stringUtils";

/**
 * Lexes a given file string input by tokenizing each character sequence (Lexical Analysis)
 * @param input file content
 * @returns list of Tokens
 */
export default function tokenize(input: string): Token[] {
    // TODO: Add processComment function

    const keywords: Set<string> = new Set(
            ["auto", "break", "case", "char", "const", "continue", "default", "do",
            "double", "else", "enum", "extern", "float", "for", "goto", "if", "int",
            "long", "register", "return", "short", "signed", "sizeof", "static",
            "struct", "switch", "typedef", "union", "unsigned", "void", "volatile", "while"]
        );
    
    /**
     * Processes input into keyword or identifier token
     * @param startIndex of input
     * @returns Tuple of Keyword or Identifier Token and  endIndex of token
     */
    function processWord(startIndex: number): [Token, number] {
        let endIndex: number = startIndex + 1
        while (endIndex < input.length && /^[a-zA-Z0-9_]$/.test(input[endIndex])) {
            endIndex++
        }
        const word: string = input.substring(startIndex, endIndex)
        return keywords.has(word) ? [{ keyword: word }, endIndex] : [{ identifier: word }, endIndex]
    }

    /**
     * Processes input into operator token
     * @param startIndex of input
     * @returns Tuple of Operator Token and endIndex of token
     */
    function processOperator(startIndex: number): [Token, number] {
        let endIndex: number = startIndex + 1
        while (endIndex < input.length && utils.isOperator(input[endIndex])) {
            endIndex++
        }
        const op: string = input.substring(startIndex, endIndex)
        if (["+", "-", "*", "/", "%", "++", "--"].includes(op)) {
            return [{ arithmetic: op }, endIndex]
        } else if (["<", "<=", ">", ">=", "==", "!=", "&&", "||", "!"].includes(op)) {
            return [{ relational: op }, endIndex]
        } else if (["=", "-=", "+=", "*=", "/=", "%="].includes(op)) {
            return [{ assignment: op }, endIndex]
        } else {
            throw Error(`Ivalid operator: ${op}`)
        }
    }

    /**
     * Processes input into string token
     * @param startIndex of input
     * @returns Tuple of string token and endIndex of token
     */
    function processString(startIndex: number): [Token, number] {
        // TODO: add functionality for baskslash
        startIndex++
        let endIndex: number = startIndex
        while (endIndex < input.length && input[endIndex] !== "\"") {
            endIndex++
        }
        if (endIndex >= input.length) {
            throw Error("Missing clossing quotation: \"")
        }
        const str: string = input.substring(startIndex, endIndex)
        return [{ string: str }, endIndex + 1]
    }

    /**
     * Processes input into character token
     * @param startIndex of input
     * @returns Tuple of character token and endIndex of token
     */
    function processCharacter(startIndex: number): [Token, number] {
        // TODO: add functionality for baskslash
        startIndex++
        let endIndex: number = startIndex
        while (endIndex < input.length && input[endIndex] !== "\'") {
            endIndex++
        }
        if (endIndex >= input.length) {
            throw Error("Missing clossing quotation: \'")
        }
        // char type in C allows for multiple characters, but it is advised not to do this
        const charSequence: string = input.substring(startIndex, endIndex)
        return [{ string: charSequence }, endIndex + 1]
    }

    /**
     * Processes input into integer of float token
     * @param startIndex of input
     * @returns Tuple of Integer of Float Token and endIndex of token
     */
    function processNumber(startIndex: number): [Token, number] {
        let endIndex: number = startIndex + 1
        while (endIndex < input.length && /[.\deE]/.test(input[endIndex])) {
            endIndex++
        }
        const numLiteral: string = input.substring(startIndex, endIndex)
        if (utils.isInteger(numLiteral)) {
            return [{ integer: parseInt(numLiteral)}, endIndex]
        }
        if (utils.isFloat(numLiteral)) {
            return [{ float: parseFloat(numLiteral)}, endIndex]
        }
        throw Error(`Invalid number: ${numLiteral}`)
    }

    function example(i: number): Extract<Token, {keyword: string}> {
        const t: Token = {keyword:"you"}
        return t
    }

    // Main tokenize function logic:
    const tokens: Token[] = []
    let i = 0
    while (i < input.length) {
        const char = input[i]
        let token: Token
        if (utils.isWhitespace(char)) {
            i++

        } else if (utils.isDelimiter(char)) {
            i++
            tokens.push({ delimiter: char })

        } else if (char === "\"") {
            [token, i] = processString(i)
            tokens.push(token)

        } else if (char === "\'") {
            [token, i] = processCharacter(i)
            tokens.push(token)

        } else if (utils.isOperator(char)) {
            [token, i] = processOperator(i)
            tokens.push(token)

        } else if (utils.isDigit(char)) {
            [token, i] = processNumber(i)
            tokens.push(token)

        } else if (utils.isWord(char)) {
            [token, i] = processWord(i)
            tokens.push(token)

        } else {
            throw Error(`Unrecognized character: ${char}`)
        }
    }
    return tokens
}
