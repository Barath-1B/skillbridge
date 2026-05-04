#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

async function main() {
  const server = new Server(
    {
      name: 'mongodb-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  server.setRequestHandler(async (request) => {
    await connectDB();

    if (request.method === 'tools/list') {
      return {
        tools: [
          {
            name: 'query_documents',
            description: 'Query documents from a MongoDB collection',
            inputSchema: {
              type: 'object',
              properties: {
                collection: { type: 'string', description: 'Collection name (users, skills, careerPaths, userProgress)' },
                filter: { type: 'object', description: 'MongoDB query filter' },
                limit: { type: 'number', description: 'Limit results (default: 10)' }
              },
              required: ['collection']
            }
          },
          {
            name: 'insert_document',
            description: 'Insert a document into a MongoDB collection',
            inputSchema: {
              type: 'object',
              properties: {
                collection: { type: 'string' },
                document: { type: 'object', description: 'Document to insert' }
              },
              required: ['collection', 'document']
            }
          },
          {
            name: 'update_document',
            description: 'Update a document in MongoDB',
            inputSchema: {
              type: 'object',
              properties: {
                collection: { type: 'string' },
                filter: { type: 'object', description: 'Query to find document' },
                update: { type: 'object', description: 'Update operations' }
              },
              required: ['collection', 'filter', 'update']
            }
          },
          {
            name: 'delete_document',
            description: 'Delete documents from MongoDB',
            inputSchema: {
              type: 'object',
              properties: {
                collection: { type: 'string' },
                filter: { type: 'object', description: 'Query to find documents' }
              },
              required: ['collection', 'filter']
            }
          }
        ]
      };
    }

    if (request.method === 'tools/call') {
      const { name, arguments: args } = request.params;

      try {
        if (name === 'query_documents') {
          const db = mongoose.connection.db;
          const collection = db.collection(args.collection);
          const results = await collection
            .find(args.filter || {})
            .limit(args.limit || 10)
            .toArray();
          return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
        }

        if (name === 'insert_document') {
          const db = mongoose.connection.db;
          const collection = db.collection(args.collection);
          const result = await collection.insertOne(args.document);
          return { content: [{ type: 'text', text: `Inserted: ${result.insertedId}` }] };
        }

        if (name === 'update_document') {
          const db = mongoose.connection.db;
          const collection = db.collection(args.collection);
          const result = await collection.updateMany(args.filter, { $set: args.update });
          return { content: [{ type: 'text', text: `Updated: ${result.modifiedCount} documents` }] };
        }

        if (name === 'delete_document') {
          const db = mongoose.connection.db;
          const collection = db.collection(args.collection);
          const result = await collection.deleteMany(args.filter);
          return { content: [{ type: 'text', text: `Deleted: ${result.deletedCount} documents` }] };
        }

        return { content: [{ type: 'text', text: `Unknown tool: ${name}` }] };
      } catch (err) {
        return { content: [{ type: 'text', text: `Error: ${err.message}` }] };
      }
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
