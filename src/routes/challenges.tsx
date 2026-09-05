import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CodepathApp } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/challenges")({
  validateSearch: z.object({
    module: z.preprocess(
      (value) => (value === undefined ? undefined : String(value).replace(/^"|"$/g, "")),
      z
        .string()
        .regex(/^3\.\d+$/)
        .optional(),
    ),
    concept: z.string().trim().min(1).optional(),
    step: z.coerce.number().int().min(0).optional(),
  }),
  component: ChallengesRoute,
});

function ChallengesRoute() {
  const { module, concept, step } = Route.useSearch();
  return (
    <CodepathApp
      view="challenge"
      {...(module ? { moduleId: module as `3.${number}` } : {})}
      {...(concept ? { concept } : {})}
      {...(step !== undefined ? { stepIndex: step } : {})}
    />
  );
}
