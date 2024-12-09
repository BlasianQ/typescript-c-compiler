import * as fs from 'fs';
import generate from "./generate";
import tokenize from "./lexer";
import parse from "./parser";

const args = process.argv;
if (args.length !== 3) {
    throw Error(`Expecting one argument but ${args.length - 2} were given`)
}
const inPath = args[2].trim();
if (inPath.slice(inPath.length - 2) !== '.c') {
    throw Error('Must have file extension .c')
}

fs.readFile(inPath, 'utf8', (readErr, data) => {
    if (readErr) {
        console.error('Error reading the file:', readErr);
        return;
    }
    const tokens = tokenize(data);
    const ast = parse(tokens);
    const assembly = generate(ast);
    const outPath = inPath.slice(0, inPath.length - 2) + ".s"

    fs.writeFile(outPath, assembly, (writeErr) => {
        if (writeErr) {
            console.error('Error writing to the file:', writeErr)
        }
    })
})
