import { createFileRoute } from "@tanstack/react-router";
import Cleanup from "@/pages/Cleanup";

export const Route = createFileRoute("/cleanup")({
  head: () => ({
    meta: [
      { title: "Cleaning your notes — Clearly" },
      { name: "description", content: "Compare your handwritten page with the clean, AI-formatted version." },
      { property: "og:title", content: "Cleaning your notes — Clearly" },
      { property: "og:description", content: "Compare your handwritten page with the clean version." },
    ],
  }),
  component: Cleanup,
});
