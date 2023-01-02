var _scrollAC = {
    set:function(str){
        var obj = str;
            obj.box = obj.find('>[data-scroll-ac^="box-"]');
        var __controll;

        __controll = {
            scroll:function(){
                var wt = $(window).scrollTop() + $(window).innerHeight();
                for(var i=0; i<obj.box.length; i++){
                    var y = wt - obj.box.eq(i).offset().top;
					var _y = $(window).scrollTop() - obj.box.eq(i).offset().top;
                    var h = obj.box.eq(i).innerHeight();
                    var per = ~~(y / h * 100);
					if(per > 100) per = 100;

					var a = ~~(per/10);
					var b = (a === 0 && _y < 0) ? 0:per;
                    obj.box.eq(i).attr("data-per",a);
                    obj.box.eq(i).attr("data-per-num",b);
                }
            }
        }
        __controll.scroll();

        $(window).on("scroll",function(){__controll.scroll();});
    },
    init:function(){
        if($('[data-scroll-ac="wrap"]').length !== 0){
            this.set($('[data-scroll-ac="wrap"]'));
        }
    }
}
$(function(){
    _scrollAC.init();
});