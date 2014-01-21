/*
 * a common slide module 
 *
 * */

honey.def(function(a){
    
    function d(a,b,c,d){
        return  -c / 2 * (Math.cos(Math.PI*a/d)-1) + b 
    }
    
    function c(a){
        return document.getElementById(a)
    }
    
    var b = function(a){
        function move(){
            var 
            c = a.width,
            e = this.id,
            f = e == a.prev ? -c : c,
            g = 0,
            l = 0,
            m = (h - 1) * c;
            
            //H.debug('moving...')
        
            if (!lock) {
                lock = 1,
                e == a.prev ? h -- : h ++,
                h > a.num ? (m = 2 * c, f = -2 * c) : h < 1 && (m = f = 2 * c);
                
                var n = setInterval(function() { 
                    if (l > i) {
                        clearInterval(n),
                        n = null,
                        h > a.num ? h = 1 : h < 1 && (h = a.num),
                        k(),
                        lock = 0,
                        after(h);
                        //H.debug('move over...')
                        return!1
                    }
                    g = d(l, m, f, i),
                    b.scrollLeft = g,
                    l ++
                }, 1e3/60);
                
                return!1
            }
        }
        
        function k(){ 
            if (!bar_tag) return
            var g = bar_tag
            for (var b = 0; b < g.length; b ++)
                g[b].className = "";
            g[h-1].className = a.currentClass || "current"
        }

        var 
        b = c(a.id),
        prev = c(a.prev),
        next = c(a.next), 
        //g = c(a.toolbar).getElementsByTagName(a.barTagName),
        bar_tag = a.toolbar && c(a.toolbar).getElementsByTagName(a.barTagName),
        after = a.after || function() {},
        h = 1, 
        i = a.times || 20,
        lock = 0;
        
        prev.onclick = move
        next.onclick = move
    };

    a.slide = b

})
