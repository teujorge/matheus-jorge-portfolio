import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Nunito_Sans } from "next/font/google";
import App from "./app";
import "~/styles/globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Matheus Jorge",
  description: "Matheus Jorge's portfolio website",
  icons: { icon: "/images/mjIcon.webp" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <App>{children}</App>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
