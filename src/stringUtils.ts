export function isWhitespace(s: string): boolean {
    return s.length === 1 && /\s/.test(s)
}

export function isDelimiter(s: string): boolean {
    return [";", ",", "(", ")", "{", "}"].includes(s)
}

export function isOperator(s: string): boolean {
    return "+-=/*%<>!&|".includes(s)
}

export function isDigit(s: string): boolean {
    return /^\d$/.test(s)
}

export function isInteger(s: string): boolean {
    return /^\d+$/.test(s)
}

export function isFloat(s: string): boolean {
    const floatRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
    return floatRegex.test(s)
}

export function isWord(s: string): boolean {
    return /^[a-zA-Z_]$/.test(s)
}
