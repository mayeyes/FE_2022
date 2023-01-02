/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Top Menu Function
	
	ex)
	var Tmenu_code = "0101";//메뉴코드
	Tmenu_setting(Tmenu_code);//실행	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function Tmenu_setting(str){
	var params = str;
	var code = new Array();
		
	code[0] = parseInt(params.substr(0,2)) -1; //eq(n) n번지수 찾기
	code[1] = parseInt(params.substr(2,2)) -1; //eq(n) n번지수 찾기
	code[2] = parseInt(params.substr(4,2)) -1; //eq(n) n번지수 찾기
	
	var gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("#header #nav"); 
		gnb_obj.blind = $("#nav > #blind"); 
		
	//default
	gnb_obj.li.each(function(e){
		$(this).addClass("num"+(e+1));	
	});
	
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		var headerTop = $("#header #top_util").height();
		
		if($(".js_mobile_check").is(":hidden")){
			if (winTop > headerTop) {
				$("#header, #popupzone").addClass("fixed");	
			} else if (winTop <= headerTop) {
				$("#header, #popupzone").removeClass("fixed");	
			}
		}
	})
	
	setTimeout(function(){
		gnb_def();
	},100);
	
	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});	
	
	gnb_obj.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},300);
	});
		
	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());
		gnb_open(idx);
	});
	
	gnb_obj.li.ul.mouseenter(function(){
		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).siblings("a").addClass("on");
		gnb_obj.li.ul.not($(this)).removeClass("on");
		$(this).addClass("on");
	});
	
	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});	
	
	gnb_obj.li.eq(8).find(">ul>li").last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},200);
	});
	
	function gnb_def(){
		gnb_obj.find("a").removeClass("on");
		if(code[0] >= 0){
			var obj = gnb_obj.li.eq(code[0]); 
			obj.find(">a").addClass("on");
			if(code[1] >= 0){
				var obj = obj.find(">ul>li").eq(code[1]);	
				obj.find(">a").addClass("on");	
			}
		}
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":60+"px"},300);
	}
	
	function gnb_open(idx){
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.height(gnb_obj.maxH).show().stop().animate({"opacity":1},300);
		gnb_obj.maxH = gnb_obj.maxH + 60;
		gnb_obj.h.stop().animate({"height":gnb_obj.maxH+"px"},300);
		gnb_obj.blind.stop().animate({"height":100+"%"},300);
	}
	
	
	//Sitemap
	$('<div id="slide_map"><div class="box"><strong class="title">전체메뉴보기</strong><div class="binds"></div><a href="#" class="close">닫기</a></div><span class="blind"></span></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.box > .binds"));
	
	$(".all_menu, .mob_btn").click(function(){
		if($(".js_mobile_check").is(":hidden")){
			$("#slide_map").show().stop().animate({"opacity":1},300,function(){
				$("#slide_map .box ul li:eq(0)").find(">a").focus();	
			});
			$("#slide_map >.box").css({"height":($(window).height() - 178) +"px","top":89+"px"});
			$(".binds").height($("#slide_map >.box").height() - $("#slide_map .box .title").innerHeight() - 50);
		} else {
			$("#slide_map").show().stop().animate({"opacity":1},300,function(){
				$(this).find(">.box").stop().animate({"right":0},300);
			});
			$("#wrap").height($(window).height());
		}
		return false;
	});

	$("#slide_map .box .close").click(function(){
		if($(".js_mobile_check").is(":hidden")){
			$("#slide_map").stop().animate({"opacity":0},300,function(){
				$(this).hide();
				$("#slide_map >.box").removeAttr("style");
				$(".all_menu").focus();	
			});
			
			$(".binds").removeAttr("style");	
		} else {
			$("#slide_map").find(">.box").stop().animate({"right":-100+"%"},300,function(){
				$(this).parent().stop().animate({"opacity":0},300,function(){
					$(this).hide();	
				});
			});	
			$("#wrap").removeAttr("style");
		}
		return false;
	});
	
	$(window).resize(function(){
		if($("#slide_map").is(":visible")){
			if($(".js_mobile_check").is(":hidden")){
				$("#slide_map").find(">.box").css({"right":50+"%","height":($(window).height() - 178) +"px","top":89+"px"});
				$(".binds").height($("#slide_map >.box").height() - $("#slide_map .box .title").innerHeight() - 50);	
			} else {
				$("#slide_map").find(">.box").css({"right":0});
				$("#wrap, .binds").height($(window).height());	
			}
		} else {
			if($(".js_mobile_check").is(":hidden")){
				$(".binds").removeAttr("style");	
				$("#slide_map").find(">.box").removeAttr("style");
			} else {
				$("#slide_map").find(">.box").css({"right":-100+"%"});
				$("#wrap").removeAttr("style");		
			}	
		}
	});	


	//Mobile Menu
	var mob_gnb_obj = $("#slide_map"); 
		mob_gnb_obj.box = mob_gnb_obj.find(">.box"); 
		mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds"); 
		mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
		mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");	

	//def
	mob_def();
	$(window).resize(function(){
		mob_def();	
	});	
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("on");
		//mob_gnb_obj.box.gnb.ul.li.ul.hide();
		if(code[0] >= 0){
			var obj = mob_gnb_obj.box.gnb.ul.li.eq(code[0]); 
			obj.find(">a").addClass("on");
			if(code[1] >= 0){
				var obj = obj.find(">ul>li").eq(code[1]);	
				obj.parent().show();
				obj.find(">a").addClass("on");
				if(code[2] >= 0){
					var obj = obj.find(">ul>li").eq(code[2]);	
					obj.parent().show();
					obj.find(">a").addClass("on");
				}
			}
		}
	}
	
	
	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle();
			return false;	
		} else {
			return true;	
		}
	});
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle();
			return false;
		} else {
			return true;	
		}
	});
	
	$(".binds").mCustomScrollbar({
		theme:"light"
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_lnbToggle Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#lnb").size() != 0){
		js_lnb();
	}
});
function js_lnb (){
	var lnb_obj = $("#lnb");
		lnb_obj.li = lnb_obj.find(">li");
		lnb_obj.li.a = lnb_obj.li.find(">a");
	
	lnb_obj.li.a.click(function(){
		var cnt = $(this).parent().find("> ul >li").size();
		if(cnt > 0){	
			if($(this).parent().find("> ul").size() > 0){
				if(lnb_obj.li.find(">a.on").size() > 0){
					lnb_obj.li.find(">a.on").removeAttr("class").parent().find("> ul").slideUp(300,function(){
						$(this)	.removeAttr("style");
					});
				}
				if($(this).parent().find(">ul").is(":hidden")){
					$(this).addClass("on").parent().find(">ul").slideDown(300);
				}
				return false;
			} else {
				return true;	
			}
		}else{
			return true;
		}
	});
	
	$(window).resize(function(){
		lnb_obj.li.a.removeClass("on")
		lnb_obj.li.find("ul").removeAttr("style");
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Aside Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	
	//setTimeout(function(){
		if($(".js_mobile_check").is(":hidden")){
			$("#aside").height(100+"%");
			$(window).resize(function() {
				$("#aside").height(100+"%");
			});		
		}
	//},2000);
	
	
	$(".aside_btn").click(function(){
		if($(".js_mobile_check").is(":visible")){
			$('<div id="aside_mobile"><div class="box"><strong class="title">퀵메뉴보기</strong><div class="binds"></div><a href="#" class="close">닫기</a></div><span class="blind"></span></div>').prependTo($("#wrap"));
			$("#aside >.menu").clone(false).appendTo($("#aside_mobile >.box > .binds"));
			
			$("#aside_mobile").show().stop().animate({"opacity":1},300,function(){
				$(this).find(">.box").stop().animate({"right":0},300);
			});
			$("#wrap").height($(window).height());
		}
		
		$("#aside_mobile .box .close").click(function(){
			if($(".js_mobile_check").is(":visible")){
				$("#aside_mobile").find(">.box").stop().animate({"right":-100+"%"},300,function(){
					$(this).parent().stop().animate({"opacity":0},300,function(){
						$(this).remove();	
					});
				});	
				$("#wrap").removeAttr("style");
			}
			return false;
		});
		
		$(window).resize(function(){
			if($("#aside_mobile").is(":visible")){
				$("#wrap").height($(window).height());
			}	
		});
		
		$(".binds").mCustomScrollbar({
			theme:"light"
		});
		return false;
	});
});




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_layerpop Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#popupzone").size() != 0){
		js_popupzone();
	}
});
function js_popupzone (){
	var layerpop_obj = $("#popupzone");
		layerpop_obj.btn = layerpop_obj.find(">.state_btn");
		layerpop_obj.box = layerpop_obj.find(">.box");  
		layerpop_obj.box.prev = layerpop_obj.box.find(">.control >.prev_btn"); 
		layerpop_obj.box.next = layerpop_obj.box.find(">.control >.next_btn"); 
		layerpop_obj.box.slider = layerpop_obj.box.find(">.slider >ul"); 
		layerpop_obj.box.slider.elem = layerpop_obj.box.slider.find(">li"); 
		layerpop_obj.box.todays = layerpop_obj.box.find("input[type='checkbox']");
	var dir = ""; 	
	
	//default
	/*
	layerpop_obj.btn.addClass("on").find(">span.txt").html("팝업닫기");
	$("#header").css({"z-index":71});
	layerpop_obj.box.show().stop().animate({"opacity":1},500,"easeInOutExpo");
	*/
	
	layerpop_obj.btn.find(">span>strong").text(layerpop_obj.box.slider.elem.size());
	if(layerpop_obj.box.slider.elem.size() <= 0){
		layerpop_obj.remove();	
	} else if(layerpop_obj.box.slider.elem.size() == 1) {
		layerpop_obj.box.prev.hide();	
		layerpop_obj.box.next.hide();	
	}
	
	layerpop_obj.btn.click(function(){
		if(layerpop_obj.box.slider.elem.size() <= 0) return false;
		if(layerpop_obj.box.is(":animated")) return false;
		if(!$(this).hasClass("on")){
			$(this).addClass("on").find(">span.txt").html("팝업닫기");
			$("#header").css({"z-index":71});
			layerpop_obj.box.show().stop().animate({"opacity":1},500,"easeInOutExpo");
			$('img[usemap]').rwdImageMaps();
		} else {
			$(this).removeClass("on").find(">span.txt").html("팝업 <strong>"+layerpop_obj.box.slider.elem.size()+"</strong>건");
			layerpop_obj.box.stop().animate({"opacity":0},500,"easeInOutExpo",function(){
				$("#header").removeAttr("style");
				$(this).hide();		
			});	
		}
		return false;	
	});	
	
	layerpop_obj.box.prev.click(function(){
		layerpop_dir (layerpop_obj,"prev");
		return false;	
	});	
	
	layerpop_obj.box.next.click(function(){
		layerpop_dir (layerpop_obj,"next");
		return false;	
	});	 
	
	layerpop_obj.box.todays.click(function(){
		$.cookie('lay_pop', 'ok', {expires:1});
		layerpop_obj.btn.removeClass("on").find(">span.txt").html("팝업 <strong>"+layerpop_obj.box.slider.elem.size()+"</strong>건");
		layerpop_obj.box.stop().animate({"opacity":0},500,"easeInOutExpo",function(){
			$("#header").removeAttr("style");
			$(this).hide();	
			layerpop_obj.box.todays.attr("checked", false);	
		});	
		
	});
	if($.cookie('lay_pop') != "ok"){
		setTimeout(function(){pop_start(layerpop_obj);},200);
	}
}
function pop_start(layerpop_obj){
	if(layerpop_obj.is(":hidden")) return false;
	layerpop_obj.btn.addClass("on").find(">span.txt").html("팝업닫기");
	$("#header").css({"z-index":71});
	layerpop_obj.box.show().stop().animate({"opacity":1},500,"easeInOutExpo");
	$('img[usemap]').rwdImageMaps();
	return false;
}
function layerpop_dir (layerpop_obj,dir){
	if(layerpop_obj.box.slider.is(":animated")) return false;
	if(dir == "next"){
		var elem_pos = layerpop_obj.box.slider.find(">li:eq(1)").position().left;  
		layerpop_obj.box.slider.stop().animate({"left":-elem_pos+"px"},600,"easeInOutExpo",function(){
			layerpop_obj.box.slider.css({"left":0});
			layerpop_obj.box.slider.find(">li").first().appendTo(layerpop_obj.box.slider);	 
		});
	} else if(dir == "prev"){
		var elem_pos = layerpop_obj.box.slider.find(">li:eq(1)").position().left;  
		layerpop_obj.box.slider.css({"left":-elem_pos+"px"});
		layerpop_obj.box.slider.find(">li").last().prependTo(layerpop_obj.box.slider);
		layerpop_obj.box.slider.stop().animate({"left":0+"px"},600,"easeInOutExpo");	
	}
}  



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_visual Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($(".slider").size() != 0){
		js_visual();
	}
});
function js_visual(){
    var slide = $(".slider > .cont_mar");
    slide.controls = slide.find(">.control");
    slide.counts = slide.controls.find(">.count");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.btn_play = slide.controls.find(">.btn_play");
    slide.btn_stop = slide.controls.find(">.btn_stop");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 500;
    slide.autos = "Y";
    slide.times = "";
    slide.times_speeds = 8000;
    slide.nums = 1;

    //제어
    if(slide.li.size() < 2){
        slide.controls.remove();
        return false;
    }
	if(slide.li.first().hasClass("video")){
		if(slide.li.first().find("iframe")[0]) slide.li.first().find("iframe")[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
	}

    //심볼
    $("<ul></ul>").prependTo(slide.controls);
    for(var i=0; i<slide.li.size(); i++){
        $('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
    }
    slide.simbols = slide.controls.find(">ul>li");
    slide.simbols.eq(0).find(">a").addClass("on");

    //넘버링
    for(var i=0; i<slide.li.size(); i++){
        slide.li.eq(i).attr("data-count",(i+1));
    }
 
    //총 카운트 적용
    slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
 
    //버튼 : 다음
    slide.btn_right.click(function(){
        slide.btn_stop.click();
        movement("right");
        return false;
    });
 
    //버튼 : 이전
    slide.btn_left.click(function(){
        slide.btn_stop.click();
        movement("left");
        return false;
    });
 
    //버튼 : 재생
    slide.btn_play.click(function(){
        slide.btn_play.hide();
        slide.btn_stop.css("display","inline-block");
        slide.autos = "Y";
        slide.times = setTimeout(function(){
            movement("right");
        },slide.times_speeds);
        return false;
    });
 
    //버튼 : 정지
    slide.btn_stop.click(function(){
        slide.btn_stop.hide();
        slide.btn_play.css("display","inline-block");
        slide.autos = "N";
        clearTimeout(slide.times);
        return false;
    });
 
    //버튼 : 심볼
    slide.simbols.find(">a").click(function(){
        if($(this).hasClass("on")) return false;
        var idx = slide.simbols.index($(this).parent());
        slide.btn_stop.click();
        movement(idx);
        return false;
    });
 
    //자동재생
	if(slide.autos == "Y"){
		slide.btn_play.click();	
	} else {
		
	}  
	
    //animate
    function movement(ty){
        slide.li = slide.ul.find(">li");
 
        var olds = 0;
        var news = 0;
 
        if(ty == "right"){
            //다음
            olds = slide.nums;
            news = slide.nums + 1;
 
            if(news >= slide.li.size()) news = 0;
        } else if(ty == "left"){
            //이전
            olds = slide.nums;
            news = slide.nums - 1;
 
            if(news < 1) news = slide.li.size();
        } else {
            //심볼클릭
            olds = slide.nums;
            news = ty+1;
            if(news >= slide.li.size()) news = 0;
        }
 
        if(slide.li.eq(news-1).is(":animated")) return false;
		slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
            slide.li.eq(olds-1).css("left","100%");
			if(slide.autos == "Y"){
                slide.times = setTimeout(function(){
                    movement("right");
                },slide.times_speeds);
            }
        });
 
        slide.li.eq(news-1).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
        });
 
        slide.nums = news;
 
        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
 
        //심볼
        slide.simbols.find(">a.on").removeClass("on");
        slide.simbols.eq(slide.nums-1).find(">a").addClass("on");

		//비디오
		$(".video >iframe").each(function(){
			$(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		});
		var idx = slide.simbols.find(">a.on").parent().index();
		if(slide.li.eq(idx).find("iframe")[0]) slide.li.eq(idx).find("iframe")[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }	
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

news_slider Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
if($(".news_slider").size() != 0){
	news_slider();
}
});
function news_slider(){
var slide = $(".news_slider > .cont_mar");
slide.controls = slide.find(">.control");
slide.counts = slide.controls.find(">.count");
slide.btn_left = slide.controls.find(">.btn_left");
slide.btn_right = slide.controls.find(">.btn_right");
slide.btn_play = slide.controls.find(">.btn_play");
slide.btn_stop = slide.controls.find(">.btn_stop");
slide.moves = slide.find(">.move");
slide.ul = slide.moves.find(">ul");
slide.li = slide.ul.find(">li");
slide.a = slide.ul.find(">li>a");
slide.speeds = 500;
slide.autos = "Y";
slide.times = "";
slide.times_speeds = 8000;
slide.nums = 1;

//제어
if(slide.li.size() < 2){
    slide.controls.remove();
    return false;
}	

//심볼
$("<ul></ul>").prependTo(slide.controls);
for(var i=0; i<slide.li.size(); i++){
    $('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
}
slide.simbols = slide.controls.find(">ul>li");
slide.simbols.eq(0).find(">a").addClass("on");

//넘버링
for(var i=0; i<slide.li.size(); i++){
    slide.li.eq(i).attr("data-count",(i+1));
}

//총 카운트 적용
slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

//버튼 : 다음
slide.btn_right.click(function(){
    slide.btn_stop.click();
    movement("right");
    return false;
});

//버튼 : 이전
slide.btn_left.click(function(){
    slide.btn_stop.click();
    movement("left");
    return false;
});

//버튼 : 재생
slide.btn_play.click(function(){
    slide.btn_play.hide();
    slide.btn_stop.css("display","inline-block");
    slide.autos = "Y";
    slide.times = setTimeout(function(){
        movement("right");
    },slide.times_speeds);
    return false;
});

//버튼 : 정지
slide.btn_stop.click(function(){
    slide.btn_stop.hide();
    slide.btn_play.css("display","inline-block");
    slide.autos = "N";
    clearTimeout(slide.times);
    return false;
});

//버튼 : 심볼
slide.simbols.find(">a").click(function(){
    if($(this).hasClass("on")) return false;
    var idx = slide.simbols.index($(this).parent());
    slide.btn_stop.click();
    movement(idx);
    return false;
});

//자동재생
if(slide.autos == "Y"){
	slide.btn_play.click();	
} else {
	
}  

//animate
function movement(ty){
    slide.li = slide.ul.find(">li");

    var olds = 0;
    var news = 0;

    if(ty == "right"){
        //다음
        olds = slide.nums;
        news = slide.nums + 1;

        if(news >= slide.li.size()) news = 0;
    } else if(ty == "left"){
        //이전
        olds = slide.nums;
        news = slide.nums - 1;

        if(news < 1) news = slide.li.size();
    } else {
        //심볼클릭
        olds = slide.nums;
        news = ty+1;
        if(news >= slide.li.size()) news = 0;
    }

    if(slide.li.eq(news-1).is(":animated")) return false;
	slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
        slide.li.eq(olds-1).css("left","100%");
		if(slide.autos == "Y"){
            slide.times = setTimeout(function(){
                movement("right");
            },slide.times_speeds);
        }
    });

    slide.li.eq(news-1).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
    });

    slide.nums = news;

    //총 카운트 적용
    slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

    //심볼
    slide.simbols.find(">a.on").removeClass("on");
    slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
}	
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

