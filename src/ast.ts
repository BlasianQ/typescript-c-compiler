export type ASTNode = 
    | ProgramNode
    | FunctionDeclarationNode
    | StatementNode
    | ReturnNode
    | ExpressionNode
    | AssignNode;

export interface ProgramNode {
    children: FunctionDeclarationNode
}

export interface FunctionDeclarationNode {
    name: string;
    children: StatementNode
}

export interface StatementNode {
    children: ReturnNode
}

export interface ReturnNode {
    children: ExpressionNode
}

export interface ExpressionNode {
    value: number | string
}

export interface AssignNode {

}
