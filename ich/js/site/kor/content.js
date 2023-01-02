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
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li");
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
				gnb_obj.li.ul.li.ul = gnb_obj.li.ul.li.find(">ul");
				gnb_obj.li.ul.li.ul.li = gnb_obj.li.ul.li.ul.find(">li");
				gnb_obj.li.ul.li.ul.li.a = gnb_obj.li.ul.li.ul.li.find(">a");
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
		},500);
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
		$(this).parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});

	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});

		gnb_obj.li.ul.li.ul.li.a.on("mouseover focus",function(){
		var idx = $(this).parent().parent().parent().index();

		gnb_obj.li.ul.li.find(">a.on").removeClass("on");
		$(this).parent().parent().siblings("a").addClass("on");
		gnb_obj.li.ul.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});


	function gnb_def(){
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},300);
		gnb_obj.blind.stop().animate({"height":0+"px"},300);


		if(code[0] > -1){
			var obj = gnb_obj.li.eq(code[0]);
			obj.find(">a").addClass("on");

			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");
										if(code[3] > -1){
												obj = obj.find(">ul>li").eq(code[3]);
												obj.find(">a").addClass("on");

										}
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
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH -2).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+"px"},300);
		gnb_obj.blind.stop().animate({"height":(gnb_obj.maxH + 100)+"px"},300);
				gnb_obj.blind.find(">div>div >strong").text(gnb_obj.li.eq(idx).find(">a").text());
	}


	//slide_map
	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div></div></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));

	//Mobile Menu
	var mob_gnb_obj = $("#slide_map");
		mob_gnb_obj.box = mob_gnb_obj.find(">.inner");
		mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds");
		mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
		mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");
				mob_gnb_obj.box.gnb.ul.li.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">ul");
				mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.find(">li");
				mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.find(">a");

	mob_gnb_obj.box.gnb.ul.li.ul.li.a.each(function(){
		var i = $(this);

		if(i.siblings("ul").size() != 0){
			i.addClass("arrow");
		}
	});


	mob_def();
	// $(window).resize(function(){
	// 	mob_def();
	// });
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
										if(code[3] > -1){
												obj = obj.find(">ul>li").eq(code[3]);
												obj.find(">a").addClass("on");
												obj.find(">a").siblings("ul").show();
										}
				}
			}

		}
	}

	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on");
			$(this).toggleClass("on");
			return false;
		} else {
			return true;
		}
	});

	mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on");
			$(this).toggleClass("on");
			return false;
		} else {
			return true;
		}
	});
		mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.not(this).removeClass("on");
			$(this).toggleClass("on");
			return false;
		} else {
			return true;
		}
	});
	mob_gnb_obj.box.gnb.ul.li.ul.li.ul.parent().addClass("child");
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$('<div class="title_box"><strong><span>SITE MAP</span></strong></div><div class="side_link"></div>').prependTo($("#slide_map >.inner > .binds"));
   /* $(".user #header .line_2 .searchs").clone(false).appendTo($("#slide_map >.inner > .binds"));*/
    $('<a href="#" class="m_close">전체메뉴닫기</a>').appendTo($("#slide_map >.inner > .binds"));
    /*$(".user #header .line_2 .searchs_box").appendTo($("#slide_map >.inner > .binds"));*/
    $("#header .line_2 form [data-skin='select']").clone(false).prependTo($("#slide_map >.inner > .binds >.side_link"));
	$("#header .line_2 form .login").clone(false).prependTo($("#slide_map >.inner > .binds >.side_link"));


	$(".allmenu_btn_open").click(function() {

		if($("#slide_map").is(":hidden") && !$("body").hasClass("pc")){
				$("body").addClass("fixed");
				$(this).toggleClass("on");
				if($(this).hasClass("on")){
				} else {

					$("body").removeClass("fixed");
				}
				return false;
			} else {
				$(this).removeClass("on");
				return true;
			}
	});

		$("#slide_map>.inner>.binds>.m_close").click(function(){
		$("body").removeClass("fixed");
				$(".allmenu_btn_open").removeClass("on");
	});

	$(window).resize(function() {
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"margin-right":0});
		}
	});

		if($(".user #slide_map .inner .binds >ul >li >a.on").size() == 0){
				$(".user #slide_map .inner .binds >ul >li").first().find(">a").addClass("on");
		}

		$(document).click(function(e) {
			if($(e.target).parents("#slide_map").size() != 0) {
					//메뉴 안
			} else {
					//밖
					if(!$(".js_mobile_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"margin-left":-$("#slide_map .inner").innerWidth()},300,function(){
					/*$("#slide_map").fadeOut(300);*/
					$("body").removeClass("fixed");
				});
			}
			}
	});
});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	LEFT MENU Function
	작성자 : publishers

	ex)
	var Lmenu_code = "0101";//메뉴코드
	Lmenu_setting(Lmenu_code);//실행

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function Lmenu_setting(code){
	var str = new Array();
	str[0] = code.substr("2","2");
	str[1] = code.substr("4","2");
		var Lmenu = $("#remote > .js_menu > ul");
				Lmenu.autoMenu = "";
				Lmenu.autoMenuSpeed = 1000;
				Lmenu.clickCheck = "Y";
				Lmenu.li = Lmenu.find(">li");
				Lmenu.li.cnt = Lmenu.li.size();
				Lmenu.li.a = Lmenu.li.find(">a");
				Lmenu.li.a.minheight = 0;
				Lmenu.li.ul = Lmenu.li.find(">ul");
			Lmenu.li.ul.li = Lmenu.li.ul.find(">li");
			Lmenu.li.ul.li.a = Lmenu.li.ul.li.find(">a");
			Lmenu.li.ul.li.ul = Lmenu.li.ul.li.find(">ul");//3차
			Lmenu.li.ul.li.ul.li = Lmenu.li.ul.li.ul.find(">li");
			Lmenu.li.ul.li.ul.li.a = Lmenu.li.ul.li.ul.li.find(">a");

			Lmenu.li.ul.each(function(){
				if($(this).size() != 0){
					$(this).siblings("a").find(" span").append("<em class='ico'></em>");
				}
			});

	var deps_ch1 = null;
	var deps_ch2 = null;
	var deps_ch3 = null;
	if(Lmenu.li.eq(0).attr("class")){
		if(Lmenu.li.eq(0).attr("class").indexOf("sitemap") != -1){
			for(var i=0; i<Lmenu.li.size(); i++){
				if(Lmenu.li.eq(i).hasClass("sitemap_"+str[0])){
					deps_ch1 = i+1;
				}
			}
		} else {
			for(var i=0; i<Lmenu.li.size(); i++){//.hasClass("sub"+str[0]+"_00")
				if(Lmenu.li.eq(i).hasClass("sub"+code.substr("0","2")+"_"+str[0])){
					deps_ch1 = i+1;

					if(Lmenu.li.eq(i).find(">ul").size() != 0){
						var obj2 = Lmenu.li.eq(i).find(">ul>li");
						for(var r=0; r<obj2.size(); r++){
							if(obj2.eq(r).hasClass("sub"+code.substr("0","2")+"_"+str[0]+"_"+str[1])){
								deps_ch2 = r+1;

								if(obj2.eq(r).find(">ul").size() != 0){
									var obj3 = obj2.eq(r).find(">ul>li");
									for(var t=0; t<obj3.size(); t++){
										if(obj3.eq(t).hasClass("sub"+code.substr("0","2")+"_"+str[0]+"_"+str[1]+"_"+str[2])){
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
		}

		str[0] = deps_ch1;
		str[1] = deps_ch2;
		str[2] = deps_ch3;
	}

	for(var i=0; i<Lmenu.find(" li").size(); i++){
		if(Lmenu.find(" li").eq(i).find(">ul").size() != 0){
			Lmenu.find(" li").eq(i).find(">a").addClass("child");
		}
	}

	Lmenu.find(" li").removeAttr("class");

	if(str[0] || str[0] == "0") Lmenu.code1 = str[0]-1;
	else Lmenu.code1 = null;
		if(str[1] || str[1] == "0") Lmenu.code2 = str[1]-1;
	else Lmenu.code2 = null;
	if(str[2] || str[2] == "0") Lmenu.code3 = str[2]-1;
	else Lmenu.code3 = null;

//console.log(Lmenu.code1+"//"+Lmenu.code2+"//"+Lmenu.code3);

	//초기화
	Lmenu.li.find(" ul").not(":hidden").hide();
	Lmenu_def(Lmenu);

	//click시
	Lmenu.li.a.click(function(){
		Lmenu.idx_01 = Lmenu.li.index($(this).parent());

		if(!$(this).hasClass("ov")){
			Lmenu_open(Lmenu);
		}

		if($(this).parent().find(">ul").size() != 0) return false;
		else return true;

	});

	//영역이탈시 초기화
	Lmenu.mouseleave(function(){
		if(Lmenu.idx_01 == Lmenu.code1) return false;
		Lmenu.setTime = setTimeout(function(){
			Lmenu_def(Lmenu);
		},1000);
	});

	//영역 복귀
	Lmenu.mouseenter(function(){
		clearTimeout(Lmenu.setTime);
	});

}
function Lmenu_open(Lmenu){
	Lmenu.li.ul.li.find(" ul").not(":hidden").hide();
	Lmenu.li.find(">ul").not(":hidden").slideUp(300);
	Lmenu.find(" a.ov").removeClass("ov");

	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.idx_01);
	deps_01.find(">a").addClass("ov");

	if(deps_01.find(">ul").size() != 0){
		deps_01.find(">ul").slideDown(300);
	}
}
function Lmenu_def(Lmenu){
	Lmenu.li.ul.li.find(" ul").not(":hidden").hide();
	Lmenu.li.find(">ul").not(":hidden").slideUp(300);
	Lmenu.find(" a.ov").removeClass("ov");

	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.code1);
	deps_01.find(">a").addClass("ov");

	//2deps
	if(Lmenu.code2 != -1 && Lmenu.code2 != null){
		var deps_02 = deps_01.find(">ul>li").eq(Lmenu.code2);
		deps_02.find(">a").addClass("ov");
		deps_01.find(">ul").slideDown(300,function(){
			if(Lmenu.code3 != -1 && Lmenu.code3 != null){
				var deps_03 = deps_02.find(">ul>li").eq(Lmenu.code3);
				deps_03.find(">a").addClass("ov");
				deps_02.find(">ul").slideDown(300);
			}
		});
	}
	Lmenu.idx_01 = Lmenu.code1;
	Lmenu.idx_02 = Lmenu.code2;
	Lmenu.idx_03 = Lmenu.code3;
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

탭

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".tab_wrap").size() != 0){
		main_tabs_js();
	}
});

function main_tabs_js(){
	var obj = $(".tab_wrap");
		obj.tab = obj.find(">.tab_btn ul li a");
		obj.cont = obj.find(" .tab_cont");

		//초기 셋팅
		obj.tab.parent().parent().find("li:eq(0) a").addClass("on");
		obj.cont.eq(0).addClass("on");

	obj.tab.click(function(){
		var idx = $(this).parent().index();
		obj.tab.removeClass("on"). find(">strong").contents().unwrap().wrap('<span></span>');
		$(this).addClass("on"). find(">span").contents().unwrap().wrap('<strong></strong>');
		obj.cont.removeClass("on");
		obj.cont.eq(idx).addClass("on");
		return false;
	});
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

	셀랙트 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#sec01").size() != 0){
		sec01_AC();
	}
});

function sec01_AC(){
		$("#sec01 .texts .in .m_search .boxs [data-skin='select'] >a").click(function(){
				$(this).parents(".boxs").addClass("focus");
		});

		$("#sec01 .texts .in .m_search .boxs [data-skin='input'] input").focusin(function(){
				$(this).parents(".boxs").addClass("focus");
		});

		$("#sec01 .texts .in .m_search .boxs [data-skin='select'] >a").focusout(function(){

		});

		$("#sec01 .texts .in .m_search .boxs [data-skin='input'] input").focusout(function(){
				$(this).parents(".boxs").removeClass("focus");
		});

		$("#sec01 .texts .in .m_search .boxs [data-skin='submit'] a").focusout(function(){
				$(this).parents(".boxs").removeClass("focus");
		});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main Journey js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#sec04").size() != 0){
		sec04_AC();
	}
});

