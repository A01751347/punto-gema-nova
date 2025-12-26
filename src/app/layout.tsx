import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/auth-context";
import { CartProvider } from "@/lib/cart/CartContext";
import Shell from "@/components/layout/Shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "YUTNÜÜ - Cosmética Natural con Respaldo Científico",
  description: "Cosmética natural formulada con criterio científico. Transparencia, trazabilidad y resultados medibles.",
  keywords: ["cosmética natural", "skincare", "cuidado de la piel", "ingredientes naturales", "ciencia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Shell>
                {children}
              </Shell>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
