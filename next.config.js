/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: [
      "ibanera-launchpad-users.s3.amazonaws.com",
      "ibanera-nft.mypinata.cloud",
    ],
  },
};

module.exports = nextConfig;
