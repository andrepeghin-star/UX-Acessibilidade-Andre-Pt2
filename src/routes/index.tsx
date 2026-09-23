import { createFileRoute } from "@tanstack/react-router";
import { GuidePage } from "@/components/guide-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <GuidePage />;
}