function sec04_AC(){
		var obj = $("#sec04 .t_box >ul >li");
		var photos = $("#sec04 .p_box >ul >li");
		var idx = 0;

		obj.find("a").removeClass("active");
		obj.eq(0).find("a").addClass("active");
		photos.removeClass("active");
		photos.eq(0).addClass("active");

		obj.find("a").on("mouseover",function(){
				obj.find("a").removeClass("active");
				$(this).addClass("active");
				idx = $(this).parent().index();
				photos.removeClass("active");
				photos.eq(idx).addClass("active");
		});
/*
		obj.find("a").on("click",function(){
			return false;
		});
*/
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	스크롤 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("#main").size() != 0){
		layout_scroll_AC();
	}
});
function layout_scroll_AC(){
		$("body").attr("data-scroll-count", "0");
		$("#wrap").on("scroll",function(){
				var t = 0;
				var arr = ['sec01','sec02','sec03','sec04','sec05','sec06','sec07','sec08'];
				var cnt = 0;

				for(var i=0; i<arr.length; i++){
						var ob = $("#"+arr[i]);
						var t2 = (t - ob.offset().top) + $(window).height();
						var step = Math.floor(t2 / ob.innerHeight() * 100);

						if(step < 10) step = 0;
						else step = Math.floor(step / 10);
						if(t2 > 0 && t2 < ob.innerHeight()){
								ob.attr("data-steps",step);
								ob.parent().parent().parent().attr("data-scroll-count",i);
						} else {
								if(t2 < 10){
										ob.removeAttr("data-steps");
								}
								else{
										ob.attr("data-steps","10");
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

	ICH COLLECTION js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#sec06").size() != 0){
		sec06_AC();
	}
});

function sec06_AC(){

		var slide = $("#sec06 .inner .slide_06") ;
				slide.titles = slide.find(">.title");
				slide.controls = slide.find(">.control");
		$('<a href="#link" class="btn_left"><span>이전</span></a> \
			<ul></ul> \
			<a href="#link" class="btn_play"><span>재생</span></a>\
			<a href="#link" class="btn_stop"><span>정지</span></a>\
			<a href="#link" class="btn_right"><span>다음</span></a>\
			<span class="count"><span>1</span>/' + slide.find(">.move>ul>li").size()+'</span>').appendTo(slide.controls);


				slide.btn_left = slide.controls.find(">.btn_left");
				slide.btn_right = slide.controls.find(">.btn_right");
				slide.btn_play = slide.controls.find(">.btn_play");
				slide.btn_stop = slide.controls.find(">.btn_stop");
				slide.moves = slide.find(">.move");
				slide.count = slide.controls.find(">.count");
				slide.ul = slide.moves.find(">ul");
				slide.li = slide.ul.find(">li");
				slide.a = slide.ul.find(">li>a");
				slide.autos = /*"Y"*/(slide.attr("data-auto") == "N") ? "N":"Y";
				slide.cnt = 0;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

		//심볼
				for(var i=0; i<slide.li.size(); i++){
						$('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
						slide.li.eq(i).attr("data-count",(i+1));
				}
				slide.simbols = slide.controls.find(">ul>li");


		function _set(idx){
				if(slide.ul.is(":animated")) return false;
				var l = (slide.li.eq(0).innerWidth() * idx) * -1;
				slide.ul.animate({"left":l+"px"},300,function(){
						if(idx >= slide.li.size()){
								idx = 0;
								slide.ul.css("left","0");
						}

						slide.simbols.find(">a.on").removeClass("on");
						slide.simbols.eq(idx).find(">a").addClass("on");
						slide.cnt = idx;

						slide.count.find(">span").text(idx+1);
				});
		}
		_set(slide.cnt);

		function auto_play(){
				var idx = slide.cnt+1;
				if(idx > slide.li.size()) idx = 0;
				_set(idx);
		}
		var plays = setInterval(auto_play,5000);


		slide.simbols.find(">a").click(function(){
				var idx = slide.simbols.index($(this).parent());
				_set(idx);
				slide.btn_stop.trigger("click");
				return false;
		});


		slide.btn_left.click(function(){
				var idx = slide.cnt-1;
				if(idx < 0) idx = slide.li.size()-1;
				_set(idx);
				slide.autos = "N";
				slide.btn_stop.trigger("click");
				return false;
		});
		slide.btn_right.click(function(){
				slide.btn_stop.click();
				var idx = slide.cnt+1;
				if(idx > slide.li.size()) idx = 0;
				_set(idx);
				slide.attr("data-auto","N");
				slide.btn_stop.trigger("click");
				return false;
		});


//버튼 : 재생
slide.btn_play.click(function(){
	slide.btn_play.hide();
	slide.btn_stop.css("display","inline-block");
	slide.attr("data-auto","Y");
		plays = setInterval(auto_play, 5000);
	return false;
});

//버튼 : 정지
slide.btn_stop.click(function(){
	slide.btn_stop.hide();
	slide.btn_play.css("display","inline-block");
	slide.attr("data-auto","N");
		clearInterval(plays);
	return false;
});


		if(slide.autos == "Y"){
				plays = setInterval(auto_play, 5000);
		}else if(slide.autos == "N"){
				clearInterval(plays);
				slide.btn_stop.hide();
				slide.btn_play.css("display","inline-block");
		}


		if($(".js_mobile_check").is(":hidden")){
		setTimeout(function(){
						$("#sec06 .slide_06 .control a.btn_stop").trigger("click");
				},1000);
		}else{
				$("#sec06 .slide_06 .control a.btn_play").trigger("click");
	}
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

		포커스 슬라이드 좌우터치

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(function(){
		getLoc();
});

function getLoc(){
		var drag_x = 0;
		var drag_x_end = 0;
		var drag_obj = "";
		var ch = 0;
		var mouseCheckVal1 = false;
		var mouseCheckVal2 = false;

				$(".touchss").on("mousedown touchstart",function(e){
						drag_obj = $(e.target).parents(".touchss");
						ch = drag_obj.size();
						drag_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
						mouseCheckVal1 = true;
				});

				$(".touchss").on("mouseup touchend",function(e){
						if(ch == 0) return false;

						if(mouseCheckVal1 && mouseCheckVal2){
								if(drag_x_end - drag_x > 100) {
										drag_obj.find(".btn_left").trigger("click");
								}else if(drag_x_end - drag_x < -100) {
										drag_obj.find(".btn_right").trigger("click");
								}
								mouseCheckVal1 = false;
								mouseCheckVal2 = false;
						}
				});

				$(".touchss").on("mousemove touchmove",function(e){
						if(mouseCheckVal1){
								mouseCheckVal2 = true;
								drag_x_end = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
						} else {
								mouseCheckVal2 = false;
						}
				});
				$(".touchss").on("mousemove",function(e){
						e.preventDefault();
				});

}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main Exhibition js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function(){
	if($("#con_card .photos").size() != 0){
		card_photos_AC();
	}
});

function card_photos_AC(){
	var obj = $("#con_card .photos");
		obj.lists = obj.find(" .midd ul>li");
		obj.btn = obj.lists.find(">a");

	if(obj.lists.size() < 2){
		if(obj.lists.size() == 1){
		}
		return false;
	}

	$('<a href="#" class="btn_left">이전</a>').prependTo(obj.find(" .midd .layout "));
		$('<a href="#link" class="btn_play"><span>재생</span></a>\
			<a href="#link" class="btn_stop"><span>정지</span></a>\
			<a href="#" class="btn_right">다음</a>').appendTo(obj.find(" .midd .layout "));
		$('<div class="count"><span>1</span> / '+obj.lists.size()+'</div>').appendTo(obj.find(" .midd .layout "));

	obj.counts = obj.find(" .midd .count>span");
	obj.heads = obj.find(" .head");
		obj.midds = obj.find(" .midd");
	obj.btn_left = obj.midds.find(".btn_left");
	obj.btn_right = obj.midds.find(".btn_right");
		obj.btn_play = obj.midds.find(".btn_play");
		obj.btn_stop = obj.midds.find(".btn_stop");
		obj.autos = /*"Y"*/(obj.attr("data-auto") == "N") ? "N":"Y";

		for(var i=0; i<obj.lists.size(); i++){
				obj.lists.eq(i).attr("data-count",(i+1));
		}
	function fn_view(num){
		var w = (obj.lists.innerWidth() * -1) * num;
		obj.counts.text(obj.lists.eq(num).attr("data-count"));
		var imgs = obj.lists.eq(num).find(">a>img")[0].src;
		var alts = obj.lists.eq(num).find(">a>img").attr("alt");
				var titles = obj.lists.eq(num).find(">a>strong").text();
				var texts = obj.lists.eq(num).find(">a>p").text();
				var hrefs = obj.lists.eq(num).find(">a>span").text();
				obj.heads.find(".imgs span").css("background-image","url(" + imgs + ")");
		/*obj.heads.find(" img").attr("src", imgs);
		obj.heads.find(" img").attr("alt", alts);*/
				obj.heads.find(".texts .in .ce b").text(titles);
		obj.heads.find(".texts .in .ce p").text(texts);
				obj.heads.find(".texts .in .ce a").attr("href",hrefs);
		obj.lists.removeClass("on").eq(num).addClass("on");
				obj.cnt = 0;

	}
	fn_view(0);


		function auto_play(){

				var idx = obj.lists.index(obj.find(" .midd ul>li.on")) + 1;
				if(obj.lists.size() != obj){
						fn_view(idx);
						if($(".js_mobile_check").is(":hidden")){
								for(var i=0; i<idx; i++){
										obj.lists.eq(0).appendTo(obj.lists.parent());
										obj.lists = obj.lists.parent().find(">li");
								}
						}
				}
		}
		var plays = setInterval(auto_play,5000);

	obj.btn.click(function(){
				var idx = $(this).parent().index();
		fn_view(idx);

				console.log(idx);

				if($(".js_mobile_check").is(":hidden")){
						for(var i=0; i<idx; i++){
								console.log(i);
								obj.lists.eq(0).appendTo(obj.lists.parent());
								obj.lists = obj.lists.parent().find(">li");
						}
				}
		return false;
	});

	obj.btn_left.click(function(){
		var idx = obj.lists.index(obj.find(" .midd ul>li.on")) - 1;

				fn_view(idx);
				if($(".js_mobile_check").is(":hidden")){
						if(idx >= 0){
								obj.lists.eq(idx).prependTo(obj.lists.parent());
						}else if(idx < 0){
								obj.lists.last().prependTo(obj.lists.parent());
						}else{
								obj.lists.eq(idx - 1).prependTo(obj.lists.parent());
						}
						obj.lists = obj.lists.parent().find(">li");
				}
				clearInterval(plays);
		return false;
	});

	obj.btn_right.click(function(){
		var idx = obj.lists.index(obj.find(" .midd ul>li.on")) + 1;
		/*if(idx <= obj.lists.size()-1)*/ fn_view(idx);

				if($(".js_mobile_check").is(":hidden")){
						obj.lists.eq(0).appendTo(obj.lists.parent());
						obj.lists = obj.lists.parent().find(">li");
				}
				clearInterval(plays);
		return false;
	});

		//버튼 : 재생
		obj.btn_play.click(function(){
				obj.btn_play.hide();
				obj.btn_stop.css("display","inline-block");
				obj.attr("data-auto","Y");
				plays = setInterval(auto_play, 5000);
				return false;
		});

		//버튼 : 정지
		obj.btn_stop.click(function(){
				console.log("aaa");
				obj.btn_stop.hide();
				obj.btn_play.css("display","inline-block");
				obj.attr("data-auto","N");
				clearInterval(plays);
				return false;
		});


		if(obj.autos == "Y"){
				/*obj.btn_play.hide();
				obj.btn_stop.css("display","inline-block");*/
		}else if(obj.autos == "N"){
				clearInterval(plays);
				obj.btn_stop.hide();
				obj.btn_play.css("display","inline-block");
		}

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
	var obj = $("#remote.type_02 > #lnb >ul >li");

	obj.each(function() {
		var t = $(this);
		t.btn = t.find(">a");
		t.ul = t.find(">ul");
		t.ul.li = t.ul.find(">li");

		$("<em class='hidden'>열기</em>").appendTo(t.btn);

		t.btn.on("click",function() {
			if(t.ul.is(":animated")) return false;

			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			if($(this).hasClass("on")){
				$(this).find(">em").text("닫기");
			} else {
				$(this).find(">em").text("열기");
			}
			return false;
		});

		/*t.on("mouseleave",function() {
			//if($(this).find(">ul").is(":animated")) return false;

			$(this).find(">a").removeAttr("class");
			$(this).find(">ul").slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});*/

		t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
	});

	$(".btn_share").click(function() {
		$(this).toggleClass("on");
				if($(this).hasClass("on")){
						$(this).siblings(".sns").fadeIn();
						$(this).find(" >em").text("닫기");
				}else{
						$(this).siblings(".sns").fadeOut();
						$(this).find(" >em").text("열기");
				}

		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	popup

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($('a[data-popup]').size() != 0){
		dataPopup_AC();//탐색
	}
});
function popup_open_AC(str){
	var btn = $('a[data-popup="'+str+'"]');
	var box = $('[data-skin="popup"][data-name="'+str+'"]');
		//box.btn = box.find(".btn_group>a");
		box.c = box.find(".close");

	btn.click(function(){
		box.addClass("on");
		return false;
	});
	/*box.btn.click(function(){
		//버튼
		box.removeClass("on");
		return false;
	});*/
	box.c.click(function(){
		//닫기버튼
		box.removeClass("on");
		return false;
	});

	/*box.click(function(event){
		if(event.target == this){
			box.removeClass("on");
			return false;
		}
	});*/
}

function dataPopup_AC(){
	var sys = $('a[data-popup]');
	for(var i=0; i<sys.size(); i++){
		popup_open_AC(sys.eq(i).attr("data-popup"));
	}
}



$(function(){
	slide_veiw()  // 게시판 상세 이미지 뷰어
})


function slide_veiw(){
	//팝업존
	var slide = $('.photos .veiw_slide');
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(".btn_left");
	slide.btn_right = slide.controls.find(".btn_right");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 1000;
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}

	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}

	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

	//버튼 : 다음
	slide.btn_right.click(function(){
		movement("right");
		return false;
	});

	//버튼 : 이전
	slide.btn_left.click(function(){
		movement("left");
		return false;
	});


	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
		if(slide.li.eq(0).is(":animated")) return false;

		var w = -100;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.li = slide.ul.find(">li");
			slide.li.eq(0).show().css("left",w+"%");
			slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,"easeOutCubic",function(){
				$(this).hide();
			});

			w = 0;

			slide.nums = slide.li.eq(0).attr("data-count");
		} else {
			slide.li.eq(1).show().stop().animate({"left":"0"},slide.speeds,"easeOutCubic",function(){
				slide.li.eq(0).hide().appendTo(slide.ul);
				// if(slide.autos == "Y"){
				// 	slide.times = setTimeout(function(){
				// 		movement("right");
				// 	},slide.times_speeds);
				// }   //자동 재생 중지
			});
			slide.nums = slide.li.eq(1).attr("data-count");
		}
		slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,"easeOutCubic",function(){
			if(ty == "right"){
				slide.li.eq(0).css("left","100%");
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
	}


/* plus btn(게시판 상세) */

$(function(){
	var plus_btn = $("[data-btn='plus_btn']")

	plus_btn.click(function(){
		$(this).toggleClass('on')
	})
});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

viewer.js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */


$(function(){
	if($('[data-list="view"] .zoom').length > 0){
		viewer_AC();
	}
})


function viewer_AC(){
	var Viewer = window.Viewer;
	var pictures = document.getElementById('gallery');
	var zoom = $('[data-list="view"]>._left>.veiw_slide>.control>.img_zoom')

	var options = {
		url: 'src',
		toolbar: {
			oneToOne: true,
			zoomIn: 4,
			zoomOut: 4,
			prev: function() {
				viewer.prev(true);
			},

			play: true,

			next: function() {
				viewer.next(true);
			},
		}
	}

	var viewer = new Viewer(pictures, options);


	zoom.click(function(){
		viewer.show()
	})


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

    layout search btn click

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */


$(function(){
	if($('.searchs').size != 0){
		searchs_box();
	}
})


function searchs_box(){
    var obj = $('.searchs');
    var close = $('.searchs_box .close');
    
    obj.click(function(){
        if(!$(this).hasClass("on")){
            $(this).addClass("on");
            $(this).parents(".line_2").addClass("search");
            $(this).siblings(".searchs_box").show();
        }
        return false;
    });
    
    close.click(function(){
        $(this).parent().parent().find(".searchs").removeClass("on");
        $(this).parents(".line_2").removeClass("search");
        $(this).parents(".searchs_box").hide();
        return false;
    });
}



