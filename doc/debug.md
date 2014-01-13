# Debug功能模块

## 依赖模块

无

## 调用示例
    
### html 部分    

    honey.go('lib:Debug', function(){
        honey.debug("someMessage");
        honey.debug("someMessage", "N"); 
 
        honey.debug("some Error Message", "some Error Message","E"); 
    });

#### 说明

* 在所有使用了honey.debug的页面其地址上增加"#debug"即可开启debug功能
* e.g. http://www.hunantv.com/ => http://www.hunantv.com/#debug
* F10为快捷键，打开和收起debug信息显示面板
* 可以显示字符串，数字，对象，数组，已经构造函数。