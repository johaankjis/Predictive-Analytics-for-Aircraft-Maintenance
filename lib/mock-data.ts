import type { SensorReading, MaintenancePrediction, MaintenanceKPI, Alert, Runbook, Aircraft } from "./types"

// Generate mock sensor readings
export function generateSensorReadings(count = 100): SensorReading[] {
  const readings: SensorReading[] = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - i * 60000) // 1 minute intervals
    const hasAnomaly = Math.random() > 0.92 // 8% anomaly rate

    readings.push({
      sensor_id: `SENSOR-${Math.floor(Math.random() * 50) + 1}`,
      timestamp,
      temperature: 65 + Math.random() * 30 + (hasAnomaly ? 20 : 0),
      pressure: 14.5 + Math.random() * 2 + (hasAnomaly ? 3 : 0),
      vibration: 0.5 + Math.random() * 1.5 + (hasAnomaly ? 2 : 0),
      anomaly_flag: hasAnomaly,
      component_id: `COMP-${Math.floor(Math.random() * 20) + 1}`,
      aircraft_id: `AC-${Math.floor(Math.random() * 10) + 1}`,
    })
  }

  return readings
}

// Mock maintenance predictions
export const mockPredictions: MaintenancePrediction[] = [
  {
    prediction_id: "PRED-001",
    component_id: "COMP-5",
    anomaly_score: 0.92,
    predicted_failure_time: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours
    precision: 0.89,
    severity: "critical",
    status: "active",
  },
  {
    prediction_id: "PRED-002",
    component_id: "COMP-12",
    anomaly_score: 0.78,
    predicted_failure_time: new Date(Date.now() + 120 * 60 * 60 * 1000), // 5 days
    precision: 0.87,
    severity: "high",
    status: "active",
  },
  {
    prediction_id: "PRED-003",
    component_id: "COMP-8",
    anomaly_score: 0.65,
    predicted_failure_time: new Date(Date.now() + 240 * 60 * 60 * 1000), // 10 days
    precision: 0.91,
    severity: "medium",
    status: "investigating",
  },
  {
    prediction_id: "PRED-004",
    component_id: "COMP-15",
    anomaly_score: 0.45,
    predicted_failure_time: new Date(Date.now() + 480 * 60 * 60 * 1000), // 20 days
    precision: 0.85,
    severity: "low",
    status: "active",
  },
]

// Mock KPIs
export const mockKPIs: MaintenanceKPI[] = [
  {
    kpi_id: "KPI-001",
    avg_mttr: 4.2,
    unplanned_downtime_hours: 12.5,
    sla_breach_count: 2,
    timestamp: new Date(),
    period: "daily",
  },
  {
    kpi_id: "KPI-002",
    avg_mttr: 5.8,
    unplanned_downtime_hours: 45.3,
    sla_breach_count: 8,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    period: "weekly",
  },
  {
    kpi_id: "KPI-003",
    avg_mttr: 6.1,
    unplanned_downtime_hours: 178.2,
    sla_breach_count: 28,
    timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    period: "monthly",
  },
]

// Mock alerts
export const mockAlerts: Alert[] = [
  {
    alert_id: "ALERT-001",
    prediction_id: "PRED-001",
    component_id: "COMP-5",
    aircraft_id: "AC-3",
    severity: "critical",
    message: "Hydraulic pump showing critical vibration levels. Predicted failure in 48 hours.",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
    acknowledged: false,
    resolved: false,
  },
  {
    alert_id: "ALERT-002",
    prediction_id: "PRED-002",
    component_id: "COMP-12",
    aircraft_id: "AC-7",
    severity: "high",
    message: "Engine temperature sensor anomaly detected. Maintenance recommended within 5 days.",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000),
    acknowledged: true,
    resolved: false,
  },
  {
    alert_id: "ALERT-003",
    prediction_id: "PRED-003",
    component_id: "COMP-8",
    aircraft_id: "AC-2",
    severity: "medium",
    message: "Landing gear pressure readings outside normal range.",
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000),
    acknowledged: true,
    resolved: false,
  },
]

