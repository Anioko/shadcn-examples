import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Package, Download, Star, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function MarketplaceDashboard() {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* Header */}
        <div className="px-4 lg:px-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Framework Marketplace</h1>
            <p className="text-muted-foreground">
              Browse and activate additional frameworks and capabilities
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Installed Frameworks</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Frameworks</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50+</div>
              <p className="text-xs text-muted-foreground">
                In marketplace
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Additions</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Popular Frameworks</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Highly rated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trending Frameworks */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending This Month</CardTitle>
              <CardDescription>Most popular framework activations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Gen AI Capability Model', category: 'AI & Innovation', installs: 156, trend: '+24%' },
                  { name: 'NIST CSF 2.0', category: 'Cybersecurity', installs: 142, trend: '+18%' },
                  { name: 'ISO 27001', category: 'Information Security', installs: 128, trend: '+15%' },
                  { name: 'COBIT 2019', category: 'IT Governance', installs: 114, trend: '+12%' },
                ].map((framework, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{framework.name}</div>
                        <div className="text-sm text-muted-foreground">{framework.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                          <TrendingUp className="h-3 w-3" />
                          {framework.trend}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {framework.installs} installs
                        </div>
                      </div>
                      <Button size="sm">Install</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marketplace Categories */}
        <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Enterprise Architecture</CardTitle>
              <CardDescription>7 frameworks available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>TOGAF 10</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>FEAF</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>SABSA</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">+4 more</span>
                  <Button size="sm" variant="outline">Browse All</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk & Security</CardTitle>
              <CardDescription>11 frameworks available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>NIST CSF 2.0</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>ISO 27001</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>CIS Controls</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">+8 more</span>
                  <Button size="sm" variant="outline">Browse All</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Management</CardTitle>
              <CardDescription>13 frameworks available</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Business Model Canvas</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>COSO ERM</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Porter's 5 Forces</span>
                  <Button size="sm" variant="ghost">View</Button>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">+10 more</span>
                  <Button size="sm" variant="outline">Browse All</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon & Features */}
        <div className="px-4 lg:px-6">
          <Card>
            <CardHeader>
              <CardTitle>Framework Marketplace</CardTitle>
              <CardDescription>Full marketplace experience coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                The Framework Marketplace will allow you to browse, preview, and activate additional frameworks and capabilities for your organization.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Planned Features:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Browse frameworks by category, popularity, or industry</li>
                    <li>Preview framework content and structure before activation</li>
                    <li>One-click framework installation and configuration</li>
                    <li>Framework ratings, reviews, and recommendations</li>
                    <li>Custom framework creation and sharing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Coming Soon:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Framework bundles and starter packs</li>
                    <li>Integration with external framework repositories</li>
                    <li>Automated framework updates and version management</li>
                    <li>Community-contributed frameworks</li>
                    <li>Framework usage analytics and insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="px-4 lg:px-6 flex gap-2">
          <Link href="/settings/dashboard">
            <Button variant="outline">Back to Settings</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