Sub_visual Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#visual").size() != 0){
		sub_visual();
	}
});
function sub_visual(){
	var t = $("#visual h2").text();
	
	if(t == "수시모집"){
		$("#visual").addClass("bg1");	
	} else if (t == "학생부종합"){
		$("#visual").addClass("bg2");		
	} else if (t == "중고교연계프로그램"){
		$("#visual").addClass("bg3");		
	} else if (t == "정시모집"){
		$("#visual").addClass("bg4");		
	} else if (t == "편입학"){
		$("#visual").addClass("bg5");		
	} else if (t == "약학대학"){
		$("#visual").addClass("bg6");		
	} else if (t == "재외국민/외국인"){
		$("#visual").addClass("bg7");		
	} else if (t == "입시도우미"){
		$("#visual").addClass("bg8");		
	} else if (t == "대학정보"){
		$("#visual").addClass("bg9");		
	} else if (t == "이용안내"){
		$("#visual").addClass("bg10");		
	} else if (t == "마이페이지"){
		$("#visual").addClass("bg11");		
	}
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

viewPdfjs Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($(".pdf_viewer").size() != 0){
		pdf_view_AC();
		pdf_set_AC();
	}
	});
	function viewPdfjs(n) {
	var objDoc = $(".pdf_iframe").get(0).contentWindow;
	objDoc.PDFView.page = n;
	}
	function pdf_set_AC(){
	$(".pdf_viewer >.tab ul > li > a").click(function(){
		$(".pdf_viewer >.tab ul > li").removeClass("ov");
		$(this).parent().addClass("ov");
		return false;
	});
	}
	function pdf_view_AC(){
	var obj = $(".pdf_iframe");
		obj.interval = "";
	var objDoc = $(".pdf_iframe").get(0).contentWindow;
	var num = $(".pdf_viewer > .tab").height();
	
	obj.height(num);
	$(".pdf_viewer").height(num);
	
	obj.interval = setInterval(function(){
		clearInterval(obj.interval);
		var ob = obj.contents().find("#pageContainer1");
		var h = ob.height() + 50;
		obj.css({"height":h+"px"});
		
		/*
		var ob = obj.contents().find("#pageContainer1");
		if($.trim(ob.text()) != ""){		
			clearInterval(obj.interval);
			obj.contents().find(" #pageAutoOption").click();
			ob = obj.contents().find("#pageContainer1");
			var h = ob.height() + 50;
			
			obj.css({"height":h+"px"});
		}
		*/
	},2000);
	
	$(objDoc).resize(function(){
		var obj = $(".pdf_iframe");
		var h = obj.contents().find("#pageContainer1").height() + 50;
		
		$(".pdf_viewer > .tab").css({"height":h+"px"});
		obj.css({"height":h+"px"});
		$(".pdf_viewer").height(h);
		/*
		if(num < h){
			$(".pdf_viewer").height(h);
		}
		if($(".pdf_viewer > .tab").is(":hidden")){
			obj.height(h);
			$(".pdf_viewer").height(h);
		}
		*/
	});
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

js_pdf_toggle Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".history_pdf").size() != 0){
		js_pdf_toggle ();
	}
});
function js_pdf_toggle (){
	var pdf_toggle_obj = $(".history_pdf");	
		pdf_toggle_obj.a = pdf_toggle_obj.find(">dt >a"); 
		pdf_toggle_obj.list = pdf_toggle_obj.find(">dd"); 
		
	pdf_toggle_obj.a.click(function(){
		if(pdf_toggle_obj.list.is(":hidden")){
			$(this).addClass("on");
			pdf_toggle_obj.list.slideDown(300);	
		} else {
			$(this).removeAttr("class");
			pdf_toggle_obj.list.slideUp(300);		
		}
		
		return false;	
	});	 
}	




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Print Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$("a.print").click(function() { //이벤트 발생시킬 버튼 아이디
		printElem({ 
			printMode: 'popup',
			pageTitle:'프린트 미리보기', //팝업 타이틀
			leaveOpen:false, //인쇄하고도 창을 띄우기(true)/안띄우기(false). Default는 false
			printBodyOptions : {
				classNameToAdd : 'user',
				styleToAdd: 'width:1023px; overflow-x:hidden;'
			}
		});
		return false;
	});
});

