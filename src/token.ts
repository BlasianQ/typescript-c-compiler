export type Token = 
    | {type: "identifier"; value: string}
    | {type: "keyword"; value: string}
    | {type: "delimiter"; value: string}
    | {type: "arithmetic"; value: string}
    | {type: "relational"; value: string}
    | {type: "assignment"; value: string}
    | {type: "integer"; value: number}
    | {type: "float"; value: number}
    | {type: "string"; value: string}
    | {type: "character"; value: string};
