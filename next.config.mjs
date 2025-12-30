/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'p16-novel-sign-sg.fizzopic.org' },
      { protocol: 'https', hostname: 'p19-novel-sign-sg.fizzopic.org' },
      { protocol: 'https', hostname: 'p16-sign-sg.tiktokcdn.com' },
    ],
  },
};
export default nextConfig;
