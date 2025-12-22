/* eslint-disable @next/next/no-page-custom-font */
import { Toaster } from "@/components/ui/sonner";
import { baloo2, bigShouldersDisplay } from "@/lib/fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bigShouldersDisplay.variable} ${baloo2.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <body>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontSize: "1rem",
              fontFamily: "var(--font-baloo2)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
