/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {
      url: '/',
      static: true,
    },
    src: {
      url: '/dist',
    },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
  ],
  optimize: {},
  packageOptions: {},
  devOptions: {
    open: 'none',
  },
  buildOptions: {
    baseUrl: '/',
  },
}
