# phaser 的学习记录

该工程用于 `phaser` 的学习与练习

由于 `phaser3` 的正式版尚未发布（时间表排到17/12/30），所以这里涉及 `phaser` 的引入部分依旧采用传统的方式。但在其他包的处理上使用 `webpack` 的脚手架。

## 使用说明
下载该工程后：  
1. 执行 `node package.json.js` 生成 `package.json` 文件  
1. 执行 `npm install` 安装相应的依赖  
1. 执行 `gulp dev` 构建目标文件  
1. 执行 `node server.js` 启动服务器  
1. 访问 `127.0.0.1/index.html` 即可查看相应的案例

## 文件结构说明
`src` 目录中包含 `base1~3` 案例的源码。 