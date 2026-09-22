# AGENTS.md

## Project Overview

Myfx is a modular utility library with 200+ pure functions for collections, formatting, and more. Written in TypeScript with dual ESM/CJS output.

## Development Commands

```bash
# Build (codegen + Vite ESM + Vite UMD)
npm run build

# Run tests
npm run jest

# Generate documentation
npm run doc

# Development with watch mode (outputs to dev/)
npm run dev
```

## Project Structure

```
src/
├── index.ts          # Main entry point
├── types.ts          # Shared type definitions
├── chain.ts          # FuncChain/ChainFx (function chain)
├── array/            # Array utilities
├── collection/       # Collection operations (each, map, filter, reduce, etc.)
├── datetime/         # Date/time formatting and parsing
├── function/         # Function utilities (debounce, throttle, etc.)
├── is/               # Type checking functions
├── math/             # Math utilities
├── number/           # Number formatting
├── object/           # Object utilities
├── string/           # String utilities
├── template/         # Template engine
├── tree/             # Tree data structures
└── utils/            # Internal utilities
test/
├── index.spec.ts     # Main test file
├── cases.*.ts        # Test cases by module
└── benchmark*.js     # Performance benchmarks
```

## Coding Conventions

- **TypeScript**: Use strict mode, all functions must have complete type definitions
- **Exports**: Use named exports for individual functions, default export for `_` namespace
- **JSDoc**: Every exported function must have JSDoc with @param, @returns, @example
- **Naming**: Use camelCase for functions, descriptive names (e.g., `each`, `map`, `filter`)
- **Pure functions**: Prefer pure functions, avoid side effects unless necessary

## Module Organization

Each module (array/, collection/, etc.) should:
- Export functions individually
- Include a `readme.md` if the module is complex
- Follow the same coding conventions

## Testing

- Test file location: `test/cases.{module}.ts`
- Framework: Jest (ts-jest, no bundler step)
- Each exported function must have at least 3 test cases
- Run `npm run jest` before committing

## Build Output

- Bundler: Vite 8 + vite-plugin-dts (single package, no subpath exports)
- UMD: `dist/index.umd.js` (global name `myfx`)
- ESM: `dist/index.esm.mjs`
- Types: `dist/index.d.ts`
- Never commit dist/ files

## Constraints

- **Do NOT**: Modify package.json version without explicit instruction
- **Do NOT**: Remove already exported functions
- **Do NOT**: Add external dependencies (keep library zero-dependency)
- **Do NOT**: Break backward compatibility
- **Ask first**: Before changing public API signatures
- **Ask first**: Before adding new modules
