"use client";
import { useEffect } from "react";
import { useAuthAPI } from "../hooks/useAuth";

export default function SignIn() {
  const me = useAuthAPI();

  useEffect(() => {
    me.mutate();
  }, []);

  return <div>This is Sign In Page.</div>;
}
