import { redirect } from "next/navigation";

// La racine redirige vers la locale par défaut
export default function RootPage() {
  redirect("/fr");
}
