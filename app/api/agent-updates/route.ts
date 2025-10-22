import { type NextRequest, NextResponse } from "next/server"
import { agentUpdateManager } from "../../../services/agentUpdateManager"
import { performanceTracker } from "../../../services/performanceTracking"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get("action")

  switch (action) {
    case "status":
      return NextResponse.json({
        currentModel: agentUpdateManager.getCurrentModel(),
        autoUpdateEnabled: agentUpdateManager.isAutoUpdateEnabled(),
        updateHistory: agentUpdateManager.getUpdateHistory(),
        averageMetrics: performanceTracker.getAverageMetrics(),
      })

    case "history":
      return NextResponse.json({
        updates: agentUpdateManager.getUpdateHistory(),
      })

    case "metrics":
      return NextResponse.json({
        averageMetrics: performanceTracker.getAverageMetrics(),
        recentMetrics: performanceTracker.getMetrics().slice(-20),
        exceedsExpectations: performanceTracker.exceedsExpectations(),
      })

    default:
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, enabled } = body

    switch (action) {
      case "toggle":
        if (typeof enabled !== "boolean") {
          return NextResponse.json({ error: "enabled must be a boolean" }, { status: 400 })
        }
        agentUpdateManager.setAutoUpdateEnabled(enabled)
        return NextResponse.json({
          success: true,
          autoUpdateEnabled: agentUpdateManager.isAutoUpdateEnabled(),
        })

      case "clear-metrics":
        performanceTracker.clearMetrics()
        return NextResponse.json({ success: true, message: "Metrics cleared" })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in agent-updates API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
