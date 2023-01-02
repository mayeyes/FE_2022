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
	var nav = $("#nav");
		gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
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
	
	nav.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
			$('body').removeClass('__fixed')
		},500);
	});	
	$('#header #nav #blind>.gnb_sidebox>.cont>.media_box>a').focusin(function(){  // 웹 접근성 
		gnb_open()
	})

	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());

		if(!($('.user #header .toputil_control>ul>.top_search>.searchs_box').is(':hidden'))){ //검색 창 활성화시 메뉴 막기
			return false; 
		}else{
			gnb_open(idx);
		}	
		
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
	
	function gnb_def(){
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},100,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},50);
		gnb_obj.blind.stop().animate({"height":0+"px"},50);
		
		
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
		$('body').addClass('__fixed')	
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
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+"px"},300);
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
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
//		if($(this).siblings("ul").size() != 0){
//			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
//			$(this).toggleClass("on").siblings("ul").slideToggle(300);
//			return false;	
//		} else {
//			return true;	
//		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$('<div class="top_box"><strong>전체메뉴</strong><div class="side_link"></div></div>').prependTo($("#slide_map >.inner > .binds"));
	$('<a href="#" class="m_close"><span class="hidden">전체메뉴닫기</span></a>').appendTo($("#slide_map >.inner > .binds"));
	$("#header .toputil_control>ul>li.top_lag>[data-skin='select']").clone(false).prependTo($("#slide_map >.inner > .binds > .top_box > .side_link"));
	// $("#header .toputil_control > div.q_link").clone(false).prependTo($("#slide_map >.inner > .binds >.side_link"));
	
		
	$(".allmenu_btn_open").click(function(e) {

		e.stopPropagation();
		
		if(!$("#slide_map").is(":hidden")){
				
				if($("body").hasClass('pc')){
						
				}else{
					$("body").addClass("fixed");
					$(this).toggleClass("on");
						if($(this).hasClass("on")){
							//$(this).html("<span class='hidden'>전체메뉴닫기</span>");
						} else {
							// $(this).html("<span class='hidden'>전체메뉴열기</span>");	
							$("body").removeClass("fixed");		
						}

					$("#slide_map>.inner>.binds>.m_close").click(function(){
						$("body").removeClass("fixed");
						$(".allmenu_btn_open").removeClass("on");
					});		

					return false;
				}

				

		} else {
			$(this).removeClass("on");
			return true;
		}
	});
	
	$(window).resize(function() {
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"margin-right":0});
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

	tablet / mobile check Function

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

		슬라이드 좌우터치

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



$(function(){
	if($("body#main").length === 0){
		// sub
		sns_AC();//navi sns
		tab_AC() //sub tab menu 
		// pdf_menu_AC();//pdf menu controll
		// pdf_selectbox_AC();//pdf menu selectbox
		
		// photo_slide_AC();//게시판 슬라이드 포토
		// sitemap_bind();//사이트맵 컨텐츠
		__Top.init();//상단 바로가기
	} else {
		// main
		$("#skip a[href='#content']").attr("href","#container");//메인 스킵링크 변경
		main_visual_AC(); //메인 비주얼
		__notice.init(); //메인 notice
		__Top.init();//상단 바로가기
	}
});


