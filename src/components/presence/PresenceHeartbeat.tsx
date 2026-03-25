"use client";

import { useEffect } from "react";
import { updateMyPresence } from "@/lib/actions/users";

export default function PresenceHeartbeat() {
  useEffect(() => {
    let cancelled = false;

    const ping = async () => {
      if (cancelled) return;

      try {
        await updateMyPresence();
      } catch {
        // Ignore heartbeat failures silently
      }
    };

    // Ping immediately on mount
    ping();

    // Then ping every 60 seconds
    const interval = setInterval(ping, 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return null;
}