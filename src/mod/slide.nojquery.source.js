honey.def(function(e){
    
    var 
    t = null,
    r=0,
    i=null,
    s=function(e,t,n,r){
        return-n/2*(Math.cos(Math.PI*e/r)-1)+t
    },
    o=function(e){
        return document.getElementById(e)
    },
    u={
        isChildOf:function(e,t){
            while(t&&t!==e)t=t.parentNode;return t===e
        },
        leave:function(e,t){
            return t=t||window.event,
                !this.isChildOf(e,t.relatedTarget||t.toElement)
        },
        enter:function(e,t){
            return t=t||window.event,
            !this.isChildOf(e,t.relatedTarget||t.fromElement)
        }
    };

    e.slide=function(e){
        function m(t){
            var n=this.id;
            return!~~t&&(r=1,clearTimeout(i)),
                n===e.prev?v===1?g(p):g(v-1):g(v+1),
                !1
        }
        
        function g(t){
            var o=e.width,
                u=0,
                f=(v-1)*o,
                l=0,
                c=(t-v)*o;
                v=t;
            if(!d){
                d=1,v>p?(f=2*o,c=-2*o):v<1&&(v=p);
                var m=setInterval(function(){
                    if(u>h) {
                         
                        return clearInterval(m),
                            n=null,
                            v>p?v=1:v<1&&(v=p),
                            y(),
                            clearTimeout(i),
                            i=setTimeout(function(){
                                r=0
                            }, e.autoPlay*3),
                            after(v),
                            d=0;
                    }


                    l=s(u,f,c,h),
                    a.scrollLeft=l,u++},
                1e3/60)
            }
        }
        
        function y(){
            if(!c)return;
            for(var t=0,n=c.length;t<n;t++)
                c[t].className="";
            c[v-1].className=e.currentClass||"current"
        }
        
        var 
        a=o(e.id),
        f=o(e.prev),
        l=o(e.next),
        c=e.toolbar&&o(e.toolbar).getElementsByTagName(e.barTagName),
        h=e.times||20,
        p=e.num,
        d=0,
        v=1,
        after = e.after || function() {};
        
        l.onclick=m,
        f.onclick=m;
        

        if(c)
            for(var b=0,w=c.length;b<w;b++)
                (function(e){
                    c[e].onclick=function(){
                        clearTimeout(i),
                        r=1,
                        g(e+1)
                        return false
                    }
                })(b);

        e.autoPlay&&function(){
            t=setInterval(function(){
                if(r)return;
                !d&&m.call(l,1)
            },e.autoPlay)
        }(),
            
        a.onmouseover=function(e){
            u.enter(this,e)&&(clearTimeout(i),r=1)
        },
        a.onmouseout=function(t){
            u.leave(this,t)&&(clearTimeout(i), i=setTimeout(function(){r=0},e.autoPlay))
        }
    }

});