function printElem(options){	
	$('#contents').printElement(options); //팝업으로 띄울 영역 Div 아이디
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_scrollTop Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	js_scrollTop ();
});
function js_scrollTop (){	
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		var headerTop = $("#header").height();
		
		if (winTop > headerTop) {
			if($(".js_mobile_check").is(":hidden")){
				$(".top_btn").show().stop().animate({"right":20+"px","opacity":0.6},300,"easeOutCubic");	
			} else {
				$(".top_btn").show().stop().animate({"right":3+"%","opacity":0.6},300,"easeOutCubic");	
			}
		} else if (winTop <= headerTop) {
			$(".top_btn").stop().animate({"right":-60+"px","opacity":0},300,"easeOutCubic",function(){
				$(this).hide();	
			});
		}
	});	
	$(".top_btn a").click(function(){
		$("body,html").stop().animate({"scrollTop":"0"},600,"easeOutCubic");
		return false;
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

js_scroll Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".js_scroll").size() != 0){
		js_scroll();
	}
	});
	function js_scroll (){
	$(".js_scroll").mCustomScrollbar({
		theme:"light"
	});	
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

js_program Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
if($(".program_toggle").size() != 0){
	js_program ();
}
});
function js_program (){
	var program_obj = $(".program_toggle");	
		program_obj.dt = program_obj.find(">dt >a");
		program_obj.dd = program_obj.find(">dd");
		program_obj.dd.check = program_obj.dd.find(">ul >li >.check");  	
	
	//program_obj.dt.first().addClass("on");
	//program_obj.dd.first().show();
		
	program_obj.dt.click(function(){
		if(program_obj.dd.is(":animated")) return false;
		
		program_obj.dt.removeClass("on");
		program_obj.dd.slideUp(300);
		if($(this).parent().next().is(":hidden")){
			$(this).addClass("on");
			$(this).parent().next().slideDown(300);
		}
		return false;	
	});
	
	program_obj.dd.check.find(">a").click(function(){
		$(this).siblings("input[type='radio']").prop('checked', false);
		return false;	
	}); 		
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	학사일정 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".cal_list").size() != 0){
		cal_list_AC();
	}
});
function cal_list_AC(){
	
	var cal = $(".cal_list");
		cal.vie = $(".cal_view");
		cal.li = cal.vie.find(">ul>li");
		cal.btn = cal.find(">ul>li>a");
		
		
		
		var d = new Date();
		var month = d.getMonth() + 1;
		if(month <= 10){
			month = month -2;
		}
		else{
			month = month + 10;
		}
		var idx = month;
		cal.btn.removeClass("on");
		cal.find(">ul>li:eq("+idx+")>a").addClass("on");
	
		if(idx == 0){
			cal.li.stop().removeAttr("style").slideDown(200);
		} else {
			cal.li.stop().hide();
			cal.li.eq(month-1).stop().show().css({"padding-top":"0","border-top":"0"});
		}
	
	cal.btn.click(function(){
		var idx = cal.btn.parent().index($(this).parent());
		cal.btn.removeClass("on");
		cal.find(">ul>li:eq("+idx+")>a").addClass("on");
	
		if(idx == 0){
			cal.li.stop().removeAttr("style").slideDown(200);
		} else {
			cal.li.stop().hide();
			cal.li.eq(idx-1).stop().show().css({"padding-top":"0","border-top":"0"});
		}
		return false;
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

susi_popup Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".susi_popup").size() != 0){
		susi_pop ();
	}
});
function susi_pop (){
	var btn = $(".susi_popup map area");	
	var popup = $("#susi_movie"); 
		popup.close_btn = popup.find(".close_btn"); 

	btn.click(function(){
		var idx = $(this).attr("id");
		popup.show().stop().animate({"opacity":1},500,"easeInOutExpo",function(){
			if(idx == "movie_1"){
				popup.find(".video").prepend('<iframe src="https://www.youtube.com/embed/HnjlInIr2jk?rel=0&amp;autoplay=1" title="수시전형안내 동영상" frameborder="0" allowfullscreen></iframe>');	
			} else if (idx == "movie_2"){
				popup.find(".video").prepend('<iframe src="https://www.youtube.com/embed/S4E9RIBFiTE?rel=0&amp;autoplay=1" title="교과우수자전형 동영상" frameborder="0" allowfullscreen></iframe>');		
			} else if (idx == "movie_3"){
				popup.find(".video").prepend('<iframe src="https://www.youtube.com/embed/k_Cz7-RBtr0?rel=0&amp;autoplay=1" title="면접/지역인재전형 동영상" frameborder="0" allowfullscreen></iframe>');		
			} else if (idx == "movie_4"){
				popup.find(".video").prepend('<iframe src="https://www.youtube.com/embed/ypspWSJOKfI?rel=0&amp;autoplay=1" title="학생부종합전형 동영상" frameborder="0" allowfullscreen></iframe>');		
			}		
		});
		
		popup.close_btn.click(function(){
			popup.stop().animate({"opacity":0},500,"easeInOutExpo",function(){
				$(this).hide();
				popup.find(".video >iframe").remove();
					
			});
			return false;
		});
		return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	susi_popup2 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#coffee_map").size() != 0){
		susi_pop2 ();
	}
});
function susi_pop2 (){
	var btn = $("map area#coffee_map");	
	var popup = $("#susi_movie"); 
		popup.close_btn = popup.find(".close_btn"); 
	
	btn.click(function(){
		var idx = $(this).attr("id");
		popup.show().stop().animate({"opacity":1},500,"easeInOutExpo",function(){
			popup.find(".video").prepend('<div class="map"><img src="images/main/img_coffee_map.png" alt="매일신문 1층 커피명가 찾아오시는 길" /></div>');		
		});
		
		popup.close_btn.click(function(){
			popup.stop().animate({"opacity":0},500,"easeInOutExpo",function(){
				$(this).hide();
				popup.find(".video >.map").remove();
					
			});
			return false;
		});
		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

poll_js Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".poll").size() != 0){
		poll_js ();
	}
});
function poll_js (){
	var poll_obj = $(".poll .list >ol >li >ul >li");
		poll_obj.per = poll_obj.find(">.percent");
		poll_obj.per.num = poll_obj.per.find(">.num"); 
			
	poll_obj.per.num.each(function(){
		var t = $(this).text();
		var w = $(this).siblings(".bar").find(">span");
		
		w.css({"width":t});
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

main Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	introArmPop.init();//인트로 알람 팝업존
	introArm.init();//인트로 알람

	mainArmPop.init();//알람 팝업존
	mainArm.init();//알람
	mainVisual.init();//비주얼
	mainNotice.init();//notice
	mainMovie.init();//홍보동영상
});
var introArmPop = {
	set:function(str){
		if(str.find(" .move>ul>li").length < 2){
			if(str.find(" .move>ul>li").length === 1){
				str.find(" .move>ul>li").eq(0).addClass("on");
			}
			return false;
		}
		$('<div class="controll" />').insertAfter(str.find(' .move'));
		for(var i=0; i<str.find(" .move>ul>li").length; i++){
			$('<a href="#"><span>'+(i+1)+'</span></a>').appendTo(str.find(" .controll"));
		}
		$('<a href="#" class="btn-play"><span>재생</span></a><a href="#" class="btn-stop"><span>정지</span></a>').appendTo(str.find(" .controll"));
		var obj = str;
			obj.list = obj.find(" .move>ul>li");
			obj.btn = obj.find(" .controll a:not([class*='btn-'])");
			obj.btn_play = obj.find(" .controll .btn-play");
			obj.btn_stop = obj.find(" .controll .btn-stop");
			obj.cnt = 0;
			obj.saveAuto = "Y";
			obj.saveInterval = "";
			obj.saveSpeed = 5000;

		var __controll = {
			on:function(str){
				var idx = obj.btn.index(str);
				obj.list.removeClass("on").eq(idx).addClass("on");
				obj.btn.removeClass("on").eq(idx).addClass("on");
				obj.cnt = idx;
				if(obj.saveAuto === "Y") this.play();
			},
			interval:function(){
				var idx = (obj.cnt+1 > obj.list.length-1) ? 0:obj.cnt+1;
				this.on(obj.btn.eq(idx));
			},
			play:function(){
				this.stop();
				var _this = this;
				obj.saveInterval = setTimeout(function(){_this.interval();},obj.saveSpeed);
			},
			stop:function(){
				clearTimeout(obj.saveInterval);
			}
		}
		__controll.on(obj.btn.eq(0));
		
		obj.btn.on("click",function(){__controll.on($(this));return false;});
		obj.btn_play.on("click",function(){
			obj.saveAuto = "Y";
			obj.btn_play.hide();
			obj.btn_stop.show();
			__controll.play();
			return false;
		});
		obj.btn_stop.on("click",function(){
			obj.saveAuto = "Y";
			obj.btn_play.show();
			obj.btn_stop.hide();
			__controll.stop();
			return false;
		});
		obj.btn_play.trigger("click");
	},
	init:function(){
		if($("body#intro").length !== 0){
			for(var i=0; i<$("#arm .pop").length; i++){
				this.set($("#arm .pop").eq(i));
			}
		}
	}
}
var introArm = {
	set:function(str){
		if(str.find(" .midd>ul>li").length > 1){
			$('<div class="grid" />').appendTo(str.find(">.in>.midd"));
			for(var i=0; i<100; i++){
				$('<span />').appendTo(str.find(" .grid"));
			}
		}
		var obj = str;
			obj.btn_open = $("#arm-btn");
			obj.btn_close = obj.find(" .head .close");
			obj.oneDay = obj.find(" .head #arm-oneday");

		obj.attr("data-count",obj.find(" .midd>ul>li").length);

		var __controll = {
			open:function(){
				obj.css("display","flex");
			},
			close:function(){
				obj.css("display","none");
				if(obj.oneDay.prop("checked")){
					$.cookie('dcuArm', 'ok', {expires:1});
				}
			},
			init:function(){
				if($.cookie('dcuArm') === "ok"){
					this.close();
				}
			}
		}
		__controll.init();

		obj.btn_open.on("click",function(){__controll.open();return false;});
		obj.btn_close.on("click",function(){__controll.close();return false;});
	},
	init:function(){
		if($("body#intro").length !== 0){
			for(var i=0; i<$("#arm").length; i++){
				this.set($("#arm").eq(i));
			}
		}
	}
}
var mainArmPop = {
	set:function(str){
		if(str.find(" .move>ul>li").length < 2){
			if(str.find(" .move>ul>li").length === 1){
				str.find(" .move>ul>li").eq(0).addClass("on");
			}
			return false;
		}
		$('<div class="controll" />').insertAfter(str.find(' .move'));
		for(var i=0; i<str.find(" .move>ul>li").length; i++){
			$('<a href="#"><span>'+(i+1)+'</span></a>').appendTo(str.find(" .controll"));
		}
		$('<a href="#" class="btn-play"><span>재생</span></a><a href="#" class="btn-stop"><span>정지</span></a>').appendTo(str.find(" .controll"));
		var obj = str;
			obj.list = obj.find(" .move>ul>li");
			obj.btn = obj.find(" .controll a:not([class*='btn-'])");
			obj.btn_play = obj.find(" .controll .btn-play");
			obj.btn_stop = obj.find(" .controll .btn-stop");
			obj.cnt = 0;
			obj.saveAuto = "Y";
			obj.saveInterval = "";
			obj.saveSpeed = 5000;

		var __controll = {
			on:function(str){
				var idx = obj.btn.index(str);
				obj.list.removeClass("on").eq(idx).addClass("on");
				obj.btn.removeClass("on").eq(idx).addClass("on");
				obj.cnt = idx;
				if(obj.saveAuto === "Y") this.play();
			},
			interval:function(){
				var idx = (obj.cnt+1 > obj.list.length-1) ? 0:obj.cnt+1;
				this.on(obj.btn.eq(idx));
			},
			play:function(){
				this.stop();
				var _this = this;
				obj.saveInterval = setTimeout(function(){_this.interval();},obj.saveSpeed);
			},
			stop:function(){
				clearTimeout(obj.saveInterval);
			}
		}
		__controll.on(obj.btn.eq(0));
		
		obj.btn.on("click",function(){__controll.on($(this));return false;});
		obj.btn_play.on("click",function(){
			obj.saveAuto = "Y";
			obj.btn_play.hide();
			obj.btn_stop.show();
			__controll.play();
			return false;
		});
		obj.btn_stop.on("click",function(){
			obj.saveAuto = "Y";
			obj.btn_play.show();
			obj.btn_stop.hide();
			__controll.stop();
			return false;
		});
		obj.btn_play.trigger("click");
	},
	init:function(){
		if($("body#main").length !== 0){
			for(var i=0; i<$("#arm .pop").length; i++){
				this.set($("#arm .pop").eq(i));
			}
		}
	}
}
var mainArm = {
	set:function(str){
		if(str.find(" .midd>ul>li").length > 1){
			$('<div class="grid" />').appendTo(str.find(">.in>.midd"));
			for(var i=0; i<100; i++){
				$('<span />').appendTo(str.find(" .grid"));
			}
		}
		var obj = str;
			obj.btn_open = $("#arm-btn");
			obj.btn_close = obj.find(" .head .close");
			obj.oneDay = obj.find(" .head #arm-oneday");

		obj.attr("data-count",obj.find(" .midd>ul>li").length);

		var __controll = {
			open:function(){
				obj.css("display","flex");
			},
			close:function(){
				obj.css("display","none");
				if(obj.oneDay.prop("checked")){
					$.cookie('dcuArm', 'ok', {expires:1});
				}
			},
			init:function(){
				if($.cookie('dcuArm') === "ok"){
					this.close();
				}
			}
		}
		__controll.init();

		obj.btn_open.on("click",function(){__controll.open();return false;});
		obj.btn_close.on("click",function(){__controll.close();return false;});
	},
	init:function(){
		if($("body#main").length !== 0){
			for(var i=0; i<$("#arm").length; i++){
				this.set($("#arm").eq(i));
			}
		}
	}
}
var mainVisual = {
	set:function(str){
		if(str.find(" .move>ul>li").length < 2) return false;
		$('<div class="controll" />').insertAfter(str.find(' .move'));
		for(var i=0; i<str.find(" .move>ul>li").length; i++){
			$('<a href="#"><span>'+(i+1)+'</span></a>').appendTo(str.find(" .controll"));
		}
		$('<a href="#" class="btn-play"><span>재생</span></a><a href="#" class="btn-stop"><span>정지</span></a>').appendTo(str.find(" .controll"));
		var obj = str;
			obj.list = obj.find(" .move>ul>li");
			obj.btn = obj.find(" .controll a:not([class*='btn-'])");
			obj.btn_play = obj.find(" .controll .btn-play");
			obj.btn_stop = obj.find(" .controll .btn-stop");
			obj.cnt = 0;
			obj.saveAuto = "Y";
			obj.saveInterval = "";
			obj.saveSpeed = 8000;

		var __controll = {
			on:function(str){
				var idx = obj.btn.index(str);
				obj.list.removeClass("on").eq(idx).addClass("on");
				obj.btn.removeClass("on").eq(idx).addClass("on");
				obj.cnt = idx;
				if(obj.saveAuto === "Y") this.play();
			},
			interval:function(){
				var idx = (obj.cnt+1 > obj.list.length-1) ? 0:obj.cnt+1;
				this.on(obj.btn.eq(idx));
			},
			play:function(){
				this.stop();
				var _this = this;
				obj.saveInterval = setTimeout(function(){_this.interval();},obj.saveSpeed);
			},
			stop:function(){
				clearTimeout(obj.saveInterval);
			}
		}
		__controll.on(obj.btn.eq(0));
		
		obj.btn.on("click",function(){__controll.on($(this));return false;});
		obj.btn_play.on("click",function(){
			obj.saveAuto = "Y";
			obj.btn_play.hide();
			obj.btn_stop.show();
			__controll.play();
			return false;
		});
		obj.btn_stop.on("click",function(){
			obj.saveAuto = "Y";
			obj.btn_play.show();
			obj.btn_stop.hide();
			__controll.stop();
			return false;
		});
		obj.btn_play.trigger("click");
	},
	init:function(){
		if($("body#main").length !== 0){
			for(var i=0; i<$("#main_visual").length; i++){
				this.set($("#main_visual").eq(i));
			}
		}
	}
}
var mainNotice = {
	set:function(str){
		var obj = str;
		obj.type = obj.find(" .type input:radio");
		if(obj.type.length === 0){
			obj.attr("data-page","1");
			return false;
		}

		obj.type.on("change",function(){
			var idx = Number(obj.type.index(obj.find(" .type input:radio:checked"))) + 1;
			obj.attr("data-page",idx);
		});
		obj.find(" .type input:radio:checked").trigger("change");
		
		var _this = this;
		setInterval(function(){
			_this.interval(obj);
		},100);
	},
	interval:function(obj){
		var idx = obj.attr("data-page")-1;
		obj.type = obj.find(" .type input:radio");
		
		if(!obj.type.eq(idx).prop("checked")) obj.type.eq(idx).prop("checked",true);
	},
	init:function(){
		if($("body#main").length !== 0){
			for(var i=0; i<$(".notice").length; i++){
				this.set($(".notice").eq(i));
			}
		}
	}
}
var mainMovie = {
	set:function(str){
		if(str.find(" .list>ul>li").length < 2) return false;
		$('<div class="controll" />').insertAfter(str.find(' .list'));
		for(var i=0; i<str.find(" .list>ul>li").length; i++){
			$('<a href="#"><span>'+(i+1)+'</span></a>').appendTo(str.find(" .controll"));
		}
		var obj = str;
			obj.list = obj.find(" .list>ul>li");
			obj.btn = obj.find(" .controll a");

		var __controll = {
			on:function(str){
				var idx = obj.btn.index(str);

				obj.list.removeClass("on").eq(idx).addClass("on");
				obj.btn.removeClass("on").eq(idx).addClass("on");
			}
		}
		__controll.on(obj.btn.eq(0));
		
		obj.btn.on("click",function(){__controll.on($(this));return false;});
	},
	init:function(){
		if($("body#main").length !== 0){
			for(var i=0; i<$(".main-box_3").length; i++){
				this.set($(".main-box_3").eq(i));
			}
		}
	}
}