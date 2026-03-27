import type { InventoryStatus } from "@/data/cars";
import { AlertTriangle, Sparkles, XCircle } from "lucide-react";

const config: Record<
  Exclude<InventoryStatus, "available">,
  { label: string; className: string; icon: typeof Sparkles }
> = {
  "just-arrived": {
    label: "Just Arrived",
    className: "bg-blue-500/90 text-white",
    icon: Sparkles,
  },
  "low-stock": {
    label: "Only 1 Left",
    className: "bg-destructive/90 text-white",
    icon: AlertTriangle,
  },
  "sold-out": {
    label: "Sold Out",
    className: "bg-muted text-muted-foreground",
    icon: XCircle,
  },
};

export function InventoryBadge({ status }: { status?: InventoryStatus }) {
  if (!status || status === "available") return null;
  const item = config[status];
  const Icon = item.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.className}`}>
      <Icon className="h-3 w-3" />
      {item.label}
    </span>
  );
}