function main_visual_AC(){
	if($("#visual").length === 0) return false;
	var obj = $("#visual");
		obj.controls = obj.find(">.controll");
		obj.li = obj.find(".move>ul>li");
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

		// if(obj.li.eq(idx).hasClass("white")){
		// 	$("body").attr("data-main-visual","white");
		// } else {
		// 	$("body").removeAttr("data-main-visual");
		// }
	}
	_bg(obj.cnt);

	//제어	
	if(obj.li.length < 2){
		obj.btn_stop.hide();
		obj.btn_play.hide();
		return false;
	}

	//심볼
	$("<ul class='simbol'></ul>").prependTo(obj.controls);
		for(var i=0; i<obj.li.size(); i++){
			$('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(obj.controls.find(">ul"));
		}
	obj.simbols = obj.controls.find(">ul>li");
	obj.simbols.eq(0).find(">a").addClass("on");


	//버튼 : 심볼
	obj.simbols.find(">a").click(function(){
		if($(this).hasClass("on")) return false;
		var idx = obj.simbols.index($(this).parent());
		obj.btn_stop.click();
		_move(idx);
		return false;
	});

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

		//심볼
		obj.simbols.find(">a.on").removeClass("on");
		obj.simbols.eq(idx).find(">a").addClass("on");
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
		obj.css("border","1px solid black");
	});								
	obj.on("focusout",function(){
		obj.css("border","0");
	});
}


/* main - top search_box */


$(function(){
	var top_search = $('.user #header .toputil_control>ul>.top_search') 
		search_btn = top_search.find('>.searchs')
		search_box = top_search.find('>.searchs_box')
		search_close = search_box.find('>.close')


		function show_searchBox(){
			if(!(search_box.is(':hidden'))){
				search_box.removeClass('on');
				search_box.slideUp(50);
				$('body').removeClass('__blind');
				$('#header').removeClass('__active');
			 }else{
				search_box.addClass('on');
				search_box.slideDown(50);
				$('body').addClass('__blind');
				$('#header').addClass('__active');
				$('#header').removeClass('on');
			 }
		}
		search_btn.on('click', function(){
			show_searchBox()
		})

		search_close.on('click', function(){ 
			show_searchBox()
		})

		$(window).scroll(function(){
			if($('body').hasClass('pc')){	 
				search_box.hide();
				search_box.removeClass('on');
				$('body').removeClass('__blind');
				$('#header').removeClass('__active');
			}
		})
})
 





/* main - visual search_box */

$(function(){
	$('.m_search>.boxs>[data-skin="input"]>input').on('focusin', function(){
		$(this).parent().parent().addClass('focus')
	});

	$('.m_search>.boxs>[data-skin="input"]>input').on('focusout', function(){
		$(this).parent().parent().removeClass('focus')
	})
})


/* main - tab_imgbox*/


$(function(){
	var obj = $("#sec02>.tab_imgbox")
		obj.li = obj.find(">.in>ul>li");
		obj.head = obj.li.find(">.head");
		obj.btn = obj.head.find(">a:not(.more)");
	var __controll = {
		tab:function(_this){
			var idx = obj.li.index(_this.parent().parent());

			obj.li.removeClass("on").eq(idx).addClass("on");
		}
	}
	obj.btn.on("click",function(){__controll.tab($(this));return false;});
})


/* 숫자 카운트 */

function count_num(){
	$('.count_num').each(function() { 
		var $this = $(this),
			countTo = $this.attr('data-count');
		$({ countNum: $this.text()}).animate({
		  countNum: countTo 
		},
		{
		  duration: 3000, //  걸리는 시간
		  easing:'linear', 
		  step: function() { 
			$this.text(Math.floor(this.countNum));
		  },
		  complete: function() { // 멈춘 후 실행될 함수
			$this.text(this.countNum);
			$this.addClass('finished')
		  }
		});  
	  });
}



//공지사항
var __notice = {
	set:function(str){
		var obj = str;
			obj.btn = obj.find(">ul>li>a:not(.more)");
		var ___controll = function(){
			return {
				click:function(_this){
					var _old = obj.find(">ul>li>a.on");
					var t_old = _old.text();
					var t = _this.text();

					_old.removeClass("on").empty();
					$('<span>'+t_old+'</span>').appendTo(_old);

					_this.addClass("on");
					_this.empty();
					$('<strong>'+t+'</strong>').appendTo(_this);
				},
				init:function(){
					obj.btn.on("click",function(){___controll().click($(this));return false;});
				}
			}
		}
		___controll().init();
	},
	init:function(){
		for(var i=0; i<$(".notice").length; i++){
			this.set($(".notice").eq(i));
		}
	}
}


