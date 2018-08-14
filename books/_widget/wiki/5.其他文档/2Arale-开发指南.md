## 初始化环境

### 安装 spm

spm 为包管理工具，可提供打包，部署的功能。

```
$ npm install spm -g
```

若要使用最新的 spm 开发版，由于还未提交到 npm 上，所以可以使用源码安装

```
$ git clone https://github.com/spmjs/spm.git
$ cd spm
$ sudo npm install -g
```

安装完成后查看版本

```
$ spm -v
1.6.0
```

### 安装 nico

nico 为 arale 的文档工具，也可以在调试时使用。

```
$ npm install nico -g
```

## 初始化组件

### 创建目录结构

```
$ mkdir xxx
$ cd xxx
$ spm init
```

### 提交到 github

组件放到自己的 github 账号下，完成后再 transfer 到 aralejs。

## 开发组件

### 修改 [package.json](https://github.com/seajs/spm/wiki/package.json)

`dependencies` 需要添加所依赖的组件以及版本，这个参数在开发过程中需要。

其他参数可根据[文件](https://github.com/seajs/spm/wiki/package.json)修改。

### 开发 demo

demo 文件为 `examples/index.md`，通过 nico 生成 html 文件。

在 demo 页面写 js 可用下面的方式，会同时生成源码和转义后的代码

```
  ````javascript
  seajs.use('../src/xxx', function(xxx) {

  })
  ````
```

### 使用 nico 进行开发

nico 可启动本地服务，通过 127.0.0.1:8000 访问。每次代码修复浏览器会自动刷新（这个很爽）

```
$ make watch
```