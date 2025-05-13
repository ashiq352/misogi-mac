"use client";

import React from "react";
import Header from "@/components/ui/header";
import Link from "next/link";

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col">
        <Header />
        <Link href="/galleries" className="mt-4">
          Show Gallery
        </Link>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
