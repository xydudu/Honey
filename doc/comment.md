# 评论公共组件

## 依赖模块

* lib:jquery
* lib:mustache // 模板渲染库
* plugin:pswencode // 登录密码加密


## 评论组件文件构成

* tpl:comment // 模板
* widget:comment // 组件核心文件

## 调用示例
    
### html 部分    

    <div class="outer">

        <div id="honey-comment">
            <h3>评论 <span class="comments-total-nums">loading...</span></h3> 
            <ul class="honey-comment-list"></ul>
            <p class="honey-comment-pages"></p>
            <div class="honey-comment-text"></div>
        </div>

    </div>

#### 说明

* .outer 不是必须，可为任意外部容器
* **#honey-comment** html块为必须
* .comments-total-nums 为显示部评论数容器 **可调用多次**
* .honey-comment-list 为评论列表主体显示容器
* .honey-comment-pages 为评论分页容器 **可调用多次**  
* .honey-comment-text 为评论输入部分
* 评论宽度随外部容器而变化

### javascript 部分    
    
    // 引入依赖模块
    honey.go('lib:jquery, lib:mustache, plugin:pswencode, '
        + 'tpl:comment, widget:comment', 
    // 调用评论方法
    function() {
        new honey.comment({
            project: 'ihunantv',
            subject_id: '1611580',
            type: 'ent',
            mood: true
        }); 
    })

#### 参数说明
* project 项目名，现有ihunantv, enthunantv
* subject_id 对象id，如文章id，电影id...
* type 项目类型，现有ent
* mood 是否需要表情功能，true/false
* nolist 如为 true，不会显示评论列表

## demo 地址
    
    http://honey.hunantv.com/honey/demos/comment/
    // 需配host
