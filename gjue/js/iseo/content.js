/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Top Menu Function
	
	ex)
	var Tmenu_code = "0101";//메뉴코드
	Tmenu_setting(Tmenu_code);//실행	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
var save_code1 = "";
var save_code2 = "";
var save_code3 = "";
function Tmenu_setting(codes){
    /// 변수처리
	var str = new Array();
		str[0] = codes.substr("0","2");	
		str[1] = codes.substr("2","2");
		str[2] = codes.substr("4","2");
		
	if(codes.length <= 1 || str[0] > $("#header .js_menu>ul>li").size()){
		str[0] = 0;
		str[1] = 0;
		str[2] = 0;
	}
	  
    var Tmenu = $("#header .js_menu > ul");
	Tmenu.intervals = "";
	Tmenu.h = $("#header").height();
    Tmenu.li = Tmenu.find(">li");
    Tmenu.li.a = Tmenu.li.find(">a");
    Tmenu.li.ul = Tmenu.li.find(">ul");
    Tmenu.li.ul.li = Tmenu.li.ul.find(">li");
    Tmenu.li.ul.li.a = Tmenu.li.ul.li.find(">a");
    Tmenu.li.ul.li.ul = Tmenu.li.ul.li.find(">ul");
    Tmenu.li.ul.li.ul.li = Tmenu.li.ul.li.ul.find(">li");
    Tmenu.li.ul.li.ul.li.a = Tmenu.li.ul.li.ul.li.find(">a");
    Tmenu.bg = $("#header #gnb");
    Tmenu.bg.h = Tmenu.bg.height();

    Tmenu.arrow = $("#header .js_menu > .arrow");

    Tmenu.mobileBtn = $(".menu_mobile");
    
    
    var deps_ch1 = null;
	var deps_ch2 = null;
	var deps_ch3 = null;

	for(var i=0; i<Tmenu.li.size(); i++){	
		if(Tmenu.li.eq(i).hasClass("sub"+str[0])){	

			deps_ch1 = i+1;			

			if(Tmenu.li.eq(i).find(">ul").size() != 0){
				var obj2 = Tmenu.li.eq(i).find(">ul>li");				
				for(var r=0; r<obj2.size(); r++){								
					if(obj2.eq(r).hasClass("sub"+str[0]+"_"+str[1])){						
						deps_ch2 = r+1;

						if(obj2.eq(r).find(">ul").size() != 0){
							var obj3 = obj2.eq(r).find(">ul>li");
							for(var t=0; t<obj3.size(); t++){
								if(obj3.eq(t).hasClass("sub"+str[0]+"_"+str[1]+"_"+str[2])){
									deps_ch3 = t+1;
								}
							}
						} else {
							deps_ch3 = null;
						}
					}
				}
			} else {
				deps_ch3 = null;
			}
		}
	}

	str[0] = deps_ch1;
	str[1] = deps_ch2;
	str[2] = deps_ch3;

	save_code1 = deps_ch1-1;
	save_code2 = deps_ch2-1;
	save_code3 = deps_ch3-1;

	//사이트맵 or 좌측메뉴 데이터 바인딩
	var slide_text = "공주교육대학교 국제교류원";

	$('<div id="slide_map"><strong class="slide_map_titles">전체메뉴보기<span>'+slide_text+'</span></strong><div class="binds"></div><a href="#" class="slide_map_close">닫기</a></div>').prependTo($("#wrap"));
	Tmenu.clone(false).appendTo($("#slide_map > .binds"));
	for(var r=0; r<$("#slide_map > .binds>ul>li").size(); r++){
		$("#slide_map > .binds>ul>li").eq(r).addClass("line_"+(r+1));
	}
	$("#slide_map > .binds>ul").addClass("slide_list");

	for(var i=0; i<$("#slide_map > .binds>ul li").size(); i++){
		if($("#slide_map > .binds>ul li").eq(i).find(">ul").size() != 0){
			$("#slide_map > .binds>ul li").eq(i).find(">a").addClass("child");
		}
	}

	$(".slide_list>li>ul>li>ul>li>ul").addClass("tabmenu");
	
	$("#slide_map > .binds>ul>li>ul").wrap($('<div class="scroll_box" />'));
$(window).load(function(){
	$("#slide_map > .binds, #slide_map > .binds>ul>li>.scroll_box").mCustomScrollbar({
		autoHideScrollbar:false,
		theme:"light-thin",
		scrollInertia:350
	});
});	

	Tmenu.find(" li").removeAttr("class");
	
	
	var Tmenu_timesave = "";
	if(str[0] || str[0] == "0") Tmenu.code1 = str[0]-1;
	else Tmenu.code1 = -1;
    	if(str[1] || str[1] == "0") Tmenu.code2 = str[1]-1;
	else Tmenu.code2 = -1;
	if(str[2] || str[2] == "0") Tmenu.code3 = str[2]-1;
	else Tmenu.code3 = -1;

	save_code1 = Tmenu.code1;
	save_code2 = Tmenu.code2;
	save_code3 = Tmenu.code3;
	
	$(window).load(function(){
		Tmenu_def(Tmenu,"first");//초기화
	});


	Tmenu.li.ul.hide();

	//pc
	Tmenu.li.a.on("mouseover focus",function(){
		if($("body").hasClass("mobile")) return false;
		var idx = Tmenu.li.index($(this).parent());

		
		Tmenu_open(Tmenu,idx);
	});

	Tmenu.li.ul.li.a.on("mouseover focus",function(){
		if($("body").hasClass("mobile")) return false;
		var idx = Tmenu.li.index($(this).parent().parent().parent());

		Tmenu.li.a.removeClass("on");
		Tmenu.li.eq(idx).find(">a").addClass("on");
	});

	Tmenu.mouseleave(function(){
		Tmenu.intervals = setTimeout(function(){
			$(".user #header").removeClass("on");
			Tmenu_def(Tmenu);
		},500);
	});

	Tmenu.mouseenter(function(){
		if(!$(".user #header").hasClass("on")) $(".user #header").addClass("on");
		clearTimeout(Tmenu.intervals);
	});

	Tmenu.li.a.click(function(){
		if($("body").hasClass("mobile")){
			var idx = Tmenu.li.index($(this).parent());
			
			if($(this).siblings("ul").is(":hidden")){
				Tmenu_open(Tmenu,idx);
			}
			return false;
		}
	});


	Tmenu.mobileBtn.click(function(){
		if(parseInt($("body").css("left")) > 0) return false;

		var obj = $("#header #etc, #header #global, #header .js_menu, #slide_line");

		blind_on($("#wrap"));
		obj.show();
		$("body").animate({"left":"250px"},300,function(){
			Tmenu_def(Tmenu);
		});

		$("#blind").click(function(){
			$("body").animate({"left":"0px"},300,function(){
				obj.hide();
				blind_off();
			});
			
			return false;
		});
		return false;
	});



	Tmenu.checks = "";
	if($(".js_mobile_check").is(":hidden")){
		Tmenu.checks = "pc";
	} else {
		Tmenu.checks = "mobile";
	}


	$(window).resize(function(){
		var mc = $(".js_mobile_check");
		var ch = "";
		if(mc.is(":hidden")){
			ch = "pc";
		} else {
			ch = "mobile";
		}
		
		if(ch != Tmenu.checks){ 
			if($("#blind").size() != 0) blind_off();
			$("body").removeAttr("style");
			$("#header .js_menu > ul *").removeAttr("style");
			$("#header #etc, #header #global, #header .js_menu, #slide_map").removeAttr("style");

			$("#slide_line, #slide_map").removeAttr("style").removeAttr("class");

			$(".sns_box").hide();
			$(".js_password_box").hide();
			
			Tmenu.checks = ch;
		}


		//arrow
		if(Tmenu.arrow.size() != 0 && !Tmenu.arrow.is(":hidden")){
			var arrow_w = Tmenu.li.eq(Tmenu.code1).find(">a").innerWidth();
			var arrow_l = Tmenu.li.eq(Tmenu.code1).find(">a").position().left;
		
			Tmenu.arrow.show().stop().animate({"left":arrow_l+"px","width":arrow_w+"px"},300);
		}

		// Tmenu.bg.h = Tmenu.bg.removeAttr("style").height();
		// Tmenu.bg.stop().css({"height":Tmenu.bg.h+"px"});
	});

}


