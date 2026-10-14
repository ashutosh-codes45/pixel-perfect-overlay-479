import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/pages/Landing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Clearly — From messy notes to exam-ready" },
      { name: "description", content: "Turn messy handwritten lecture notes into clean, organised, exam-ready notes in one tap." },
      { property: "og:title", content: "Clearly — From messy notes to exam-ready" },
      { property: "og:description", content: "Turn messy handwritten lecture notes into clean, exam-ready notes in one tap." },
    ],
  }),
  component: Landing,
});
