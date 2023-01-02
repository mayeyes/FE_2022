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
	quick_ac();//quick
	topBtn_AC();//top 버튼

	if($("body#main").length === 0){
		// sub
		navi_sns_AC();//navi sns
		tab_AC();//tab
		showbox();//오시는길 더보기
		campus_AC();//캠퍼스투어
		pdf_menu_AC();//pdf menu controll
		pdf_selectbox_AC();//pdf menu selectbox
		content_info_list_AC();//학과소개
	} else {
		// main
		main_scroll_AC();//메인 스크롤
		main_major_AC();//메인 MAJOR
		main_media_AC();//메인 MEDIA
		main_media_etc_AC();//main media scroll
		YT.ready(function() {
			main_visual_AC();//main visual
		});
	}
})
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
    }
    function _off(){
        obj.find(">ul>li").attr("data-open","off");
        obj.find(">ul>li>div").hide();
    }
    obj.deps1.on("mouseover",function(){
        var idx = obj.find(">ul>li").index($(this).parent());
        _on(idx);
    });

    obj.on("mouseleave",function(){
        obj.find(">ul>li>div").stop().css("height","0");
        _off();
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
			<strong>사이트맵</strong>\
			<div class="head"></div>\
			<div class="midd"></div>\
		</div>\
	</div>\
	<a href="#" class="allmenu_btn_close"><span>닫기</span></a>').appendTo(tar);
	menu.appendTo(tar.find(">#sitemap > .layout > .midd"));

	$("#header #global>.layout>div:nth-child(2)").clone().appendTo(tar.find(">#sitemap > .layout > .head"));
	$("#header #global>.layout>div:nth-child(1)").clone().appendTo(tar.find(">#sitemap > .layout > .head"));

	var obj = $("#sitemap");
		obj.btn_open = $("#etc>ul>li.all a.allmenu_btn");
		obj.btn_close = $("#etc>ul>li.all a.allmenu_btn_close");

	obj.btn_open.on("click",function(){$("body").attr('data-sitemap','on');return false;});
	obj.btn_close.on("click",function(){$("body").attr('data-sitemap','off');return false;});

	if($("#path").length !== 0){
		//서브
		var targets = $.trim($("#path>h3").text());

		for(var i=0; i<obj.find(">.layout>.midd a").length; i++){
			var ch = $.trim(obj.find(">.layout>.midd a").eq(i).text());
			if(obj.find(">.layout>.midd a").eq(i).siblings("div").length !== 0){
				obj.find(">.layout>.midd a").eq(i).addClass("child");
			}
			if(ch === targets){
				obj.find(">.layout>.midd a").eq(i).addClass("on").parents("li").find(">a").addClass("on");
			}
		}

		obj.find(">.layout>.midd a.on").siblings("div").stop().slideDown(200);

		//act
		obj.find(">.layout>.midd a").on("click",function(){
			if(!$(".js_mobile_check").is(":hidden")){
				//mobile
				var bx = $(this).siblings("div");
				if(bx.length !== 0){
					if(bx.is(":hidden")){
						bx.stop().slideDown(200);
						$(this).addClass("on");
					} else {
						bx.stop().slideUp(200);
						$(this).removeClass("on");
					}
					return false;
				}
			}
		});
	}
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
	$('<div class="controll">\
		<a href="#" class="prev"><span>이전</span></a>\
		<span></span>\
		<a href="#" class="next"><span>다음</span></a>\
	</div>').appendTo($("#etc .ar .head"));

	var obj = $("#etc .ar");
		obj.btn_open = obj.find(">.open");
		obj.btn_open_clone = $('[data-action="ar"]');
		obj.btn_close = obj.find(">.close");
		obj.btn_prev = obj.find(" .controll>.prev");
		obj.btn_next = obj.find(" .controll>.next");
		obj.cookieData = obj.find(" .foot input:checkbox");
		obj.focusSave = "";

	function _simbol(){
		var w_size = Math.floor(parseInt($("#etc .ar .midd").width()) / parseInt($("#etc .ar .midd>ul>li:eq(0)").innerWidth())) * 3;
			w_size = Math.ceil($("#etc .ar .midd>ul>li").length / w_size);
		
		$("#etc .ar .controll>span").empty();
		for(var i=0; i<w_size; i++){
			$('<a href="#" class="num"><span>'+(i+1)+'</span></a>').appendTo($("#etc .ar .controll>span"));
		}

		obj.btn = obj.find(" .controll .num");
		_set(1);
		obj.btn.on("click",function(){
			var idx = obj.btn.index($(this)) + 1;
			_set(idx);
			return false;
		});

		if(w_size < 2){
			$("#etc .ar .controll").css("display","none");	
		} else {
			$("#etc .ar .controll").css("display","inline-block");	
		}
	}
	function _on(){
		$("body").attr("data-ar","on");

		_simbol();
	}
	function _off(){
		$("body").attr("data-ar","off");
		if(obj.cookieData.prop("checked")){
			//쿠키저장
			$.cookie('pcu_enter-ar', 'ok', '');
			//alert($.cookie('key'));
		}

		if(obj.focusSave !== ""){
			obj.focusSave.focus();
			obj.focusSave = "";
		}
	}

	obj.btn_open.on("click",function(){_on();return false;});
	obj.btn_close.on("click",function(){_off();return false;});
	obj.cookieData.on("change",function(){_off();return false;});

	obj.btn_open_clone.on("click",function(){
		_on();
		$("#etc .ar .midd>ul>li:eq(0) a").focus();
		obj.focusSave = obj.btn_open_clone;
		return false;
	});

	function _set(idx){
		obj.attr('data-page',idx);
		obj.btn.removeClass("on").eq(idx-1).addClass("on");
	}
	
	obj.btn_prev.on("click",function(){
		var cnt = obj.find(" .controll .num").length;
		var idx = (parseInt(obj.attr('data-page'))-1 > 0) ? parseInt(obj.attr('data-page')) - 1 : cnt;
		_set(idx);
		return false;
	});
	obj.btn_next.on("click",function(){
		var cnt = obj.find(" .controll .num").length;
		var idx = (parseInt(obj.attr('data-page')) < cnt) ? parseInt(obj.attr('data-page')) + 1 : 1;
		_set(idx);
		return false;
	});
	$(window).on("resize",function(){
		_simbol();
	});

	if($.trim($.cookie('pcu_enter-ar')) !== "ok"){
		if($("body#main").length !== 0) _on();
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

	
	if($("body#main").length !== 0){
		var scroll_save = "";
		function __scroll(str){
			var _this = str;
			var t = (obj.quick_scroll > _this.scrollTop()) ? "2":"3";
			var b = $("#wrap").innerHeight() - $(window).height() - _this.scrollTop();
			
			if($("body").attr("data-q_menu") !== t) $("body").attr("data-q_menu",t);
			obj.quick_scroll = _this.scrollTop();
			if(b < 10){
				if($("body").attr("data-scroll-bottom") !== "on") $("body").attr("data-scroll-bottom","on");
			} else {
				if($("body").attr("data-scroll-bottom") !== "off") $("body").attr("data-scroll-bottom","off");
			}
	
			if($("body#main").length !== 0){
				//메인
				if(b < 10){
					// $("body").attr("data-q_menu-open","off");
				} else {
					if($("body").attr("data-q_menu-open") !== "off") $("body").attr("data-q_menu-open","off");
					else if($("body").attr("data-q_menu-open") !== "on") $("body").attr("data-q_menu-open","on");
				}
			}
		}
		$(window).on("scroll",function(){
			clearTimeout(scroll_save);
			scroll_save = setTimeout(function(){__scroll($(this))},500);
		});
	}
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

	tab Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function tab_AC(){
	function _set(str){
		var obj = str;
			obj.bx = obj.find(">.in");
			obj.li = obj.bx.find(">ul>li");
			obj.btn = obj.find(">.more");
			obj.lineCheck = "";

		function _position(){
			obj.MaxH = obj.find(">.in").innerHeight() + (parseInt(obj.css("padding-top")) * 2);
			obj.MinH = obj.MaxH - obj.find(">.in").innerHeight() + obj.bx.find(">ul>li").eq(0).innerHeight();

			for(var i=0; i<obj.li.length; i++){
				if(obj.li.eq(i).position().top > 0){
					obj.lineCheck = "on";
					i = 9999;
				} else {
					obj.lineCheck = "off";
				}
			}
			obj.attr('data-more',obj.lineCheck)
				.attr('data-min',obj.MinH)
				.attr('data-max',obj.MaxH);

			if(obj.lineCheck == "on"){
				obj.css("height",obj.MinH)
					.attr('data-open','off');
				obj.btn.find(">span").text("더보기");
			}
		}
		_position();

		$(window).on("resize",function(){_position();});

		obj.btn.on("click",function(){
			if(obj.attr('data-open') === "off"){
				obj.css("height",obj.MaxH).attr('data-open','on');
				obj.btn.find(">span").text("닫기");
			} else {
				obj.css("height",obj.MinH).attr('data-open','off');
				obj.btn.find(">span").text("더보기");
			}
			return false;
		});

		obj.btn.on("keydown",function(event){
			if(obj.attr("data-open") === "on"){
				if(!shift && event.keyCode === 9){
					obj.li.eq(0).find(" a").focus();
					return false;
				}
				
			}
		});
		obj.li.eq(0).find(" a").on("keydown",function(event){
			if(obj.attr("data-open") === "on"){
				if(shift && event.keyCode === 9){
					obj.btn.focus();
					return false;
				}
			}
		});

		if(obj.attr('data-tab-js')){
			_view(obj);
		}
	}

	function _view(obj){
		var tabs = obj.li.find(" a");
		var box = $('[data-tab-view]');

		tabs.on("click",function(){
			var idx = $.trim($(this).attr('data-page'));

			if(idx === "all"){
				box.show();
			} else {
				box.hide();
				$('[data-tab-view="'+idx+'"]').show();
			}

			tabs.unwrap();
			tabs.wrap("<span />");

			obj.li.find(' a[data-page="'+idx+'"]').unwrap().wrap('<strong />');
			return false;
		});
	}

	for(var i=0; i<$('[data-tab="1"]').length; i++){
		_set($('[data-tab="1"]').eq(i));
	}
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

	showbox js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function showbox(){
	function _set(str){
		var obj = str;
			obj.btn_open = obj.find('[data-arrow="1"][data-type="down"]');
			obj.btn_close = obj.find('[data-arrow="1"][data-type="up"]');
			obj.bx = obj.find('>div');

		function _open(){
			obj.bx.stop().slideDown(200);
			obj.btn_open.hide();
			obj.btn_close.show();
		}
		function _close(){
			obj.bx.stop().slideUp(200);
			obj.btn_open.show();
			obj.btn_close.hide();
		}
		_close();
		obj.btn_open.on("click",function(){_open();return false;});
		obj.btn_close.on("click",function(){_close();return false;});
	}
	for(var i=0; i<$('[data-showbox]').length; i++){
		_set($('[data-showbox]').eq(i));
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	campus js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function campus_AC(){
	function _set(str){
		var obj = str;
			obj.btn = obj.find('>.midd>ul>li>a');
			obj.bx = obj.find('>.head');

		function _open(idx){
			var li = obj.find('>.midd>ul>li').eq(parseInt(idx));
			$('<div class="m">\
				<img src="../../../images/site/enter/content/movie_grid.png" alt="" class="grid" />\
				<div></div>\
			   </div>\
			   <div class="t">\
				  <strong>'+li.find(" .t").text()+'</strong>\
				  <div data-box="scroll"><div class="scrollbx" data-scroll="y">'+li.find(" .c").html()+'</div></div>\
				  <a href="#" class="j"><span>자막닫기</span></a>\
			   </div>').appendTo(obj.bx.empty());

			obj.find(' [data-scroll="y"]').niceScroll({cursorcolor: "#8B919C"});

			if(li.find(" .b").attr("data-file").indexOf(".mp4") !== -1){
				$('<video width="100%" height="275" controls="" poster="'+li.find(" .b").attr("data-poster")+'"><source src="'+li.find(" .b").attr("data-file")+'" type="video/mp4"></video>').appendTo(obj.bx.find(" .m>div"));
			} else {
				$('<iframe src="https://www.youtube.com/embed/'+li.find(" .b").attr("data-file")+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>').appendTo(obj.bx.find(" .m>div"));
			}

			obj.find('>.midd>ul>li').removeClass("on");
			li.addClass("on");

			obj.attr("data-jamac","on");
			obj.bx.find(" .j").on("click",function(){
				if(obj.attr("data-jamac") !== "on"){
					obj.attr("data-jamac","on");
					obj.bx.find(" .j>span").text("자막닫기");
					obj.bx.find('[data-box="scroll"]').stop().slideDown(200);
				} else {
					obj.attr("data-jamac","off");
					obj.bx.find(" .j>span").text("자막열기");
					obj.bx.find('[data-box="scroll"]').stop().slideUp(200);
				}
				return false;
			});
		}
		_open(0);
		obj.btn.on("click",function(){
			var idx = obj.btn.parent().index($(this).parent());
			_open(idx);
			return false;
		});
	}
	for(var i=0; i<$('[data-cam="1"]').length; i++){
		_set($('[data-cam="1"]').eq(i));
	}
}



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

	main visual js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function main_visual_AC(){
	function _set(str){
		var obj = str;
			obj.li = obj.find(">.move>ul>li");
			obj.countbox = obj.find(" .controll .c");
			obj.bar = obj.find(" .controll .s>span");
			obj.btn_play = obj.find(" .controll .play");
			obj.btn_stop = obj.find(" .controll .stop");
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 10000;
			obj.sw = false;

		function _bar(str){
			if(str === "on") obj.bar.stop().css("height","0").animate({"height":"100%"},obj.saveTimeSpeed);
			else obj.bar.stop().animate({"height":"0"},1000);
		}
		function _count(){
			var a = obj.cnt + 1;
			var b = (a + 1 > obj.li.length) ? 1:a + 1;
				a = (a<10) ? "0"+a:a;
				b = (b<10) ? "0"+b:b;
			obj.countbox.html('<em>'+a+'</em>/<span>'+b+'</span>');
			_bar("on");
		}	
		function _move(idx){
			if(obj.sw) obj.attr('data-start','on');
			obj.li.removeClass("on");
			obj.li.eq(idx).addClass("on");
			obj.sw = true;

			if(obj.li.eq(idx).find(" .video").length !== 0){
				//비디오
				var vid = obj.li.eq(idx).find(" .video");
				onYouTubeBind(vid);
			} else {
				$("#visual .video").empty();
			}
			obj.cnt = idx;
			if(obj.autos === "Y"){
				_on();
				_count();
			} else {
				_bar("off");
			}
		}
		_move(obj.cnt);

		function _on(){
			obj.autos = "Y";
			obj.btn_play.hide();
			obj.btn_stop.show();
			_bar("on");
			obj.saveTime = setTimeout(function(){
				var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt + 1;
				_move(idx);
			},obj.saveTimeSpeed)
		}
		function _off(){
			obj.autos = "N";
			obj.btn_play.show();
			obj.btn_stop.hide();
			clearTimeout(obj.saveTime);
			_bar("off");
		}

		obj.btn_play.on("click",function(){_on();return false;});
		obj.btn_stop.on("click",function(){_off();return false;});
	}
	
	for(var i=0; i<$('#visual').length; i++){
		_set($('#visual').eq(i));
	}
}


var videoID,player;
function onYouTubeIframeAPIReady() {return false;}
function onYouTubeBind(vid) {
	var videoID = vid.data("video");
	vid.css("opacity","0").html('<div id="player"></div>');
	player = new YT.Player('player', {
		videoId: videoID,
		playerVars: {
			'playlist':videoID,
			'autoplay': 0,
			'autohide': 0,
			'end': 0,
			'loop': 1,
			'modestbranding': 1,
			'rel': 0,
			'controls': 0,
			'disablekb': 1,
			'enablejsapi': 0,
			'iv_load_policy': 3,
			'vq':'hd1080',
			'origin': window.location.origin
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
	vidRescale();
}

function onPlayerReady(event) {
	//event.target.mute();
	player.setVolume(0);
	event.target.seekTo(0);
	setTimeout(function(){
		$("#visual .video").css("opacity","1");
	},300);
}

function onPlayerStateChange(e) {
	if (e.data === 1){
		$("#visual .video").css("opacity","1");
	} else if (e.data === 0){
		player.seekTo(0);
	}
}

function vidRescale(){
	if(player == undefined) return false;
	var w = $("#visual").width(),
		h = $("#visual").height()+100;

	if (w/h > 16/9) {
		player.setSize(w, h-100);
		$("#player").css({"position":"absolute","top":"0%","left":"0%"});
	} else {
		player.setSize(w, h);
		$("#player").css({"position":"absolute","top":"50%","left":"50%","margin-top":"-"+($("#player").height()/2)+"px","margin-left":"-"+($("#player").width()/2)+"px"});

	}
}

$(window).on('resize', function(){
	vidRescale();
});


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
			
			if(ob.attr("data-steps") !== "10"){
				if(step < 10) step = 0;
				else step = Math.floor(step / 10);
				if(t2 > 0 && t2 < ob.innerHeight()){
					if(ob.attr("data-steps") !== step) ob.attr("data-steps",step);
				} else {
					if(t2 < 10) {
	//					ob.removeAttr("data-steps");
					}
					else {
						if(ob.attr("data-steps") !== "10") ob.attr("data-steps","10");
					}
				}
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

	main major Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function main_major_AC(){
	function _set(str){
		var obj = str;
			obj.cnt = 0;
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 7000;
		var jsonData = {"data":[]};

		function _custom(callback){
			var li = obj.find(">ul>li");
			if(li.length < 1) return false;

			$('<div class="move">\
				  <ul></ul>\
			   </div>\
			   <div class="controll">\
				  <a href="#" class="prev"><span>이전</span></a>\
				  <span><em>00</em>/<span>00</span></span>\
				  <a href="#" class="next"><span>다음</span></a>\
				  <a href="#" class="play"><span>재생</span></a>\
				  <a href="#" class="stop"><span>정지</span></a>\
			   </div>').appendTo(obj);

			obj.box = obj.find(">.move>ul");
			obj.btn_prev = obj.find(">.controll>.prev");
			obj.btn_next = obj.find(">.controll>.next");
			obj.btn_play = obj.find(">.controll>.play");
			obj.btn_stop = obj.find(">.controll>.stop");
			obj.count = obj.find(">.controll>span");

			for(var i=0; i<li.length; i++){
				var d_title = $.trim(li.eq(i).text());
				var d_img = li.eq(i).data('img');
				var d_link1 = (li.eq(i).data('link1') !== undefined) ? li.eq(i).data('link1').split(","):"";
				var d_link2 = (li.eq(i).data('link2') !== undefined) ? li.eq(i).data('link2').split(","):"";
				var d = {
					"title":d_title,
					"img":d_img,
					"link1":{"title":d_link1[0],"href":d_link1[1]},
					"link2":{"title":d_link2[0],"href":d_link2[1]}
				}
				jsonData.data.push(d);
			}
			obj.find(">ul").remove();

			callback();
		}
		function _list(){
			for(var i=0; i<jsonData.data.length; i++){
				var checkedVal = (i === 0) ? "checked":"";
				$('<li>\
					<div class="in">\
						<input type="radio" name="major_list" id="major_list_'+(i+1)+'" '+checkedVal+'>\
						<label for="major_list_'+(i+1)+'"><span>'+jsonData.data[i].title+'</span></label>\
						<div class="v" style="background-image:url('+jsonData.data[i].img+');">\
							<strong><span>'+jsonData.data[i].title+'</span></strong>\
							<span class="etc"></span>\
						</div>\
					</div>\
				</li>').appendTo(obj.box);

				if(jsonData.data[i].link1.title !== undefined){
					$('<a href="'+jsonData.data[i].link1.href+'" target="_blank" title="새창" class="link_1" rel="noopener noreferrer"><span>'+jsonData.data[i].link1.title+'</span></a>').appendTo(obj.box.find(">li").last().find(" .etc"));
				}
				if(jsonData.data[i].link2.title !== undefined){
					$('<a href="'+jsonData.data[i].link2.href+'" class="link_2" rel="noopener noreferrer"><span>'+jsonData.data[i].link2.title+'</span></a>').appendTo(obj.box.find(">li").last().find(" .etc"));
				}
			}

			obj.li = obj.box.find(">li");
			_count();
		}
		function _count(){
			var min = (obj.cnt+1 < 10) ? "0"+(obj.cnt+1):obj.cnt+1;
			var max = (obj.li.length < 10) ? "0"+obj.li.length:obj.li.length;
			obj.count.html('<em>'+min+'</em>/<span>'+max+'</span>');
		}
		function _move(idx){
			_stop();
			var ch = (obj.box.height() < 100) ? "w":"h";
			if(ch === "h"){
				var t = 0;
				if(idx !== 0){
					for(var i=0; i<idx; i++){
						t += parseInt(obj.li.eq(i).innerHeight());
					}
				}
				obj.box.stop().animate({"scrollTop":t+"px"},300);
			} else {
				var l = 0;
				if(idx !== 0){
					for(var i=0; i<idx; i++){
						l += parseInt(obj.li.eq(i).innerWidth());
					}
				}
				obj.box.stop().animate({"scrollLeft":l+"px"},300);
			}

			obj.li.eq(idx).find("input:radio").click();
			obj.cnt = idx;
			_count();
			if(obj.autos === "Y"){
				_play();
			}
		}
		function _play(){
			obj.saveTime = setTimeout(function(){obj.btn_next.click()},obj.saveTimeSpeed);
		}
		function _stop(){
			clearTimeout(obj.saveTime);
		}
		function _controll(){
			obj.btn_prev.on("click",function(){
				var idx = (obj.cnt - 1 < 0) ? obj.li.length-1:obj.cnt - 1;
				_move(idx);
				return false;
			});
			obj.btn_next.on("click",function(){
				var idx = (obj.cnt + 1 > obj.li.length-1) ? 0:obj.cnt + 1;
				_move(idx);
				return false;
			});

			obj.btn_play.on("click",function(){
				obj.autos = "Y";
				obj.btn_play.hide();
				obj.btn_stop.show();
				_play();
				return false;
			});
			obj.btn_stop.on("click",function(){
				obj.autos = "N";
				obj.btn_stop.hide();
				obj.btn_play.show();
				_stop();
				return false;
			});

			obj.li.find(" input:radio").on("change",function(){
				var idx = obj.li.find(" input:radio").index($(this));
				_move(idx);
			});
		}
		$(window).on("resize",function(){
			_move(obj.cnt);
		});
		_custom(function(){
			_list();
			_controll();
			if(obj.autos === "Y") obj.btn_play.click();
		});
	}
	for(var i=0; i<$('.major').length; i++){
		_set($('.major').eq(i));
	}
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main media Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function main_media_AC(){
	function _set(str){
		var obj = str;
			obj.li = obj.find(">ul>li");
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 5000;

		function _count(idx){
			obj.li.removeClass("on").eq(idx).addClass("on");
			if(obj.autos === "Y"){
				_play();
			}
		}
		function _play(){
			obj.saveTime = setTimeout(function(){
				var idx = obj.li.index(obj.find(">ul>li.on"));
					idx = (idx+1 > obj.li.length-1) ? 0:(idx+1);
				_count(idx);
			},obj.saveTimeSpeed);
		}
		function _stop(){
			clearTimeout(obj.saveTime);
		}

		obj.li.find(">a").on("mouseover focus",function(){
			var idx = obj.li.index($(this).parent());
			obj.autos = "N";
			_stop();
			_count(idx);
		});

		obj.li.find(">a").on("mouseout blur",function(){
			var idx = obj.li.index($(this).parent());
			obj.autos = "Y";
			_play();
		});
		_count(0);
	}
	for(var i=0; i<$(".media").length; i++){
		_set($(".media").eq(i));
	}
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


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main media etc Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function main_media_etc_AC(){
	var obj = $(".media_etc");
		obj.ch = false;
		obj.downX = 0;
		obj.moveX = 0;
		obj.scroll_l = 0;

	obj.on("mousedown",function(e){
		obj.ch = true;
		var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
		obj.scroll_l = obj.scrollLeft();
		obj.downX = x;
	});
	$(document).on("mousemove",function(e){
		if(obj.ch){
			var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
			obj.moveX = obj.downX - x;

			if((obj.moveX < -10 || obj.moveX > 10)){
				obj.scrollLeft(obj.scroll_l+obj.moveX);

				obj.find(" a").unbind("click").bind("click",function(){return false;});
			}
		} else {
			obj.find(" a").unbind("click");
			return false;
		}
	});
	$(document).on("mouseup",function(e){
		obj.ch = false;
		obj.chmove = false;
	});
	$(document).on("mousemove",function(e){
		e.preventDefault();
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main media etc Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function content_info_list_AC(){
	function _set(str){
		var obj = str;
			obj.btn = obj.find(" button");
			obj.btn_link = obj.find(" a[href='#']");

		obj.btn.on("click",function(){
			if($(this).attr('data-readonly') === "on"){
				alert("준비중 입니다.");
			} else {
				var ch = $(this).parent().attr('data-open');
				obj.btn.parents("li").attr('data-open','off');
				obj.btn.parent().attr('data-open','off');
				$(this).parents("li").attr('data-open','on');
				if(ch !== "on") $(this).parent().attr('data-open','on');
				else $(this).parent().attr('data-open','off');
			}
		});

		obj.btn_link.on("click",function(){
			alert("준비중 입니다.");
			return false;
		});
	}
	for(var i=0; i<$('[data-box="info"]').length; i++){
		_set($('[data-box="info"]').eq(i));
	}
}
