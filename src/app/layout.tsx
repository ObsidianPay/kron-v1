"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ClerkProvider, RedirectToSignIn, SignedOut } from "@clerk/nextjs";
import { dark, neobrutalism } from '@clerk/themes';
import { redirect } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <ClerkProvider appearance={{
      baseTheme: [dark, neobrutalism]
    }}>
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
