import { Activity, AlertTriangle, Clock, TrendingDown } from "lucide-react"
import { NavSidebar } from "@/components/nav-sidebar"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockPredictions, mockKPIs, mockAlerts, generateHistoricalKPIs } from "@/lib/mock-data"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  const currentKPI = mockKPIs[0]
  const historicalData = generateHistoricalKPIs(30)
  const criticalAlerts = mockAlerts.filter((a) => !a.resolved && a.severity === "critical").length
  const activePredictions = mockPredictions.filter((p) => p.status === "active").length

  // Format data for charts
  const mttrData = historicalData.slice(-14).map((kpi) => ({
    date: new Date(kpi.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    mttr: Number(kpi.avg_mttr.toFixed(1)),
  }))

  const downtimeData = historicalData.slice(-14).map((kpi) => ({
    date: new Date(kpi.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    hours: Number(kpi.unplanned_downtime_hours.toFixed(1)),
  }))

  return (
    <div className="flex h-screen bg-background">
      <NavSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="border-b border-border bg-card">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-semibold text-foreground">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Real-time predictive analytics for aircraft maintenance operations
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Avg MTTR"
              value={`${currentKPI.avg_mttr.toFixed(1)}h`}
              change="↓ 25% vs last month"
              changeType="positive"
              icon={Clock}
              iconColor="text-blue-600 dark:text-blue-400"
            />
            <StatCard
              title="Active Predictions"
              value={activePredictions}
              change="Model precision: 0.89"
              changeType="neutral"
              icon={Activity}
              iconColor="text-emerald-600 dark:text-emerald-400"
            />
            <StatCard
              title="Critical Alerts"
              value={criticalAlerts}
              change="Requires immediate attention"
              changeType="negative"
              icon={AlertTriangle}
              iconColor="text-red-600 dark:text-red-400"
            />
            <StatCard
              title="Unplanned Downtime"
              value={`${currentKPI.unplanned_downtime_hours.toFixed(1)}h`}
              change="↓ 20% reduction achieved"
              changeType="positive"
              icon={TrendingDown}
              iconColor="text-amber-600 dark:text-amber-400"
            />
          </div>

          {/* Charts */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Mean Time To Repair (MTTR)</CardTitle>
                <p className="text-sm text-muted-foreground">Last 14 days trend</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mttrData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs text-muted-foreground" tick={{ fill: "currentColor" }} />
                    <YAxis className="text-xs text-muted-foreground" tick={{ fill: "currentColor" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mttr"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--chart-1))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unplanned Downtime</CardTitle>
                <p className="text-sm text-muted-foreground">Daily hours over last 14 days</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={downtimeData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-xs text-muted-foreground" tick={{ fill: "currentColor" }} />
                    <YAxis className="text-xs text-muted-foreground" tick={{ fill: "currentColor" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="hours" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Predictions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Active Maintenance Predictions</CardTitle>
              <p className="text-sm text-muted-foreground">AI-powered anomaly detection with 0.89 precision score</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPredictions
                  .filter((p) => p.status === "active")
                  .map((prediction) => (
                    <div
                      key={prediction.prediction_id}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            prediction.severity === "critical"
                              ? "bg-red-500"
                              : prediction.severity === "high"
                                ? "bg-amber-500"
                                : prediction.severity === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-foreground">Component {prediction.component_id}</p>
                          <p className="text-sm text-muted-foreground">
                            Anomaly Score: {prediction.anomaly_score.toFixed(2)} | Precision:{" "}
                            {prediction.precision.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {new Date(prediction.predicted_failure_time).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-muted-foreground">Predicted Failure</p>
                        </div>
                        <Badge
                          variant={
                            prediction.severity === "critical"
                              ? "destructive"
                              : prediction.severity === "high"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {prediction.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
