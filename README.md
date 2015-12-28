# crm

咕噜客户关系管理系统

## Windows 开发

1. npm install
2. cd ./node_modules/zepto
3. npm install
4. npm run dist
5. cd ../../
6. ./node_modules/.bin/imock -j mock -w build
7. 新开命令行窗口: ./node_modules/.bin/webpack-dev-server --hot --inline

## {x}nix 开发

1. npm start

## 发布

1. 修改 package.json 中 version
2. git push 后，会自动发布版本 version，发布成功后，静态资源访问地址为 http://dn-gl.qbox.me/FE/crm/{version}/buy-car.js
3. FE 是 git 上组名，crm 是项目名
