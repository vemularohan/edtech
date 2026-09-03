import { createFileRoute } from "@tanstack/react-router";
import { CodepathApp } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/career-roadmap")({
  component: () => <CodepathApp view="career" />,
});
