import type { Metadata } from "next";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: "Virtual ArtShow",
  description: "ArtShow – Virtual Art Gallery Submission & Curation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
