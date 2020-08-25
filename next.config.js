module.exports = {
  async rewrites() {
    return process.env.NODE_ENV !== 'production'
      ? [
          {
            source: '/api/:path*',
            destination: `http://localhost:4000/:path*`,
          },
        ]
      : [];
  },
};
