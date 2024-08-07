/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React's strict mode for highlighting potential problems
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
         
        },
      ],
    },
   
};

export default nextConfig;
