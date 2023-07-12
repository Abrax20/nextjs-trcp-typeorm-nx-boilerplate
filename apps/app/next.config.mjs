//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { composePlugins, withNx } from '@nx/next';


/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("../../env.mjs");

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
 },
  webpack: (config, options) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      dns: false,
      tls: false,
      express: false,
      async_hooks: false,
      'react-native-sqlite-storage': false
    };
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    if (!options.isServer) {
      config.plugins.push(new options.webpack.IgnorePlugin({
        resourceRegExp: /express/,
      }));
    }

    return config;
  }
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

export default composePlugins(...plugins)(nextConfig);
