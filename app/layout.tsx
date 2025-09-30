import type { Metadata, Viewport } from "next";
import "./../styles/globals.css";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Poppins } from "next/font/google";
import ThemeSwitcher from "@/components/motion/ThemeSwitcher";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: "Azure Cove Resort — Beach Escape",
  description: "Sun, sea, and stays — a modern beach resort demo page with scroll snap and motion.",
  openGraph: {
    title: "Azure Cove Resort — Beach Escape",
    description: "Modern beach resort landing built with Next.js, Tailwind, and Framer Motion.",
    type: "website",
    url: "https://example.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#06b6d4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <MotionProvider>
          <ThemeSwitcher />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
