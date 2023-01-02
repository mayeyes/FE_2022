$(function(){
    gnb.init();
});

var gnb = {
    set:function(str){
        $("<span />").appendTo(str);
        var _this = this;
        var obj = str;
            obj.btn = obj.find(">ul>li>a");
            obj.idx = (obj.find(" strong").length !== 0)?obj.find(">ul>li").index(obj.find(" strong").parent().parent()):0;
            obj.shadow = obj.find(">span");

        setTimeout(function(){_this.move(obj);},300);

        obj.btn.on("click",function(){
            obj.idx = obj.btn.index($(this));
            _this.move(obj);
            // return false;
        });
    },
    move:function(obj){
        var l = obj.find(">ul>li:eq("+obj.idx+")").position().left;
        var w = obj.find(">ul>li:eq("+obj.idx+")").innerWidth();
        obj.shadow.css({"left":l+"px","width":w+"px"});

        for(var i=0; i<obj.find(">ul>li").length; i++){
            if(obj.idx === i){
                $("<strong>"+obj.find('>ul>li:eq('+i+')>a').text()+"</strong>").appendTo(obj.find(">ul>li:eq("+i+")>a").empty());
            } else {
                $("<span>"+obj.find('>ul>li:eq('+i+')>a').text()+"</span>").appendTo(obj.find(">ul>li:eq("+i+")>a").empty());
            }
        }

        //page.bind(obj.idx);
    },
    init:function(){
        for(var i=0; i<$("#gnb").length; i++){
            this.set($("#gnb").eq(i));
        }
    }
}
