import type { Metadata } from 'next';
import { Inter, Dancing_Script, Sunflower, Montserrat } from 'next/font/google';
import './globals.css';
import DesktopWarning from '@/components/DesktopWarning';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const dancingScript = Dancing_Script({ subsets: ['latin'], variable: '--font-cursive' });
const sunflower = Sunflower({ weight: ['300', '500', '700'], subsets: ['latin'], variable: '--font-sunflower' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'VYRA Greens',
  description: 'Premium microgreens for Indian consumers. An interactive edible catalog.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} ${sunflower.variable} ${montserrat.variable} font-sans antialiased`}>
        <DesktopWarning />
        <main className="w-full h-[100dvh] overflow-hidden bg-vyra-dark relative">
          {children}
        </main>
      </body>
    </html>
  );
}
