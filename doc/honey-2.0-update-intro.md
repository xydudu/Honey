# Honey 2.0 升级说明

## Honey 的文件结构与 Url 关系

Honey 2.0  文件夹有 **基础库** 与 **项目库** 两种，其中 **基础库** 由前端组维护，**项目库** 理论上大部分由各项目组负责。

### 其 Url 对应如下（以微空间项目示例）：

* 基础库：http://honey.hunantv.com/honey-2.0/
* 项目库：http://honey.hunantv.com/i/

当然，在项目中，其实并不用在意 Url 的关系，所以下面讲一下 **Honey 2.0** 最重要的一点改变。

## Honey 模块引入方式

Honey 2.0 由于模块有了基础库与项目库的区分，所以在引入方式上也将有所区别。我们知道 Honey 版本模块引入是像下面这样的：

	honey.go('lib_jquery, mod_dialog', function() {
		
		// do something
		
	});

上面的代码是应该都能明白就是引入jquery与dialog两个模块，然后在此依赖下进行业务层的代码。

而 Honey 2.0 的引入方式只是在于模块的标记上有了区别：

> lib_jquery 是引入项目库里的 jQuery 模块，而 lib:jquery 则是引入基础库里的模块

所以在 Honey 2.0 的思想下，应该先搞清楚你的代码依赖的模块是在基础库中还是项目库中，然后区别引入比如像下面：

	honey.go('lib:jquery, mod_dialog', function() {
		
		// so something
		
	})

上面的代码将从基础库中引入 jQuery ，从项目库中引入 dialog。

所以，为什么要搞成这样？好像复杂了。

## 为什么要有基础库与项目库之分

显然，老版本 Honey 在引入模块方面显得很是简单，只需要搞清楚模块名及所处文件夹，就能很简单的引入模块进入到页面中。但是这样带来一个隐患与不便，就是很多项目都需要使用的一些模块，被分散到了每个项目的文件结构中。

比如有 微空间 与 芒果TV 两个项目，他们都需要引入 jQuery 来进行编码。于是不得不把 jQuery 复制为两份分别放入两个项目中的 Honey 文件结构中，然后再使用 **honey.go('lib_jquery')** 来引入。

这种公用的模块被分散开后，要统一升级版本，或者修改bug，就变得很是棘手了，你得在每一个使用到的项目中进行更新。

终上所述， Honey 2.0 将被多个项目频繁使用的基础模块独立出来，形成一个基础库，而这个库中的模块也将由前端组进行维护与更新，并形成文档，保证其质量。

那现在的 Honey 2.0 有多少基础模块了呢？

##  已有基础模块

	├── lib
	│   ├── jquery.source.js // 不多说
	│   ├── mustache.source.js // 前端模板引擎 
	│   └── socket.source.js // socket.io
	├── mod
	│   ├── dialog.source.js // 弹层基础类
	│   ├── pusher.source.js // honey-pusher 基础文件 依赖于 socket.io
	│   ├── slide.nojquery.source.js // 图片滚动，现应用于hunantv.com首页多处，无jquery 要求
	│   ├── slide.source.js // 图片滚动
	│   └── topbar.source.js // 顶部登录以及状态栏
	├── plugin
	│   ├── center.source.js // 使元素居中
	│   ├── lazyload.source.js // 延迟加载
	│   ├── mousewheel.source.js // 鼠标滚轮事件加强
	│   ├── pswencode.source.js // 通行证加密
	│   └── rotate.source.js // 旋转图片
	├── tpl
	│   └── comment.source.js // 评论组件模板文件
	└── widget
    	├── comment.source.js // 公共评论组件
    	├── login.dialog.source.js // 公共登录弹层
    	├── photoview.source.js // 图片浏览层
    	└── tooltip.source.js // 提示小弹层

## 实例

截取金鹰网登录页的一段代码：

	honey.go("lib:jquery, plugin:pswencode, mod:dialog, mod_suggestion, mod_login",
	function() {
    	honey.login();
	});

可以看到，其实中的 jquery, pswencode, dialog 都是引自基础库，使用 firebug 能清楚的看到这几个模块的 Url:

>
	http://honey.hunantv.com/honey-2.0//lib/jquery.js
	http://honey.hunantv.com/honey-2.0//plugin/pswencode.js
	http://honey.hunantv.com/honey-2.0//mod/dialog.js
>

而 suggestion, login 两个模块则是从 微空间 项目库中引入的，其 Url 如下：

>
	http://honey.hunantv.com/i/js/mod/suggestion.js
	http://honey.hunantv.com/i/js/mod/login.js
>

然后，就有了下一个问题，如何配置这些 Url。

## Honey 2.0 的配置文件

先看一个标准的配置文件：
	
	var
	PROJECT = 'i.hunantv', //绑定到项目中
	VERSION = '20130314',
	DEV = !!window.DEV, 
	COMBO = false,
	COMBOURL = 'http://honey.hunantv.com/combo/',
	ROOT = 'http://honey.hunantv.com/i/js',
	PUBROOT = 'http://honey.hunantv.com/honey-2.0/',
	CSS = 'http://honey.hunantv.com/css',
	IMG = 'http://honey.hunantv.com/img';

关于基础库与项目库地址的配置，就只需要看 ROOT 与 PUBROOT 两个配置项。

* ROOT：项目库地址
* PUBROOT：基础库地址

理论上，这些配置项都不需要具体项目编码人员进行管理维护。因为每一个项目，都会生成一个核心 honey 文件，将会包含这些配置项，这将是不可顺便更改的。

比如下面几个项目的Honey核心文件：
	
	http://honey.hunantv.com/honey-2.0/honey.ihunantv.js
	http://honey.hunantv.com/honey-2.0/honey.hunantv.js
	http://honey.hunantv.com/honey-2.0/honey.data.js
	http://honey.hunantv.com/honey-2.0/honey.monitor.js
	
这些都是已经在线上的项目核心文件，如果有新项目，就只要通知前端组生成一个核心文件用于项目的初始化，然后就可以开始引入模块，编码的常规操作了。

4.9/2013 