import type { AgentUpdate, ModelPerformanceMetrics } from "../types"
import { performanceTracker } from "./performanceTracking"

interface AgentConfig {
  currentModel: string
  availableModels: string[]
  autoUpdateEnabled: boolean
}

class AgentUpdateManager {
  private config: AgentConfig
  private updateHistory: AgentUpdate[] = []
  private updateInProgress = false

  constructor() {
    this.config = {
      currentModel: "gemini-2.5-pro",
      availableModels: ["gemini-2.5-pro", "gemini-2.5-flash", "gemini-2.5-advanced"],
      autoUpdateEnabled: true,
    }
  }

  async checkAndTriggerUpdate(): Promise<AgentUpdate | null> {
    if (!this.config.autoUpdateEnabled || this.updateInProgress) {
      return null
    }

    if (!performanceTracker.shouldTriggerUpdate()) {
      return null
    }

    const metrics = performanceTracker.getAverageMetrics()
    if (!metrics) return null

    return this.createUpdate(metrics, "Performance exceeded expectations")
  }

  private createUpdate(metrics: ModelPerformanceMetrics, reason: string): AgentUpdate {
    const update: AgentUpdate = {
      id: `update-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      triggeredAt: new Date().toISOString(),
      reason,
      previousModel: this.config.currentModel,
      newModel: this.selectNextModel(),
      performanceMetrics: metrics,
      status: "pending",
    }

    this.updateHistory.push(update)
    this.logUpdate(update)

    return update
  }

  private selectNextModel(): string {
    const currentIndex = this.config.availableModels.indexOf(this.config.currentModel)
    const nextIndex = (currentIndex + 1) % this.config.availableModels.length
    return this.config.availableModels[nextIndex]
  }

  async applyUpdate(updateId: string): Promise<boolean> {
    const update = this.updateHistory.find((u) => u.id === updateId)
    if (!update || update.status !== "pending") {
      return false
    }

    try {
      this.updateInProgress = true
      update.status = "applied"
      this.config.currentModel = update.newModel

      performanceTracker.clearMetrics()

      this.logUpdate(update)

      return true
    } catch (error) {
      update.status = "failed"
      this.logUpdate(update)
      return false
    } finally {
      this.updateInProgress = false
    }
  }

  private logUpdate(update: AgentUpdate): void {
    console.log(
      `[YARAH AI Agent Update] ${update.status.toUpperCase()}: ${update.reason} | ${update.previousModel} -> ${update.newModel}`
    )
  }

  getCurrentModel(): string {
    return this.config.currentModel
  }

  getUpdateHistory(): AgentUpdate[] {
    return [...this.updateHistory]
  }

  setAutoUpdateEnabled(enabled: boolean): void {
    this.config.autoUpdateEnabled = enabled
  }

  isAutoUpdateEnabled(): boolean {
    return this.config.autoUpdateEnabled
  }
}

export const agentUpdateManager = new AgentUpdateManager()
