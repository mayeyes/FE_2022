/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main section 높이 설정

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    sec_height();
});
function sec_height(){
    var obj = $('[id*="sec"]');
        obj.sizes = 0;
    for(var i= 0; i<obj.size(); i++){
        obj.sizes = obj.eq(i).find(">.inner .text_box .layout >div").size();
        
        if(obj.sizes != 0){
            if(obj.eq(i).find(">.inner").size() != 1){
                obj.eq(i).find(".inner").css("height", ((obj.sizes / obj.eq(i).find(".inner").size()) * 100)+"vh");
            }else obj.eq(i).find(".inner").css("height", (obj.sizes * 100)+"vh");
        }
    }
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	스크롤 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    layout_scroll_AC();
    //$('[data-flow="slide"] .text_box .js_slide .move >ul >li >div').removeAttr("data-fixed","yes");
});
function layout_scroll_AC(){
    $("body").attr("data-scroll-count", "0");
    $('[data-view-scroll="box"]').on("scroll",function(){
                
        var t = 0;
        var arr = [];
        for(var i = 0; i< $('[data-view-scroll="box"]').size(); i++){
            if(i+1 < 10){
                arr.push("sec0"+ (i+1));  
            }else{
                arr.push("sec"+ (i+1));  
            }
        }

        var cnt = 0;
        for(var i=0; i<arr.length; i++){
            var ob = $('[data-view-scroll="box"] #'+arr[i]);
            var t2 = (t - ob.offset().top) + $(window).height();
            var step = Math.floor((ob.find(".inner").position().top * -1) / ob.innerHeight() * 100);
            var scale = "";
            var origin_x = "";
            var origin_y = "";

            var n_width = document.getElementById("bg_img").naturalWidth;
            var n_height = document.getElementById("bg_img").naturalHeight; 
            
            
            if(ob.offset().top == 0){    
                console.log(step, ob.find(".inner").size());
                if(ob.find(".inner").size() > 1){
                    step = Math.floor((step / (ob.find(".inner").size() - 1)) / 10);
                }else if(ob.find(".inner").size() == 1 && ob.find(".in").size() > 1){
                    step = Math.floor((step / (ob.find(".in").size() - 1)) / 10);
                }else{
                    if(step < 10) step = 0;
                    else step = Math.floor(step / 10);
                }
                ob.attr("data-steps",step);
                ob.find(".steps >span").removeClass("on");
                ob.find(".steps >span").eq(step-1).addClass("on");

                scale = ob.find(".steps >span").eq(step-1).attr("data-transform-scale");
                origin_x = ob.find(".steps >span").eq(step-1).attr("data-transform-origin-x");
                origin_y = ob.find(".steps >span").eq(step-1).attr("data-transform-origin-y");
                if(scale != undefined && origin_x != undefined && origin_y != undefined){

                }else{
                    scale = 1;
                }
                
                

                ob.find(".img_box").css({'transform':'scale('+ scale +')','-webkit-transform':'scale('+ scale +')', "transform-origin":""+ ((origin_x / n_width)*100)  +"% "+ ((origin_y / n_height )*100) + "%", "-webkit-transform-origin":""+ ((origin_x / n_width)*100)  +"% "+ ((origin_y / n_height )*100) + "%" });
                //ob.parent().parent().attr("data-scroll-count",i);
                
                if($('[data-fixed="yes"]').hasClass("img_step2")){
                    var scales = ($('.img_step2 .fix_box .steps span').eq(1).attr("data-transform-scale"));
                    var xs = ($('.img_step2 .fix_box .steps span').eq(1).attr("data-transform-origin-x"));
                    var ys = ($('.img_step2 .fix_box .steps span').eq(1).attr("data-transform-origin-y"));
                    //console.log(scales,xs,ys);
                    for(var i=2; i<10; i++){
                        $('.img_step2 .fix_box .steps span').eq(i).attr("data-transform-scale",scales);
                        $('.img_step2 .fix_box .steps span').eq(i).attr("data-transform-origin-x",xs);
                        $('.img_step2 .fix_box .steps span').eq(i).attr("data-transform-origin-y",ys);
                        //console.log(i);
                    }
                }
            } 
        }
        
    });
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	mobile check Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	mobile_check_AC();
	$(window).resize(function(){
		mobile_check_AC();
	});
});

function mobile_check_AC(){
	var ch = "";

	if($(".js_mobile_check").is(":hidden") && $(".js_tablet_check").is(":hidden")){
		ch = "pc";
	} else if($(".js_mobile_check").is(":hidden") && !$(".js_tablet_check").is(":hidden")){
		ch = "tab";
	} else {
		ch = "mobile";
	}

	if(!$("body").hasClass(ch)){
		if(ch == "mobile") $("body").removeClass("pc tab");
		if(ch == "tab") $("body").removeClass("pc mobile");
		if(ch == "pc") $("body").removeClass("tab mobile");
		$("body").addClass(ch);
	}
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	셀랙트 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("[data-skin='select']").size() != 0){
		selectbox_AC();		
	}
});

