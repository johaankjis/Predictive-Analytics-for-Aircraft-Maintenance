"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { maintenancePredictions } from "@/lib/mock-data"
import { TrendingUp, AlertCircle, Clock, Target, Download, Filter } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Cell,
} from "recharts"
import { useMemo } from "react"

export default function AnalyticsPage() {
  // Calculate statistics
  const stats = useMemo(() => {
    const highRisk = maintenancePredictions.filter((p) => p.anomaly_score > 0.8).length
    const mediumRisk = maintenancePredictions.filter((p) => p.anomaly_score > 0.5 && p.anomaly_score <= 0.8).length
    const lowRisk = maintenancePredictions.filter((p) => p.anomaly_score <= 0.5).length
    const avgPrecision = maintenancePredictions.reduce((sum, p) => sum + p.precision, 0) / maintenancePredictions.length

    return { highRisk, mediumRisk, lowRisk, avgPrecision }
  }, [])

  // Prepare chart data
  const riskDistribution = [
    { name: "High Risk", value: stats.highRisk, fill: "#ef4444" },
    { name: "Medium Risk", value: stats.mediumRisk, fill: "#f59e0b" },
    { name: "Low Risk", value: stats.lowRisk, fill: "#10b981" },
  ]

  const precisionData = maintenancePredictions.map((p, i) => ({
    index: i + 1,
    precision: p.precision,
    anomalyScore: p.anomaly_score,
  }))

  const timelineData = maintenancePredictions
    .sort((a, b) => new Date(a.predicted_failure_time).getTime() - new Date(b.predicted_failure_time).getTime())
    .slice(0, 10)
    .map((p) => ({
      component: p.component_id.split("-")[1],
      days: Math.ceil((new Date(p.predicted_failure_time).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      score: p.anomaly_score,
    }))

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Predictive Analytics</h1>
          <p className="text-muted-foreground mt-1">ML-powered failure prediction and risk assessment</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Model Precision</p>
              <p className="text-2xl font-bold text-foreground mt-1">{(stats.avgPrecision * 100).toFixed(1)}%</p>
              <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.3% vs baseline
              </p>
            </div>
            <Target className="h-12 w-12 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Risk</p>
              <p className="text-2xl font-bold text-red-500 mt-1">{stats.highRisk}</p>
              <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
            </div>
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Medium Risk</p>
              <p className="text-2xl font-bold text-orange-500 mt-1">{stats.mediumRisk}</p>
              <p className="text-xs text-muted-foreground mt-1">Monitor closely</p>
            </div>
            <Clock className="h-12 w-12 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Low Risk</p>
              <p className="text-2xl font-bold text-green-500 mt-1">{stats.lowRisk}</p>
              <p className="text-xs text-muted-foreground mt-1">Operating normally</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-green-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Failure Timeline */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Predicted Failure Timeline</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timelineData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: "Days Until Failure", position: "bottom" }}
              />
              <YAxis type="category" dataKey="component" stroke="hsl(var(--muted-foreground))" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="days" radius={[0, 8, 8, 0]}>
                {timelineData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.days < 30 ? "#ef4444" : entry.days < 60 ? "#f59e0b" : "#10b981"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Model Precision Scatter */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Model Precision vs Anomaly Score</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                type="number"
                dataKey="anomalyScore"
                name="Anomaly Score"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: "Anomaly Score", position: "bottom" }}
              />
              <YAxis
                type="number"
                dataKey="precision"
                name="Precision"
                stroke="hsl(var(--muted-foreground))"
                label={{ value: "Precision", angle: -90, position: "left" }}
              />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Scatter data={precisionData} fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        </Card>

        {/* Predictions Table */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Predictions</h2>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {maintenancePredictions.slice(0, 8).map((prediction) => {
              const daysUntilFailure = Math.ceil(
                (new Date(prediction.predicted_failure_time).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
              )
              const riskLevel =
                prediction.anomaly_score > 0.8 ? "high" : prediction.anomaly_score > 0.5 ? "medium" : "low"

              return (
                <div key={prediction.prediction_id} className="p-3 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-foreground text-sm">{prediction.component_id}</p>
                      <p className="text-xs text-muted-foreground mt-1">Predicted failure in {daysUntilFailure} days</p>
                    </div>
                    <Badge
                      variant={riskLevel === "high" ? "destructive" : riskLevel === "medium" ? "default" : "secondary"}
                    >
                      {riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Anomaly Score:</span>
                      <span className="ml-1 font-medium text-foreground">
                        {(prediction.anomaly_score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Precision:</span>
                      <span className="ml-1 font-medium text-foreground">
                        {(prediction.precision * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
