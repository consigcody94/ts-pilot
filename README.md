# ⚡ TS Pilot

**MCP Server Optimized for TypeScript Development**

TypeScript just became the #1 language (overtook Python/JS for first time in a decade), but there's NO TypeScript-specific AI tooling. TS Pilot fills this critical gap.

## The Problem
- **TypeScript is NOW #1 language** (driven by AI development)
- **No TypeScript-specific AI tooling** exists
- AI generates `any` types and unsafe patterns
- Generic tools don't understand TypeScript's type system

## Solution
**TS Pilot** provides MCP tools for TypeScript-specific development:

### 🎯 Features
- **Deep Type System** - Understands generics, conditional types, branded types
- **Strict Type Generation** - Never generates `any`, always proper types
- **Framework-Aware** - React, Next.js, Node.js, Express patterns
- **Refactoring Safety** - Type-preserving transformations
- **Type Error Fixing** - Diagnoses and fixes type errors
- **Interface Generation** - From usage patterns and API responses

### 🛠️ MCP Tools
1. **generate_types** - Generate strict types from data/API
2. **fix_type_errors** - Diagnose and fix TypeScript errors
3. **refactor_safe** - Type-preserving refactoring suggestions
4. **suggest_generics** - Add proper generic constraints
5. **check_strict** - Verify strict mode compliance
6. **framework_patterns** - Framework-specific type patterns

## Quick Start
```bash
npm install -g ts-pilot
```

### Claude Desktop Setup
```json
{
  "mcpServers": {
    "ts-pilot": {
      "command": "npx",
      "args": ["ts-pilot"]
    }
  }
}
```

## Example Usage
```
You: "Generate types for this API response"
Claude: (uses generate_types tool)
interface UserResponse {
  id: number;
  name: string;
  email: string;
  roles: ('admin' | 'user')[];
}

You: "Fix this type error: Type 'string | undefined' is not assignable to type 'string'"
Claude: (uses fix_type_errors tool)
Add null check: if (value !== undefined) { ... }
Or use non-null assertion if guaranteed: value!
Or provide default: value ?? 'default'
```

## Why This Will Get Stars
1. **Perfect Timing** - TypeScript JUST became #1 language
2. **Clear Gap** - No TypeScript-specific AI tools exist
3. **Huge TAM** - Every TypeScript developer (largest audience now)
4. **MCP Momentum** - Rides ecosystem explosion
5. **Type Safety** - Critical pain point AI tools ignore

## Star Potential: 40k-80k
- Largest developer audience (TypeScript #1)
- First-of-its-kind tool
- Solves real pain (AI generates unsafe types)

MIT License
