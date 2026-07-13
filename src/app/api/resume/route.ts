import { NextResponse } from "next/server";
import { getResumes } from "@/db/resume";

export async function GET() {
  const resumes = await getResumes();
  return NextResponse.json(resumes);
}
