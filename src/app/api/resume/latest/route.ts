import { redirect } from "next/navigation";
import { getCurrentResume } from "@/db/resume";

export async function GET() {
  const current = await getCurrentResume();

  if (current?.fileUrl) {
    redirect(current.fileUrl);
  }

  // Graceful fallback if no resume exists in the database
  redirect("/resume?error=not_found");
}
