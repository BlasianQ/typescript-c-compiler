import tokenize from "./lexer";
import parse from "./parser";

const test = `
        int main() {
            return 2;
        }`;

const tokens = tokenize(test);
console.log(tokens);

const ast = parse(tokens);
console.log(ast);