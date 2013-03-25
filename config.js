seajs.config({
    //加载seajs插件
    plugins: ['shim','text','nocache'],
    // 别名配置
    alias: {
        'jquery': {
            src: 'jquery-1.9.1.min.js',
            exports: 'jQuery'
        }
    },
    // 变量配置,src为远吗
    vars: {
        'dir': 'dist'
    },
    //设置路径
    paths:{
       
    },
    // 调试模式
    debug: true,
    // 文件编码
    charset: 'utf-8'
});


