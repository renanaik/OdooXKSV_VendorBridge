"use client";

import { useState, useEffect } from "react";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = ({ title, description, variant }: ToastProps) => {
    // Basic mock implementation that could use console or standard alert
    // but typically just updates state in a real app
    console.log(`[Toast] ${title}: ${description}`);
  };

  return { toast, toasts };
}
