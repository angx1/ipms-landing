import localFont from "next/font/local";
import "./globals.css";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL is not defined in the environment variables."
  );
}

if (!supabaseAnonKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in the environment variables."
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export const metadata = {
  title: "IPMS",
  description: "Integrated Planing and Management Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
