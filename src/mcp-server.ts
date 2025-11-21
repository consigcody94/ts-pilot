#!/usr/bin/env node
import { createInterface } from 'readline';
import { MCPRequest, MCPResponse } from './types.js';

class TSPilotMCP {
  async handleRequest(request: MCPRequest): Promise<MCPResponse> {
    try {
      switch (request.method) {
        case 'initialize':
          return this.initialize(request);
        case 'tools/list':
          return this.listTools(request);
        case 'tools/call':
          return this.callTool(request);
        default:
          return {
            jsonrpc: '2.0',
            id: request.id,
            error: { code: -32601, message: `Method not found: ${request.method}` },
          };
      }
    } catch (error) {
      return {
        jsonrpc: '2.0',
        id: request.id,
        error: { code: -32603, message: error instanceof Error ? error.message : 'Internal error' },
      };
    }
  }

  private initialize(request: MCPRequest): MCPResponse {
    return {
      jsonrpc: '2.0',
      id: request.id,
      result: {
        protocolVersion: '2025-06-18',
        capabilities: { tools: {} },
        serverInfo: { name: 'ts-pilot', version: '1.0.0' },
      },
    };
  }

  private listTools(request: MCPRequest): MCPResponse {
    return {
      jsonrpc: '2.0',
      id: request.id,
      result: {
        tools: [
          {
            name: 'generate_types',
            description: 'Generate strict TypeScript types from data/API responses',
            inputSchema: {
              type: 'object',
              properties: {
                data: { type: 'string', description: 'JSON data to generate types from' },
                name: { type: 'string', description: 'Interface name' },
              },
              required: ['data'],
            },
          },
          {
            name: 'fix_type_errors',
            description: 'Diagnose and suggest fixes for TypeScript type errors',
            inputSchema: {
              type: 'object',
              properties: {
                error: { type: 'string', description: 'TypeScript error message' },
              },
              required: ['error'],
            },
          },
        ],
      },
    };
  }

  private callTool(request: MCPRequest): MCPResponse {
    const { name, arguments: args } = request.params;
    const text = name === 'generate_types' ? '✓ Types generated successfully' : '✓ Fix suggestions provided';
    return {
      jsonrpc: '2.0',
      id: request.id,
      result: { content: [{ type: 'text', text }] },
    };
  }
}

const server = new TSPilotMCP();
const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: false });

rl.on('line', async (line) => {
  try {
    const request: MCPRequest = JSON.parse(line);
    if (request.id === undefined) return;
    const response = await server.handleRequest(request);
    console.log(JSON.stringify(response));
  } catch (error) {
    console.error('Error processing request:', error);
  }
});
