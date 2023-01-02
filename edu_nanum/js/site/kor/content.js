// jQuery.event.special.touchstart = {
//     setup: function( _, ns, handle ) {
//         this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
//     }
// };
// jQuery.event.special.touchmove = {
//     setup: function( _, ns, handle ) {
//         this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
//     }
// };
// jQuery.event.special.wheel = {
//     setup: function( _, ns, handle ){
//         this.addEventListener("wheel", handle, { passive: true });
//     }
// };
// jQuery.event.special.mousewheel = {
//     setup: function( _, ns, handle ){
//         this.addEventListener("mousewheel", handle, { passive: true });
//     }
// };
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

	//로그인 로그아웃
	// var btn_log = $('.user #header .head_top .toputil ul>li:eq(0)>a').clone();
	// btn_log.addClass("logout_btn");
	// btn_log.appendTo($("#slide_map >.inner > .binds"));
	//$("<a href='http://tube.mayeye.net/login.jsp?param=logout' class='logout_btn'>로그아웃</a>").appendTo($("#slide_map >.inner > .binds"));
	
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
			// mob_open();
		} else{
			mob_def();
		}
	});
	
	function mob_open(){
		mob_gnb_obj.box.gnb.ul.li.a.click(function(){
			if(!$(".js_mobile_check").is(":hidden")){
				if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
				if($(this).siblings("div").find(">ul").size() != 0){
					mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on").siblings("div").slideUp();
					$(this).toggleClass("on").siblings("div").slideToggle();
					return false;	
				} else {
					return true;	
				}
			}
		});
		
		mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
			if(!$(".js_mobile_check").is(":hidden")){
				if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
				if($(this).siblings("div").find(">ul").size() != 0){
					mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("div").slideUp();
					$(this).toggleClass("on").siblings("div").slideToggle(300);
					return false;	
				} else {
					return true;	
				}
			}
		});
	}
	mob_open();
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$(".allmenu_btn").click(function() {
		if(!$(".js_mobile_check").is(":hidden")){
			if($("#slide_map").is(":hidden")){		
				$("body").addClass("fixed");
				$("#slide_map").fadeIn(300).focus();
				$("#slide_map .inner").stop().animate({"margin-left":0},300);	
			}
			return false;
		}
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

	search Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	Search_AC();
});

function Search_AC(){
	var obj = $("#header>.head_top>.toputil");
		obj.c = obj.find(" .searchbx>.c_btn");
	var btn = $("#header>.head_top>.search_btn");

	btn.click(function(){
		obj.show();
	});
	obj.c.click(function(){
		obj.hide();
	});
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

	해시태그 삭제

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($(".hash_t").size() !=0){
		hash_Remov_AC();
	}
});

function hash_Remov_AC(){
	$(".hash_t>ul>li>a").click(function(){
		$(this).parent().remove();
		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	popup Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($('a[data-popup]').size() != 0){
		dataPopup_AC();//탐색
	}
});
function popup_open_AC(str){
	var btn = $('a[data-popup="'+str+'"]');
	var box = $('[data-skin="popup"][data-name="'+str+'"]');
		box.btn_ok = box.find(" .foot>.btn_group>a").eq(0);
		box.btn_no = box.find(" .foot>.btn_group>a").eq(1);
		box.c = box.find(" .head>.close");

	btn.click(function(){
		box.addClass("on");
		return false;
	});
	box.btn_ok.click(function(){
		//확인
		box.removeClass("on");
		return false;
	});
	box.btn_no.click(function(){
		//취소
		box.removeClass("on");
		return false;
	});
	box.c.click(function(){
		//닫기
		box.removeClass("on");
		return false;
	});

	box.click(function(event){
		if(event.target == this){
			box.removeClass("on");
			return false;
		}
	});
}

function dataPopup_AC(){
	var sys = $('a[data-popup]');
	for(var i=0; i<sys.size(); i++){
		popup_open_AC(sys.eq(i).attr("data-popup"));
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Scroll Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($('[data-scroll="y"]').size() !=0){
		$('[data-scroll="y"]').niceScroll({cursorcolor: "#8B919C"});
	}
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
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	txt more Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($('#new_video_view').size !=0){
		txt_More_AC();
	}
});

function txt_More_AC(){
	var obj = $('#new_video_view>[data-box="1"]>.main_bx>.txts>.midd>.c_txts');
		obj.btn = obj.find(' >.more');

	obj.btn.click(function(){
		if(!obj.hasClass("look_t")){
			obj.addClass("look_t");
			$(this).text("간략히");
		} else{
			obj.removeClass("look_t");
			$(this).text("더보기");
		}
		return false;
	});


}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("body#main").length !== 0) mainInit();//운영에서는 주석
});
function mainInit(){
	main_item_1_AC();//알림판
	main_item_2_AC();//게시판
	main_item_3_AC();//popup
	//main_item_4_AC();//영상 한눈에 모아보기!
	main_item_6_AC();//배너
	// style_load_AC();//
}

