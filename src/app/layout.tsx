import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/context/ThemeRegistry";
import Navigation from "@/components/Navigation";
import { AlertsProvider } from "@/context/AlertContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Null Meta",
  description: "Landing page for nullmeta.ai",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest?v=2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <AlertsProvider>
            <Navigation />
            {children}
          </AlertsProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
