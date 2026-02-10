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