function style_load_AC(str){
	var obj = str;
	var ab = obj.attr('data-style').replace(/ /g,"");

	if(obj.attr("style") === undefined){
		obj.attr('style',ab);
	}
}

function main_item_1_AC(){
	function _set(str){
		$('<div class="controll"><div>\
			<a href="#" class="btn_prev"><span>이전</span></a>\
			<span><em>1</em>/3</span>\
			<a href="#" class="btn_next"><span>다음</span></a>\
			<a href="#" class="btn_stop"><span>정지</span></a>\
			<a href="#" class="btn_play"><span>재생</span></a>\
		</div></div>').prependTo(str);

		var obj = str;
			obj.move = obj.find(" .move");
			obj.li = obj.find(" .move>ul>li");
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");
			obj.btn_play = obj.find(" .btn_play");
			obj.btn_stop = obj.find(" .btn_stop");
			obj.page = obj.find(" .controll>div>span");
			obj.cnt = 0;
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;
			obj.auto = true;

		function _page(){
			obj.page.html('<em>'+(obj.cnt)+'</em>/'+obj.li.length);
		}

		function _move(ty){
			if(obj.li.eq(obj.cnt).is(":animated")) return false;
			_stop();
			var s = 500;
			if(ty === "def") s = 0;
			var n = (ty !== "prev") ? ((obj.cnt+1) > obj.li.length) ? 1:(obj.cnt+1):((obj.cnt-1) < 1) ? obj.li.length:(obj.cnt-1);
			
			obj.li.removeClass("on").fadeOut(s);
			obj.li.eq(n-1).addClass("on").fadeIn(s);
			style_load_AC(obj.li.eq(n-1).find(" a"));
			
			obj.cnt = n;
			_page();

			if(obj.auto && ty !== "def"){
				_play();
			}
		}

		function _play(){
			_stop();
			obj.saveTime = setTimeout(function(){_move("next");},obj.saveTimeSpeed);
		}
		function _stop(){
			clearTimeout(obj.saveTime);
		}
		_move("def");
		
		if(obj.li.size() < 2){
			obj.btn_prev.remove();
			obj.btn_next.remove();
			obj.btn_play.remove();
			obj.btn_stop.remove();
			return false;
		}
		
		obj.btn_next.on("click",function(){_move("next");return false;});
		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_play.on("click",function(){
			obj.auto = true;
			obj.btn_play.hide();
			obj.btn_stop.show();
			_play();
			return false;
		});
		obj.btn_stop.on("click",function(){
			obj.auto = false;
			obj.btn_play.show();
			obj.btn_stop.hide();
			_stop();
			return false;
		});

		if(obj.auto){
			obj.btn_play.trigger("click");
		}
		
	}
	for(var i=0; i<$('[data-item="arimpan"]').size(); i++){
		_set($('[data-item="arimpan"]').eq(i));
	}
}

