/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	IE 초기 포커스

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	$("h1 a").focus();
});

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
	
	//PC	  
	var gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">div");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">ul>li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("#header #nav"); 
		gnb_obj.blind = $("#nav > #blind"); 
	
		//default
	setTimeout(function(){
		gnb_def();
	},100);
	
	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});	
	
	gnb_obj.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},200);
	});
		
	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());
		gnb_open(idx);
	});
	
	gnb_obj.li.ul.mouseenter(function(){
		var idx = $(this).parent().index();
		
		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).siblings("a").addClass("on");
		gnb_obj.li.ul.not($(this)).removeClass("on");
		$(this).addClass("on");
	});
	
	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		var idx = $(this).parent().parent().parent().index();

		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).parent().parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});	
	
	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
	
	function gnb_def(){
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},200);
		gnb_obj.blind.stop().animate({"height":0+"px"},200);
		
		
		if(code[0] > -1){
			var obj = gnb_obj.li.eq(code[0]);
			obj.find(">a").addClass("on");
			
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");

				}
			}
			
		}
	}
	
	function gnb_open(idx){
		$("#header").addClass("on");	
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">div").removeAttr("style").innerHeight()+40);
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+"px"},300);
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+"px"},300);
	}
	
	
	//slide_map
	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div><a href="#" class="btn_close">닫기</a></div></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));
	$("#header>.head_top .mob_login").clone(false).prependTo($("#slide_map >.inner > .binds"));
	$("<div class='titles'>전체메뉴</div>").prependTo($("#slide_map >.inner > .binds"));
	$("<a href='http://tube.mayeye.net/login.jsp?param=logout' class='logout_btn'>로그아웃</a>").appendTo($("#slide_map >.inner > .binds"));
	
	//Mobile Menu	
	var mob_gnb_obj = $("#slide_map"); 
		mob_gnb_obj.box = mob_gnb_obj.find(">.inner"); 
		mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds"); 
		mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
		mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">div");
		mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">ul>li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.each(function(){
		var i = $(this);
		
		if(i.siblings("ul").size() != 0){
			i.addClass("arrow");	
		}	
	});
	
	
	mob_def();
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("on");

		if(code[0] > -1){
			var obj = mob_gnb_obj.box.gnb.ul.li.eq(code[0]);
			obj.find(">a").addClass("on");
			obj.find(">a").siblings("ul").show();
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				obj.find(">a").siblings("ul").show();
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");
					obj.find(">a").siblings("ul").show();

				}
			}
			
		}
	}
	$(window).resize(function(){
		if(!$(".js_mobile_check").is(":hidden")){
			//Mobile일떄
			mob_open();
		} else{
			mob_def();
		}
	});
	
	function mob_open(){
		mob_gnb_obj.box.gnb.ul.li.a.click(function(){
			if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
			if($(this).siblings("div").find(">ul").size() != 0){
				mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on").siblings("div").slideUp();
				$(this).toggleClass("on").siblings("div").slideToggle();
				return false;	
			} else {
				return true;	
			}
		});
		
		mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
			if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
			if($(this).siblings("div").find(">ul").size() != 0){
				mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("div").slideUp();
				$(this).toggleClass("on").siblings("div").slideToggle(300);
				return false;	
			} else {
				return true;	
			}
		});
	}
}

$(function(){
	gnb();//상단메뉴
	ar_ac();//알림
	search_btn_AC();//상단 검색
	footer_selectbox_AC();//selectbox
	kakao_map_AC();//kakao map
	if($("body#main").length === 0){
		// sub
		navi_sns_AC();//navi sns
		pdf_menu_AC();//pdf menu controll
		pdf_selectbox_AC();//pdf menu selectbox
		tab_AC();
		photo_slide_AC();//게시판 슬라이드 포토
		sitemap_bind();//사이트맵 컨텐츠
		main_quick_AC(); //퀵메뉴
	} else {
		// main
		$("#skip a[href='#content']").attr("href","#container");//메인 스킵링크 변경
		dark_mode_AC(); //다크모드
		main_quick_AC(); //퀵메뉴
		main_visual_AC(); //메인 비주얼
		main_news_AC(); //메인 뉴스
		main_notice_AC(); //메인 notice
		main_sns_AC(); //메인 sns
		main_popup_AC(); //메인 popup
	}
});
function gnb(){
    var obj = $("#header #gnb");
        obj.deps1 = obj.find(">ul>li>a");
    
    obj.find(">ul>li>div").css({"overflow":"hidden","height":"0"});
    function _on(idx){
        _off();
        obj.find(">ul>li").eq(idx).attr("data-open","on");
        //obj.find(">ul>li:eq("+idx+")>div").stop().slideDown(200);
        obj.find(">ul>li:eq("+idx+")>div").show();
        var h = obj.find(">ul>li:eq("+idx+")>div>ul").css("height","auto").innerHeight();
        obj.find(">ul>li>div").stop().animate({"height":h+"px"},300);

		$("body").attr("data-gnb","on");
    }
    function _off(){
        obj.find(">ul>li").attr("data-open","off");
        obj.find(">ul>li>div").hide();
    }
    obj.deps1.on("mouseover focus",function(){
        var idx = obj.find(">ul>li").index($(this).parent());
        _on(idx);
    });

    obj.on("mouseleave",function(){
        obj.find(">ul>li>div").stop().css("height","0");
        _off();
		$("body").attr("data-gnb","off");
    });

	obj.on("mouseenter",function(){
        $("body").attr("data-gnb","on");
    });

	$("#header #etc, #header #global").on("focusin",function(){
		obj.trigger("mouseleave");
	});

	mobile_gnb();

	function headerScroll(str){
		var t = str.scrollTop();
		var minH = $("#global").innerHeight();

		if(t>minH){
			if($("body").attr('data-scroll') !== "on") $("body").attr('data-scroll','on');
		} else {
			if($("body").attr('data-scroll') !== "off") $("body").attr('data-scroll','off');
		}
	}

	$(window).on("scroll",function(){headerScroll($(this));});
	headerScroll($("body"));
}

