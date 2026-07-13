"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Notification } from "@/components/ui/notification";

export function ResumeNotifier() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "not_found") {
      setMessage("No resume currently available.");
      // Clear the error parameter from the URL immediately without scrolling or reloading
      router.replace("/resume", { scroll: false });
    }
  }, [searchParams, router]);

  if (!message) return null;

  return <Notification message={message} onDismiss={() => setMessage(null)} />;
}
