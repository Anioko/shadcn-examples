import { Metadata } from "next"
import { OptionsAnalysisClient } from "./options-analysis-client"

export const metadata: Metadata = {
  title: "Options Analysis Interface",
  description: "Multi-criteria decision analysis tool with weighted scoring, financial modeling, risk assessment, and AI-powered recommendations for transformation decisions.",
}

export default function OptionsAnalysisPage() {
  return <OptionsAnalysisClient />
}