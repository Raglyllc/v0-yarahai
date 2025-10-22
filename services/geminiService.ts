import type { YarahAIResponse, ChatHistoryItem } from "../types"

export async function getAiResponse(question: string, context: string, history?: ChatHistoryItem[]): Promise<YarahAIResponse> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question, context, history: history || [] }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to get response from AI service")
    }

    const data = await response.json()
    return data as YarahAIResponse
  } catch (error) {
    console.error("Error calling AI API:", error)
    throw new Error("Failed to get response from AI service. Please check your network connection.")
  }
}
