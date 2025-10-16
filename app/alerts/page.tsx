"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { alerts, aircraft } from "@/lib/mock-data"
import { AlertTriangle, CheckCircle2, Clock, Search, Bell, BellOff } from "lucide-react"
import { useState, useMemo } from "react"

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "acknowledged" | "resolved">("all")
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null)

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    let filtered = alerts

    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.alert_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.component_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      if (filterStatus === "active") {
        filtered = filtered.filter((a) => !a.acknowledged && !a.resolved)
      } else if (filterStatus === "acknowledged") {
        filtered = filtered.filter((a) => a.acknowledged && !a.resolved)
      } else if (filterStatus === "resolved") {
        filtered = filtered.filter((a) => a.resolved)
      }
    }

    return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [searchTerm, filterStatus])

  // Calculate stats
  const stats = useMemo(() => {
    const active = alerts.filter((a) => !a.acknowledged && !a.resolved).length
    const acknowledged = alerts.filter((a) => a.acknowledged && !a.resolved).length
    const resolved = alerts.filter((a) => a.resolved).length
    const critical = alerts.filter((a) => a.severity === "critical" && !a.resolved).length

    return { active, acknowledged, resolved, critical }
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      case "high":
        return "text-orange-500 bg-orange-500/10 border-orange-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "low":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20"
      default:
        return "text-muted-foreground bg-muted/10 border-border"
    }
  }

  const getAircraftInfo = (aircraftId: string) => {
    return aircraft.find((a) => a.aircraft_id === aircraftId)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alert Management</h1>
          <p className="text-muted-foreground mt-1">Monitor and respond to predictive maintenance alerts</p>
        </div>
        <Button className="gap-2">
          <Bell className="h-4 w-4" />
          Configure Alerts
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stats.active}</p>
              <p className="text-xs text-red-500 mt-1">Requires attention</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Acknowledged</p>
              <p className="text-2xl font-bold text-orange-500 mt-1">{stats.acknowledged}</p>
              <p className="text-xs text-muted-foreground mt-1">Under investigation</p>
            </div>
            <Clock className="h-12 w-12 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="text-2xl font-bold text-green-500 mt-1">{stats.resolved}</p>
              <p className="text-xs text-muted-foreground mt-1">Completed today</p>
            </div>
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold text-red-500 mt-1">{stats.critical}</p>
              <p className="text-xs text-red-500 mt-1">Immediate action needed</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts by ID, component, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className={filterStatus !== "all" ? "bg-transparent" : ""}
          >
            All
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            onClick={() => setFilterStatus("active")}
            className={filterStatus !== "active" ? "bg-transparent" : ""}
          >
            Active
          </Button>
          <Button
            variant={filterStatus === "acknowledged" ? "default" : "outline"}
            onClick={() => setFilterStatus("acknowledged")}
            className={filterStatus !== "acknowledged" ? "bg-transparent" : ""}
          >
            Acknowledged
          </Button>
          <Button
            variant={filterStatus === "resolved" ? "default" : "outline"}
            onClick={() => setFilterStatus("resolved")}
            className={filterStatus !== "resolved" ? "bg-transparent" : ""}
          >
            Resolved
          </Button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Alerts ({filteredAlerts.length})</h2>
            <div className="space-y-3 max-h-[700px] overflow-y-auto">
              {filteredAlerts.map((alert) => {
                const aircraftInfo = getAircraftInfo(alert.aircraft_id)
                const timeAgo = Math.floor((Date.now() - new Date(alert.created_at).getTime()) / (1000 * 60 * 60))

                return (
                  <div
                    key={alert.alert_id}
                    onClick={() => setSelectedAlert(alert.alert_id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedAlert === alert.alert_id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    } ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{alert.alert_id}</p>
                          <Badge
                            variant={alert.severity === "critical" ? "destructive" : "default"}
                            className="text-xs"
                          >
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/80 mb-2">{alert.message}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Component: {alert.component_id}</span>
                          <span>Aircraft: {aircraftInfo?.registration || alert.aircraft_id}</span>
                          <span>{timeAgo}h ago</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        {alert.acknowledged ? (
                          <Badge variant="secondary" className="text-xs">
                            Acknowledged
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            New
                          </Badge>
                        )}
                        {alert.resolved && (
                          <Badge variant="default" className="text-xs bg-green-500">
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Alert Details */}
        <div>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Alert Details</h2>
            {selectedAlert ? (
              (() => {
                const alert = alerts.find((a) => a.alert_id === selectedAlert)
                if (!alert) return null

                const aircraftInfo = getAircraftInfo(alert.aircraft_id)

                return (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Alert ID</p>
                      <p className="font-medium text-foreground">{alert.alert_id}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Severity</p>
                      <Badge variant={alert.severity === "critical" ? "destructive" : "default"}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Message</p>
                      <p className="text-sm text-foreground">{alert.message}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Component</p>
                      <p className="font-medium text-foreground">{alert.component_id}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Aircraft</p>
                      <p className="font-medium text-foreground">{aircraftInfo?.registration || alert.aircraft_id}</p>
                      {aircraftInfo && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {aircraftInfo.model} • {aircraftInfo.flight_hours.toLocaleString()} flight hours
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Created</p>
                      <p className="text-sm text-foreground">{new Date(alert.created_at).toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <div className="flex flex-col gap-2">
                        {alert.acknowledged ? (
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Acknowledged
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            Not acknowledged
                          </div>
                        )}
                        {alert.resolved ? (
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Resolved
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <AlertTriangle className="h-4 w-4" />
                            Unresolved
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      {!alert.acknowledged && (
                        <Button className="w-full gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Acknowledge Alert
                        </Button>
                      )}
                      {alert.acknowledged && !alert.resolved && (
                        <Button className="w-full gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Mark as Resolved
                        </Button>
                      )}
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <BellOff className="h-4 w-4" />
                        Snooze Alert
                      </Button>
                    </div>
                  </div>
                )
              })()
            ) : (
              <div className="h-[500px] flex items-center justify-center text-muted-foreground text-center">
                Select an alert to view details
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