function Tmenu_open(Tmenu,code){
	if(code == 0) code = "0";
	idx = code;

	var obj = Tmenu.li.eq(idx);
	Tmenu.li.a.removeClass("on");
	obj.find(">a").addClass("on");
	Tmenu.li.find(">strong").hide();

	if($("body").hasClass("pc")){
		//활성
		
		Tmenu.li.ul.stop().slideDown(200);

		
	} else {
		Tmenu.li.ul.not(":hidden").stop().slideUp(200);
		obj.find(">ul").stop().slideDown(200);
	}

}

function Tmenu_def(Tmenu,index){
	$("#header .js_menu > ul *").removeAttr("style");
	Tmenu.li.find(">strong").hide();
	Tmenu.li.find(" a.on").removeClass("on");

	if($("body").hasClass("pc")){
		if(Tmenu.code1 > -1){
			Tmenu.li.ul.hide();
			var obj = Tmenu.li.eq(Tmenu.code1).find(">a");
			var w = obj.innerWidth();
			var l = obj.position().left;
			obj.addClass("on");

		} else {
			var sp = (index !== undefined) ? 0:200;
			Tmenu.li.ul.stop().slideUp(sp);
		}
	} else {
		//mobile
		Tmenu.li.ul.stop().hide();
		var obj = Tmenu.li.eq(Tmenu.code1).find(">a");
		
		if(obj.siblings("ul").is(":hidden")){
			obj.addClass("on");
			Tmenu.li.ul.not(":hidden").stop().slideUp(200);
			obj.siblings("ul").stop().slideDown(200);
		}
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	전체메뉴 클릭시 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	if($(".btn_menu_all").size() != 0){
		setTimeout(function(){
			menu_all_AC();
		},201);
	}
});

