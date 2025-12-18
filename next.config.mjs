/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
        ignoreDuringBuilds:true,
      },
      optimizeFonts: true,
      experimental: {
        optimizeCss: true, // Optional: enables CSS optimization
      },

      // webpack: (config) => {
      //   config.module.rules.push({
      //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
      //     type: 'asset/resource',
      //   })
      //   return config
      // },
      // output: 'export',
      // trailingSlash: true,
      reactStrictMode: true,
    
      images: {
        unoptimized: true,
        formats: [
          'image/avif',
          'image/webp'
        ],
    
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
          {
            protocol: 'https',
            hostname: 'cdn.example.com',
            pathname: '**/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
          },
        ],
      },
};

export default nextConfig;


