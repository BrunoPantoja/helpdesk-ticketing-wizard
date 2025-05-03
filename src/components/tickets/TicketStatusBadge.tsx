
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TicketStatus } from "@/types";

interface TicketStatusBadgeProps {
  status: TicketStatus;
}

const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case "aberto":
        return { label: "Aberto", variant: "default", className: "bg-support-blue" };
      case "em_andamento":
        return { label: "Em Andamento", variant: "outline", className: "bg-support-yellow text-black" };
      case "concluido":
        return { label: "Concluído", variant: "outline", className: "bg-support-green text-white" };
      case "cancelado":
        return { label: "Cancelado", variant: "outline", className: "bg-support-red text-white" };
      default:
        return { label: status, variant: "outline", className: "" };
    }
  };

  const { label, className } = getStatusConfig();

  return (
    <Badge className={className}>
      {label}
    </Badge>
  );
};

export default TicketStatusBadge;
