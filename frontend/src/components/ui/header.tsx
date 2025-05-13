"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { clearCookies } from "@/lib/cookies";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const handleSignOut = () => {
    clearCookies();
    router.push(routes.signIn);
  };
  return (
    <header className="relative w-full px-6 py-4 bg-gray-100 shadow-sm flex items-center justify-between">
      <div></div>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold">
        ArtShow
      </h1>
      <Button
        onClick={handleSignOut}
        className="text-sm font-medium text-red-600 hover:underline"
        variant="ghost"
      >
        Sign Out
      </Button>
    </header>
  );
}
