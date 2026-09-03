import { createFileRoute } from "@tanstack/react-router";
import { PlacementAdmin } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/admin")({
  component: PlacementAdmin,
});
