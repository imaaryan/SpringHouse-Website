import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://springhouse.in"),
  title: "SpringHouse | Premium Managed Office Spaces",
  description: "Experience premium managed office spaces and coworking solutions with SpringHouse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        {/* Custom head tags can go here, but Next.js automatically handles 'icon.png' in the app directory */}
      </head>
      <body>{children}</body>
    </html>
  );
}
