'use client';

import type { Metadata } from 'next';
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-manrope">
        <ConvexProvider client={convex}>
          <Header />
          <main>{children}</main>
          <Footer />
        </ConvexProvider>
      </body>
    </html>
  );
}