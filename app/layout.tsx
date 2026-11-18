import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mypai: a study partner that lives in WhatsApp",
  description:
    "Tasks, reminders, a timetable, flashcards and an AI tutor, all inside WhatsApp. Free for students to run.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230b5d4f'/><text x='50' y='68' font-size='58' text-anchor='middle' fill='white' font-family='sans-serif' font-weight='700'>m</text></svg>",
  },
};
export const viewport: Viewport = { themeColor: "#f6f8fc" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Caveat:wght@600&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
