// Core data types for the aircraft maintenance platform

export interface SensorReading {
  sensor_id: string
  timestamp: Date
  temperature: number
  pressure: number
  vibration: number
  anomaly_flag: boolean
  component_id: string
  aircraft_id: string
}

export interface MaintenancePrediction {
  prediction_id: string
  component_id: string
  anomaly_score: number
  predicted_failure_time: Date
  precision: number
  severity: "low" | "medium" | "high" | "critical"
  status: "active" | "resolved" | "investigating"
}

export interface MaintenanceKPI {
  kpi_id: string
  avg_mttr: number // Mean Time To Repair in hours
  unplanned_downtime_hours: number
  sla_breach_count: number
  timestamp: Date
  period: "daily" | "weekly" | "monthly"
}

export interface Alert {
  alert_id: string
  prediction_id: string
  component_id: string
  aircraft_id: string
  severity: "low" | "medium" | "high" | "critical"
  message: string
  created_at: Date
  acknowledged: boolean
  resolved: boolean
}

export interface Runbook {
  runbook_id: string
  title: string
  component_type: string
  severity: "low" | "medium" | "high" | "critical"
  steps: RunbookStep[]
  estimated_time: number // in minutes
  success_rate: number
}

export interface RunbookStep {
  step_number: number
  description: string
  action: string
  expected_outcome: string
  completed?: boolean
}

export interface Aircraft {
  aircraft_id: string
  model: string
  registration: string
  status: "operational" | "maintenance" | "grounded"
  last_maintenance: Date
  flight_hours: number
}
