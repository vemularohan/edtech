import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/")({
  component: Landing,
});
