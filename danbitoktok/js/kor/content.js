/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Top Menu Function
	
	ex)
	var Tmenu_code = "0101";//메뉴코드
	Tmenu_setting(Tmenu_code);//실행	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function Tmenu_setting(str){
     $('<div id="blind"></div>').prependTo($("#header #gnb"));
    
    
    
	var params = str;
	var code = new Array();

	code[0] = parseInt(params.substr(0,2)) -1; //eq(n) n번지수 찾기
	code[1] = parseInt(params.substr(2,2)) -1; //eq(n) n번지수 찾기
	code[2] = parseInt(params.substr(4,2)) -1; //eq(n) n번지수 찾기

	var gnb_obj = $("#gnb > ul");
	gnb_obj.intervals = "";
    gnb_obj.li = gnb_obj.find(">li");
    gnb_obj.li.a = gnb_obj.li.find(">a");
    gnb_obj.li.ul = gnb_obj.li.find(">ul");
    gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li");
    gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
    gnb_obj.li.ul.li.ul = gnb_obj.li.ul.li.find(">ul");
    gnb_obj.li.ul.li.ul.li = gnb_obj.li.ul.li.ul.find(">li");
    gnb_obj.li.ul.li.ul.li.a = gnb_obj.li.ul.li.ul.li.find(">a");
    
	gnb_obj.li.each(function(e){
		$(this).addClass("num"+(e+1));
		$('<strong class="tmenu_ti"><span>'+$(this).find(">a >span").text()+'</span></strong>').insertAfter($(this).find(">a"));
	});
	
	
	setTimeout(function(){
		Tmenu_def(gnb_obj,code);
	},100);

	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());	
		gnb_obj.parents("#header").addClass('active');
		Tmenu_open(gnb_obj,idx);
	});

	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent().parent().parent());
		
		if(idx > 0){
			gnb_obj.li.find(">.tmenu_ti").stop().animate({"opacity":0},0,function(){$(this).hide();});	
			gnb_obj.li.eq(idx).find(">.tmenu_ti").css({"display":"block"}).stop().animate({"opacity":1},0);
		}
		gnb_obj.li.a.removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");
	});
    
    gnb_obj.li.ul.li.ul.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.ul.li.index($(this).parent().parent().parent());
		
		gnb_obj.li.ul.li.a.removeClass("on");
		gnb_obj.li.ul.li.eq(idx).find(">a").addClass("on");
	});

	gnb_obj.on("mouseleave focusout", function(){
		gnb_obj.intervals = setTimeout(function(){
			Tmenu_def(gnb_obj,code);
			gnb_obj.parents("#header").removeClass('active');
		},500);
	});

	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});

	gnb_obj.find(">li.num7 ul li:last-child > ul > li").last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			Tmenu_def(gnb_obj,code);
		},500);
	});


	//Sitemap
	$('<div id="slide_map"><div class="inner"><div class="binds"></div></div></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));
	$('<p class="kor"><a href="http://www.kwater.or.kr/" target="_blank" title="새창이동">K-water 대표 홈페이지 바로가기</a></p>').prependTo($("#slide_map >.inner"));

	$(".allmenu_btn").click(function(){
		if($("#slide_map").is(":animated")) return false;
		if(!$(".js_mobile_check").is(":hidden")){
			if($("#slide_map").is(":hidden")){
				//마이메뉴 사라짐
				if($("#mob_member").is(":visible")){
					$(".member_btn").removeClass("on").addClass("off");
					$("#mob_member").stop().animate({"opacity":0},100,function(){
						$(this).hide();
						$(this).find(">.inner").css({"left":-100+"%"});
					});
				}

				$(this).removeClass("off").addClass("on");
				$("body").addClass("fixed");
				$("#slide_map").show().stop().animate({"opacity":1},300,function(){
					$(this).find(">.inner").stop().animate({"right":0},300);
				});
			} else {
				$(this).removeClass("on").addClass("off");
				$("body").removeClass("fixed");
				$("#slide_map").stop().animate({"opacity":0},100,function(){
					$(this).hide();
					$(this).find(">.inner").css({"right":-100+"%"});
				});
			}
			return false;
		} else {
			return true;
		}
	});
	$(window).resize(function() {
		if(!$(".js_mobile_check").is(":hidden")){
			if(!$("#slide_map").is(":hidden")){
				$(".allmenu_btn").addClass("on");
			}
		} else {
			$(".allmenu_btn").removeClass("on");
		}
	});


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
                    if(code[3] >= 0){
                        var obj = obj.find(">ul>li").eq(code[3]);
                        obj.parent().show();
                        obj.find(">a").addClass("on");
                    }
				}
			}
		}
        mob_gnb_obj.box.gnb.ul.li.find(" a").each(function(e){
            var i = $(this);
            //console.log(i);

            if(i.siblings("ul").size() != 0){
                i.addClass("child");	
            }
            
        });
        
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
		if(mob_gnb_obj.box.gnb.ul.li.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle();
			return false;
		} else {
			return true;
		}
	});

	//모바일 마이메뉴
	$(".member_btn").click(function(){
		if($("#mob_member").is(":animated")) return false;
		if($("#mob_member").is(":hidden")){
			//모바일메뉴 사라짐
			if($("#slide_map").is(":visible")){
				$(".allmenu_btn").removeClass("on").addClass("off");
				$("#slide_map").stop().animate({"opacity":0},100,function(){
					$(this).hide();
					$(this).find(">.inner").css({"right":-100+"%"});
				});
			}

			$(this).removeClass("off").addClass("on");
			$("body").addClass("fixed");
			$("#mob_member").show().stop().animate({"opacity":1},300,function(){
				$(this).find(">.inner").stop().animate({"left":0},300);
			});
		} else {
			$(this).removeClass("on").addClass("off");
			$("body").removeClass("fixed");
			$("#mob_member").stop().animate({"opacity":0},100,function(){
				$(this).hide();
				$(this).find(">.inner").css({"left":-100+"%"});
			});
		}
		return false;
	});
    
    //PC Open
