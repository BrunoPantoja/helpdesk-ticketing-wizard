
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TicketPrioridade } from "@/types";

interface TicketPriorityBadgeProps {
  priority: TicketPrioridade;
}

const TicketPriorityBadge: React.FC<TicketPriorityBadgeProps> = ({ priority }) => {
  const getPriorityConfig = () => {
    switch (priority) {
      case "baixa":
        return { label: "Baixa", className: "bg-green-100 text-green-800 border-green-300" };
      case "media":
        return { label: "Média", className: "bg-blue-100 text-blue-800 border-blue-300" };
      case "alta":
        return { label: "Alta", className: "bg-yellow-100 text-yellow-800 border-yellow-300" };
      case "urgente":
        return { label: "Urgente", className: "bg-red-100 text-red-800 border-red-300" };
      default:
        return { label: priority, className: "" };
    }
  };

  const { label, className } = getPriorityConfig();

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  );
};

export default TicketPriorityBadge;
