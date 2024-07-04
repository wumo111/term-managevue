module.exports = {
  devServer: {
    port: 8989, //修改前端项目启动端口
    proxy: {
      //设置代理，进行跨域   拦截所有的请求路径包括 http://127.0.0.1:10001/category/list
      '/sys': {
        //代理服务器转向的地址  Java服务器地址 http://localhost:10001
        target: 'http://127.0.0.1:10001', // 实际请求地址:  http://127.0.0.1:10001/category/list
        changeOrigin: true, //是否跨域 
        pathRewrite: {
          '^/sys': '', 
        },
      },
    },
  },
}
