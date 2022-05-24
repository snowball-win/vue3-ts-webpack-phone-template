'use strict'
const path = require('path')
const { merge } = require('webpack-merge') // 管理配置文件
const tsImportPluginFactory = require('ts-import-plugin') // 按需引入
const config = require('./config') // 根目录配置文件

function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log('10config', config)
console.log('11process', process.env.VUE_APP_BASE_HOST)
console.log('12ENV', process.env.NODE_ENV)
const { mockURL } = process.env.NODE_ENV? config[process.env.NODE_ENV] : 'https://www.zkrxlink.com/'
console.log('13-process.env.NODE_ENV', process.env.NODE_ENV)
console.log('14-mockURL', mockURL)
module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  parallel: process.env.NODE_ENV === 'development',
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api/v1': {
        // target: mockURL,
        target: process.env.VUE_APP_BASE_HOST,
        // target: "https://www.zkrxlink.com/",
        pathRewrite: {
          '^/api/v1': ''
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ],
  configureWebpack: {
    devtool: 'source-map',
    name: 'vue-h5-template',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // set ts-loader
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  },
  css: {
    extract: true,
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/scss/reset.scss";
        @import "@/assets/scss/variable.scss";`,
        sassOptions: {
          modules: true,
          exclude: [
            path.resolve(__dirname, "node_modules")
          ],
        }
      },
      css:{
        modules:{
          localIdentName: '[path][name]__[local]_[hash:base64:16]'
        },
      }
    },
  },
}