function menu_all_AC(){
	var btn = $(".btn_menu_all");
	var btn_close = $("#slide_map .slide_map_close");
	var save_obj = "";

	var slide_obj = $("#slide_map > .binds .slide_list");
		slide_obj.li = slide_obj.find(">li");
		slide_obj.a = slide_obj.li.find(" a");


	//셋팅
	//상단
	$('<div class="btn_etc"></div>').insertBefore($("#slide_map .slide_list"));
	$("#global > .global_box > ul").clone(false).appendTo($("#slide_map .btn_etc"));
	//하단
	$('<div class="btn_head"></div>').insertAfter($("#slide_map .slide_list"));
	$("#global > .global_box > .search_form").clone(true).appendTo($("#slide_map .btn_head"));

	$(".list_menu li .cons").mCustomScrollbar({
		autoHideScrollbar:false,
		theme:"light-thin",
		scrollInertia:350
	});

	function menu_slide_def(){
		if(save_code1 == -1){
			$("#slide_map > .binds .slide_list .on").removeClass("on");
			$("#slide_map > .binds .slide_list ul").hide();
		} else {
			var obj = $("#slide_map > .binds .slide_list > li").eq(save_code1);

			$("#slide_map > .binds .slide_list .on").removeClass("on");
			$("#slide_map > .binds .slide_list ul").hide();

			obj.find(">a").addClass("on");
			if(obj.find(">ul").size() != 0){
				obj.find(">ul").slideDown(200,function(){
					if(save_code2 != -1){
						obj = obj.find(">li").eq(save_code2);
						obj.find(">a").addClass("on");
						if(obj.find(">ul").size() != 0){
							obj.find(">ul").slideDown(200,function(){
								obj = obj.find(">li").eq(save_code3);
								obj.find(">a").addClass("on");
							});
						}
					}
				});
			} else if(obj.find(">.scroll_box").size() != 0){
				//스크롤 적용시
				obj.find(" .mCSB_container > ul").slideDown(200,function(){
					if(save_code2 != -1){
						obj = obj.find(" .mCSB_container > ul > li").eq(save_code2);
						obj.find(">a").addClass("on");
						if(obj.find(">ul").size() != 0){
							obj.find(">ul").slideDown(200,function(){
								obj = obj.find(">li").eq(save_code3);
								obj.find(">a").addClass("on");
							});
						}
					}
				});
			}
		}
	}

	menu_slide_def();

	slide_obj.a.click(function(e){
		if(!$("body").hasClass("pc")){
			if(parseInt($("#slide_map").css("right")) >= 0){
				//e.preventDefault();
				if($(this).parent().find(" ul").size() != 0 && !$(this).parent().find(" ul").hasClass("tabmenu")){
					if($(this).hasClass("on")){
						$(this).removeClass("on");
						if($(this).parent().find(" .mCSB_container").size() != 0){
							$(this).parent().find(" .mCSB_container > ul").slideUp(200);
						} else {
							$(this).parent().find(" > ul").slideUp(200);
						}
					} else {
						$(this).addClass("on");
						if($(this).parent().find(" .mCSB_container").size() != 0){
							$(this).parent().find(" .mCSB_container > ul").slideDown(200);
						} else {
							$(this).parent().find(" > ul").slideDown(200);
						}
					}
					return false;
				} else {
					e.stopPropagation();
					return true;
				}
			} else {
				e.stopPropagation();
				return true;
			}
		} else {
			e.stopPropagation();
			return true;
		}
	});



	btn.on("click",function(){
		save_obj = $(this);
		var ch = $("body").hasClass("pc");

		if(ch){
			//pc
			blind_on($("#wrap"),function(){
				$("#slide_map").fadeIn(300,function(){
					$("#slide_map > .binds a:first").focus();
				});
			});

			$("#blind").bind("click",function(){
				btn_close.click();
				return false;
			});
		} else {
			//mobile
			blind_on($("#wrap"),function(){
				$("#slide_map").show().css({"right":"-"+$("#slide_map").width()+"px"}).animate({"right":"0"},300,function(){
					$("#slide_map .btn_etc > a:first").focus();
				});
			});
			$("#blind").bind("click",function(){
				btn_close.click();
				$("#slide_map").removeAttr("class");
				return false;
			});
		}
		return false;
	});

	btn_close.on("click",function(){
		var ch = $("body").hasClass("pc");

		if(ch){
			//pc
			$("#slide_map").fadeOut(300,function(){
				blind_off();
				$(".btn_menu_all").focus();
				menu_slide_def();
			});
		} else {
			//mobile
			$("#slide_map").animate({"right":"-"+$("#slide_map").width()+"px"},300,function(){
				$("#slide_map").hide();
				blind_off();
				$(".btn_menu_all").focus();
				menu_slide_def();
			});
		}
		return false;
	});

/*
	$("#slide_map a:first").on("keydown",function(e){
		if(e.keyCode == 9 && shift){
			btn_close.focus();
			return false;
		}
	});
*/
	$("#slide_map .btn_etc > a:first").on("keydown",function(e){	
		if(e.keyCode == 9 && shift){
			
			btn_close.focus();
			return false;
		
		}
	});

	btn_close.on("keydown",function(e){
		if(e.keyCode == 9 && !shift){
			if($("#slide_map .search_form").is(":hidden") || $("#slide_map .search_form").size() == 0){
				$("#slide_map .binds a:first").focus();
			} else {
				$("#slide_map .btn_etc > a:first").focus();
			}
			return false;
		}
	});

}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	search 활성화 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	top_search_AC();
});