$(function(){
	var img_box = $('#sec04 .news_wrap>.notice>ul>li>.midd>ul>li>a').find('.img_box');
		$this = img_box
	
	if(!(img_box.is(':hidden'))){
		$this.parent().addClass('noti_img')
	}
})




/* family_site */

$(function(){
	var family_site = $('#footer .menu_link > .family_site')
		site_btn = family_site.find('.site_btn')
 		listbox = family_site.find('.family_listbox')

		 site_btn.on('click', function(){
			if(!(listbox.is(':hidden'))){
				listbox.slideUp();
				site_btn.removeClass('on')
			}else{
				listbox.slideDown();
				site_btn.addClass('on')
			}
		 })
})



/* scroll animation */

function el_height(){
    
    var t_margin = 0;
    var t_height = 0;
  
  $('.sa').each(function(i){
    
    var $this = $(this); 
    var bot_el = $(this).offset().top + $(this).outerHeight()/2; 
    var bot_win = $(window).scrollTop() + $(window).height();
    
    
    if(!($this.hasClass('show'))){
      
      if($this.is(['data-sa-margin'])){
        t_margin = parseInt($this.data('data-sa-margin'));
      }else{
        t_margin = t_margin;
      };
      
      
      if($this.is(['data-trigger'])){
        t_height =  $this.data('data-trigger').offset().top + t_margin;
      }else{
        t_height =  $this.offset().top + t_margin;
      }

      if(bot_win > t_height){

		if($this.is(['data-delay'])){
			delay =  $this.data('data-delay');
			console.log(delay)
		  }else{
			delay =  0;
		  }
		setTimeout(function() {
			$this.addClass('show');
			count_num()
		  }, delay);
      }
    }
	
 })
}

$(window).scroll(function(){
  el_height();
})




/* TOP btn */
var __Top = {
	set:function(){
		var ___controll;
		var obj = $('#quick');
			obj.btnTop = obj.find(">ul>li:eq(1)>a");
			
		___controll = {
			scroll:function(){
				var b = $("#wrap").innerHeight() - $(window).height() - $(window).scrollTop();
				var f = $("#footer").innerHeight();

				var winTop = $(window).scrollTop();
				var headerTop = $(window).height() / 3;

					if(winTop > headerTop){
						obj.fadeIn(300)
						if(f > b){
							obj.css("bottom",f-b+10);
						}else {
							obj.removeAttr("style");
						}
					}else{
						obj.fadeOut(300)
					}
				
				
			},
			topClick:function(){
				obj.attr("data-quick","off");
				setTimeout(function(){
					obj.attr("data-quick","on");
				},1);

				$("html,body").animate({"scrollTop":"0"},500);
			},
			init:function(){
				var _this = this;
				$(window).on("scroll",function(){_this.scroll();});
				setTimeout(function(){$(window).trigger("scroll");},300);
				obj.btnTop.on("click",function(){_this.topClick();return false;});
			}
		}
		___controll.init();
	},
	init:function(){
		this.set();
	}
}



function sns_AC(){
	$('#path .share>li>a.s_btn').click(function(){
		$('#path .share>li>.snsbx').addClass("on");
		return false;
	});
	$('#path .share>li>.snsbx>.close').click(function(){
		$(this).parent().removeClass("on");
		return false;
	});
}



/* sub tab menu */

