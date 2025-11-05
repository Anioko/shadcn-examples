import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PCFManagementProcessesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Management & Support Processes</h1>
        <p className="text-muted-foreground mt-2">
          Processes that manage and support the operating processes (PCF 7.0-13.0)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>7.0 Develop and Manage Human Capital</CardTitle>
            <CardDescription>Recruit, develop, and manage workforce</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Recruit, develop, and manage workforce capabilities and organizational culture.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8.0 Manage Information Technology</CardTitle>
            <CardDescription>Manage IT strategy and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage IT strategy, infrastructure, applications, and operations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9.0 Manage Financial Resources</CardTitle>
            <CardDescription>Financial planning and control</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Perform planning, reporting, control, and management of financial resources.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10.0 Acquire, Construct, and Manage Assets</CardTitle>
            <CardDescription>Manage physical assets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Design, procure, construct, and manage physical assets and facilities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11.0 Manage Enterprise Risk, Compliance, and Governance</CardTitle>
            <CardDescription>Risk, compliance, and governance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage business and operational risks; ensure compliance; manage governance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12.0 Manage External Relationships</CardTitle>
            <CardDescription>Stakeholder relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Build and manage relationships with stakeholders, communities, and partnerships.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>13.0 Develop and Manage Business Capabilities</CardTitle>
            <CardDescription>Improvement and change management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Manage improvement and change; ensure quality; manage knowledge and collaboration.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
