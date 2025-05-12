import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Provider from "@/components/providers/query-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ArtShow – Virtual Gallery",
  description: "Upload, curate, and explore digital art.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <Provider>
          <main className="min-h-screen flex flex-col">
            <header className="w-full border-b px-6 py-4 bg-white shadow-sm">
              <h1 className="text-lg font-bold">ArtShow</h1>
            </header>
            <section className="flex-1 container py-10">{children}</section>
            <footer className="w-full border-t px-6 py-4 text-sm text-center text-muted-foreground bg-white">
              © {new Date().getFullYear()} MisogiAI ArtShow
            </footer>
          </main>
        </Provider>
      </body>
    </html>
  );
}
