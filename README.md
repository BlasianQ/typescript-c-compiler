# typescript-c-compiler
Command line tool that compiles a given C file into x86-64 assembly

---

Early stage of the compiler can handle a single function with an integer function signature.
__Compiler logic__:
1. `index.ts` reads a file
2. `lexer.ts` categorizes file content into different tokens
3. `parser.ts` parses tokens into a well-formed Abstract Syntax Tree (AST)
4. `generate.ts` traverses AST to generate assembly code
5. `index.ts` writes generated assembly code to output file

## To Compile:

1. Install Node.js
2. Run `node out/index.js 'path/to/file'`

Output file will be in the same directory as the original C file

Example:
Try `node out/index.js test/stage1/valid/return_2.c`
