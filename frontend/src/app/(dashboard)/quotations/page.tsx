"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function QuotationsRedirect() {
  useEffect(() => {
    redirect("/quotations/compare");
  }, []);
  
  return null;
}
