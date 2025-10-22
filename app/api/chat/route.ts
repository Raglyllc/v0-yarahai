import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenAI, Type } from "@google/genai"
import type { YarahAIResponse, ChatHistoryItem } from "../../../types"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.API_KEY })

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    answer: {
      type: Type.STRING,
      description: "A comprehensive, clear answer to the user's question, written in a scholarly yet accessible tone.",
    },
    bibleVerses: {
      type: Type.ARRAY,
      description: "A list of relevant Bible verses that directly support or relate to the answer.",
      items: {
        type: Type.OBJECT,
        properties: {
          verse: {
            type: Type.STRING,
            description: "The Bible verse reference (e.g., John 3:16).",
          },
          text: {
            type: Type.STRING,
            description: "The full text of the Bible verse.",
          },
        },
        required: ["verse", "text"],
      },
    },
    crossReferences: {
      type: Type.ARRAY,
      description:
        "Cross-references to other religious or historical texts that provide additional context or parallel perspectives.",
      items: {
        type: Type.OBJECT,
        properties: {
          text: {
            type: Type.STRING,
            description: "The name of the text being referenced (e.g., Qur'an, Talmud, Josephus' 'The Jewish War').",
          },
          verse: {
            type: Type.STRING,
            description: "The specific verse, passage, or section reference within that text.",
          },
          commentary: {
            type: Type.STRING,
            description: "A brief commentary explaining the relevance of this cross-reference to the user's question.",
          },
        },
        required: ["text", "verse", "commentary"],
      },
    },
    historicalContext: {
      type: Type.STRING,
      description:
        "A paragraph explaining the historical, cultural, and linguistic context surrounding the user's question and the provided texts.",
    },
  },
  required: ["answer", "bibleVerses", "crossReferences", "historicalContext"],
}

export async function POST(request: NextRequest) {
  try {
    const { question, context, history } = await request.json()

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 })
    }

    const model = "gemini-2.5-pro"

    const prompt = `
      User Question: "${question}"
      ${context ? `Additional Context Provided by User: "${context}"` : ""}
    `

    const historyItems = Array.isArray(history) && history.length > 0
      ? history.map((item: ChatHistoryItem) => ({
          role: item.role,
          parts: [{ text: item.content }]
        }))
      : []

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...historyItems,
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `You are YARAH AI, an expert theological and historical research assistant specializing in scriptural analysis. Your purpose is to provide users with insightful, accurate, and contextually rich answers based on the Bible and other relevant religious or historical texts. Adhere strictly to the provided JSON schema for your response. Your tone should be scholarly, neutral, and respectful of all religious traditions.`,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    })

    const jsonText = response.text.trim()
    const parsedResponse = JSON.parse(jsonText) as YarahAIResponse

    return NextResponse.json(parsedResponse)
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    return NextResponse.json({ error: "Failed to get response from AI service" }, { status: 500 })
  }
}
