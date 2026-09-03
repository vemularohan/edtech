import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});
