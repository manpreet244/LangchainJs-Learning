import "dotenv/config";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});


// “This code uses LangChain with Groq’s LLaMA-3 model to generate text from a prompt template.
// I define a reusable prompt with variables, pipe it into a chat model, and invoke the chain with runtime input.
// LangChain handles prompt formatting and message roles, while Groq handles fast inference.”
//below we are creating a prompt template with a variable {product} and then we are piping that prompt into the llm (language model) and then invoking the chain with a specific product to generate a promotional tweet.
//Its called as "formatting" the prompt with the variable and then passing it to the language model to get the desired output.

const prompt = ChatPromptTemplate.fromTemplate(
  "Generate a promotional tweet for this product:\n{product}"
);

console.log(prompt)
const chain = prompt.pipe(llm);

const response = await chain.invoke({
  product: "An AI-powered note-taking app for developers",
});

console.log(response.content);

// 1. THE PROMPT (The Blueprint)
// const taskTemplate = "Extract a 3-word task title from this note: {note}";
// const taskPrompt = PromptTemplate.fromTemplate(taskTemplate);

// // 2. THE MODEL (The Brain)
// const model = new ChatGoogleGenerativeAI({ 
//   apiKey: process.env.GEMINI_API_KEY,
//   model: "gemini-1.5-flash" 
// });

// // 3. THE OUTPUT PARSER (The Cleaner)
// const parser = new StringOutputParser();

// // 4. THE CHAIN (The Assembly Line)
// const taskChain = taskPrompt.pipe(model).pipe(parser);
// Step 1: taskPrompt
// What it does: It waits for your input.

// Example: You give it { note: "I need to buy some milk and eggs from the store today" }.

// Result: It outputs: "Extract a 3-word task title from this note: I need to buy some milk and eggs from the store today."


// Step 2: .pipe(model)
// What it does: It sends that long sentence to Gemini.

// Example: Gemini thinks about it.

// Result: Gemini returns a big, messy object that looks like this:

// JSON
// {
//   "content": "Buy grocery items",
//   "metadata": { "model": "gemini-1.5-flash", "tokens": 12 },
//   "response_metadata": { ... }
// // }
// If you didn't have the next pipe, your code would have to deal with this huge, confusing object.

// Step 3: .pipe(parser)
// What it does: It grabs only the "content" text and throws the rest of the junk away.

// Result: It outputs a clean string: "Buy grocery items".