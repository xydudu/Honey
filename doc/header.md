# 公共头部

## Intro
 
 全站通用的顶部横条，包括了登录，以及用户消息和登录状态。
 
 ## 依赖模块
 
 * lib:mustache
 * plugin:pswencode

> 所以，是不需要依赖于jquery的，大胆的使用于各种页面中吧

## 关于css

css 没有在组件中自行引入，所以，需要在页面中自行引入所需样式文件。

## 组成

*  tpl:header // 模板文件
* widget:header // 主体文件

## 调用示例
    
    honey.go('lib:mustache, tpl:header, widget:header, plugin:pswencode', function() {
         honey.header.init('honey-header');
         // honey-header 为顶部条所处容器id
    });

## demo 地址

1. http://honey.hunantv.com/honey/demos/header/basic.html