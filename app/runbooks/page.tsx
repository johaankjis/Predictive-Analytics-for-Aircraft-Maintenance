"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { runbooks } from "@/lib/mock-data"
import { Search, Play, Clock, Target, CheckCircle2, Circle } from "lucide-react"
import { useState, useMemo } from "react"

export default function RunbooksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRunbook, setSelectedRunbook] = useState<string | null>(null)
  const [executingStep, setExecutingStep] = useState<number | null>(null)

  // Filter runbooks
  const filteredRunbooks = useMemo(() => {
    if (!searchTerm) return runbooks

    return runbooks.filter(
      (rb) =>
        rb.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rb.component_type.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleExecuteStep = (stepNumber: number) => {
    setExecutingStep(stepNumber)
    // Simulate step execution
    setTimeout(() => {
      setExecutingStep(null)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Automated Runbooks</h1>
          <p className="text-muted-foreground mt-1">Step-by-step maintenance procedures and automation</p>
        </div>
        <Button className="gap-2">
          <Play className="h-4 w-4" />
          Create Runbook
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Runbooks</p>
              <p className="text-2xl font-bold text-foreground mt-1">{runbooks.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Play className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Success Rate</p>
              <p className="text-2xl font-bold text-green-500 mt-1">
                {((runbooks.reduce((sum, rb) => sum + rb.success_rate, 0) / runbooks.length) * 100).toFixed(1)}%
              </p>
            </div>
            <Target className="h-12 w-12 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Duration</p>
              <p className="text-2xl font-bold text-foreground mt-1">
                {Math.round(runbooks.reduce((sum, rb) => sum + rb.estimated_time, 0) / runbooks.length)} min
              </p>
            </div>
            <Clock className="h-12 w-12 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Executions Today</p>
              <p className="text-2xl font-bold text-foreground mt-1">12</p>
              <p className="text-xs text-green-500 mt-1">+3 vs yesterday</p>
            </div>
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search runbooks by title or component type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Runbooks List */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Available Runbooks</h2>
            <div className="space-y-3 max-h-[700px] overflow-y-auto">
              {filteredRunbooks.map((runbook) => (
                <div
                  key={runbook.runbook_id}
                  onClick={() => setSelectedRunbook(runbook.runbook_id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedRunbook === runbook.runbook_id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm mb-1">{runbook.title}</p>
                      <p className="text-xs text-muted-foreground">{runbook.component_type}</p>
                    </div>
                    <Badge variant={getSeverityColor(runbook.severity)} className="text-xs">
                      {runbook.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {runbook.estimated_time} min
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      {(runbook.success_rate * 100).toFixed(0)}% success
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">{runbook.steps.length} steps</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Runbook Details */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Runbook Details</h2>
            {selectedRunbook ? (
              (() => {
                const runbook = runbooks.find((rb) => rb.runbook_id === selectedRunbook)
                if (!runbook) return null

                return (
                  <div className="space-y-6">
                    {/* Runbook Header */}
                    <div className="pb-4 border-b border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{runbook.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{runbook.component_type}</p>
                        </div>
                        <Badge variant={getSeverityColor(runbook.severity)}>{runbook.severity.toUpperCase()}</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Estimated Time</p>
                          <p className="text-sm font-medium text-foreground mt-1">{runbook.estimated_time} minutes</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                          <p className="text-sm font-medium text-green-500 mt-1">
                            {(runbook.success_rate * 100).toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total Steps</p>
                          <p className="text-sm font-medium text-foreground mt-1">{runbook.steps.length}</p>
                        </div>
                      </div>

                      <Button className="w-full mt-4 gap-2">
                        <Play className="h-4 w-4" />
                        Execute Runbook
                      </Button>
                    </div>

                    {/* Steps */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Procedure Steps</h4>
                      <div className="space-y-4">
                        {runbook.steps.map((step, index) => {
                          const isExecuting = executingStep === step.step_number
                          const isCompleted = executingStep !== null && step.step_number < executingStep

                          return (
                            <div
                              key={step.step_number}
                              className={`p-4 rounded-lg border transition-all ${
                                isExecuting
                                  ? "border-primary bg-primary/5"
                                  : isCompleted
                                    ? "border-green-500/50 bg-green-500/5"
                                    : "border-border"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                  ) : isExecuting ? (
                                    <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <p className="font-medium text-foreground">
                                        Step {step.step_number}: {step.description}
                                      </p>
                                      <p className="text-sm text-muted-foreground mt-1">
                                        <span className="font-medium">Action:</span> {step.action}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-3 p-3 rounded bg-muted/50">
                                    <p className="text-xs text-muted-foreground mb-1">Expected Outcome:</p>
                                    <p className="text-sm text-foreground">{step.expected_outcome}</p>
                                  </div>
                                  {!isCompleted && !isExecuting && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="mt-3 gap-2 bg-transparent"
                                      onClick={() => handleExecuteStep(step.step_number)}
                                    >
                                      <Play className="h-3 w-3" />
                                      Execute Step
                                    </Button>
                                  )}
                                  {isExecuting && (
                                    <div className="mt-3 text-sm text-primary font-medium">Executing...</div>
                                  )}
                                  {isCompleted && (
                                    <div className="mt-3 text-sm text-green-500 font-medium flex items-center gap-1">
                                      <CheckCircle2 className="h-4 w-4" />
                                      Completed
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })()
            ) : (
              <div className="h-[600px] flex items-center justify-center text-muted-foreground text-center">
                Select a runbook to view details and execute procedures
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