// Mock runbooks
export const mockRunbooks: Runbook[] = [
  {
    runbook_id: "RB-001",
    title: "Hydraulic Pump Critical Failure Response",
    component_type: "Hydraulic System",
    severity: "critical",
    estimated_time: 180,
    success_rate: 0.94,
    steps: [
      {
        step_number: 1,
        description: "Isolate affected hydraulic system",
        action: "Close isolation valves HYD-A and HYD-B",
        expected_outcome: "System pressure drops to zero",
      },
      {
        step_number: 2,
        description: "Drain hydraulic fluid",
        action: "Open drain valve and collect fluid in approved container",
        expected_outcome: "Complete fluid drainage within 15 minutes",
      },
      {
        step_number: 3,
        description: "Remove faulty pump",
        action: "Disconnect electrical and hydraulic connections, remove mounting bolts",
        expected_outcome: "Pump removed without damage to surrounding components",
      },
      {
        step_number: 4,
        description: "Install replacement pump",
        action: "Mount new pump, reconnect all connections per maintenance manual",
        expected_outcome: "All connections secure and torqued to specification",
      },
      {
        step_number: 5,
        description: "Refill and test system",
        action: "Fill with approved hydraulic fluid, bleed air, run system test",
        expected_outcome: "System operates within normal parameters",
      },
    ],
  },
  {
    runbook_id: "RB-002",
    title: "Engine Temperature Sensor Replacement",
    component_type: "Engine Monitoring",
    severity: "high",
    estimated_time: 90,
    success_rate: 0.97,
    steps: [
      {
        step_number: 1,
        description: "Power down engine monitoring system",
        action: "Disconnect power at circuit breaker EMS-1",
        expected_outcome: "All monitoring displays go dark",
      },
      {
        step_number: 2,
        description: "Access sensor location",
        action: "Remove engine cowling panels 3A and 3B",
        expected_outcome: "Clear access to temperature sensor",
      },
      {
        step_number: 3,
        description: "Replace sensor",
        action: "Disconnect wiring harness, remove old sensor, install new sensor",
        expected_outcome: "New sensor properly seated and secured",
      },
      {
        step_number: 4,
        description: "Calibrate and test",
        action: "Run calibration routine, verify readings against reference",
        expected_outcome: "Sensor readings within ±2°C of reference",
      },
    ],
  },
]

// Mock aircraft data
export const mockAircraft: Aircraft[] = [
  {
    aircraft_id: "AC-1",
    model: "Boeing 737-800",
    registration: "N12345",
    status: "operational",
    last_maintenance: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    flight_hours: 42350,
  },
  {
    aircraft_id: "AC-2",
    model: "Airbus A320",
    registration: "N67890",
    status: "operational",
    last_maintenance: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    flight_hours: 38920,
  },
  {
    aircraft_id: "AC-3",
    model: "Boeing 737-800",
    registration: "N24680",
    status: "maintenance",
    last_maintenance: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    flight_hours: 45120,
  },
  {
    aircraft_id: "AC-7",
    model: "Airbus A321",
    registration: "N13579",
    status: "operational",
    last_maintenance: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
    flight_hours: 51200,
  },
]

// Historical data for charts
export function generateHistoricalKPIs(days = 30): MaintenanceKPI[] {
  const kpis: MaintenanceKPI[] = []
  const now = new Date()

  for (let i = 0; i < days; i++) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    kpis.push({
      kpi_id: `KPI-HIST-${i}`,
      avg_mttr: 4 + Math.random() * 3,
      unplanned_downtime_hours: 8 + Math.random() * 12,
      sla_breach_count: Math.floor(Math.random() * 5),
      timestamp,
      period: "daily",
    })
  }

  return kpis.reverse()
}

// Export generated data
export const sensorReadings = generateSensorReadings(5000000) // 5M records as per requirements
export const maintenancePredictions = mockPredictions
export const maintenanceKPIs = mockKPIs
export const alerts = mockAlerts
export const runbooks = mockRunbooks
export const aircraft = mockAircraft
export const historicalKPIs = generateHistoricalKPIs(30)
