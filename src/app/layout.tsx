import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/auth-context";
import { CartProvider } from "@/lib/cart/CartContext";
import Shell from "@/components/layout/Shell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Punto Gema Nova — Joyería Artesanal Elegante",
  description: "Joyería artesanal elaborada con piedras semipreciosas, perlas y chapa de oro. Piezas únicas diseñadas para regalar, combinar y disfrutar todos los días.",
  keywords: ["joyería artesanal", "pulseras piedras semipreciosas", "collares", "perlas", "chapa de oro", "joyería hecha en México", "regalo joyería"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
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
