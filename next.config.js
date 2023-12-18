/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ["img.freepik.com", "i.ibb.co", "i.pinimg.com", "ibb.co","images.unsplash.com","localhost","gw.alipayobjects.com",'example.com'],
    },
    // swcMinify:true
    // fastRefresh:true,
    // concurrentFeatures:true

  };
  
  module.exports = nextConfig;