/** @type {import('next').NextConfig} */
const nextConfig = {
  // middleware.ts owns trailing slashes so /app-designs/ can serve its static index
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
