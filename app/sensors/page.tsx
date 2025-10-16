"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { sensorReadings } from "@/lib/mock-data"
import { Search, Filter, Download, AlertTriangle, CheckCircle2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useState, useMemo } from "react"

export default function SensorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null)

  // Group readings by sensor
  const sensorGroups = useMemo(() => {
    const groups = new Map<string, typeof sensorReadings>()
    sensorReadings.forEach((reading) => {
      if (!groups.has(reading.sensor_id)) {
        groups.set(reading.sensor_id, [])
      }
      groups.get(reading.sensor_id)!.push(reading)
    })
    return groups
  }, [])

  // Get latest reading for each sensor
  const latestReadings = useMemo(() => {
    return Array.from(sensorGroups.entries()).map(([sensor_id, readings]) => {
      const sorted = [...readings].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      return sorted[0]
    })
  }, [sensorGroups])

  // Filter sensors based on search
  const filteredSensors = useMemo(() => {
    return latestReadings.filter((reading) => reading.sensor_id.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [latestReadings, searchTerm])

  // Get chart data for selected sensor
  const chartData = useMemo(() => {
    if (!selectedSensor) return []
    const readings = sensorGroups.get(selectedSensor) || []
    return readings.map((r) => ({
      time: new Date(r.timestamp).toLocaleTimeString(),
      temperature: r.temperature,
      pressure: r.pressure,
      vibration: r.vibration,
    }))
  }, [selectedSensor, sensorGroups])

  const anomalyCount = latestReadings.filter((r) => r.anomaly_flag).length
  const healthyCount = latestReadings.filter((r) => !r.anomaly_flag).length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sensor Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time aircraft sensor data and anomaly detection</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Sensors</p>
              <p className="text-2xl font-bold text-foreground mt-1">{latestReadings.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="h-6 w-6 rounded-full bg-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Healthy</p>
              <p className="text-2xl font-bold text-green-500 mt-1">{healthyCount}</p>
            </div>
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Anomalies</p>
              <p className="text-2xl font-bold text-red-500 mt-1">{anomalyCount}</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Data Points</p>
              <p className="text-2xl font-bold text-foreground mt-1">{sensorReadings.length.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <div className="text-blue-500 font-bold text-lg">{(sensorReadings.length / 1000000).toFixed(1)}M</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sensors by ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensor List */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Sensor Status</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredSensors.map((reading) => (
              <div
                key={reading.sensor_id}
                onClick={() => setSelectedSensor(reading.sensor_id)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedSensor === reading.sensor_id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">{reading.sensor_id}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(reading.timestamp).toLocaleString()}</p>
                  </div>
                  <Badge variant={reading.anomaly_flag ? "destructive" : "default"}>
                    {reading.anomaly_flag ? "Anomaly" : "Normal"}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Temperature</p>
                    <p className="font-medium text-foreground">{reading.temperature}°C</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Pressure</p>
                    <p className="font-medium text-foreground">{reading.pressure} PSI</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Vibration</p>
                    <p className="font-medium text-foreground">{reading.vibration} Hz</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sensor Detail Chart */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {selectedSensor ? `Sensor: ${selectedSensor}` : "Select a sensor to view details"}
          </h2>
          {selectedSensor && chartData.length > 0 ? (
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Temperature Over Time</p>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Pressure Over Time</p>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="pressure" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">Vibration Over Time</p>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="vibration" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              Click on a sensor to view detailed metrics
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
