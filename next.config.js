module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `http://voapi.maqib.cn/api/:path*`,
        },
      ]
    },
  }