function top_search_AC(){
	var obj = $(".user #header #global .global_box");
		obj.btn = obj.find(" .btn_search");

	obj.btn.on("click",function(){
		var hit = $(this).siblings(".search_form");

		if(hit.is(":hidden")){
			hit.show(200);
			obj.btn.hide();
			hit.find(" fieldset > input:text").first().focus();
		} else {
			hit.hide(200,function(){
				obj.btn.show();
			});
		}
		return false;
	});

	obj.btn.siblings(".search_form").find(" fieldset > input:text").on("blur",function(){
		obj.btn.siblings(".search_form").hide(200,function(){
			obj.btn.show();
		});
		obj.btn.focus();
	});

	obj.btn.siblings(".search_form").find(" fieldset > input:text").on("keydown",function(e){
		if(e.keyCode == 27){
			obj.btn.siblings("div").hide(200,function(){
			obj.btn.show();
		});
			obj.btn.focus();
		}
	});
	
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	프린트 Function

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
	$('#txt').printElement(options); //팝업으로 띄울 영역 Div 아이디
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	mpopupzone Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".popupzone").size() != 0){
		mpopupzone_AC();
	}
});

function mpopupzone_AC(){
	var po = $(".popupzone");
		po.cont = po.find(" .controll");
		po.btn_play = po.cont.find(" .btn_play");
		po.btn_stop = po.cont.find(" .btn_stop");
		po.btn_left = po.cont.find(" .btn_left");
		po.btn_right = po.cont.find(" .btn_right");
		po.moves = po.find(" .move");
		po.ul = po.moves.find(" > ul");
		po.li = po.ul.find(" > li");
		po.num = 0;
		po.saveTime = "";
		po.speeds = 2000;
		po.autos = "Y";
		po.num_check = "N";
	if(po.li.size() < 2){
		if(po.li.size() == 1) po.li.eq(0).addClass("on");
		po.cont.remove();
		return false;
	}

	if(po.num_check == "Y"){
		for(var i=0; i<po.li.size(); i++){
			$('<a href="#" class="num">'+(i+1)+'</a>').prependTo(po.cont);
		}
		po.btn_num = po.cont.find(" .num");

		po.li.eq(0).addClass("on");
		po.btn_num.eq(0).addClass("on");
	}
	function fn_move(idx){
		var olds = po.ul.find(">li.on");
		var news = po.li.eq(idx);

		if(olds.is(":animated")) return false;
		if(po.num_check == "Y"){
			po.btn_num.removeClass("on");
			po.btn_num.eq(idx).addClass("on");
		}
		olds.css({"z-index":"0"});
		news.css({"display":"block","left":"50px","z-index":"100","opacity":"0"}).animate({"left":"0","opacity":"1"},500,function(){
			news.addClass("on");
			olds.removeClass("on").removeAttr("style");
			po.num = idx;

			if(po.autos == "Y"){
				po.saveTime = setTimeout(function(){
					var idx = po.num + 1;
					if(idx > po.li.size()-1) idx = 0;
					fn_move(idx);
				},po.speeds);
			}
		});
	}
	if(po.num_check == "Y"){
		po.btn_num.on("click",function(){
			po.btn_stop.click();
			var idx = po.btn_num.index($(this));
			fn_move(idx);
			return false;
		});
	}
	po.btn_left.click(function(){
		var idx = po.num - 1;
		if(idx < 0) idx = po.li.size()-1;
		po.btn_stop.click();
		fn_move(idx);
		return false;
	});

	po.btn_right.click(function(){
		var idx = po.num + 1;
		if(idx > po.li.size()-1) idx = 0;
		po.btn_stop.click();
		fn_move(idx);
		return false;
	});

	po.btn_play.on("click",function(){
		po.btn_play.hide();
		po.btn_stop.show();
		po.autos = "Y";
		po.saveTime = setTimeout(function(){
			var idx = po.num + 1;
			if(idx > po.li.size()-1) idx = 0;
			fn_move(idx);
		},po.speeds);
		return false;
	});

	po.btn_stop.on("click",function(){
		po.btn_play.show();
		po.btn_stop.hide();
		po.autos = "N";
		clearTimeout(po.saveTime);
		return false;
	});

	if(po.autos == "Y"){
		po.btn_play.click();
	}
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main slide Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#main .slide_box").size() != 0){
		main_slide_AC();
	}
});