function Tmenu_open(gnb_obj,code){
	if(code == 0) code = "0";
	idx = code;
	
	var obj = gnb_obj.li.eq(idx);
	if(obj.find(">ul").is(":animated")) return false;
	
	gnb_obj.li.find(">.tmenu_ti").stop().animate({"opacity":1},0,function(){$(this).hide();});
	obj.find(">.tmenu_ti").css({"display":"block"}).stop().animate({"opacity":1},0);
	gnb_obj.find(">.bar").show().stop().animate({"opacity":1,"left":(obj.find(">a >span").offset().left + (obj.find(">a >span").innerWidth()/2)) +"px","width":(obj.find(">a >span").innerWidth()/2)+"px","margin-left":-(obj.find(">a >span").innerWidth()/2)+"px","padding-left":(obj.find(">a >span").innerWidth()/2)+"px"},300);
	gnb_obj.parents().find(">.blind").fadeIn(300);
	gnb_obj.li.a.removeClass("on");
	obj.find(">a").addClass("on");
	
	
    gnb_obj.li.ul.not(":hidden").stop().animate({"opacity":1},0,function(){$(this).hide();});
    obj.find(">ul").show().stop().animate({"opacity":1},0);
    if(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight() < 260){
        gnb_obj.parents("#gnb").stop().animate({"height":"261px"},300);
        gnb_obj.li.find(">.tmenu_ti").stop().animate({"height":"176px"},300);
    }else{
        gnb_obj.parents("#gnb").stop().animate({"height":(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight())+"px"},300);
        gnb_obj.li.find(">.tmenu_ti").stop().animate({"height":(obj.find(">ul").innerHeight() - 85 + obj.find(">a").innerHeight())+"px"},300);
    }
}
//PC Setting
function Tmenu_def(gnb_obj,code){
	$(".tmenu_ti").stop().animate({"opacity":1},300,function(){$(this).hide();});
	gnb_obj.find(">.bar").stop().animate({"opacity":1,"width":0+"px","margin-left":0+"px","padding-left":0+"px"},300,function(){$(this).hide();});
	gnb_obj.parents().find(">.blind").fadeOut(300);
	gnb_obj.li.find("a.on").removeClass("on");
	gnb_obj.li.ul.stop().animate({"opacity":1},300,function(){$(this).hide();});
	gnb_obj.parents("#gnb").stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},300);
    gnb_obj.li.find(">.tmenu_ti").stop().animate({"height":gnb_obj.li.a.innerHeight() - 85+"px"},300);
	
	if(code[0] > -1){
		var obj = gnb_obj.li.eq(code[0]);
		obj.find(">a").addClass("on");

		if(obj.find(">a").hasClass("on")){
			gnb_obj.find(">.bar").show().stop().animate({"opacity":1,"left":(obj.find(">a >span").offset().left + (obj.find(">a >span").innerWidth()/2)) +"px","width":(obj.find(">a >span").innerWidth()/2)+"px","margin-left":-(obj.find(">a >span").innerWidth()/2)+"px","padding-left":(obj.find(">a >span").innerWidth()/2)+"px"},300);
		}	
		
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
	var lnb_obj = $("#lnb >ul");
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

	탭 셀렉트변환 이동 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_tab").size() != 0){
		tab_mobile();
		$(window).resize(function(){tab_mobile();});
	}
});
function tab_mobile(){
	var b = $(window).width();
	var tab = $(".js_tab");
	tab.ul = tab.find(">ul");
	tab.li = tab.find(">ul>li");
	tab.on = tab.find(">ul>li.on");
	tab.a = tab.li.find(">a");

	tab.li.width((100/tab.li.size())+"%");

	if(tab.find(">.title").size() == 0){
		$('<strong class="title"></strong>').prependTo(tab);
	}
	tab.ti = tab.find(">.title");

	tab.ti.html(tab.on.find(">a").clone());

	tab.btn = tab.ti.find(">a");

	//tab.btn.removeAttr("onclick");
	if(tab.hasClass("select")){
		tab.btn.removeClass("on");
		tab.ul.slideUp(200);
	}

	tab.btn.click(function(){
		if(tab.ul.is(":hidden")){
			$(this).addClass("on");
			tab.ul.slideDown(200);
		} else {
			$(this).removeClass("on");
			tab.ul.slideUp(200);
		}
		return false;
	});

	tab.a.click(function(){
		if(tab.hasClass("select")){
			tab.ul.slideUp(200);
			tab.find(">ul>li.on").removeClass("on");
			$(this).parent().addClass("on");
			tab.on = tab.find(">ul>li.on");
			tab_mobile_set(tab);
			if(tab.hasClass("onepage")){
				$(".tab_onepage").removeClass("on");
				var idx = $(this).attr("href").substring(5, 8);
				$(".tab_onepage#tab0"+idx).addClass("on");
				return false;		
			}
		} else if(tab.hasClass("onepage")){
			tab.find(">ul>li.on").removeClass("on");
			$(this).parent().addClass("on");
			$(".tab_onepage").removeClass("on");
			var idx = $(this).attr("href").substring(5, 8);
			$(".tab_onepage#tab0"+idx).addClass("on");
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

function tab_mobile_set(tab){
	var ti = tab.find(">.title");

	ti.html(tab.on.find(">a").clone());
	tab_mobile();
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	File Function	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".css_file").size() != 0){
		file_js ();;
	}
});
function file_js(){
	var fileTarget = $(".css_file input[type='file']");

	fileTarget.on("change", function(){
		if(window.FileReader){
			// 파일명 추출
			var filename = $(this)[0].files[0].name;
		} else {
			// Old IE 파일명 추출
			var filename = $(this).val().split("/").pop().split("\\").pop();
		};

		$(this).siblings(".upload_file").val(filename);
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	프린트 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$("a.print").click(function() {
		printElem({
			printMode: 'popup',
			pageTitle:'프린트 미리보기', //팝업 타이틀
			printDelay : 1000,
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
				
	js_slider Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".js_slider").size() != 0){
		js_slider_ac();
	}
});
function js_slider_ac(){
	var slider_obj = $(".js_slider");

	for(var i=0; i<slider_obj.size(); i++){
		js_slider(slider_obj.eq(i));//배너
	}
}
function js_slider (slider_obj){
	var slider_obj = slider_obj;
	slider_obj.move = slider_obj.find(".move");
	slider_obj.move.ul = slider_obj.move.find(">ul");
	slider_obj.move.ul.li = slider_obj.move.ul.find(">li");
	slider_obj.prev = slider_obj.find(".prev_btn");
	slider_obj.next = slider_obj.find(".next_btn");

	//move	
	function fn_move(str){
		if(slider_obj.find(">.move >ul").is(":animated")) return false;
		if(str == "left"){
			var posi = slider_obj.find(".move").find(">ul");

			if(slider_obj.hasClass("notice")){
				//공지사항
				var win_wid = $(window).width();

				posi.stop().animate({"left": -100+"%"},1000,"easeInOutExpo",function(){
					if(win_wid > 723){
						for (var i=0; i<3; i++) {
							posi.find(">li:eq(0)").appendTo(posi);
						}
					} else if (win_wid <= 723){
						for (var i=0; i<2; i++) {
							posi.find(">li:eq(0)").appendTo(posi);
						}
					}
					posi.css({"left":0});
					resize ();
				});
			} else {
				//기본 스타일
				posi.elem = posi.find(">li:eq(0)");

				if(posi.is(":animated")) return false;
				posi.stop().animate({"left": - posi.elem.innerWidth()},1000,"easeInOutExpo",function(){
					posi.elem.appendTo(posi);
					posi.css({"left":0});
				});
			}
		} else {
			var posi = slider_obj.find(".move").find(">ul");

			if(slider_obj.hasClass("notice")){
				//공지사항
				var win_wid = $(window).width();

				if(win_wid > 723){
					for (var i=0; i<3; i++) {
						posi.find(">li:last").prependTo(posi);
					}
				} else if (win_wid <= 723){
					for (var i=0; i<2; i++) {
						posi.find(">li:last").prependTo(posi);
					}
				}
				resize ();
				posi.css({"left":-100+"%"});
				posi.stop().animate({"left": 0+"%"},1000,"easeInOutExpo");
			} else {
				//기본 스타일
				posi.elem = posi.find(">li:last");

				if(posi.is(":animated")) return false;
				posi.elem.prependTo(posi);
				posi.css({"left":- posi.elem.innerWidth()});
				posi.stop().animate({"left": 0},1000,"easeInOutExpo");
			}
		}
	}

	//리사이즈
	resize ();
	$(window).resize(function() {
		setTimeout(function(){ resize (); }, 500);
	});
	function resize (){
		if(slider_obj.hasClass("notice")){
			//공지사항
			var win_wid = $(window).width();

			slider_obj.move.ul.li.css({"width":slider_obj.move.width() +"px"});
			if(win_wid > 723){

				if(slider_obj.move.ul.li.size() > 3){
					slider_obj.prev.show();
					slider_obj.next.show();
				} else {
					slider_obj.prev.hide();
					slider_obj.next.hide();
				}

				slider_obj.move.ul.find(">li:nth-child(3n+1)").css({"margin-left":0 +"px"});
				slider_obj.move.ul.find(">li:nth-child(3n+2), >li:nth-child(3n)").css({"margin-left":-slider_obj.move.width() +"px"});
			} else if (win_wid <= 723){

				if(slider_obj.move.ul.li.size() > 2){
					slider_obj.prev.show();
					slider_obj.next.show();
				} else {
					slider_obj.prev.hide();
					slider_obj.next.hide();
				}

				slider_obj.move.ul.find(">li:nth-child(3n+1), >li:nth-child(3n+2), >li:nth-child(3n)").css({"margin-left":0 +"px"});
				slider_obj.move.ul.find(">li:nth-child(even)").css({"margin-left":-slider_obj.move.width() +"px"});
			}
		} else if(slider_obj.hasClass("vote")) {
			//진행중인 투표

			if(slider_obj.move.ul.li.size() > 1){
				slider_obj.prev.show();
				slider_obj.next.show();
			} else {
				slider_obj.prev.hide();
				slider_obj.next.hide();
			}

			slider_obj.move.ul.li.css({"width":slider_obj.move.width()/1});
		} else {
			//기본 스타일
			var win_wid = $(window).width();

			/*
			if(slider_obj.move.ul.li.size() < 1){
				slider_obj.parent().addClass("off");	
			}
			*/

			if(win_wid > 1006){

				if(slider_obj.move.ul.li.size() > 4){
					slider_obj.prev.show();
					slider_obj.next.show();
				} else {
					slider_obj.prev.hide();
					slider_obj.next.hide();
				}

				slider_obj.move.ul.li.css({"width":slider_obj.move.width()/4});
			} else if (win_wid <= 1006 && win_wid > 723){

				if(slider_obj.move.ul.li.size() > 3){
					slider_obj.prev.show();
					slider_obj.next.show();
				} else {
					slider_obj.prev.hide();
					slider_obj.next.hide();
				}

				slider_obj.move.ul.li.css({"width":slider_obj.move.width()/3});
			} else if (win_wid <= 723 && win_wid > 463){

				if(slider_obj.move.ul.li.size() > 2){
					slider_obj.prev.show();
					slider_obj.next.show();
				} else {
					slider_obj.prev.hide();
					slider_obj.next.hide();
				}

				slider_obj.move.ul.li.css({"width":slider_obj.move.width()/2});
			} else if (win_wid <= 463){

				if(slider_obj.move.ul.li.size() > 1){
					slider_obj.prev.show();
					slider_obj.next.show();
				} else {
					slider_obj.prev.hide();
					slider_obj.next.hide();
				}
				slider_obj.move.ul.li.css({"width":slider_obj.move.width()/1});
			}
		}
	}

	//click
	slider_obj.prev.click(function(){
		fn_move("right");
		return false;
	});

	slider_obj.next.click(function(){
		fn_move("left");
		return false;
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	layer Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	$('<div id="layer"><div id="inner"><a href="#" class="close_btn">닫기</a></div></div>').prependTo($("#wrap"));

	// //제안하기
	// $(".gong_u > a, #slide_map .link_btn >a:eq(0)").click(function(){
	// 	$(".suggest_btn").siblings(".title, .gong_u_list").clone(false).appendTo($("#layer >#inner"));
	// 	$("#layer >#inner").addClass("gong_u");
	// 	$("#layer").fadeIn(300);
	// 	resize();	
	// 	return false;	
	// });

	//신고하기
	$(".declaration_btn").click(function(){
		$(".declaration_layer").fadeIn(300);
		resize();
		return false;
	});
	$(".declaration_layer").find(".close_btn").click(function(){
		$(this).parent().parent().fadeOut(300,function(){
			$(this).find(">.inner").removeAttr("style");
		});
		return false;
	});

	//닫기
	$("#layer").find(".close_btn").click(function(){
		$(this).parent().parent().fadeOut(300,function(){
			$(this).find(".title, .gong_u_list, .suggest_list").remove();
			$(this).find(">#inner").removeAttr("class");
			$(this).find(">#inner").removeAttr("style");
		});
		return false;
	});

	$(window).resize(function() {
		resize();
	});
});
function resize (){
	var win = $(window).height();
	$("#layer >#inner").css({"top":(win - $("#layer >#inner").innerHeight())/2});
	$(".declaration_layer >.inner").css({"top":(win - $(".declaration_layer >.inner").innerHeight())/2});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	gong_u_AC Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($(".gong_u").size() != 0){
		gong_u_AC();
	}
});

function gong_u_AC(){
	var gong_u_obj = $(".gong_u");
	gong_u_obj.btn = gong_u_obj.find(">.toggle_btn");
	gong_u_obj.list = gong_u_obj.find(">ul");

	$(document).on('click', '.toggle_btn', function(){
		var t = $(this);

		if(gong_u_obj.list.is(":animated")) return false;

		if(t.parent().parent().attr("id") == "path"){
			//콘텐츠 공유
			if(t.siblings("ul").is(":hidden")){
				t.addClass("on").text("공유닫기");
				t.siblings("ul").show().stop().animate({"right":3.5+"em", "opacity":1},300);
			} else {
				t.removeClass("on").text("공유열기");
				t.siblings("ul").fadeOut(300,function(){
					$(this).css({"right":2.5+"em", "opacity":0});
				});
			}
		} else {
			//제안카드 공유
			t.siblings(".title, .gong_u_list").clone(false).appendTo($("#layer >#inner"));
			$("#layer >#inner").addClass("gong_u");
			$("#layer").fadeIn(300);
			resize();
		}
		return false;
	});

	$(window).resize(function() {
		resize();
	});
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

poll_AC Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".poll").size() != 0){
		poll_AC();
	}
});

function poll_AC(){
	var param = $(".poll .list");

	for(var i=0; i<param.size(); i++){
		js_poll (param.eq(i));
	}
}
function js_poll (param){
	var total = 0;
	var param = param;
	param.li = param.find(">li");
	param.li.count = param.li.find(">.count >span");

	param.li.count.each(function() {
		total += Number($(this).text());
	});

	param.li.each(function() {
		var t = $(this);
		t.count = t.find(">.count >span");
		t.percent = t.find(">.percent >span");

		$('<p class="data"><em class="js_count"></em>%</p>').insertAfter(t.find(">.count"));
		t.find(">.data em").text(Math.round(t.count.text()/total*100));
		//t.percent.text(Math.round(t.count.text()/total*100)+"%");
		t.percent.css({"width":Math.round(t.count.text()/total*100) +"%"});
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

count Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_count").size() != 0){
		count_AC();
	}
});
function count_AC(){
	var obj = $(".js_count");
	for(var i=0; i<obj.size(); i++){
		new numberCounter(obj.eq(i), obj.eq(i).text(),20,0);
	}
}




/* /////////////////////////////////////////////////////////////////////////////////////

현황판 값표시 childMenuOpe

///////////////////////////////////////////////////////////////////////////////////// */
function numberCounter(target_frame, target_number, rate, counts, fixs) {
	this.count = parseInt(counts); this.diff = 0;
	this.target_count = parseInt(target_number);

	var fix = ""+target_number;

	if(fixs){
		this.target_count_fixed = fix.split(".");
		if(this.target_count_fixed.length > 1){
			this.target_count_fixed = "."+this.target_count_fixed[1].substr(0,2);
		} else {
			this.target_count_fixed = ".0";
		}
	} else {
		this.target_count_fixed = "";
	}

	this.target_frame = target_frame[0];
	this.timer = null;
	this.rate = 5;
	if(rate) this.rate = rate;
	if(this.target_count < this.count){
		this.counterM(this.target_count_fixed);
	} else {
		this.counter(this.target_count_fixed);
	}
};
numberCounter.prototype.counter = function(str) {
	var self = this;
	this.diff = this.target_count - this.count;

	if(this.diff > 0) {
		self.count += Math.ceil(this.diff / this.rate);
	}

	this.target_frame.innerHTML = this.formatNumber(this.count)+str;

	if(this.count < this.target_count) {
		//this.timer = setTimeout(function() { self.counter(str); }, 20);
		this.timer = setTimeout(function() { self.counter(str); }, 50);
	} else {
		clearTimeout(this.timer);
	}
};
numberCounter.prototype.counterM = function(str) {
	var self = this;
	this.diff = this.target_count - this.count;

	if(this.diff < 0) {
		self.count += parseInt(Math.floor(this.diff / this.rate));
	}

	this.target_frame.innerHTML = this.formatNumber(this.count)+str;

	if(this.count > this.target_count) {
		//this.timer = setTimeout(function() { self.counterM(str); }, 20);
		this.timer = setTimeout(function() { self.counterM(str); }, 50);
	} else {
		clearTimeout(this.timer);
	}
};
numberCounter.prototype.formatNumber = function(num) {
	num+= '';
	x = num.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
};




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

sitmap Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".sitemap").size() != 0){
		$(".sitemap").empty();
		$("#gnb >ul").clone(false).appendTo($(".sitemap"));
	}

	$(".family_site >a").click(function() {
		$(this).toggleClass("on").siblings("ul").slideToggle(300);
		return false;
	});
});




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

