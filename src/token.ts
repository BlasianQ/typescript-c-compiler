export type Token = 
    | {identifier: string}
    | {keyword: string}
    | {delimiter: string}
    | {arithmetic: string}
    | {relational: string}
    | {assignment: string}
    | {integer: number}
    | {float: number}
    | {string: string}
    | {character: string};
