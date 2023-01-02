$(function(){
    //common
    if($("body#main").length === 1){
        //main
        type4_notice_AC();
    } else {
        //sub
    }
});

function type4_notice_AC(){
    function _set(str){
        var obj = str;
            obj.btn_next = obj.find(" .btn_next");
            obj.ul = obj.find(" .midd>ul");
            obj.li = obj.ul.find(">li");
            obj.w = obj.li.eq(0).innerWidth() + parseInt(obj.li.css("margin-right"));

        
        function _point(idx){
            obj.li.removeClass("on").eq(idx).addClass("on");
        }
        _point(0);
        function _move(){
            if(obj.ul.is(":animated")) return false;
            obj.li = obj.ul.find(">li");
            var l = obj.w * -1;
            _point(1);
            obj.ul.animate({"left":l+"px"},600,function(){
                obj.li.eq(0).appendTo(obj.ul);
                obj.ul.css("left","0");
            });
        }
        obj.btn_next.on("click",function(){
            _move();
            return false;
        });
    }
    for(var i=0; i<$("#notice").length; i++){
        _set($("#notice").eq(i));
    }
}