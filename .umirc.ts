import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  proxy: {
    "/kook": { // 标识需要进行转换的请求的url
     "target": "https://www.kookapp.cn/", // 服务端域名
     "changeOrigin": true, // 允许域名进行转换
     "pathRewrite": { "^/kook": ''}  // 将请求url里的ci去掉
    },
    "/warframe": { // 标识需要进行转换的请求的url
     "target": "https://api.warframestat.us", // 服务端域名
    //  "target": "http://39.103.173.19:3000/", // 服务端域名
     "changeOrigin": true, // 允许域名进行转换
     "pathRewrite": { "^/warframe": ''}  // 将请求url里的ci去掉
    },
  }
});
