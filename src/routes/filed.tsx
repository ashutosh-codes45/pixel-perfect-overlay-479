import { createFileRoute } from "@tanstack/react-router";
import Filed from "@/pages/Filed";

export const Route = createFileRoute("/filed")({
  head: () => ({
    meta: [
      { title: "Note filed — Clearly" },
      { name: "description", content: "Your note was named and filed automatically." },
      { property: "og:title", content: "Note filed — Clearly" },
      { property: "og:description", content: "Your note was named and filed automatically." },
    ],
  }),
  component: Filed,
});
