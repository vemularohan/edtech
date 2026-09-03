import { createFileRoute } from "@tanstack/react-router";
import { CodepathApp } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/coding-lab")({
  component: () => <CodepathApp view="lab" />,
});