function mobile_gnb(){
	var tar = $("#etc>ul>li.all");
	var menu = $("#header #gnb > ul").clone(false);
		menu.find(">li>div>strong").remove();
		menu.find(" *").removeAttr("style");

	$('<div id="sitemap">\
		<div class="layout">\
			<strong>전체메뉴</strong>\
			<div class="head"></div>\
			<div class="midd"></div>\
		</div>\
	</div>\
	<a href="#" class="allmenu_btn_close"><span>닫기</span></a>').appendTo(tar);
	menu.appendTo(tar.find(">#sitemap > .layout > .midd"));
	tar.find(">#sitemap > .layout > .midd *").removeAttr("style");

	$("#header #global>.layout>div:nth-child(1)").clone().appendTo(tar.find(">#sitemap > .layout > .head"));
	// $("#header #global>.layout>div:nth-child(2)").clone().appendTo(tar.find(">#sitemap > .layout > .head"));
	// tar.find(">#sitemap > .layout > .head>div:eq(1)>ul>li:not(.mo)").remove();

	$('<div><ul /></div>').appendTo(tar.find(">#sitemap > .layout > .head"));
	for(var i=0; i<$("#header #global>.layout>div:nth-child(2)>ul>li.mo").length; i++){
		var l = $("#header #global>.layout>div:nth-child(2)>ul>li.mo").eq(i).clone(true);
		if(l.find(" #google_translate_element").length !== 0){
			$('<li class="mo"><a href="#" class="g-language"><span>LANGUAGE</span></a></li>').appendTo(tar.find(">#sitemap > .layout > .head>div:eq(1)>ul"));
		} else {
			l.appendTo(tar.find(">#sitemap > .layout > .head>div:eq(1)>ul"));
		}
	}
	$(".g-language").on("click",function(){
		var ch = ($(".goog-te-menu-frame").attr("data-show") !== "on") ? "on":"off";
		$(".goog-te-menu-frame").attr("data-show",ch);
		return false;
	});
	$(document).on("click",function(event){
		if($(event.target).hasClass("goog-te-menu-frame") || $(event.target).parents(".goog-te-menu-frame")){
			$(".goog-te-menu-frame").attr("data-show","off");
		}
	});

	var obj = $("#sitemap");
		obj.btn_open = $("#etc>ul>li.all a.allmenu_btn");
		obj.btn_close = $("#etc>ul>li.all a.allmenu_btn_close");

	obj.btn_open.on("click",function(){
		$("body").attr('data-sitemap','on');
		obj.find(">.layout>.midd a.on").siblings("div").stop().slideDown(200);
		return false;
	});
	obj.btn_close.on("click",function(){$("body").attr('data-sitemap','off');return false;});
	// console.log($("#path").length);
	for(var i=0; i<obj.find(">.layout>.midd a").length; i++){
		var ch = $.trim(obj.find(">.layout>.midd a").eq(i).text());
		if(obj.find(">.layout>.midd a").eq(i).siblings("div").length !== 0){
			obj.find(">.layout>.midd a").eq(i).addClass("child");
		}
	}

	if($("#path").length !== 0){
		//서브
		// #navi의 로케이션 정보를 기준으로 모바일 메뉴의 on 설정
		var gnb_li = obj.find(">.layout>.midd>ul>li");
		var lis = "";
		var gnb_tx = "";
		var navi = $("#navi > .location > *");
		for(var i=1; i<navi.length; i++){
			var navi_tx = $.trim(navi.eq(i).text().replace(">",""));
			
			for(var t=0; t<gnb_li.length; t++){
				lis = gnb_li.eq(t).find(">a");
				gnb_tx = $.trim(lis.text());
				if(navi_tx === gnb_tx){
					lis.addClass("on");
					if(gnb_li.eq(t).find(">div").length > 0){
						gnb_li = gnb_li.eq(t).find(">div>ul>li");
					} else {
						i = 9999;
					}
					t = 9999;
				}
			}
		}
	} else {
		obj.find(">.layout>.midd>ul>li").eq(0).find(">a").addClass("on");
	}
		

		obj.find(">.layout>.midd a.on").siblings("div").stop().slideDown(200);

		//act
		obj.find(">.layout>.midd a").on("click",function(){
			if(!$(".js_mobile_check").is(":hidden")){
				//mobile
				var bx = $(this).siblings("div");
				if(bx.length !== 0){
					if(bx.is(":hidden")){
						$(this).parent().siblings("li").find(" div").stop().slideUp(200);
						$(this).parent().siblings("li").find(" a").removeClass("on");

						bx.stop().slideDown(200);
						$(this).addClass("on");
					} else {
						$(this).parent().find(" div").stop().slideUp(200);
						$(this).parent().find(" a").removeClass("on");
					}
					return false;
				}
			}
		});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$(".allmenu_btn").click(function() {
		if($("#slide_map").is(":hidden")){		
			$("body").addClass("fixed");
			$("#slide_map").fadeIn(300).focus();
			
			if(!$(".js_mobile_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"margin-left":0},300);	
			}
		}
		
		return false;
	});

	$(document).click(function(e) { 
	    if($(e.target).parents("#slide_map").size() != 0) {
	         //메뉴 안
	    } else {
	        //밖
	        if(!$(".js_mobile_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"margin-left":-$("#slide_map .inner").innerWidth()},300,function(){
					$("#slide_map").fadeOut(300);
					$("body").removeClass("fixed");			
				});	
			}
	    } 
	});

	$("#slide_map>.inner>.btn_close").click(function(){
		$("#slide_map").fadeOut(300);
		$("body").removeClass("fixed");
	});
	
	$(window).resize(function() {
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"margin-left":0});
		}		
	});
});





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Scroll Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($('[data-scroll="y"]').size() !=0){
		$('[data-scroll="y"]').niceScroll({cursorcolor: "#8B919C"});

		//최신영상:관련영상 스크롤
		if($('.scroll_check').is(":hidden")){
			$('#new_video_view>[data-box="1"]>.relates>.r_scroll').niceScroll({cursorcolor: "#8B919C"});
		} else{
			//일반스크롤로 변경
		}
		$(window).resize(function(){
			if($('.scroll_check').is(":hidden")){
				$('#new_video_view>[data-box="1"]>.relates>.r_scroll').niceScroll({cursorcolor: "#8B919C"});
			} else{
				//일반스크롤로 변경
			}
		});
	}
});




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	알림 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function ar_ac(){
	var obj = $("#etc .ar");
		obj.btn_open = obj.find(" .open");
		obj.focusSave = "";
		obj.ar = $("#ar_box");
		obj.btn_cookie = obj.ar.find(" .cookie");
		obj.btn_close = obj.ar.find(" .close");
		obj.ul = obj.ar.find(" .midd>ul");
		obj.li = obj.ul.find(">li");
		obj.btn_prev = "";
		obj.btn_next = "";
		obj.btn_play = "";
		obj.btn_stop = "";
		obj.cnt = 0;
		obj.autos = "Y";
		obj.saveTime = "";
		obj.saveTimeSpeed = 6000;

	function _on(){
		$("body").attr("data-ar","on");
		_count(obj.cnt);
		if(obj.autos === "Y"){
			obj.btn_play.hide();
			obj.btn_stop.show();
		} else {
			obj.btn_play.show();
			obj.btn_stop.hide();
		}
	}
	function _off(){
		$("body").attr("data-ar","off");
		if(obj.focusSave !== ""){
			obj.focusSave.focus();
			obj.focusSave = "";
		}
		
		obj.btn_stop.trigger("click");
	}
	function _cookie(){
		$.cookie('pcu_kor-ar', 'ok', { expires: 1 });
	}

	obj.btn_open.on("click",function(){
		_on();
		$("#ar_box .midd>ul>li:eq(0) a").focus();
		obj.focusSave = obj.btn_open;
		return false;
	});
	obj.btn_close.on("click",function(){_off();return false;});
	obj.btn_cookie.on("click",function(){_off();_cookie();return false;});

	obj.btn_open.on("keydown",function(event){
		if(event.keyCode === 13) obj.btn_stop.trigger("click");
	});
	$("#ar_box .midd>ul>li a").on("keydown",function(event){
		var idx = $("#ar_box .midd>ul>li.on").index($(this).parent());
		if(event.keyCode === 9 && shift && idx === 0){
			obj.btn_close.focus();
			return false;
		}
	});

	obj.btn_close.on("keydown",function(event){
		if(event.keyCode == 9 && !shift){
			$("#ar_box .midd>ul>li.on:eq(0) a").focus();
			return false;
		}
	});


	//move
	// if(obj.li.length > 1) return false;
	$('<div class="controll">\
		<div class="count"></div>\
		<a href="#" class="btn_prev"><span>이전</span></a>\
		<a href="#" class="btn_stop"><span>정지</span></a>\
		<a href="#" class="btn_play"><span>재생</span></a>\
		<a href="#" class="btn_next"><span>다음</span></a>\
	</div>').prependTo($("#ar_box .foot>div"));

	obj.btn_prev = obj.ar.find(" .btn_prev");
	obj.btn_next = obj.ar.find(" .btn_next");
	obj.btn_play = obj.ar.find(" .btn_play");
	obj.btn_stop = obj.ar.find(" .btn_stop");

	function _count(idx){
		_stop();
		var c = idx + 1;
		var lc = Math.floor(obj.ul.innerWidth() / obj.li.width()); 
		var l = Math.ceil(obj.li.length / lc);
		if(c > l) c = l;

		var min = (c < 10) ? "0"+c:c;
		var max = (l < 10) ? "0"+l:l;
		obj.ar.find(".count").html('<em>'+min+'</em><span>-</span><span>'+max+'</span>');

		obj.ar.attr("data-max",parseInt(max));
		_view(
			((c-1) * lc),
			(((c-1) * lc)+lc)
		);

		obj.cnt = idx;

		if(obj.autos === "Y"){
			_play();
		}
	}
	function _view(min,max){
		var c = 1;
		obj.li.removeClass("on").removeAttr("data-pin");
		for(var i=min; i<max; i++){
			obj.li.eq(i).addClass("on").attr("data-pin",c);
			c++;
		}
		
		obj.ul.find(' img[usemap]').rwdImageMaps();
	}
	function _play(){
		obj.saveTime = setTimeout(function(){
			var idx = obj.cnt + 1;
			idx = (idx <= parseInt(obj.ar.attr("data-max"))-1) ? idx:0;
			_count(idx);
		},obj.saveTimeSpeed);
	}
	function _stop(){
		clearTimeout(obj.saveTime);
	}

	//다음
	obj.btn_next.on("click",function(){
		var idx = obj.cnt + 1;
			idx = (idx <= parseInt(obj.ar.attr("data-max"))-1) ? idx:0;
		_count(idx);
		return false;
	});

	//이전
	obj.btn_prev.on("click",function(){
		var idx = obj.cnt - 1;
			idx = (idx < 0) ? parseInt(obj.ar.attr("data-max"))-1:idx;
		_count(idx);
		return false;
	});

	//재생
	obj.btn_play.on("click",function(){
		obj.autos = "Y";
		obj.btn_play.hide();
		obj.btn_stop.show();
		_play();
		return false;
	});

	//정지
	obj.btn_stop.on("click",function(){
		obj.autos = "N";
		obj.btn_play.show();
		obj.btn_stop.hide();
		_stop();
		return false;
	});

	$(window).on("resize",function(){
		if($("body").attr("data-ar") === "on"){
			var old_size = parseInt(obj.ar.attr("data-max"));
			var new_size = Math.floor(obj.ul.innerWidth() / obj.li.width());
				new_size = Math.ceil(obj.li.length / new_size);
			if(old_size !== new_size){
				_count(obj.cnt);
			}
		}
	});

	//cookie check
	if($.trim($.cookie('pcu_kor-ar')) !== "ok"){
		if($("body#main").length !== 0){
			_on();
		}
	}
	
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	quick Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function quick_ac(){
	var obj = $("#q_menu");
		obj.btn_open = obj.find(" .open");
		obj.btn_close = obj.find(" .close");
		obj.quick_scroll = 0;

	obj.btn_open.click(function(){
		$("body").attr("data-q_menu-open","on");
		$("body").attr("data-q_menu","1");
		return false;
	});
	obj.btn_open.click();
	obj.btn_close.click(function(){$("body").attr("data-q_menu-open","off");return false;});

	$(window).on("scroll",function(){
		var t = (obj.quick_scroll > $(this).scrollTop()) ? "2":"3";
		var b = $("#wrap").innerHeight() - $(window).height() - $(this).scrollTop();
		
		$("body").attr("data-q_menu",t);
		obj.quick_scroll = $(this).scrollTop();
		if(b < 10){
			$("body").attr("data-scroll-bottom","on");
		} else {
			$("body").attr("data-scroll-bottom","off");
		}

		if($("body#main").length !== 0){
			//메인
			if(b < 10){
				// $("body").attr("data-q_menu-open","off");
			} else {
				if($("body").attr("data-q_menu-open") === "off") $("body").attr("data-q_menu-open","off");
				else if($("body").attr("data-q_menu-open") === "on") $("body").attr("data-q_menu-open","on");
			}
		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	navi sns Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function navi_sns_AC(){
	var obj = $("#navi .sns");
		obj.btn_open = obj.find(">.open");
		obj.btn_close = obj.find(">.close");

	obj.btn_open.click(function(){obj.attr("data-open","on");return false;});
	obj.btn_close.click(function(){obj.attr("data-open","off");return false;});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	첨부파일 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){

	var fileTarget = $('[data-skin="file"] .upload-hidden');

	fileTarget.each(function(index) { 
	if($(this).siblings('.upload-name').val()!='null' && $(this).siblings('.upload-name').val()!=''){
		$(this).siblings('.upload-name').next().css("display","inline-block");
		}
	});

	fileTarget.on('change', function(){
		if(window.FileReader){
			// 파일명 추출
			var filename = $(this)[0].files[0].name;
		}else {
			// Old IE 파일명 추출
			var filename = $(this).val().split('/').pop().split('\\').pop();
		};

		$(this).siblings('.upload-name').val(filename);

		if($(this).siblings('.upload-name').val()!='null' && $(this).siblings('.upload-name').val()!=''){
		$(this).siblings('.upload-name').next().css("display","inline-block");
		}
	});

});






/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	pdf menu js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function pdf_menu_AC(){
	function _set(str){
		var obj = str;
			obj.btn = obj.find(">ul>li>a");

		obj.btn.on("click",function(){
			var t = $(this).attr('data-action');
			viewPdfjs(t);
			obj.find('>[data-skin="select"]>select>option').prop("selected",false);
			obj.find('>[data-skin="select"]>select>option[value="'+t+'"]').eq(0).prop("selected",true);
			return false;
		});
	}
	for(var i=0; i<$('.pdf_menu').length; i++){
		_set($('.pdf_menu').eq(i));
	}
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	pdf menu selectbox js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function pdf_selectbox_AC(){
	function _set(str){
		var obj = str;
			obj.li = obj.find(">ul>li");

		$('<div data-skin="select"><select></select></div>').prependTo(obj);
		for(var i=0; i<obj.li.length; i++){
			var t = obj.li.eq(i).find(">a").attr("data-action");
			$('<option value="'+t+'">'+$.trim(obj.li.eq(i).find(">a").text())+'</option>').appendTo(obj.find('>[data-skin="select"]>select'));
		}

		obj.find('>[data-skin="select"]>select').on("change",function(){
			var t = $(this).val();
			viewPdfjs(t);
			obj.find(">ul>li>a.on").removeClass("on");
			obj.find('>ul>li>a[data-action="'+t+'"]').eq(0).addClass("on");
		});
	}
	for(var i=0; i<$('.pdf_menu').length; i++){
		_set($('.pdf_menu').eq(i));
	}
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main scroll js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function main_scroll_AC(){
    $("body").attr("data-scroll",$(document).scrollTop());

    function _set(){
		var t = $(window).scrollTop();
		var arr = ['sec_1','sec_2','sec_3','sec_4','sec_5'];
		
		for(var i=0; i<arr.length; i++){
			var ob = $("#"+arr[i]);
			var t2 = (t - ob.offset().top) + $(window).height();
			var step = Math.floor(t2 / ob.innerHeight() * 100);
			
			if(step < 10) step = 0;
			else step = Math.floor(step / 10);
			if(t2 > 0 && t2 < ob.innerHeight()){
				ob.attr("data-steps",step);
			} else {
				if(t2 < 10) ob.removeAttr("data-steps");
				else ob.attr("data-steps","10");
			}
		}
    }
    _set();
    $(window).on("scroll",function(){
    	_set();
    });
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
	});	
	$(".mob_etc .top").click(function() {
		$("body,html").stop().animate({"scrollTop":0 +"px"},500,"easeInOutExpo");
		return false;
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Top Btn Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function topBtn_AC(){
	$('<div class="topbtn"><a href="#"><span>Top</span></a></div>').insertBefore($('#footer'));

	var btn = $(".topbtn");

	btn.on("click",function(){
		var speeds = $(window).scrollTop() / 2;
		$("html, body").animate({"scrollTop":0},speeds);
		return false;
	});
}


var tabs = {
	    set:function(){
	        function _set(str){
	            var obj = str;
	                obj.cnt = obj.attr("data-view") - 1;
	                obj.btn = obj.find(">.in>ul>li a");
	            function _on(idx){
	                var hit = obj.find(">.in>ul>li").eq(idx).find(" a");
	                obj.btn.unwrap().wrap('<span />');
	                hit.unwrap().wrap('<strong />');
                    obj.find(">.in>ul>li>a").removeAttr("title","선택됨");
                    hit.attr("title","선택됨");

	                obj.attr("data-view",idx+1);
	            }
	            if(obj.cnt > -1) _on(obj.cnt);

	            obj.btn.on("click",function(){
	                var idx = obj.find(">.in>ul>li").index($(this).parent().parent());
	                _on(idx);
	                return false;
	            });
	            
	            if($.params['tab']){
	                obj.find(">.in>ul>li").eq($.params['tab']).find(" a").trigger("click");
	            }
	        }
	        for(var i=0; i<$('[data-tab][data-view]').length; i++){
	            _set($('[data-tab][data-view]').eq(i));
	        }
	    },
	    def:function(str){
	        var obj = str;
	            obj.btn = obj.find(">.in>ul>li a");
	            obj.btn.unwrap().wrap('<span />');
	        obj.attr("data-view","");
	    },
	    init:function(){
	        this.set();
	    }
	}

	function tab_AC(){
		tabs.init();
	}

function footer_selectbox_AC(){
	function _set(str){
		var obj = str;
			obj.btn = obj.find(" .head>a");
			obj.box = obj.find(" .midd")

		obj.box.slideUp(0);

		obj.btn.on("click",function(){
			var sw = (obj.box.is(":hidden")) ? "on":"off";
			obj.attr("data-open",sw);
            
			if(sw==="on"){
                obj.box.slideDown(200);
                obj.btn.find(">em").text("닫기");
            }
			else{
                obj.box.slideUp(200);
                obj.btn.find(">em").text("열기");
            }
			return false;
		});
	}
	for(var i=0; i<$('[data-item="select"]').length; i++){
		_set($('[data-item="select"]').eq(i));
	}
}

function search_btn_AC(){
	var obj = $('#etc [data-search="s"]');
		obj.btn_open = $("#search-btn");
		obj.btn_close = $("#search-btn_close");

	obj.btn_open.on("click",function(){
		$("body").attr("data-search","on");
		return false;
	});

	obj.btn_close.on("click",function(){
		$("body").attr("data-search","off");
		return false;
	});
}

// 게시판 슬라이드 포토
function photo_slide_AC(){
    function _set(str){
        var obj = str;
            obj.item = obj.find(">ul>li").clone();
            obj.cnt = 0;

        $('<div class="head"></div>\
            <a href="#" class="prev"><span>이전</span></a>\
            <a href="#" class="next"><span>다음</span></a>\
        <div class="midd"><ul></ul></div>').appendTo(obj.empty());

        for(var i=0; i<obj.item.length; i++){
            obj.item.eq(i).appendTo(obj.find(">.midd>ul"));
        }
        obj.find(">.midd>ul>li>img").wrap('<a href="#"></a>');

        obj.li = obj.find(">.midd>ul>li");
        obj.box = obj.find(">.midd>ul");
        obj.btn = obj.find(">.midd>ul>li>a");
        obj.btn_prev = obj.find(" .prev");
        obj.btn_next = obj.find(" .next");

        function _point(idx){
            var ch = obj.li.eq(idx).position().left + obj.li.eq(idx).width() + obj.box.position().left;
            var ch2 = obj.li.eq(idx).position().left + obj.box.position().left;
            obj.item.eq(idx).find(" img").clone(false).appendTo(obj.find(">.head").empty());
            obj.li.removeClass("on").eq(idx).addClass("on");

            if(ch > obj.find(">.midd").width()){
                var l = (obj.li.eq(idx).position().left + obj.box.position().left) * -1;
                obj.box.animate({"left":l+"px"},300);
            }
            if(ch2 < 0){
                var l = (obj.box.position().left + obj.li.eq(idx).width() + parseInt(obj.li.eq(idx).css("margin-right")));
                obj.box.animate({"left":l+"px"},300);
            }
            obj.cnt = idx;
        }
        _point(obj.cnt);

        obj.btn_next.on("click",function(){
            if(obj.cnt + 1 > obj.li.length-1) return false;
            var idx = obj.cnt + 1;
            _point(idx);
            return false;
        });

        obj.btn_prev.on("click",function(){
            if(obj.cnt - 1 < 0) return false;
            var idx = obj.cnt - 1;
            _point(idx);
            return false;
        });

        obj.btn.on("click",function(){
            var idx = obj.li.index($(this).parent());
            _point(idx);
            return false;
        });
    }
    for(var i=0; i<$('[data-slide="photo"]').length; i++){
        _set($('[data-slide="photo"]').eq(i));
    }
}

// 이전 스크립트 이관
function info_Window(Page,width,height,scroll){
	if(scroll == null) scroll="yes";
	ShowInfo = window.open(Page,'info','top=60,left=60,toolbar=0,directories=0,status=0,menubar=0,width='+width+',height='+height+',scrollbars='+scroll);
}

// 카카오맵 길찾기 form
function map_search_car(str){
	var sNameVal = $(str.sName).val();
	var eNameVal = $(str.eName).val();
	
	if(sNameVal !== "" && eNameVal !== ""){
		window.open("https://map.kakao.com/?sName="+sNameVal+"&eName="+eNameVal);
	}
	return false;
}

// 사이트맵
function sitemap_bind(){
	if($("#sitemap_content").length < 1) return false;
	var obj = $("#sitemap_content");

	$("#gnb>ul").clone(false).appendTo(obj);
	obj.find(" *").removeAttr("style");
	obj.find(">ul>li>div>strong").remove();
}

// 메인 다크모드
function dark_mode_AC(){
	if($(".btn_dark").length === 0) return false;
	var btn = $(".btn_dark");

	btn.on("click",function(){
		var ch = ($("body").attr("data-dark") !== "on") ? "on":"off";

		$("body").attr("data-dark",ch);
		return false;
	});
}

// 퀵메뉴
function main_quick_AC(){
	if($("#main_quick").length === 0) return false;
	var obj = $("#main_quick");
		obj.btn = obj.find(">.midd>ul>li>a");
		obj.btn_close = obj.find(">.midd>ul>li>div .btn_close");
		obj.btn_top = obj.find(" .foot>.top");

	obj.btn.on("click",function(){
		$("body").attr("data-main_quick","on");
		obj.btn.removeClass("on");
		$(this).addClass("on");
		return false;
	});

	obj.btn_close.on("click",function(){
		$("body").attr("data-main_quick","off");
		$(this).parent().siblings("a").removeClass("on").focus();
		return false;
	});

	obj.btn_close.on("keydown",function(event){
		if(event.keyCode == 9 && !shift){
			$(this).parent().focus();
			return false;
		}
	});

	obj.find(">.midd>ul>li>div li:first-child>a").on("keydown",function(event){
		if(event.keyCode == 9 && shift){
			$(this).parent().parent().parent().parent().siblings(".btn_close").focus();
			return false;
		}
	});

	obj.btn_top.on("click",function(){
		$("html, body").animate({"scrollTop":"0"},500);
		return false;
	});

	var scroll_check = "";
	$(window).on("scroll",function(){
		clearTimeout(scroll_check);
		if(obj.attr("data-open") !== "on") obj.attr("data-open","on");
		scroll_check = setTimeout(function(){
			obj.attr("data-open","off");
		},500);
	});
}

function main_visual_AC(){
	if($("#visual").length === 0) return false;
	var obj = $("#visual");
		obj.li = obj.find(">.move>ul>li");
		obj.btn_stop = obj.find(" .btn_stop");
		obj.btn_play = obj.find(" .btn_play");
		obj.cnt = 0;
		obj.autos = "Y";
		obj.saveTime = "";
		obj.saveTimeSpeed = 8000;

	
	function _bg(idx){
		obj.li.removeClass("on").eq(idx).addClass("on");
		var bg = obj.li.eq(idx).attr("data-style");
		if(bg) obj.li.eq(idx).removeAttr("data-style").attr("style",bg);

		obj.li.fadeOut(800).eq(idx).fadeIn(800);

		if(obj.li.eq(idx).hasClass("white")){
			$("body").attr("data-main-visual","white");
		} else {
			$("body").removeAttr("data-main-visual");
		}
	}
	_bg(obj.cnt);

	if(obj.li.length < 2){
		obj.btn_stop.hide();
		obj.btn_play.hide();
		return false;
	}

	function _move(){
		clearTimeout(obj.saveTime);
		var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
		
		_bg(idx);

		obj.cnt = idx;
		if(obj.autos === "Y"){
			obj.saveTime = setTimeout(function(){
				_move();
			},obj.saveTimeSpeed);
		}
	}
	function _stop(){
		obj.autos = "N";
		obj.btn_play.show();
		obj.btn_stop.hide();
		clearTimeout(obj.saveTime);
	}
	function _play(){
		obj.autos = "Y";
		obj.btn_play.hide();
		obj.btn_stop.show();
		obj.saveTime = setTimeout(function(){
			_move();
		},obj.saveTimeSpeed);
	}

	obj.btn_stop.on("click",function(){_stop(); return false;});
	obj.btn_play.on("click",function(){_play(); return false;});

	if(obj.autos === "Y"){
		obj.btn_play.trigger("click");
	}

	// 탭 포커스
	obj.attr("tabindex","0");
	obj.on("focus",function(){
		obj.css("border","2px solid black");
	});
	obj.on("focusout",function(){
		obj.css("border","0");
	});
	/*obj.find(">.move").on("focus",function(){
		obj.btn_stop.trigger("click");
		obj.btn_play.focus();
	       
	});*/
}

function main_news_AC(){
	if($(".news").length === 0) return false;
	var obj = $(".news");
		obj.btn_left = obj.find(" .btn_left");
		obj.btn_right = obj.find(" .btn_right");
		obj.ul = obj.find(">.midd>.move>ul");
		

	function _move(str){
		if(obj.ul.is(":animated")) return false;
		obj.li = obj.ul.find(">li");
		var l = (obj.li.innerWidth() + parseInt(obj.li.eq(0).css("margin-right"))) * -1;
		if(str === "left"){
			obj.ul.css("left",l+"px");
			obj.li.last().prependTo(obj.ul);
			l=0;
		}
		obj.ul.animate({"left":l+"px"},300,function(){
			if(str === "right"){
				obj.ul.css("left","0");
				obj.li.eq(0).appendTo(obj.ul);
			}
		});
	}

	obj.btn_left.on("click",function(){_move("left");return false;});
	obj.btn_right.on("click",function(){_move("right");return false;});


	// 제스쳐 추가
	var mouseCheck = false;
	var moveCheck = false;
	var _x = "";
	var arrows = "";
	$(document).on("mousedown touchstart",function(e){
		_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
		mouseCheck = true;
		moveCheck = false;
	});
	obj.ul.on("mousemove touchmove",function(e){
		var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
			x = x - _x;
		if(mouseCheck){
			if(x > 10 || x < -10){
				moveCheck = true;
				arrows = (x < 0) ? "right":"left";
				e.preventDefault();
			}
		}
	});
	$(document).on("mouseup touchend",function(e){
		if(moveCheck){
			mouseCheck = false;
			if(arrows === "left") obj.btn_left.trigger("click");
			else obj.btn_right.trigger("click");
			arrows = "";
			e.preventDefault();
		}
	});
}

function main_notice_AC(){
	if($(".notice").length === 0) return false;
	var obj = $(".notice");
		obj.btn = obj.find(">.midd>ul>li>a:not(.more)");

	function _set(idx){
		obj.attr("data-on",idx);

		obj.find(">.midd>ul>li>a>strong>span").unwrap();
		obj.find(">.midd>ul>li:eq("+(idx-1)+")>a:eq(0)>span").wrap("<strong />");
	}
	_set(1);

	obj.btn.on("click",function(){
		var idx = obj.find(">.midd>ul>li").index($(this).parent()) + 1;
		_set(idx);
		return false;
	});
}

function main_sns_AC(){
	if($(".sns").length === 0) return false;
	var obj = $(".sns");
		obj.btn_left = obj.find(" .btn_left");
		obj.btn_right = obj.find(" .btn_right");
		obj.ul = obj.find(">.midd>.move>ul");
		

	function _move(str){
		if(obj.ul.is(":animated")) return false;
		obj.li = obj.ul.find(">li");
		var l = (obj.li.innerWidth() + parseInt(obj.li.eq(0).css("margin-right"))) * -1;
		if(str === "left"){
			obj.ul.css("left",l+"px");
			obj.li.last().prependTo(obj.ul);
			l=0;
		}
		obj.ul.animate({"left":l+"px"},300,function(){
			if(str === "right"){
				obj.ul.css("left","0");
				obj.li.eq(0).appendTo(obj.ul);
			}
		});
	}

	obj.btn_left.on("click",function(){_move("left");return false;});
	obj.btn_right.on("click",function(){_move("right");return false;});

	// 제스쳐 추가
	var mouseCheck = false;
	var moveCheck = false;
	var _x = "";
	var arrows = "";
	$(document).on("mousedown touchstart",function(e){
		_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
		mouseCheck = true;
		moveCheck = false;
	});
	obj.ul.on("mousemove touchmove",function(e){
		var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
			x = x - _x;
		if(mouseCheck){
			if(x > 10 || x < -10){
				moveCheck = true;
				arrows = (x < 0) ? "right":"left";
				e.preventDefault();
			}
		}
	});
	$(document).on("mouseup touchend",function(e){
		if(moveCheck){
			mouseCheck = false;
			if(arrows === "left") obj.btn_left.trigger("click");
			else obj.btn_right.trigger("click");
			arrows = "";
			e.preventDefault();
		}
	});
}

function main_popup_AC(){
	if($("#line-2 .popup").length === 0) return false;
	$('<div class="controll">\
		<span><strong>01</strong>/<span>12</span></span>\
		<a href="#" class="btn_left"><span>이전</span></a>\
		<a href="#" class="btn_stop"><span>정지</span></a>\
		<a href="#" class="btn_play"><span>재생</span></a>\
		<a href="#" class="btn_right"><span>다음</span></a>\
	</div>').appendTo($("#line-2 .popup>.head"));

	var obj = $("#line-2 .popup");
		obj.li = obj.find(">.midd>ul>li");
		obj.btn_stop = obj.find(" .btn_stop");
		obj.btn_play = obj.find(" .btn_play");
		obj.btn_left = obj.find(" .btn_left");
		obj.btn_right = obj.find(" .btn_right");
		obj.cnt = 0;
		obj.autos = "Y";
		obj.saveTime = "";
		obj.saveTimeSpeed = 6000;
	
	function _bg(idx){
		obj.li.removeClass("on").eq(idx).addClass("on");
		var bg = obj.li.eq(idx).find(">a").attr("data-style");
		if(bg) obj.li.eq(idx).find(">a").removeAttr("data-style").attr("style",bg);
	}
	_bg(obj.cnt);

	function _count(){
		var min = (obj.cnt+1 < 10) ? "0"+(obj.cnt+1):obj.cnt+1;
		var max = (obj.li.length < 10) ? "0"+obj.li.length:obj.li.length;
		$('<strong>'+min+'</strong>/<span>'+max+'</span>').appendTo(obj.find(" .controll>span").empty())
	}
	_count();

	if(obj.li.length < 2){
		obj.btn_stop.hide();
		obj.btn_play.hide();
		return false;
	}

	
	function _move(idx){
		clearTimeout(obj.saveTime);
		_bg(idx);

		obj.cnt = idx;
		_count();
		if(obj.autos === "Y"){
			obj.saveTime = setTimeout(function(){
				obj.btn_right.trigger("click");
			},obj.saveTimeSpeed);
		}
	}
	function _stop(){
		obj.autos = "N";
		obj.btn_play.show();
		obj.btn_stop.hide();
		clearTimeout(obj.saveTime);
	}
	function _play(){
		obj.autos = "Y";
		obj.btn_play.hide();
		obj.btn_stop.show();
		obj.saveTime = setTimeout(function(){
			obj.btn_right.trigger("click");
		},obj.saveTimeSpeed);
	}

	obj.btn_stop.on("click",function(){_stop(); return false;});
	obj.btn_play.on("click",function(){_play(); return false;});
	obj.btn_right.on("click",function(){
		var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
		_move(idx); 
		return false;
	});
	obj.btn_left.on("click",function(){
		var idx = (obj.cnt-1 < 0) ? obj.li.length-1:obj.cnt-1;
		_move(idx); 
		return false;
	});

	if(obj.autos === "Y"){
		obj.btn_play.trigger("click");
	}

	// 탭 포커스
	/*obj.find(">.midd").attr("tabindex","0");*/
	obj.find(">.midd").on("focusin",function(){
		obj.btn_stop.trigger("click");
	});
}

function kakao_map_AC(){
	function _set(str){
		$('<div class="in" />').appendTo(str.empty());
		var obj = str;
			obj.lat = obj.attr("data-lat");
			obj.lng = obj.attr("data-lng");

		kakao.maps.load(function() {
			obj.LatLng = new kakao.maps.LatLng(obj.lat, obj.lng);
			var mapContainer = obj.find(">.in")[0], // 지도를 표시할 div 
				mapOption = { 
					center: obj.LatLng, // 지도의 중심좌표
					level: 3 // 지도의 확대 레벨
				};

			var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

			var imageSrc = '../../../images/site/kor/content/depart_map_img01.svg', // 마커이미지의 주소입니다    
				imageSize = new kakao.maps.Size(35, 53), // 마커이미지의 크기입니다
				imageOption = {offset: new kakao.maps.Point(17, 60)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

			// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
			var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
				markerPosition = obj.LatLng; // 마커가 표시될 위치입니다

			// 마커를 생성합니다
			var marker = new kakao.maps.Marker({
				position: markerPosition, 
				image: markerImage // 마커이미지 설정 
			});

			// 마커가 지도 위에 표시되도록 설정합니다
			marker.setMap(map);

			$(window).on("resize",function(){
				map.setCenter(obj.LatLng);
			});
		});
	}
	for(var i=0; i<$('[data-map="kakao"]').length; i++){
		_set($('[data-map="kakao"]').eq(i));
	}
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	photo zoom Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function photo_zoom(_this,a,b){
	$('<div id="photo-zoom">\
		<div class="in">\
			<div class="head"><img src="'+a+'" alt="" /></div>\
			<div class="midd">'+b+'</div>\
			<a href="#" class="close"><span>닫기</span></a>\
		</div>\
	</div>').appendTo("#wrap");

	$("#photo-zoom").attr("tabindex","0").focus();

	$("#photo-zoom .close").bind("click",function(){
		$(_this).focus();
		$("#photo-zoom").remove();
		return false;
	});
	$("#photo-zoom .close").bind("keydown",function(event){
		if(event.keyCode == 9 && !shift){
			$("#photo-zoom").focus();
			return false;
		}
	});
	$("#photo-zoom").bind("keydown",function(event){
		if(event.keyCode == 9 && shift){
			$("#photo-zoom .close").focus();
			return false;
		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	web_acc Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	web_acc ();
});
function web_acc (){	
    var _shift = false;
    $(document).on("keydown",function(event){
        if(event.keyCode == 16) _shift = true;
    });
    $(document).on("keyup",function(event){
        if(event.keyCode == 16) _shift = false;
    });
    
    
	$("#sub #skip >ul>li:first-child a").keydown(function(event){
        if(event.keyCode == 13){
            $("#sub #skip >ul>li:first-child a").trigger("click");
            $("#navi > .sns > a").focus();
            return false;
        }
    });
	
    
    $("body#main #visual>.controll>.btn_play").keydown(function(event){
        if(event.keyCode == 13){
            $("body#main #visual>.controll>.btn_stop").focus();
        }
    });
    $("body#main #visual>.controll>.btn_stop").keydown(function(event){
        if(event.keyCode == 13){
            $("body#main #visual>.controll>.btn_play").focus();
        }
    });
    $("body#main #visual>.controll>.btn_play").keyup(function(e){
        var key = ( e ) ? e.keyCode : event.keyCode;
        if (event.keyCode == 13 ){
        	
        	$("body#main #visual>.controll>.btn_stop").focus();
        }
    });
    $("body#main #visual>.controll>.btn_stop").keyup(function(e){
        var key = ( e ) ? e.keyCode : event.keyCode;
        if (event.keyCode == 13 ){
        	
        	$("body#main #visual>.controll>.btn_play").focus();
        }
    });
    
}