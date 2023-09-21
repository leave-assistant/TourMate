/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  swcMinify: true,
  compiler: {
	styledComponents: true,
  }
};
