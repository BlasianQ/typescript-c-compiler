"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generate;
/**
 * Traverses AST to generate x86 assembly code
 * @param root of AST
 * @returns x86-64 string
 */
function generate(root) {
    let code = `
        section .text
        global main
    
    `;
    code += generateAssemblyString(root);
    return code;
}
// Post-order traversal of AST
function generateAssemblyString(root) {
    switch (root.type) {
        case "expression":
            return typeof root.value === "string" ? root.value : root.value.toString();
        case "function":
            return "\n" + root.name + ":" + generateAssemblyString(root.children);
        case "return":
            return "\n\tmov eax, " + generateAssemblyString(root.children) +
                "\n\tret";
        case "assign":
            return "";
        default:
            return generateAssemblyString(root.children);
    }
}