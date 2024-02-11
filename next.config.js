/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
// images: {
  //   domains: ["img.freepik.com", "i.ibb.co", "i.pinimg.com", "ibb.co","images.unsplash.com","localhost","gw.alipayobjects.com",'example.com']
// },


images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "gw.alipayobjects.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
  // swcMinify:true
  // fastRefresh:true,
  // concurrentFeatures:true
};

module.exports = nextConfig;
