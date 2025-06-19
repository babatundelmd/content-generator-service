import { genkit } from "genkit";
import { googleAI, gemini } from "@genkit-ai/googleai";
import * as z from "zod";

// Initialize Genkit
const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
  model: gemini("gemini-1.5-flash"),
});

const ContentRequestSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters long."),
  contentType: z.enum([
    "blog_post",
    "social_media_update",
    "email_draft",
    "product_description",
  ]),
  tone: z
    .enum(["formal", "casual", "humorous", "persuasive"])
    .optional()
    .default("casual"),
  keywords: z.string().optional().describe("Comma-separated keywords"),
});

const ContentResponseSchema = z.object({
  generatedContent: z.string(),
  promptUsed: z.string(),
});

export const generateContentFlow = ai.defineFlow(
  {
    name: "generateContentFlow",
    inputSchema: ContentRequestSchema,
    outputSchema: ContentResponseSchema,
  },
  async (input) => {
    const { topic, contentType, tone, keywords } = input;

    let prompt = `Generate a ${contentType} about "${topic}".`;
    if (tone) {
      prompt += ` The tone should be ${tone}.`;
    }
    if (keywords) {
      prompt += ` Please incorporate the following keywords: ${keywords}.`;
    }

    switch (contentType) {
      case "blog_post":
        prompt += ` The blog post should be engaging, well-structured with a clear introduction, body, and conclusion. Aim for around 500-800 words.`;
        break;
      case "social_media_update":
        prompt += ` Keep it concise and engaging for social media. Include relevant hashtags if possible. Max 280 characters.`;
        break;
      case "email_draft":
        prompt += ` Draft a professional email. Include a subject line, greeting, body, and closing.`;
        break;
      case "product_description":
        prompt += ` Write a compelling product description highlighting key features and benefits.`;
        break;
    }

    console.log("Using prompt:", prompt);

    const llmResponse = await ai.generate({
      prompt: prompt,
      config: {
        temperature: 0.7,
      },
    });

    return {
      generatedContent: llmResponse.text,
      promptUsed: prompt,
    };
  }
);