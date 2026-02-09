import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palworld Map",
  description: "Palworld Map for dedicated Server",
};

type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