function main_slide_AC(){
	var sl = $("#main .slide_box .cons");
		sl.ul = sl.find(" ul");
		if(sl.ul.size() == 0) return false;	
		sl.li = sl.ul.find("> li");
		if(sl.li.size() < 2){
			if(sl.li.size() == 1) sl.li.eq(0).addClass("on");
			sl.find(" .controll").remove();
			return false;
		}
		$('<div class="controll" />').prependTo(sl);
		for(var i=0; i<sl.li.size(); i++){
			$('<a href="#" class="num">'+(i+1)+'번</a>').appendTo(sl.find(" .controll"));
		}
		sl.cont = sl.find(" .controll");
		sl.num = sl.cont.find(">.num");

	sl.num.eq(0).addClass("on");
	sl.li.eq(0).addClass("on");

	function fn_move(idx){
		var olds = sl.ul.find("> li.on");
		var news = sl.li.eq(idx);
		if(news.hasClass("on")) return false;
		if(olds.is(":animated")) return false;

		sl.num.removeClass("on");
		sl.li.removeClass("on");
		sl.num.eq(idx).addClass("on");
		news.addClass("on");

		olds.animate({"left":"-100%"},300,function(){olds.css({"left":"100%"});});
		news.animate({"left":"0"},300);
	}
	
	sl.num.click(function(){
		var idx = sl.num.index($(this));
		fn_move(idx);
		return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	move-top Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#move-top").size() != 0){
		moveTop_AC();
	}
});

