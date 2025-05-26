import type { NextConfig } from "next";

const nextConfig: NextConfig = {
// Override the default webpack configuration
//This configuration is for huggingface transformers
webpack: (config) => {
  // See https://webpack.js.org/configuration/resolve/#resolvealias
  config.resolve.alias = {
      ...config.resolve.alias,
      "sharp$": false,
      "onnxruntime-node$": false,
  }
  return config;
},
};

export default nextConfig;
