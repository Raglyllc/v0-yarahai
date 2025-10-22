import type { ModelPerformanceMetrics, PerformanceThresholds } from "../types"

const DEFAULT_THRESHOLDS: PerformanceThresholds = {
  responseTime: 2000,
  relevanceScore: 0.85,
  userSatisfaction: 0.9,
}

export class PerformanceTracker {
  private metrics: ModelPerformanceMetrics[] = []
  private thresholds: PerformanceThresholds

  constructor(thresholds?: Partial<PerformanceThresholds>) {
    this.thresholds = { ...DEFAULT_THRESHOLDS, ...thresholds }
  }

  recordMetric(metric: ModelPerformanceMetrics): void {
    this.metrics.push(metric)

    if (this.metrics.length > 100) {
      this.metrics.shift()
    }
  }

  getAverageMetrics(): ModelPerformanceMetrics | null {
    if (this.metrics.length === 0) return null

    const sum = this.metrics.reduce(
      (acc, metric) => ({
        responseTime: acc.responseTime + metric.responseTime,
        tokenCount: (acc.tokenCount || 0) + (metric.tokenCount || 0),
        relevanceScore: (acc.relevanceScore || 0) + (metric.relevanceScore || 0),
        userSatisfaction: (acc.userSatisfaction || 0) + (metric.userSatisfaction || 0),
        timestamp: new Date().toISOString(),
      }),
      { responseTime: 0, tokenCount: 0, relevanceScore: 0, userSatisfaction: 0, timestamp: "" }
    )

    const count = this.metrics.length

    return {
      responseTime: sum.responseTime / count,
      tokenCount: sum.tokenCount / count,
      relevanceScore: sum.relevanceScore / count,
      userSatisfaction: sum.userSatisfaction / count,
      timestamp: new Date().toISOString(),
    }
  }

  exceedsExpectations(): boolean {
    const avg = this.getAverageMetrics()
    if (!avg) return false

    const meetsResponseTime = avg.responseTime < this.thresholds.responseTime
    const meetsRelevance = (avg.relevanceScore || 0) > this.thresholds.relevanceScore
    const meetsSatisfaction = (avg.userSatisfaction || 0) > this.thresholds.userSatisfaction

    return meetsResponseTime && meetsRelevance && meetsSatisfaction
  }

  shouldTriggerUpdate(): boolean {
    if (this.metrics.length < 10) return false

    return this.exceedsExpectations()
  }

  getMetrics(): ModelPerformanceMetrics[] {
    return [...this.metrics]
  }

  clearMetrics(): void {
    this.metrics = []
  }
}

export const performanceTracker = new PerformanceTracker()
