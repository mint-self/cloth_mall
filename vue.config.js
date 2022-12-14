const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 给项目中的常用文件设置文件的路径别名，方便使用
  configureWebpack: {
    resolve: {
      alias: {
        // key就是路径的别名，value就是文件的实际路径
        "assets": '@/assets',
        "common": '@/common',
        "components": '@/components',
        "views": '@/views',
        "network": '@/network'
      }
    }
  }
})
