# LangChain.js Learning

Learning project for **LangChain** with different **AI models** and storing text data as **vectors in Supabase**.

---

## What This Project Does

- Read text from a `.txt` file
- Split large text into small chunks
- Create embeddings from text using AI models
- Store embeddings in Supabase Vector Store
- Generate text using chat models

---

## Tools & Libraries Used

| Tool | Purpose |
|------|---------|
| **Node.js** | Runtime |
| **LangChain** | Manage prompts, chains, embeddings |
| **Supabase** | Vector database (pgvector) |
| **Groq API** | LLaMA 3 model for text generation |
| **Google Gemini API** | Embeddings & chat (experimental) |
| **dotenv** | Load API keys |

---

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file (see `.env.example`):
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   GROQ_API_KEY=your_groq_api_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

---

## Scripts

### Ingest Text to Vector Store
```bash
node scripts/ingest.js
```
- Splits text using `RecursiveCharacterTextSplitter` (500 chars, 50 overlap)
- Creates embeddings with HuggingFace `all-mpnet-base-v2` (768 dimensions)
- Stores in Supabase `documents` table

### Chat with LLM
```bash
node scripts/chat.js
```
- Uses `ChatGroq` with **LLaMA-3.3-70b-versatile** model
- Prompt templates with LangChain Expression Language (LCEL)

---

## Key Learnings

- How LangChain chains work
- Difference between chat models and embedding models
- How vector databases store AI embeddings
- How to debug API and model errors

---

## Errors Faced & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `supabaseUrl is required` | Missing `.env` | Add environment variables |
| `404 model not found` | Wrong model name | Use correct model ID |
| `expected 768 dimensions, not 384` | Model dimension mismatch | Use `all-mpnet-base-v2` (768d) |
| `429 Too Many Requests` | API quota exceeded | Wait or use different API key |
| `Failed to resolve module specifier` | Browser can't import npm | Use Node.js, not Vite |

---

## Current Status

- ✅ Groq chat model working
- ✅ HuggingFace embeddings working
- ✅ Supabase vector insert working

---

## Next Steps

- [ ] Add retrieval (search) from Supabase
- [ ] Build full RAG pipeline
- [ ] Add streaming responses

---


