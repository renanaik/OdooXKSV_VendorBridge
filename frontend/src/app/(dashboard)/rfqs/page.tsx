"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function RfqsRedirect() {
  useEffect(() => {
    redirect("/rfqs/create");
  }, []);
  
  return null;
}