ripple Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".ripple").size() != 0){
		$(".ripple_count").click(function(){
			var boxs = $(this).parent().siblings(".toggle");

			if(boxs.is(":hidden")){
				$(".ripple_count").parent().siblings(".toggle").not(":hidden").slideUp(300);
				boxs.slideDown(300);
			} else {
				boxs.slideUp(300);
			}
			return false;
		});
	}
});




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	quick function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	quick_AC();
});

function quick_AC(){
	$(window).scroll(function(){
		var obj = $("#quicks");
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

///////////////////////////////////////////////////////////////

function pops(){
	return {
		open : function(str){
			pops.close();
			$("#"+str).attr("data-open","on");
		},
		close : function(){
			$('[data-skin="alert"][data-open="on"]').attr("data-open","off");
		}
	}
}
var pops = pops();



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	board slide

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	sbx_Slide();
});

function sbx_Slide(){
	function _Set(str){
		var obj = str;
			obj.ul = obj.find(" >.move>ul");
			obj.li = obj.find(" >.move>ul>li");
			obj.cnt = 0;
			obj.lbtn = obj.find(">.control>.btn_left");
			obj.rbtn = obj.find(">.control>.btn_right");
			obj.ch = false;

			

			function _Move(idx,arrow){
				if(idx == obj.cnt || obj.li.eq(obj.cnt).is(":animated")) return false;
				if(!obj.ch){
					_Move_s(idx,arrow);
					return false;
				}

				var l = 100;
				if(arrow == "l"){
					l = l*-1;
				}

				obj.li.eq(obj.cnt).animate({"left":(l*-1)+"%"},500);
				obj.li.eq(idx).css("left",l+"%").animate({"left":"0"},500,function(){
					obj.cnt = idx;
				});
			}

			function _Move_s(idx,arrow){
				if(idx == obj.cnt || obj.li.eq(obj.cnt).is(":animated")){
					return false;
				}
				
				var l = 50;
				if(arrow == "l"){
					l = l*-1;
				}

				obj.li.eq(obj.cnt).animate({"left":(l*-1)+"%"},500);
				
				obj.li.eq(idx).css("left",l+"%").animate({"left":"0"},500,function(){
					obj.cnt = idx;
				});

				if(arrow == "r"){
					if(idx == obj.li.size()-1){
						obj.li.eq(0).css("left","100%").animate({"left":"50%"},500);
					} else {
						obj.li.eq(idx).next().css("left","100%").animate({"left":"50%"},500);
					}
				}
				if(arrow == "l"){
					obj.li.eq(obj.cnt).next().css("left","50%").animate({"left":"100%"},500);
				}
			}

			function _Check(){
				obj.ch = obj.ul.width()<(obj.li.width()+20);
				if(obj.ch){
					//1
					obj.li.css("left","100%");
					obj.li.eq(obj.cnt).css("left","0");
				} else{
					//2
					obj.li.css("left","100%");
					obj.li.eq(obj.cnt).css("left","0");
					obj.li.eq(obj.cnt).next().css("left","50%");
				}
			}
			 _Check();
			 $(window).resize(function(){
			 	_Check();
			 });

			//다음
			obj.rbtn.click(function(){
				var idx = obj.cnt+1;
				if(idx > obj.li.size()-1) idx = 0;
				_Move(idx,"r");
				return false;
			});

			//이전
			obj.lbtn.click(function(){
				var idx = obj.cnt-1;
				if(idx < 0) idx = obj.li.size()-1;
				_Move(idx,"l");
				return false;
			});
	}

		for(var i=0; i<$("[data-skin='b_slide']").size(); i++){
			_Set($("[data-skin='b_slide']").eq(i));
		}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	vertical Slide

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	verti_Slide();
});

