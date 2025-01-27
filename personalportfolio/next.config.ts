import type { NextConfig } from "next";

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/, // Specify the file extension for MDX
});

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'], // Add MDX to the page extensions
};

export default withMDX(nextConfig);
