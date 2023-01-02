// $(function(){
//     _scroll.init();
// })
var _scroll = {
    set:function(str){
        var obj = str;
        var __controll,sX,sY,w,h,op,sX_w,sX_h;

        var htmls = obj.html();
        $('<div class="scroll">'+htmls+'</div>').appendTo(obj.empty());
        sX = $('<div class="scrollbar-x"><div></div></div>').appendTo(obj);
        sY = $('<div class="scrollbar-y"><div></div></div>').appendTo(obj);

        __controll = {
            set:function(){
                obj.find(">.scroll").css("display","table");
                w = obj.find(">.scroll").innerWidth();
                h = obj.find(">.scroll").innerHeight();
                obj.find(">.scroll").css("display","block");
                sX_w = obj.find(">.scroll").innerWidth() / w * 100;
                sY_h = obj.find(">.scroll").innerHeight() / h * 100;
                var pR = (obj.attr('data-size')*1.5);
                var pB = (obj.attr('data-size')*1.5);
                
                if(w <= obj.find(">.scroll").innerWidth()){
                    pB = 0;
                    sX.hide();
                } else {
                    sX.show();
                }
                if(h <= obj.find(">.scroll").innerHeight()){
                    pR = 0;
                    sY.hide();
                } else {
                    sY.show();
                }

                if(obj.attr('data-opacity') !== "y"){
                    obj.css({"padding":"0 "+pR+"em "+pB+"em 0"});
                }
                
                sX
                    .css({"height":obj.attr('data-size')+"em"})
                    .find(">div")
                    .css({"width":sX_w+"%"});
                sY
                    .css({"width":obj.attr('data-size')+"em"})
                    .find(">div")
                    .css({"height":sY_h+"%"});
                    
                // if(obj.attr('data-opacity') !== "y"){
                //     this.opacity("in");
                // }
            },
            opacity:function(str){
                clearTimeout(op);
                if(str==="in"){
                    if(obj.attr("id") === "dash") console.log(w ,">", obj.find(">.scroll").innerHeight())
                    if(w > obj.find(">.scroll").innerWidth()) sX.fadeIn(300);
                    if(h > obj.find(">.scroll").innerHeight()) sY.fadeIn(300);
                } else {
                    if(w > obj.find(">.scroll").innerWidth()) sX.fadeOut(300);
                    if(h > obj.find(">.scroll").innerHeight()) sY.fadeOut(300);
                }
            }
        }
        
        $(window).on("resize",function(){__controll.set();});
        setTimeout(function(){
            __controll.set();
        },500);

        obj.find(">.scroll").on("scroll",function(){
            var x = this.scrollLeft / w * 100;
            var y = this.scrollTop / h * 100;
                y = (obj.find(">.scroll").innerHeight() < y) ? obj.find(">.scroll").innerHeight():y;
            
            sY.find(">div").css("top",y+"%");
            sX.find(">div").css("left",x+"%");

            if(obj.attr('data-opacity') === "y"){
                __controll.opacity("in");
                op = setTimeout(function(){__controll.opacity("out");},1000);
            }
        });
        if(obj.attr('data-opacity') === "y"){
            sX.fadeOut(0);
            sY.fadeOut(0);
            obj.on("mouseenter focusin",function(){
                __controll.opacity("in");
            });
            obj.on("mouseleave focusout",function(){
                __controll.opacity("out");
            });
        }

        // 제스쳐 추가
        var mouseCheck = false;
        var moveCheck = false;
        var _x = "";
        var _l = 50;//감도
        var arrows = "";
        
        
        obj.find(">.scroll").on("mousedown",function(e){
            _x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
            console.log(scrollX)
            mouseCheck = true;
            moveCheck = false;
            return false;
        });
        obj.find(">.scroll").on("mousemove",function(e){
            if(mouseCheck){
                var l = _l;
                moveCheck = true;
            
                var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
                    x = x - _x;

                if(x > 0) l = l*-1;
                
                obj.find(">.scroll").scrollLeft(obj.find(">.scroll").scrollLeft()+l);
                e.stopPropagation();
            }
            return false;
        });
        $(document).on("mouseup",function(e){
            mouseCheck = false;
            moveCheck = false;
            return false;
        });
    },
    init:function(str){
        for(var i=0; i<str.find(' [data-skin="scroll"]').length; i++){
            this.set(str.find(' [data-skin="scroll"]').eq(i));
        }
    }    
}
