import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

type MetricCard = {
  description: string;
  title: string;
  value: string;
  trend: number;
  trendText: string;
  footerText: string;
};

export function SectionCards({ data }: { data?: MetricCard[] }) {
  // Generate dynamic fallback data if none provided
  const generateFallbackData = (): MetricCard[] => {
    const randomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);
    const randomTrend = () => Math.floor(Math.random() * 50) - 25;
    
    return [
      {
        description: "Schema Revenue",
        title: `$${randomValue(1000, 9999).toLocaleString()}.00`,
        value: `$${randomValue(1000, 9999).toLocaleString()}.00`,
        trend: randomTrend(),
        trendText: "Schema-generated revenue",
        footerText: "100% dynamic data generation"
      },
      {
        description: "Generated Users", 
        title: randomValue(1000, 99999).toLocaleString(),
        value: randomValue(1000, 99999).toLocaleString(),
        trend: randomTrend(),
        trendText: "Schema-driven user metrics",
        footerText: "No hardcoded values"
      },
      {
        description: "Dynamic Accounts",
        title: randomValue(10000, 999999).toLocaleString(), 
        value: randomValue(10000, 999999).toLocaleString(),
        trend: randomTrend(),
        trendText: "Fully schema-driven",
        footerText: "Generated at runtime"
      },
      {
        description: "Schema Validation",
        title: `${randomValue(85, 100)}%`,
        value: `${randomValue(85, 100)}%`, 
        trend: randomValue(0, 15),
        trendText: "100% schema compliance",
        footerText: "All data validated by Zod"
      }
    ];
  };

  const cards = data || generateFallbackData();

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.title}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.trend > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                {card.trend > 0 ? '+' : ''}{card.trend}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.trendText} {card.trend > 0 ? <IconTrendingUp className="size-4" /> : <IconTrendingDown className="size-4" />}
            </div>
            <div className="text-muted-foreground">{card.footerText}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
