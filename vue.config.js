const path = require('path')

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  // lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // chainWebpack: () => {
  // },
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true)
    // config.performance.set('hints', false)
  },
  // configureWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //   }
  // },
  // configureWebpack: {
  //   optimization: {
  //     minimizer: [
  //       new UglifyJsPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             warnings: false,
  //             drop_console: true,
  //             drop_debugger: false
  //           }
  //         }
  //       })
  //     ]
  //   }
  // },
  // configureWebpack: {
  //   optimization: {
  //     minimizer: [
  //       new UglifyJsPlugin({
  //         uglifyOptions: {
  //           compress: {
  //             warnings: false,
  //             drop_console: true, // console
  //             drop_debugger: false,
  //             pure_funcs: ['console.log'] // 移除console
  //           }
  //         }
  //       })
  //     ]
  //   }
  // },
  configureWebpack: {
    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8088,
    https: false,
    // hotOnly: false,
    // disableHostCheck: true,
    proxy: null, // 设置代理
    before: () => {}
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/css/public/less/common.less')
      ]
    }
  }
}
