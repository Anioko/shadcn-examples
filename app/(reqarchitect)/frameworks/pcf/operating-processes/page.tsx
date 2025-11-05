import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PCFOperatingProcessesPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Operating Processes</h1>
        <p className="text-muted-foreground mt-2">
          Core business processes that directly create value for customers (PCF 1.0-6.0)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>1.0 Develop Vision and Strategy</CardTitle>
            <CardDescription>Define business concept and long-term vision</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Define the business concept and long-term vision, strategy, and strategic goals for the organization.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2.0 Develop and Manage Products and Services</CardTitle>
            <CardDescription>Design, build, and manage offerings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Design, build, and manage products and services throughout their lifecycle.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3.0 Market and Sell Products and Services</CardTitle>
            <CardDescription>Understand markets and sell products</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Understand markets, customers, and capabilities; develop marketing and sales strategies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4.0 Deliver Physical Products</CardTitle>
            <CardDescription>Plan, produce, and deliver goods</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Plan, produce, and deliver physical products for goods-based companies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5.0 Deliver Services</CardTitle>
            <CardDescription>Plan and deliver services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Plan, deliver, and manage services for service-based companies.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6.0 Manage Customer Service</CardTitle>
            <CardDescription>Develop customer care strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Develop and manage customer care and service strategies and operations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
