import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  action: string;
  target: string;
  time: string;
  status: "completed" | "pending" | "failed";
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getStatusColor = (status: ActivityItem["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: ActivityItem["status"]) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "pending":
        return "Pendente";
      case "failed":
        return "Falhou";
      default:
        return "Desconhecido";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>
                  {activity.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action} {activity.target}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <Badge
                  variant="secondary"
                  className={`text-xs ${getStatusColor(activity.status)}`}
                >
                  {getStatusText(activity.status)}
                </Badge>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