function verti_Slide(){
	function _Set(str){
		var obj = str;
			obj.ul = obj.find(" >.move>ul");
			obj.li = obj.find(" >.move>ul>li");
			obj.cnt = 0;
			obj.tbtn = obj.find(">.control>.btn_top");
			obj.bbtn = obj.find(">.control>.btn_btm");
			obj.sbtn = obj.find(">.control>.btn_stop");
			obj.pbtn = obj.find(">.control>.btn_play");
			obj.auto = "Y";
			obj.set = "";
			obj.speed = 2000;

		function _Move(idx,arrow){
			if(idx == obj.cnt || obj.li.eq(obj.cnt).is(":animated")) return false;
			_Stop();
			var t = 100;
			if(arrow == "t"){
				t = t*-1;
			}

			obj.li.eq(obj.cnt).animate({"top":(t*-1)+"%"},500);
			obj.li.eq(idx).css("top",t+"%").animate({"top":"0"},500,function(){
				obj.cnt = idx;
				if(obj.auto == "Y"){
					_Play();
				}
			});
		}

		function _Check(){
			obj.li.css("top","100%");
			obj.li.eq(obj.cnt).css("top","0");
		}
		 _Check();

		function _Play(){
			obj.set = setTimeout(function(){
				obj.bbtn.click();
			},obj.speed);
		}
		

		function _Stop(){
			clearTimeout(obj.set);
		}

		//다음
		obj.bbtn.click(function(){
			var idx = obj.cnt+1;
			if(idx > obj.li.size()-1) idx = 0;
			_Move(idx,"b");
			return false;
		});

		//이전
		obj.tbtn.click(function(){
			var idx = obj.cnt-1;
			if(idx < 0) idx = obj.li.size()-1;
			_Move(idx,"t");
			return false;
		});

		//멈춤
		obj.sbtn.click(function(){
			obj.auto = "N";
			obj.sbtn.hide();
			obj.pbtn.show();
			_Stop();		
			return false;
		});

		//재생
		obj.pbtn.click(function(){
			obj.auto = "Y";
			obj.pbtn.hide();
			obj.sbtn.show();
			_Play();
			return false;
		});

		if(obj.auto == "Y"){
			obj.pbtn.click();
		}
	}

	for(var i=0; i<$("[data-skin='v_slide']").size(); i++){
		_Set($("[data-skin='v_slide']").eq(i));
	}
}