// Abstract Syntax Tree (AST) Node
export type ASTNode = 
    | ProgramNode
    | FunctionDeclarationNode
    | StatementNode
    | ReturnNode
    | ExpressionNode
    | AssignNode;

export interface ProgramNode {
    type: "program"
    children: FunctionDeclarationNode
}

export interface FunctionDeclarationNode {
    type: "function"
    name: string;
    children: StatementNode
}

export interface StatementNode {
    type: "statement"
    children: ReturnNode
}

export interface ReturnNode {
    type: "return"
    children: ExpressionNode
}

export interface ExpressionNode {
    type: "expression"
    value: number | string
}

export interface AssignNode {
    type: "assign"
    left: ASTNode
    right: ASTNode
}
