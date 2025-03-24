import "../styles/global.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
