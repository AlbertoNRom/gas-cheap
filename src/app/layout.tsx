import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gas Cheap - Encuentra las gasolineras más baratas cerca de ti",
  description: "Descubre las gasolineras con los precios más bajos o las más cercanas a tu ubicación. Ahorra dinero en combustible con nuestra aplicación web responsive.",
  keywords: "gasolineras, combustible, precios, gasolina, diesel, ahorro, ubicación, GPS, España",
  authors: [{ name: "Gas Cheap Team" }],
  creator: "Gas Cheap",
  publisher: "Gas Cheap",
  robots: "index, follow",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://gas-cheap.vercel.app",
    title: "Gas Cheap - Gasolineras baratas cerca de ti",
    description: "Encuentra las gasolineras más baratas o cercanas según tus preferencias. Ahorra tiempo y dinero en combustible.",
    siteName: "Gas Cheap",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gas Cheap - Gasolineras baratas cerca de ti",
    description: "Encuentra las gasolineras más baratas o cercanas según tus preferencias.",
    creator: "@gaschea",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