function selectbox_AC (){
	var obj = $("[data-skin='select']"); 

	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">a"); 
			t.ul = t.find(">ul"); 
			t.ul.li = t.ul.find(">li"); 
		
			
	    
		t.btn.on("click",function() {
			if(t.ul.is(":animated")) return false;
			$(this).parent().siblings("div").find(">a.on").removeClass("on").siblings("ul").slideUp(300);
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			return false;
		});
	    
	    t.ul.li.find(">a").on("click",function() {
	        $(this).parent().siblings().find(">a.on").removeClass("on");
	        $(this).addClass("on");
	        t.btn.html($(this).find(">span").clone());
	        t.find(">input").attr("value",t.btn.text());
	        t.find(">ul").slideUp(300);
            
            return false;
	    });
		
	    
	    
		t.ul.on("mouseleave",function() {
			$(this).parent().find(">a").removeAttr("class");
			$(this).parent().find(">div").slideUp(300);
			return false;
		});
		
		/*t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			return false;
		});	*/	
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	MainFullpage

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(function(){
	if($("body#main").size() != 0){
    	MainFull();
	}
});
function MainFull(){
    var obj = $("#fullpage");
        obj.move = obj.find(">.move");
        obj.box = obj.move.find(">[data-page]");
        obj.sc = "";
        obj.page = 0;

    $('<div class="controll"><div class="layout"><span></span></div></div>').appendTo(obj);
    

    function _page(idx){
        //$("body").attr("data-pullpage",idx);
        //obj.find(">.controll>.layout>a").removeClass("on").eq(idx).addClass("on");
        obj.find(">.controll>.layout>span").css("width",((100 / obj.box.size() + 1) * idx) + "%");
        obj.page = idx;
    }
    function _move(idx){
        if(obj.move.is(":animated")) return false;
        var arrowCheak = "down";
        if(idx < obj.page) arrowCheak = "up";
        //console.log(ch);

        //check
        //var _box = obj.move.find(">[data-page='"+(obj.page+1)+"']"); 
        var _box = obj.move.find(">[data-page='"+(obj.page+1)+"']");
        var h = obj.move.innerHeight();
        var s_h = _box[0].scrollHeight;
        //console.log(h,s_h);
        if(h < s_h){
            //스크롤있다
            var s_t = _box.scrollTop();
            var s_b = s_h - h - s_t;

            if((arrowCheak == "up" && s_t == 0) || (arrowCheak == "down" && s_b == 0)){
            } else {
                return false;
            }
        }

        if($("body").attr("data-pullpage") == "max" && idx == obj.box.size()-2){
            idx = obj.box.size()-1;
            $("body").removeAttr("data-pullpage");
        }
        if(idx > obj.box.size()-1){
            idx = obj.box.size()-1;
            //footer 출현
            $("body").attr("data-pullpage","max");
        } else {
            $("body").removeAttr("data-pullpage");
            if(idx < 0) idx = 0;
            $("body").attr("data-pagenumber",idx);
        }
        if(idx < 0) idx = 0;
        var t = -100 * idx;

        obj.move.animate({"top":t+"%"},700);
        obj.attr("data-scroll-count",(t / -100));
        setTimeout(function(){
            obj.move.find(">div").removeAttr("data-steps");
            obj.move.find(">div").eq(t / -100).attr("data-steps",+"0");
        },700);
        
        //page
        _page(idx);
    }
    _move(0);
    $("body").on('mousewheel DOMMouseScroll', function (e) {
        var x = e.originalEvent.wheelDelta || ((e.originalEvent.deltaY * -1) || (e.originalEvent.detail * -1));
        var idx = (x<0) ? obj.page+1:obj.page-1;
        _move(idx);
    });

    obj.find(">.controll>.layout>a").on("click",function(){
        var idx = obj.find(">.controll>.layout>a").index($(this));
        _move(idx);
    });
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	배경이미지

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(function(){
	if($("body#main").size() != 0){
    	main_slide_bg();
        //main_slide_bg02()
	}
});
function main_slide_bg(){
    var obj = $('[data-slide="yes"] .text_box .js_slide .move ul li');
        obj.imgsrc = '';
    for(var i= 0; i<obj.size(); i++){
        if(!obj.eq(i).find(">div").hasClass(".gallery")){
            obj.imgsrc = obj.eq(i).find(">a >img").attr("src");
            obj.eq(i).find(">div").css("background-image","url(" + obj.imgsrc + ")");
        }else{
            
        }
        
    }
}



window.scrollTo({ top: 0, behavior: 'smooth' })

/*
function main_slide_bg02(){
    var obj = $('[data-fixed="yes"] .inner .fix_box .img_box');
        obj.imgsrc = '';
        obj.imgsrc = obj.find(".bgimg").attr("src");
        
        obj.css("background-image","url(" + obj.imgsrc + ")");
}
*/
