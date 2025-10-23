"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Calendar, ArrowUpDown, PieChart } from "lucide-react"

interface FinancialMetrics {
  optionId: string
  optionName: string
  totalCostOfOwnership: number
  totalCapEx: number
  totalOpEx: number
  totalBenefits: number
  netPresentValue: number
  returnOnInvestment: number
  paybackPeriod: number
  breakEvenDate: string
  cashFlowSummary: {
    year: number
    costs: number
    benefits: number
    netCashFlow: number
    cumulativeCashFlow: number
  }[]
  confidenceLevel: 'high' | 'medium' | 'low'
}

export function FinancialModeling() {
  const financialData: FinancialMetrics[] = [
    {
      optionId: "containerization",
      optionName: "Containerization + Kubernetes",
      totalCostOfOwnership: 485000,
      totalCapEx: 150000,
      totalOpEx: 335000,
      totalBenefits: 720000,
      netPresentValue: 185000,
      returnOnInvestment: 48.5,
      paybackPeriod: 24,
      breakEvenDate: "Q4 2027",
      cashFlowSummary: [
        { year: 1, costs: 180000, benefits: 50000, netCashFlow: -130000, cumulativeCashFlow: -130000 },
        { year: 2, costs: 120000, benefits: 150000, netCashFlow: 30000, cumulativeCashFlow: -100000 },
        { year: 3, costs: 95000, benefits: 180000, netCashFlow: 85000, cumulativeCashFlow: -15000 },
        { year: 4, costs: 90000, benefits: 170000, netCashFlow: 80000, cumulativeCashFlow: 65000 },
        { year: 5, costs: 90000, benefits: 170000, netCashFlow: 80000, cumulativeCashFlow: 145000 }
      ],
      confidenceLevel: 'high'
    },
    {
      optionId: "lift-and-shift",
      optionName: "Lift and Shift (IaaS)",
      totalCostOfOwnership: 420000,
      totalCapEx: 80000,
      totalOpEx: 340000,
      totalBenefits: 580000,
      netPresentValue: 125000,
      returnOnInvestment: 38.1,
      paybackPeriod: 18,
      breakEvenDate: "Q2 2027",
      cashFlowSummary: [
        { year: 1, costs: 120000, benefits: 80000, netCashFlow: -40000, cumulativeCashFlow: -40000 },
        { year: 2, costs: 95000, benefits: 120000, netCashFlow: 25000, cumulativeCashFlow: -15000 },
        { year: 3, costs: 85000, benefits: 130000, netCashFlow: 45000, cumulativeCashFlow: 30000 },
        { year: 4, costs: 80000, benefits: 125000, netCashFlow: 45000, cumulativeCashFlow: 75000 },
        { year: 5, costs: 80000, benefits: 125000, netCashFlow: 45000, cumulativeCashFlow: 120000 }
      ],
      confidenceLevel: 'high'
    },
    {
      optionId: "hybrid-approach",
      optionName: "Hybrid Cloud Approach",
      totalCostOfOwnership: 520000,
      totalCapEx: 120000,
      totalOpEx: 400000,
      totalBenefits: 650000,
      netPresentValue: 95000,
      returnOnInvestment: 25.0,
      paybackPeriod: 30,
      breakEvenDate: "Q2 2028",
      cashFlowSummary: [
        { year: 1, costs: 150000, benefits: 40000, netCashFlow: -110000, cumulativeCashFlow: -110000 },
        { year: 2, costs: 110000, benefits: 100000, netCashFlow: -10000, cumulativeCashFlow: -120000 },
        { year: 3, costs: 100000, benefits: 140000, netCashFlow: 40000, cumulativeCashFlow: -80000 },
        { year: 4, costs: 95000, benefits: 150000, netCashFlow: 55000, cumulativeCashFlow: -25000 },
        { year: 5, costs: 95000, benefits: 220000, netCashFlow: 125000, cumulativeCashFlow: 100000 }
      ],
      confidenceLevel: 'medium'
    },
    {
      optionId: "serverless",
      optionName: "Serverless Architecture",
      totalCostOfOwnership: 380000,
      totalCapEx: 200000,
      totalOpEx: 180000,
      totalBenefits: 520000,
      netPresentValue: 75000,
      returnOnInvestment: 36.8,
      paybackPeriod: 36,
      breakEvenDate: "Q4 2028",
      cashFlowSummary: [
        { year: 1, costs: 220000, benefits: 20000, netCashFlow: -200000, cumulativeCashFlow: -200000 },
        { year: 2, costs: 50000, benefits: 80000, netCashFlow: 30000, cumulativeCashFlow: -170000 },
        { year: 3, costs: 40000, benefits: 120000, netCashFlow: 80000, cumulativeCashFlow: -90000 },
        { year: 4, costs: 35000, benefits: 150000, netCashFlow: 115000, cumulativeCashFlow: 25000 },
        { year: 5, costs: 35000, benefits: 150000, netCashFlow: 115000, cumulativeCashFlow: 140000 }
      ],
      confidenceLevel: 'low'
    }
  ]

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const bestROI = Math.max(...financialData.map(d => d.returnOnInvestment))
  const bestNPV = Math.max(...financialData.map(d => d.netPresentValue))
  const shortestPayback = Math.min(...financialData.map(d => d.paybackPeriod))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <span>Financial Modeling & TCO Analysis</span>
        </CardTitle>
        <CardDescription>
          Comprehensive financial analysis including TCO, ROI, NPV, and cash flow projections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(bestNPV)}
            </div>
            <div className="text-sm text-muted-foreground">Best NPV</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-blue-600">
              {bestROI.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">Best ROI</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-purple-600">
              {shortestPayback}
            </div>
            <div className="text-sm text-muted-foreground">Shortest Payback (months)</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-orange-600">5</div>
            <div className="text-sm text-muted-foreground">Year Analysis Period</div>
          </div>
        </div>

        {/* Options Financial Comparison */}
        <div className="space-y-4">
          {financialData
            .sort((a, b) => b.netPresentValue - a.netPresentValue)
            .map((option, index) => (
              <div key={option.optionId} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                    </div>
                    <div>
                      <h3 className="font-semibold">{option.optionName}</h3>
                      <Badge className={getConfidenceColor(option.confidenceLevel)}>
                        {option.confidenceLevel} confidence
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(option.netPresentValue)}
                    </div>
                    <div className="text-sm text-muted-foreground">NPV</div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid gap-4 md:grid-cols-5">
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-red-600">
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="font-medium">{formatCurrency(option.totalCostOfOwnership)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Total TCO</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">{option.returnOnInvestment.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">ROI</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center space-x-1 text-blue-600">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">{option.paybackPeriod}mo</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Payback</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="font-medium text-purple-600">
                      {formatCurrency(option.totalCapEx)}
                    </div>
                    <div className="text-xs text-muted-foreground">CapEx</div>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="font-medium text-orange-600">
                      {formatCurrency(option.totalOpEx)}
                    </div>
                    <div className="text-xs text-muted-foreground">OpEx (5yr)</div>
                  </div>
                </div>

                {/* Cash Flow Timeline */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">5-Year Cash Flow</div>
                  <div className="grid grid-cols-5 gap-2">
                    {option.cashFlowSummary.map((year) => (
                      <div key={year.year} className="text-center space-y-1">
                        <div className="text-xs font-medium">Year {year.year}</div>
                        <div className="text-xs space-y-1">
                          <div className="text-red-600">{formatCurrency(year.costs)}</div>
                          <div className="text-green-600">{formatCurrency(year.benefits)}</div>
                          <div className={`font-medium ${
                            year.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {formatCurrency(year.netCashFlow)}
                          </div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              year.cumulativeCashFlow >= 0 ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            style={{
                              width: `${Math.min(100, Math.abs(year.cumulativeCashFlow) / 200000 * 100)}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground grid grid-cols-3">
                    <span>🔴 Costs</span>
                    <span>🟢 Benefits</span>
                    <span>💰 Net Cash Flow</span>
                  </div>
                </div>

                {/* Break Even Indicator */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Break Even Point</span>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {option.breakEvenDate}
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Sensitivity Analysis Summary */}
        <div className="border rounded-lg p-4 bg-yellow-50 border-yellow-200">
          <div className="space-y-2">
            <div className="font-medium text-yellow-900 flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Financial Sensitivity Insights</span>
            </div>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Containerization shows highest NPV but requires larger upfront investment</li>
              <li>• Lift & Shift has fastest payback period with lower initial risk</li>
              <li>• Serverless approach has highest uncertainty due to major architectural changes</li>
              <li>• All options show positive ROI over 5-year period</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <Button className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Update Financial Models</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <PieChart className="h-4 w-4" />
            <span>Run Sensitivity Analysis</span>
          </Button>
          <Button variant="outline">
            Export Financial Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}