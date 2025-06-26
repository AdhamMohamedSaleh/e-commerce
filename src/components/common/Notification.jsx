import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const iconMap = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const Notification = () => {
  const { notifications } = useApp();

  if (!notifications.length) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] space-y-3 w-full max-w-xs">
      {notifications.map((n) => (
        <Alert key={n.id} className="shadow-lg">
          {iconMap[n.type] || iconMap.info}
          <div>
            <div className="font-semibold mb-1">{n.title}</div>
            <AlertDescription>{n.message}</AlertDescription>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default Notification;
