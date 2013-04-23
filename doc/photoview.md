# 图片浏览公共控件

## Intro

这是一个以弹出层形式来浏览图片的控件，通常用于一组图片的浏览。现应用于芒果微空间的相册，以及分享中。

## 依赖模块

* lib:jquery
* lib:mustache
* mod:slide
* plugin:rotate
* plugin:center

## 组成

* tpl:photoview  // 模板，也可指定页面模板，从而不需此模块
* widget:photoview // 基本
* mod_photoview // 风格1
* mod_photoview2 // 风格2 

> mod_photoview 与 mod_photoview2，只需引入某种风格就好。我本意是由各项目来自己扩展，此为两种已定的风格，比如芒果微空间为风格2的控件。将来控件package机制完善后，这个将会有所改变

## 基本调用示例

    honey.go('lib:jquery, mod:slide, lib:mustache, plugin:rotate, plugin:center, '
        + 'tpl:photoview, widget:photoview, mod_photoview2', function() {

            var view = new honey.PhotoView({
                slide_id: 'honey-photoview-slide',
                big_photo_id: 'big-box',
                template: honey.photoview_tpl_style_2,
                next_btn: '#photo-next',
                prev_btn: '#photo-prev',
                close_btn: '.close-btn',
                rotate_left_btn: '.btn-left-rotate',
                rotate_right_btn: '.btn-right-rotate',
                data: {photos: photos}
            });

            $('#trigger').click(function() {
                var current_id = 2; 
                view.open(current_id);
            });

        });

### 说明

* honey.go 引入依赖文件，注意这里是引入 mod_photoview2 风格文件
* slide_id 指定图片浏览滚动列表id，默认为 'honey-photoview-slide'，可省略
* big_photo_id 指定大图img上的 id
* template 模板，规则如下：
	* 	指定如：'#temlate_box'，将从当前页中 id 为 template_box 的容器中取出 html 为模板
	* 也可直接以字符串形式传入模板
	* photoview2 风格2模板可引入 tpl:comment 得到：honey.photoview_tpl_style_2
* next_btn 大图浏览，下一张trigger，可为id 与 class
* prev_btn 大图浏览：前一张，机制如上
* close_btn 关闭
* rotate_left_btn 左90度旋转图片
* totate_left_btn 右90度旋转图片
* data 数据，将直接渲染到模板中，其中必须有 photos 字段，且 photos　规则如下：
	* 可传入 json 数组
	* 可为函数返回 json 数组，比如：data: {photos: function() { return [{...}] }}
	* 数组 item 必须要有 id, big, small 三个字段
    * **如果同一页面有多组不同数据需要展示，请使用 setData() 方法**
* 实例化 photoview 后，只需要在页面中触发 view.open 方法即可打开控件弹层

> 参数中带 **_btn** 后缀的，都可以使用默认值而省略

### 外部方法
    
* open 打开弹层方法
    * 只有一个参数，为当前大图的 id。不传则默认为第一张
* setData 方法
    * 动态填充数据，数据格式在上面的 **data** 字段已说明


## demo 地址

1. http://honey.hunantv.com/honey/demos/photoview.html
2. http://honey.hunantv.com/honey/demos/photoview-style2.html

> 需要配 HOST
