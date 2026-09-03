import { createFileRoute } from "@tanstack/react-router";
import { Auth } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/auth")({
  component: Auth,
});