var tabs = {
	set:function(){
		function _set(str){
			var obj = str;
				obj.cnt = obj.attr("data-view") - 1;
				obj.btn = obj.find(">.in>ul>li a");
				obj.box = $('[data-tab-view]');

			function _on(idx){
				var hit = obj.find(">.in>ul>li").eq(idx).find(" a");
				var idx = idx+1
				obj.btn.unwrap().wrap('<span />');
				hit.unwrap().wrap('<strong />');
				obj.find(">.in>ul>li>a").removeAttr("title","선택됨");
				hit.attr("title","선택됨");
				obj.attr("data-view",idx);

				obj.box.hide();
				$('[data-tab-view="'+idx+'"]').show();
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

$(function(){
	$('.file_find>#input_file').on('change',function(){
		input_file()
	})
})


/**** 파일 업로드 이름값 가져오기 ******/


function input_file(){
	var file_value = $('#input_file').val().split("\\");
	var file_name = file_value[file_value.length-1];

	$('#input_name').val(file_name);
	
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

.photo_list 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(function(){
	if($('.photo_list').length > 0){
		photo_img(); // img 여부
		attach_file()  // 첨부파일 리스트 
	} 
});


/* img 여부 */
function photo_img(){
	$('.photo_list>ul>li').each(function(){
	
		var photo = $(this).find('.photo')
			img = photo.find(' img')

		if(img.length > 0 ){
			photo.attr('data-img','Y')
		}
	});
}


/* 첨부파일 여부 */

function attach_file(){
	
		var file_btn = $('.photo_list').find('.file_btn')
			close_btn = $('.photo_list').find('.close_btn')

		if(file_btn.size() != 0){
			file_btn.on('click',function(){

				file_listbox = $(this).parent().find('.file_listbox')

					$(this).parent().attr('data-file-list','y')
					file_listbox.slideDown(200);
			})
		}
}



/* 첨부파일 리스트 닫기*/

function attach_file_close(){
	var close_btn = $('.photo_list').find('.close_btn')

		close_btn.on('click',function(){
			$(this).parent().slideUp(80)
			$(this).closest('li').attr('data-file-list','')
		})
		

}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	탭 셀렉트변환 이동 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_tab_menu").size() != 0){
		js_tab_menu();
		$(window).resize(function(){js_tab_menu();});
	}
});


function js_tab_menu(){
	var b = $(window).width();
	var tab = $(".js_tab_menu");
		tab.ul = tab.find(">ul");
		tab.li = tab.find(">ul>li");
		tab.on = tab.find(">ul>li>a.ov");
		tab.a = tab.li.find(">a");
	
	if(tab.find(">.title").size() == 0){
		$('<strong class="title"></strong>').prependTo(tab);
	}
		tab.ti = tab.find(">.title");
	
	tab.ti.html(tab.on.clone());
		
		tab.btn = tab.ti.find(">a");
		tab.span = tab.btn.find(">span");
		tab.btn.attr('onclick','');	
		$('<i class="arrow_icon"></i>').prependTo(tab.span)
	
	tab.btn.click(function(){
		if(tab.ul.is(":hidden")){
			$(this).addClass("on");
			$(this).attr('title','메뉴펼침')
			tab.ul.slideDown(200);
		} else {
			$(this).removeClass("on");
			$(this).attr('title','메뉴닫기')
			tab.ul.slideUp(200);
		}
		return false;
	});

	tab.a.click(function(){
		if(tab.hasClass("select")){
			tab.ul.slideUp(200);
			tab.find(">ul>li.on").removeClass("on");
			$(this).parent().addClass("on"); 
			tab.btn.removeClass("on").text($(this).text());
			if(tab.hasClass("onepage")){
				$(".tab_onepage").hide();
				var idx = $(this).parent().index()+1;
				$(".tab_onepage#tab0"+idx).show();
				return false;		
			}
		} else if(tab.hasClass("onepage")){
			tab.find(">ul>li.on").removeClass("on");
			$(this).parent().addClass("on");
			$(".tab_onepage").hide();
			var idx = $(this).parent().index()+1;
			$(".tab_onepage#tab0"+idx).show();
			return false;
		}
	});
	
	if($(".js_mobile_check").is(":visible")){	
		if(tab.hasClass("select")) return false;
		tab.addClass("select");		
	} else {
		if(!tab.hasClass("select")) return false;
		tab.removeClass("select");
		tab.ul.removeAttr("style");
	}
	
}