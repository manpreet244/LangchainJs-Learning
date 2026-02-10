import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";

import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";
import "dotenv/config";

const client = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Read local file with Node.js fs 
const text = await fs.readFile("./scrimba-info.txt", "utf-8");

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,// if two chunks chunk1 "i am manpreet enginner" chunk2 " am manpreet" , both of chunks will have some related information
  separators: ["\n\n", "\n", " ", ""],
});

//split data into chunks and create documents
const docs = await splitter.createDocuments([text]);

const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-mpnet-base-v2",
});

// Insert documents into Supabase Vector Store
await SupabaseVectorStore.fromDocuments(docs, embeddings, {
  client,
  tableName: "documents",
});

console.log("✅ Inserted:", docs.length, "chunks");