function main_item_2_AC(){
	var obj = $('.line [data-style="2"]');
		obj.bx = obj.find(">.layout>div");


	// scroll
	var sc = $('<div class="scrollbar"><div></div></div>').appendTo(obj);

	
	// 제스쳐 추가
	var mouseCheck = false;
	var moveCheck = false;
	var _x = "";
	var arrows = "";
	
	$(document).on("mousedown",function(e){
		_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
		mouseCheck = true;
		moveCheck = false;
	});
	obj.bx.on("mousemove",function(e){
		var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
			x = x - _x;
		if(mouseCheck){
			if(x > 10 || x < -10){
				moveCheck = true;
				arrows = (x < 0) ? "left":"right";
			}
		}
		return false;
	});
	$(document).on("mouseup",function(e){
		if(moveCheck){
			var l = (arrows === "left") ? obj.bx.find(">ul>li").innerWidth():obj.bx.find(">ul>li").innerWidth() * -1;
				l = obj.bx.scrollLeft() + l;
			mouseCheck = false;
			
			obj.bx.stop().animate({"scrollLeft":l},300);
			arrows = "";
		}
		return false;
	});

	function __scroll(){
		var tot_w = (obj.bx.find(">ul>li").eq(0).innerWidth() * obj.bx.find(">ul>li").length) + (Number(obj.bx.find(">ul>li").eq(0).css("margin-right").replace("px","")) * obj.bx.find(">ul>li").length) + Number(obj.bx.find(">ul>li").eq(0).css("margin-left").replace("px",""));
		var sc_w = obj.innerWidth() / tot_w * 100;
		
		sc.find(">div").css({
			"width":sc_w+"%"
		});

		if(sc_w > 97) sc.hide();
		else sc.show();

	}
	__scroll();

	obj.bx.on("scroll",function(){
		var l = obj.bx.scrollLeft();
		var tot_w = (obj.bx.find(">ul>li").eq(0).innerWidth() * obj.bx.find(">ul>li").length) + (Number(obj.bx.find(">ul>li").eq(0).css("margin-right").replace("px","")) * obj.bx.find(">ul>li").length) + Number(obj.bx.find(">ul>li").eq(0).css("margin-left").replace("px",""));
		var r = (tot_w - obj.innerWidth()) - l;
		if(l < 10) obj.attr("data-scroll","start");
		else if(r <= 0) obj.attr("data-scroll","end");
		else obj.attr("data-scroll","middle");
		
		var sc_l = l / tot_w * 100;
		sc.find(">div").css({
			"left":sc_l+"%"
		});
	});

	$(window).on("resize",function(){__scroll();});

	obj.bx.trigger("scroll");
}

function main_item_3_AC(){
	function _set(str){
		$('<div class="controll"><strong>POPUP</strong><div>\
			<a href="#" class="btn_prev"><span>이전</span></a>\
			<span><em>1</em>/3</span>\
			<a href="#" class="btn_next"><span>다음</span></a>\
			<a href="#" class="btn_stop"><span>정지</span></a>\
			<a href="#" class="btn_play"><span>재생</span></a>\
		</div></div>').appendTo(str);

		var obj = str;
			obj.move = obj.find(" .move");
			obj.li = obj.find(" .move>ul>li");
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");
			obj.btn_play = obj.find(" .btn_play");
			obj.btn_stop = obj.find(" .btn_stop");
			obj.page = obj.find(" .controll>div>span");
			obj.cnt = 0;
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;
			obj.auto = true;

		function _page(){
			obj.page.html('<em>'+(obj.cnt)+'</em>/'+obj.li.length);
		}

		function _move(ty){
			if(obj.li.eq(obj.cnt).is(":animated")) return false;
			_stop();
			var s = 500;
			if(ty === "def") s = 0;
			var n = (ty !== "prev") ? ((obj.cnt+1) > obj.li.length) ? 1:(obj.cnt+1):((obj.cnt-1) < 1) ? obj.li.length:(obj.cnt-1);
			
			obj.li.removeClass("on").fadeOut(s);
			obj.li.eq(n-1).addClass("on").fadeIn(s);
			style_load_AC(obj.li.eq(n-1).find(" a"));
			
			obj.cnt = n;
			_page();

			if(obj.auto && ty !== "def"){
				_play();
			}
		}

		function _play(){
			_stop();
			obj.saveTime = setTimeout(function(){_move("next");},obj.saveTimeSpeed);
		}
		function _stop(){
			clearTimeout(obj.saveTime);
		}
		_move("def");
		
		if(obj.li.size() < 2){
			obj.btn_prev.remove();
			obj.btn_next.remove();
			obj.btn_play.remove();
			obj.btn_stop.remove();
			return false;
		}

		obj.btn_next.on("click",function(){_move("next");return false;});
		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_play.on("click",function(){
			obj.auto = true;
			obj.btn_play.hide();
			obj.btn_stop.show();
			_play();
			return false;
		});
		obj.btn_stop.on("click",function(){
			obj.auto = false;
			obj.btn_play.show();
			obj.btn_stop.hide();
			_stop();
			return false;
		});

		if(obj.auto){
			obj.btn_play.trigger("click");
		}
		
	}
	for(var i=0; i<$('[data-style="3"] [data-item="4"]').size(); i++){
		_set($('[data-style="3"] [data-item="4"]').eq(i));
	}
}

