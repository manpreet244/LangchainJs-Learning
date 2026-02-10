import "dotenv/config";
import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

//Create a prompt to turn a usere's question into a standalone question that can be answered without additional context

//Initialise the model

const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});

//A string holding the phrasing of the prompt
const standaloneQuestionsTemplate = 'Given a question , convert it to a standalone question Question : {question} standalone question :'

//A prompt created using PromptTemplate and the formTemplate method
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionsTemplate);

//2. Create a chain with the prompt and the model.
// We use the pipe (|) symbol to connect them.

const standaloneQuestionChain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser());

// 3. Invoke the chain remembering to pass in a question.
const response = await standaloneQuestionChain.invoke({
  question: "What are the best places to visit there in india? I am very tired ." 
});

// 4. Log out the response.
console.log(response);