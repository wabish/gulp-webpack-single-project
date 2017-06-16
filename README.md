# gulp-webpack-single-project

本示例是对 [gulp-webpack-project](https://github.com/cobish/gulp-webpack-project) 目录进行一个更改，采用的是一个页面就是一个开发目录的策略。若项目页面不多且展示页面比较多（例如官网），可以尝试一下该种目录结构。



## 环境搭建

### 运行环境

- [node.js@5.8.0](https://nodejs.org)
- [yarn@0.16.1](https://yarnpkg.com/)

```bash
$ node -v
v5.8.0

$ npm -v
3.7.3

$ yarn --version
0.16.1
```

### 依赖

- gulp@3.9.1
- webpack@1.13.3
- concurrently@3.1.0

```bash
$ npm install -g gulp@3.9.1 webpack@1.13.3 concurrently@3.1.0
```

## 命令使用

### 安装

```bash
$ yarn install
```

### 运行

```bash
// 帮助命令
$ gulp help

// 开发命令
$ gulp start

// 打包命令
$ gulp build
```

## 目录结构

```bash
└─ public/
	 ├─ dist/                                            # 打包生成的目录，用于上线
	 ├─ gulp/                                            # gulp配置目录
	 |   ├─ tasks/                                       # gulp任务配置目录
	 |   |	  ├─ images.js                               # 图片配置
	 |   |	  ├─ other.js                                # 其它配置
	 |   |	  ├─ script.js                               # 脚本配置
	 |   |	  ├─ style.js                                # 样式配置
	 |   |	  └─ view.js                                 # 页面配置
	 |   ├─ config.js                                    # webpack配置文件
	 |   ├─ webpack.config.js                            # PC端开发配置文件
	 |   └─ webpack.production.config.js                 # PC端上线配置文件
	 ├─ node_modules/                                    # node依赖包
	 ├─ src/                                             # 开发目录
	 |   ├─ index/                                       # 首页开发目录
	 |   |	  ├─ css/                                    # 样式目录
	 |   |	  ├─ html/                                   # 页面目录
	 |   |	  ├─ img/                                    # 图片目录
	 |   |    |   ├─ single/                             # 单张图片目录
	 |   |    |   └─ sprite/                             # 雪碧图目录
	 |   |	  ├─ js/                                     # 脚本目录
	 |   |	  ├─ index.html                              # 入口文件
	 |   |	  ├─ index.js                                # 入口脚本
	 |   |	  └─ index.scss                              # 入口样式
	 |   └─ ...                                          # 其它页面开发目录
	 ├─ gulpfile.js                                      # gulp入口配置文件
	 ├─ package.json                                     # npm包管理文件
	 ├─ README.md                                        # 文档
	 └─ yarn.lock                                        # yarn锁文件，自动生成，禁止修改
```

## 注意

- html 文件引入其它静态资源请使用上级路径，只有这样 hash 后的静态文件名字才能替换成功，如：

``` html
<!-- css -->
<link rel="stylesheet" href="../common/common.css" />

<!-- js -->
<script type="text/javascript" src="../vendor.js"></script>
```

- css 入口文件的图片路径需使用上级路径，才可适用于图片合并，如在 index 目录下则需使用 ``../index/`` 路径：

``` sass
// 需要雪碧图的图片路径
$spriteImgPath: "../index/img/sprite/";

// 单个图片路径，即不合成雪碧图
$singleImgPath: "../index/img/single/";
```