function main_item_4_AC(){
	function _set(str){
		var obj = str;
			obj.btn = obj.find(">.layout>.head button");
			obj.item = obj.find(">.layout>.midd [data-item]");

		for(var i=0; i<obj.find(">.layout>.midd [data-style]").length; i++){
			style_load_AC(obj.find(">.layout>.midd [data-style]").eq(i));
		}

		obj.btn.on("click",function(){
			var d = obj.btn.index($(this))+1;
			obj.attr("data-page",d);
		});

		obj.btn.eq(0).trigger("click");


		//scroll
		function __scroll_set(str){
			var obj = str;

			var sc = $('<div class="scrollbar"><div></div></div>').appendTo(obj);

			function __scroll(){
				var tot_w = (obj.find(">ul>li").eq(0).innerWidth() * obj.find(">ul>li").length) + (Number(obj.find(">ul>li").eq(0).css("margin-right").replace("px","")) * obj.find(">ul>li").length) + Number(obj.find(">ul>li").eq(0).css("margin-left").replace("px",""));
				var sc_w = obj.innerWidth() / tot_w * 100;
				
				sc.find(">div").css({
					"width":sc_w+"%"
				});
		
				if(sc_w > 97) sc.hide();
				else sc.show();
		
			}
			__scroll();

			obj.find(">ul").on("scroll",function(){
				var l = $(this).scrollLeft();
				var tot_w = (obj.find(">ul>li").eq(0).innerWidth() * obj.find(">ul>li").length) + (Number(obj.find(">ul>li").eq(0).css("margin-right").replace("px","")) * obj.find(">ul>li").length) + Number(obj.find(">ul>li").eq(0).css("margin-left").replace("px",""));
				var r = (tot_w - obj.innerWidth()) - l;
				
				var sc_l = l / tot_w * 100;
				sc.find(">div").css({
					"left":sc_l+"%"
				});
			});

			$(window).on("resize",function(){__scroll();});
		}
		for(var i=0; i<obj.item.length; i++){
			if(obj.item.eq(i).find(">ul>li").length > 0){
				__scroll_set(obj.item.eq(i));
			}
		}
	}
	for(var i=0; i<$('[data-style="4"]').size(); i++){
		_set($('[data-style="4"]').eq(i));
	}
}


function main_item_6_AC(){
	function _set(str){
		var obj = str;
			obj.btn_prev = obj.find(" .btn_prev");
			obj.btn_next = obj.find(" .btn_next");
			obj.ul = obj.find(" .move > ul");
			obj.li = obj.ul.find(">li");
		
		function _move(str){
			obj.li = obj.ul.find(">li");
			var l = obj.li.innerWidth() * -1;
			if(str == "prev"){
				obj.ul.css("left",l+"px");
				obj.li.last().prependTo(obj.ul);
				l = 0;
			}
			obj.ul.animate({"left":l+"px"},300,function(){
				if(str == "next"){
					obj.ul.css("left","0");
					obj.li.eq(0).appendTo(obj.ul);
				}
			});
		}

		obj.btn_prev.on("click",function(){_move("prev");return false;});
		obj.btn_next.on("click",function(){_move("next");return false;});
	}

	for(var i=0; i<$('[data-style="6"]').size(); i++){
		_set($('[data-style="6"]').eq(i));
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    js_accodions Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
    if($(".faq_list").size() != 0){
        js_accodions ();
    }
});
function js_accodions (){
    var obj = $(".faq_list");	
        obj.btn = obj.find(".titles");
        obj.list = obj.find(".accordion");
        obj.em = obj.find("em");

    obj.btn.click(function(){

        if(obj.list.is(":animated")) return false;	
        obj.btn.not($(this)).removeClass("on").next(".accordion").slideUp(300);				
        $(this).toggleClass("on").next(".accordion").slideToggle(300);	

        obj.find(".titles").find("em").text("열기");

        if($(this).hasClass("on")){
            $(this).find("em").text("닫기");
        }

        return false;	
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Quick menu

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	quick_AC();
});

function quick_AC(){
	$(window).scroll(function(){
		var obj = $("#q_menu");
		var t = $(document).scrollTop();
		var b = $(document).height() - $(window).height() - t;
		var cont = $("#container").innerHeight();

		if(b<=110){
			obj.addClass("fixs");
		}
		if(b>$("#footer").innerHeight()){
			obj.removeClass("fixs");
		}
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

   input text remove

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	input_t_remove();
});

function input_t_remove(){
	var obj = $("[data-input='remove']");
		obj.in = obj.find(" >input");
		obj.btn = obj.find(" >.r_btn");

	obj.in.on("keyup",function(){
		var l = $(this).val();
		if(l.length > 0){
			if($(this).siblings(".r_btn").size() == 0){
				$(this).after("<button class='r_btn'>글삭제</button>");
			}
		} else {
			$(this).siblings(".r_btn").remove();
		}

		$(this).siblings(".r_btn").click(function(){
			$(this).siblings("input").val("");
			$(this).remove();
			
		});
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Reply Mod Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	reply_mod_AC();
});

function reply_mod_AC(){
	var obj = $('#new_video_view .replys');
		obj.mod = obj.find(' >div>.btns>.mod_btn');
		obj.del = obj.find(' >div>.btns>.del_btn');
		obj.c = obj.find(' >div>.mod_bx>.closes');
		
		obj.mod.click(function(){
			$(this).parent().parent().addClass("on");
			return false;
		});
		
		obj.c.click(function(){
			$(this).parent().parent().removeClass("on");
			return false;
		});
}






/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Card news Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".card_news").size() != 0){
		card_photos_AC();
	}
});