function moveTop_AC(){
	var btn = $("#move-top>button");

	btn.on("click",function(){
		if($("body#main").length !== 0){
			$("body").attr("data-main-page","1");
			$("#container>.in").stop().animate({"top":"0%"},500);
		}
		$("html,body").animate({"scrollTop":"0"},500);

		
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	path sns Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#path .sns").size() != 0){
		subSns_AC();
	}
});

function subSns_AC(){
	var obj = $("#path .sns");
		obj.btn = obj.find(" .gongu");
		obj.btnClose = obj.find(" .btn_close");

	obj.btn.on("click",function(){
		obj.attr('data-sw','on');
		return false;
	});
	obj.btnClose.on("click",function(){
		obj.attr('data-sw','off');
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	scroll Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	scroll_AC();
});

function scroll_AC(){
	$(window).on("scroll",function(){
		var t = $(window).scrollTop();
		var ch_t = $("#header h1").height();
		if(ch_t < t){
			$("body").attr("data-scroll-head","on");
		} else {
			$("body").attr("data-scroll-head","off");
		}
	});

	//main
	if($("body#main").length !== 0){
		var main = $("body");
		var obj = $("#container>.in");
		var count = $('#container [id*="item-"]').length;
		var p = 1;
		var moveTop = 0;
		var speeds = 1000;

		main.attr("data-main-page","1");
		function move(event){
			if(obj.is(":animated")) return false;
			if (event.deltaY < 0) {
				// scroll up
				if(main.attr("data-main-page") > count){
					p = count;
					moveTop = ((p-1) * 100)*-1;
				} else {
					p = Number(main.attr("data-main-page"))-1;
					moveTop += 100;
					if(moveTop > 0) return false;
				}
			} else {
				// scroll down
				p = Number(main.attr("data-main-page"))+1;
				moveTop = (Number(main.attr("data-main-page")) * 100)*-1;
				if(p > count){
					main.attr("data-main-page",count+1);
					return false;
				}
			}
			main.attr("data-main-page",p);
			obj.stop().animate({"top":moveTop+"%"},speeds);
		}
		for(var i=0; i<count; i++){
			$('#container [id*="item-"]').eq(i)[0].addEventListener('wheel', move, { passive: false });
		}
		

		
	}
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main notice Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("body#main").length !== 0){
		main_notice_AC();
	}
});

