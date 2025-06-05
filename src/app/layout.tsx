import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import StoreProvider from "./storeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance App",
  description: "Demo Finance App",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <StoreProvider> */}
       {children}  {/* 👈 This renders (pages)/layout.tsx inside here */}
        {/* </StoreProvider> */}
      </body>
    </html>
  );
}

// this is how the final code look like
{/* <html>
  <body>
    <StoreProvider>
      <PagesLayout>          ← from src/app/(pages)/layout.tsx
        <DashboardPage />    ← from src/app/(pages)/dashboard/page.tsx
      </PagesLayout>
    </StoreProvider>
  </body>
</html> */}
