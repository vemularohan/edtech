import { createFileRoute } from "@tanstack/react-router";
import { CodepathApp } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/learning-mode")({
  component: () => <CodepathApp view="learning" />,
});