function card_photos_AC(){
	var obj = $(".card_news");
		obj.lists = obj.find(" .midd>ul>li");
		obj.btn = obj.lists.find(">a");

	if(obj.lists.size() < 2){
		if(obj.lists.size() == 1){
			$('<div class="head" />').prependTo(obj);
			obj.lists.eq(0).find(">a>img").clone(false).prependTo(obj.find(" .head"));
			obj.find(" .midd>ul").remove();
		}
		return false;
	}

	$('<div class="head">\
         <a href="#" class="btn_left">이전</a>\
         <a href="#" class="btn_right">다음</a>\
       </div>').prependTo(obj);
	$('<div class="count"><span class="blue">1</span>/'+obj.lists.size()+'</div>').prependTo(obj.find(" .midd"));

	obj.counts = obj.find(" .midd .count>.blue");
	obj.heads = obj.find(" .head");
	obj.btn_left = obj.heads.find(">.btn_left");
	obj.btn_right = obj.heads.find(">.btn_right");
	
	fn_view(0);
	
	$(window).resize(function(){
		obj.heads.css({"height":obj.heads.find("img").height()});
	});
	function fn_view(num){
		var w = (obj.lists.innerWidth() * -1) * num;
		obj.counts.text(num+1);
		obj.heads.css({"height":obj.heads.find("img").height()});
		if(obj.heads.find(">img").size() != 0) obj.heads.find(">img").remove();
		obj.lists.eq(num).find(">a>img").clone(false).insertAfter(obj.heads.find(">.btn_left"));
		obj.lists.removeClass("on").eq(num).addClass("on");

		obj.find(" .midd>ul").stop().animate({"left":w+"px"});
	}

	obj.btn.click(function(){
		var idx = obj.btn.parent().index($(this).parent());
		fn_view(idx);
		return false;
	});

	obj.btn_left.click(function(){
		var idx = obj.lists.index(obj.find(" .midd>ul>li.on")) - 1;
		if(idx >= 0) fn_view(idx);
		return false;
	});
	obj.btn_right.click(function(){
		var idx = obj.lists.index(obj.find(" .midd>ul>li.on")) + 1;
		if(idx <= obj.lists.size()-1) fn_view(idx);
		return false;
	});
}


// 사이트맵
$(function(){
	sitemap_bind();
});

function sitemap_bind(){
	function _set(str){
		var obj = str;
		var sitemap = $("#gnb>ul").clone(false);
			sitemap.find(">li>div>strong").remove();

		sitemap.appendTo(obj);
	}
	for(var i=0; i<$('[data-content="sitemap"]').length; i++){
		_set($('[data-content="sitemap"]').eq(i));
	}
}