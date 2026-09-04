import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CodepathApp } from "@/components/codepath/CodepathApp";

export const Route = createFileRoute("/challenge")({
  validateSearch: z.object({
    module: z.preprocess(
      (value) => (value === undefined ? undefined : String(value).replace(/^"|"$/g, "")),
      z
        .string()
        .regex(/^3\.\d+$/)
        .optional(),
    ),
    challenge: z.string().trim().min(1).optional(),
  }),
  component: ChallengeRoute,
});

function ChallengeRoute() {
  const { module, challenge } = Route.useSearch();
  return (
    <CodepathApp
      view="challenge"
      moduleId={module as `3.${number}` | undefined}
      challengeId={challenge}
    />
  );
}
