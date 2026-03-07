/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  devIndicators: false,
  outputFileTracingExcludes: {
    "**/*": ["./public/**/*"],
  },
};

export default nextConfig;
