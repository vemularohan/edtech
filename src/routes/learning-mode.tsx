import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CodepathApp } from "@/components/codepath/CodepathApp";

function normalizeModuleCode(val: unknown): `3.${number}` | undefined {
  if (!val) return undefined;
  const str = String(val).replace(/^["']|["']$/g, "").trim();
  if (/^3\.\d+$/.test(str)) return str as `3.${number}`;
  const match = str.match(/^(?:module-?|mod-?)?(\d+)$/i);
  if (match && match[1]) {
    const num = parseInt(match[1], 10);
    if (num >= 1 && num <= 20) {
      return `3.${num + 1}` as `3.${number}`;
    }
    if (num === 0) return "3.1";
  }
  return undefined;
}

export const Route = createFileRoute("/learning-mode")({
  validateSearch: z.object({
    module: z.preprocess(normalizeModuleCode, z.string().optional()),
    concept: z.string().trim().min(1).optional(),
    step: z.coerce.number().int().min(0).optional(),
  }),
  component: LearningModeRoute,
});

function LearningModeRoute() {
  const { module, concept, step } = Route.useSearch();
  return (
    <CodepathApp
      view="learning"
      {...(module ? { moduleId: module as `3.${number}` } : {})}
      {...(concept ? { concept } : {})}
      {...(step !== undefined ? { stepIndex: step } : {})}
    />
  );
}
