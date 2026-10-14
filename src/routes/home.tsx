import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — Clearly" },
      { name: "description", content: "Upload or scan lecture notes and find your recent notes." },
      { property: "og:title", content: "Home — Clearly" },
      { property: "og:description", content: "Upload or scan lecture notes and find your recent notes." },
    ],
  }),
  component: Home,
});
