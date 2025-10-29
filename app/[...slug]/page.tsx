import { AppSidebar } from "@/app/(reqarchitect)/dashboard/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { notFound } from "next/navigation";
import { SectionCards } from "@/app/(reqarchitect)/generators/dashboard-generator/components/section-cards";
import { ChartAreaInteractive } from "@/app/(reqarchitect)/generators/dashboard-generator/components/chart-area-interactive";
import { DataTable } from "@/app/(reqarchitect)/generators/dashboard-generator/components/data-table";

// Simple data generator for framework dashboards
function generateFrameworkData(frameworkName: string) {
  const randomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);
  const randomTrend = () => Math.floor(Math.random() * 50) - 25;

  // Generate metric cards
  const metricCards = [
    {
      description: "Implementation Progress",
      title: `${randomValue(45, 95)}%`,
      value: `${randomValue(45, 95)}%`,
      trend: randomTrend(),
      trendText: "vs last quarter",
      footerText: `${frameworkName} completion status`
    },
    {
      description: "Active Controls",
      title: randomValue(20, 150).toString(),
      value: randomValue(20, 150).toString(),
      trend: randomTrend(),
      trendText: "controls implemented",
      footerText: "Total framework controls"
    },
    {
      description: "Compliance Score",
      title: `${randomValue(75, 100)}%`,
      value: `${randomValue(75, 100)}%`,
      trend: randomValue(0, 15),
      trendText: "compliance rating",
      footerText: "Based on latest assessment"
    },
    {
      description: "Open Items",
      title: randomValue(5, 35).toString(),
      value: randomValue(5, 35).toString(),
      trend: -randomValue(0, 10),
      trendText: "items pending",
      footerText: "Action items to complete"
    }
  ];

  // Generate chart data (30 days)
  const chartData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      desktop: randomValue(50, 500),
      mobile: randomValue(30, 400)
    };
  });

  // Generate table data
  const statuses = ["Done", "In Process", "Not Started", "Blocked"];
  const types = ["Control", "Requirement", "Process", "Documentation", "Assessment"];
  const reviewers = ["Sarah Chen", "Alex Morgan", "David Kim", "Maria Garcia", "James Wilson"];

  const tableData = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    header: `${frameworkName} ${types[i % types.length]} ${i + 1}`,
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    target: randomValue(5, 35).toString(),
    limit: randomValue(10, 50).toString(),
    reviewer: reviewers[i % reviewers.length]
  }));

  return { metricCards, chartData, tableData };
}

export default async function DynamicDashboardPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;

  // Only handle routes ending with 'dashboard'
  if (!slug || slug[slug.length - 1] !== 'dashboard') {
    notFound();
  }

  // Extract the path without 'dashboard' at the end
  const pathSegments = slug.slice(0, -1);
  const title = pathSegments.length > 0
    ? pathSegments[pathSegments.length - 1].split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    : 'Dashboard';

  const breadcrumb = pathSegments.map(segment =>
    segment.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  ).join(' / ');

  // Generate framework-specific data
  const dashboardData = generateFrameworkData(title);

  return (
    <SidebarProvider
      className="min-h-screen"
      style={{
        "--sidebar-width": "calc(var(--spacing) * 64)",
        "--header-height": "calc(var(--spacing) * 12 + 1px)"
      } as React.CSSProperties}
    >
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Header */}
              <div className="px-4 lg:px-6 mb-4">
                {breadcrumb && (
                  <p className="text-sm text-muted-foreground mb-2">{breadcrumb}</p>
                )}
                <h1 className="text-3xl font-bold text-gray-900">{title} Dashboard</h1>
                <p className="mt-2 text-gray-600">
                  Framework dashboard showing key metrics, trends, and implementation status
                </p>
              </div>

              {/* Metric Cards Section */}
              <SectionCards data={dashboardData.metricCards} />

              {/* Interactive Chart Section */}
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive data={dashboardData.chartData} />
              </div>

              {/* Data Table Section */}
              <DataTable data={dashboardData.tableData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
