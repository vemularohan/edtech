import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CodepathApp } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/learning-mode")({
  validateSearch: z.object({
    module: z.preprocess(
      (value) => (value === undefined ? undefined : String(value).replace(/^"|"$/g, "")),
      z
        .string()
        .regex(/^3\.\d+$/)
        .optional(),
    ),
  }),
  component: LearningModeRoute,
});

function LearningModeRoute() {
  const { module } = Route.useSearch();
  return <CodepathApp view="learning" moduleId={module as `3.${number}` | undefined} />;
}
