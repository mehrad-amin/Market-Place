import "./globals.css";
import { ReduxProvider } from "@/store/provider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "مارکت‌پلیس | خرید محصولات دیجیتال",
  description: "اولین مارکت‌پلیس تخصصی محصولات دیجیتال",
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="fa">
      <body className="bg-gray-50">
        <ReduxProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p>© 2024 مارکت‌پلیس. تمام حقوق محفوظ است.</p>
            </div>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
