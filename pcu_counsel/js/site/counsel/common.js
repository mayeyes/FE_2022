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
	if(window.MSInputMethodContext && document.documentMode){$("<script src=\"https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js\"><\/script>").appendTo("head");}// ie css :root 적용

	if($("body#main").length === 0){
		// sub
		navi_sns_AC();//navi sns
		tab_AC();//tab
		pdf_menu_AC();//pdf menu controll
		pdf_selectbox_AC();//pdf menu selectbox
		content_top_AC();//top
		photo_slide_AC();//포토슬라이드
	} else {
		// main
		main_scroll_AC();//메인 스크롤
		layerpop_AC();//메인 레이어 팝업
	}
})
function gnb(){
    var obj = $("#header #gnb");
        obj.deps1 = obj.find(">ul>li>a");
    
	obj.find(">ul>li>div").stop().slideUp(0);
    function _on(idx){
        _off();
        obj.attr("data-open","on");
        obj.find(">ul>li>div").stop().slideDown(300);
    }
    function _off(){
        obj.attr("data-open","off");
    }
    obj.deps1.on("mouseover",function(){
        var idx = obj.find(">ul>li").index($(this).parent());
        _on(idx);
    });

    obj.on("mouseleave",function(){
		_off();
        obj.find(">ul>li>div").stop().slideUp(300);
    });

    mobile_gnb();

	function headerScroll(str){
		var t = str.scrollTop();
		var minH = $("#global").innerHeight();

		if(t>minH){
			$("body").attr('data-scroll','on');
		} else {
			$("body").attr('data-scroll','off');
		}
	}

	$(window).on("scroll",function(){headerScroll($(this));});
	headerScroll($("body"));
}

