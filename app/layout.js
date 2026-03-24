export const metadata = {
  metadataBase: new URL("https://springhouse.in"),
  title: "SpringHouse | Premium Managed Office Spaces",
  description: "Experience premium managed office spaces and coworking solutions with SpringHouse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Custom head tags can go here, but Next.js automatically handles 'icon.png' in the app directory */}
      </head>
      <body>{children}</body>
    </html>
  );
}