function main_notice_AC(){
	var obj = $("#item-3 .notice");
		obj.tabBtn = $("#item-3 .notice>.midd>ul>li>strong>a, #item-3 .notice>.midd>ul>li>span>a");

	function changeTap(str){
		var o = $("#item-3 .notice>.midd>ul>li>strong>a");
		o.unwrap().wrap("<span />");
		str.unwrap().wrap("<strong />");
	}

	obj.tabBtn.on("click",function(){
		changeTap($(this));
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main photo Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("body#main").length !== 0){
		main_photo_AC();
	}
});

function main_photo_AC(){
	var obj = $("#item-3 .photo-zone");
	$('<div class="controll">\
		<em><span>1</span>/<span>5</span></em>\
		<a href="#" class="btn_prev"><span>이전</span></a>\
		<a href="#" class="btn_stop"><span>정지</span></a>\
		<a href="#" class="btn_play"><span>재생</span></a>\
		<a href="#" class="btn_next"><span>다음</span></a>\
	</div>').prependTo(obj.find(">.midd"));

	obj.count = obj.find(">.midd>.controll>em");
	obj.btn_prev = obj.find(">.midd>.controll .btn_prev");
	obj.btn_next = obj.find(">.midd>.controll .btn_next");
	obj.btn_play = obj.find(">.midd>.controll .btn_play");
	obj.btn_stop = obj.find(">.midd>.controll .btn_stop");
	obj.li = obj.find(">.midd>.move>ul>li");
	obj.cnt = 0;
	obj.autos = "Y";
	obj.saveTime = "";
	obj.saveTimeSpeed = 6000;

	for(var i=0; i<obj.li.length; i++){
		obj.li.eq(i).attr("data-page",i+1);
	}

	if(obj.li.length < 2){
		obj.find(">.midd>.controll").remove();
		return false;
	}

	
	function point(idx){
		$('<span>'+(idx+1)+'</span>/<span>'+obj.li.length+'</span>').appendTo(obj.count.empty());
		obj.li.eq(idx).addClass("on");
	}
	point(0);
	function moves(str){
		stopSet();
		var c = (str === "next") ? obj.cnt+1:obj.cnt-1;
			c = (c<0) ? obj.li.length-1:(c>obj.li.length-1) ? 0:c;
		obj.li.removeClass("on").eq(c).addClass("on");

		point(c);
		obj.cnt = c;

		if(obj.autos === "Y"){
			playSet();
		}
	}
	function plays(){
		obj.autos = "Y";
		obj.btn_play.hide();
		obj.btn_stop.show();
		playSet();
	}
	function playSet(){
		obj.saveTime = setTimeout(function(){moves("next")},obj.saveTimeSpeed);
	}
	function stops(){
		obj.autos = "N";
		obj.btn_play.show();
		obj.btn_stop.hide();
		stopSet();
	}
	function stopSet(){
		clearTimeout(obj.saveTime);
	}

	if(obj.autos === "Y"){
		plays();
	}

	obj.btn_prev.on("click",function(){stops();moves("prev");return false;});
	obj.btn_next.on("click",function(){stops();moves("next");return false;});
	obj.btn_play.on("click",function(){plays();return false;});
	obj.btn_stop.on("click",function(){stops();return false;});
}