function mobile_gnb(){
	var tar = $("#header");
	var menu = $("#header #gnb > ul").clone(false);
		menu.find(">li>div>strong").remove();
		menu.find(" *").removeAttr("style");

	$('<div id="sitemap">\
		<div class="layout">\
			<strong>사이트맵</strong>\
			<div class="head"></div>\
			<div class="midd"></div>\
			<div class="foot"></div>\
		</div>\
	</div>\
	<a href="#" class="allmenu_btn_close"><span>닫기</span></a>').appendTo(tar);
	menu.appendTo(tar.find(">#sitemap > .layout > .midd"));

	$("#header #global>.layout>div:eq(0)>ul").clone().appendTo(tar.find(">#sitemap > .layout > .foot"));
	tar.find(">#sitemap > .layout > .foot>ul>li:gt(1)").remove();

	var obj = $("#sitemap");
		obj.btn_open = tar.find(" a.allmenu_btn");
		obj.btn_close = tar.find(" a.allmenu_btn_close");

	obj.btn_open.on("click",function(){$("body").attr('data-sitemap','on');return false;});
	obj.btn_close.on("click",function(){$("body").attr('data-sitemap','off');return false;});


	for(var i=0; i<obj.find(">.layout>.midd a").length; i++){
		var ch = $.trim(obj.find(">.layout>.midd a").eq(i).text());
		if(obj.find(">.layout>.midd a").eq(i).siblings("div").length !== 0){
			obj.find(">.layout>.midd a").eq(i).addClass("child");
		}
	}

	//act
	obj.find(">.layout>.midd>ul>li div").slideUp(0);
	obj.find(">.layout>.midd a").on("click",function(){console.log("aaa");
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
			if(ob.length > 0){
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
    }
    _set();
    $(window).on("scroll",function(){
    	_set();
    });
}





function content_top_AC(){
	function _set(str){
		var obj = str;
		$(window).on("scroll",function(){
			var t = $(document).innerHeight() - $(window).height() - $(this).scrollTop() - $("#footer").innerHeight();
			var b = (t * -1) - (obj.height() / 1.6);
			
			if((t + (obj.height() / 1.6)) < 0){
				obj.css("bottom",b);
			} else {
				obj.removeAttr("style");
			}
		});

		obj.find(">a").on("click",function(){
			$("html, body").animate({"scrollTop":"0"},300)
			return false;
		});
	}
	for(var i=0; i<$('#content-top').length; i++){
		_set($('#content-top').eq(i));
	}
}


function layerpop_AC(){
	if($("#layerpop").length < 1) return false;

	var c = $("#layerpop>ul").clone();
	var s = $("#layerpop>ul>li").length;

	$('<div class="in">\
		<div class="head">\
			<input type="checkbox" id="pops_dayclose" />\
			<label for="pops_dayclose">오늘하루 보지않기</label>\
		</div>\
		<div class="midd"></div>\
		<a href="#" class="btn_prev"><span>이전</span></a>\
		<a href="#" class="btn_next"><span>다음</span></a>\
		<div class="simbol"></div>\
		<a href="#" class="close"><span>닫기</span></a>\
	</div>').appendTo($("#layerpop").empty());
	c.appendTo($("#layerpop>.in>.midd"));

	var obj = $("#layerpop");
		obj.btn_prev = obj.find(" .btn_prev");
		obj.btn_next = obj.find(" .btn_next");
		obj.box = obj.find(" .midd>ul");
		obj.li = obj.box.find(">li");
		obj.btn_close = obj.find(" .close");
		obj.cnt = 0;

	var re_box = "";
	var re_sbox = "";
	var re_cnt = "";
	function _resize(){
		re_box = $("#layerpop>.in>.midd>ul").width() - 20;
		re_sbox = $("#layerpop>.in>.midd>ul>li").width();
		re_cnt = (re_box < re_sbox) ? s:Math.ceil(s/2);

		if($("#layerpop .simbol>a").length !== re_cnt){
			$("#layerpop .simbol").empty()
			for(var i=0; i<re_cnt; i++){
				$('<a href="#"><span>'+(i+1)+'</span></a>').appendTo($("#layerpop .simbol"));
			}
		}

		if(parseInt(obj.attr("data-page")) > re_cnt-1){
			obj.cnt = 0;
			_pos();
		}
	}
	_resize();

	function _pos(){
		obj.attr("data-page",obj.cnt+1);
	}
	_pos();

	obj.simbol = obj.find(" .simbol>a");

	
	function _move(str){
		if(str === "next"){
			obj.cnt++;
			if(obj.cnt > re_cnt-1) obj.cnt = 0;
		} else {
			obj.cnt--;
			if(obj.cnt < 0) obj.cnt = re_cnt-1;
		}
		_pos();
	}
	obj.btn_prev.on("click",function(){_move("prev");return false;});
	obj.btn_next.on("click",function(){_move("next");return false;});
	$(window).on("resize",function(){_resize();});
	obj.btn_close.on("click",function(){
		var ch = $("#pops_dayclose").prop("checked");
		if(ch){
			$.cookie(obj.attr("data-name"), 'off', { expires: 1 });
		}
		$("body").attr("data-popup","off");
		return false;
	});

	if($.cookie(obj.attr("data-name")) !== "off"){
		$("body").attr("data-popup","on");
	}
	
}

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

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	pro_list data-user-card="1" js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	pro_list_AC();
	$(window).resize(function(){
		pro_list_AC();
	});
});
function pro_list_AC(){
	if($('[data-user-card="1"]').size() !=0){
        var idx = $('[data-user-card="1"] > ul');
        idx.li = idx.find(">li");
        for(var i = 0; i<idx.li.size(); i++){
            if(i%2 == 0){
                if(idx.li.eq(i).innerHeight() < idx.li.eq(i+1).innerHeight()) idx.li.eq(i).css("height",idx.li.eq(i+1).innerHeight()+"px");
                else idx.li.eq(i+1).css("height",idx.li.eq(i).innerHeight()+"px");
            }
        }
        
    }
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	floor_box js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($('.floor_box').size() !=0){
        floor_box();
    }
});

function floor_box(){
    var idx = $(".floor_box .img_box .btn_box .btns");
    
    $(".floor_box .room_wrap .room_box").hide();
    idx.click(function(){
        var i = $(this).index();
        $(this).parent().parent().siblings(".room_wrap").find(".room_box").hide();
        $(this).parent().parent().siblings(".room_wrap").find(".room_box").eq(i).show();
        return false;
    });
    
    
    
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	sitemap Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($(".sitemap").size() != 0){
		$("#gnb >ul").clone(false).appendTo($(".sitemap"));
	}
});

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

main photo index js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function(){
if($('#main .np_list #photo').size() !=0){
	setTimeout(function(){main_photo_index();},600);
}
if($('#main .np_list #photo-list').size() !=0){
	setTimeout(function(){main_photo_list_index();},600);
}
});

function main_photo_index(){
var obj = $('#main .np_list #photo .midd ul li');
var idx = obj.size();
obj.parent().parent().parent().attr("data-list-index",idx);
}
function main_photo_list_index(){
var obj = $('#main .np_list #photo-list .midd ul li');
var idx = obj.size();
obj.parent().parent().parent().attr("data-list-index",idx);
}
