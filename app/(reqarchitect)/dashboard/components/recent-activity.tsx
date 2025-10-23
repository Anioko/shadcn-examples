import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FileText, Building, Code, Users, TrendingUp, Database } from "lucide-react";

const activityData = [
  {
    id: "1",
    type: "capability_update",
    user: { name: "Sarah Chen", initials: "SC", avatar: "/placeholder.svg" },
    action: "updated capability",
    target: "Customer Management",
    status: { text: "Optimized", color: "green" },
    timestamp: "2 hours ago",
    date: "TODAY"
  },
  {
    id: "2",
    type: "business_model",
    user: { name: "Marcus Rodriguez", initials: "MR" },
    action: "modified",
    target: "Value Propositions",
    comment: "Added AI-powered architecture optimization as a key value proposition to address enterprise scaling challenges.",
    timestamp: "4 hours ago",
    date: "TODAY"
  },
  {
    id: "3",
    type: "tech_stack",
    user: { name: "Elena Kowalski", initials: "EK", avatar: "/placeholder.svg" },
    action: "added application",
    target: "Kubernetes Dashboard",
    tags: [
      { text: "Infrastructure", color: "blue" },
      { text: "Monitoring", color: "green" }
    ],
    timestamp: "6 hours ago",
    date: "TODAY"
  },
  {
    id: "4",
    type: "cost_optimization",
    user: { name: "David Park", initials: "DP" },
    action: "identified savings in",
    target: "Cloud Infrastructure",
    status: { text: "$2,400/month", color: "green" },
    timestamp: "1 day ago",
    date: "YESTERDAY"
  },
  {
    id: "5",
    type: "architecture_review",
    user: { name: "Jessica Taylor", initials: "JT", avatar: "/placeholder.svg" },
    action: "completed review of",
    target: "Microservices Architecture",
    comment: "Recommended migration from monolith to microservices for improved scalability. Priority: High impact capabilities first.",
    timestamp: "1 day ago",
    date: "YESTERDAY"
  },
  {
    id: "6",
    type: "capability_new",
    user: { name: "Ahmed Hassan", initials: "AH" },
    action: "created new capability",
    target: "Real-time Analytics",
    status: { text: "In Planning", color: "blue" },
    timestamp: "2 days ago",
    date: "TUESDAY, 12 MARCH"
  }
];

const getStatusColor = (color: string) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-800";
    case "blue":
      return "bg-blue-100 text-blue-800";
    case "red":
      return "bg-red-100 text-red-800";
    case "orange":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTagColor = (color: string) => {
  switch (color) {
    case "red":
      return "bg-red-500";
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const getActivityIcon = (type: string) => {
  switch (type) {
    case "capability_update":
    case "capability_new":
      return <Building className="text-muted-foreground h-4 w-4" />;
    case "tech_stack":
      return <Code className="text-muted-foreground h-4 w-4" />;
    case "business_model":
      return <FileText className="text-muted-foreground h-4 w-4" />;
    case "cost_optimization":
      return <TrendingUp className="text-muted-foreground h-4 w-4" />;
    case "architecture_review":
      return <Database className="text-muted-foreground h-4 w-4" />;
    default:
      return <Users className="text-muted-foreground h-4 w-4" />;
  }
};

export default function RecentActivity() {
  let currentDate = "";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Activity</h3>
      
      <div className="space-y-4">
        {activityData.map((item) => {
          const showDate = currentDate !== item.date;
          if (showDate) {
            currentDate = item.date;
          }

          return (
            <div key={item.id}>
              {/* Date Header */}
              {showDate && (
                <div className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase">
                  {item.date}
                </div>
              )}

              {/* Activity Item */}
              <div className="relative flex gap-3">
                {/* Timeline Line */}
                <div className="bg-border absolute top-10 bottom-0 left-3 w-px" />

                {/* Avatar or Icon */}
                <div className="relative z-10">
                  {item.type.includes("capability") || item.type.includes("tech_stack") || 
                   item.type.includes("business_model") || item.type.includes("cost") || 
                   item.type.includes("architecture") ? (
                    <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full">
                      {getActivityIcon(item.type)}
                    </div>
                  ) : (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={item.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                        {item.user.initials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 text-sm">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-foreground font-medium">{item.user.name}</span>
                      <span className="text-muted-foreground">{item.action}</span>
                      {item.target && (
                        <span className="text-foreground font-medium">{item.target}</span>
                      )}
                      {item.status && (
                        <>
                          <span className="text-muted-foreground">status to</span>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(item.status.color)} text-xs`}>
                            <div
                              className={`mr-1 h-1.5 w-1.5 rounded-full ${
                                item.status.color === "green" 
                                  ? "bg-green-500" 
                                  : item.status.color === "blue" 
                                  ? "bg-blue-500" 
                                  : "bg-gray-500"
                              }`}
                            />
                            {item.status.text}
                          </Badge>
                        </>
                      )}
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {item.timestamp}
                    </span>
                  </div>

                  {/* Tags */}
                  {item.tags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div
                            className={`h-1.5 w-1.5 rounded-full ${getTagColor(tag.color)}`}
                          />
                          <span className="text-muted-foreground text-xs">
                            {tag.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment */}
                  {item.comment && (
                    <div className="bg-muted text-muted-foreground mt-2 rounded-lg p-2 text-xs leading-relaxed">
                      {item.comment}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}