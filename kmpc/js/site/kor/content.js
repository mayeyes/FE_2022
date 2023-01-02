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
	
	function gnb_def(){
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		//gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},300);
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
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			return false;	
		} else {
			return true;	
		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$('<div class="top_link"></div>').prependTo($("#slide_map >.inner > .binds"));
    $('<a href="#" class="m_close">전체메뉴닫기</a>').appendTo($("#slide_map >.inner > .binds"));
	$("#header h1 a").clone(false).prependTo($("#slide_map >.inner > .binds >.top_link"));
	
		
	$(".allmenu_btn_open").click(function() {	
		
		if(!$("#slide_map").is(":hidden")){
            $("body").addClass("fixed");
            $(this).toggleClass("on");
            /*if($(this).hasClass("on")){
                $(this).html("<span>전체메뉴닫기</span>");
            } else {
                $(this).html("<span>전체메뉴열기</span>");	
                $("body").removeClass("fixed");		
            }*/
            return false;
        } else {
            $(this).removeClass("on");
            return true;
        }
        
        if(!$(".bannerzone").is(":hidden")){
            $("#slide_map").addClass("aa");
        }else{
            $("#slide_map").addClass("aa");
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
    
    $(document).click(function(e) { 
	    if($(e.target).parents("#slide_map").size() != 0) {
	         //메뉴 안
	    } else {
	        //밖
	        if(!$(".js_mobile_check").is(":hidden") || !$(".js_tab_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"margin-left":"0"},300,function(){
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
		    Lmenu.li.ul = Lmenu.li.find(">div>ul");
			Lmenu.li.ul.li = Lmenu.li.ul.find(">li");
			Lmenu.li.ul.li.a = Lmenu.li.ul.li.find(">a");
			Lmenu.li.ul.li.ul = Lmenu.li.ul.li.find(">ul");//3차
			Lmenu.li.ul.li.ul.li = Lmenu.li.ul.li.ul.find(">li");
			Lmenu.li.ul.li.ul.li.a = Lmenu.li.ul.li.ul.li.find(">a");

			/*Lmenu.li.ul.each(function(){
				if($(this).size() != 0){
					$(this).siblings("a").find(" span").append("<em class='ico'></em>");
				}
			});*/
	
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

					if(Lmenu.li.eq(i).find(">div>ul").size() != 0){
						var obj2 = Lmenu.li.eq(i).find(">div>ul>li");			
						for(var r=0; r<obj2.size(); r++){
							if(obj2.eq(r).hasClass("sub"+code.substr("0","2")+"_"+str[0]+"_"+str[1])){				
								deps_ch2 = r+1;

								if(obj2.eq(r).find(">div>ul").size() != 0){
									var obj3 = obj2.eq(r).find(">div>ul>li");
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
		if(Lmenu.find(" li").eq(i).find(">div>ul").size() != 0){
			Lmenu.find(" li").eq(i).find(">a").addClass("child");
			Lmenu.addClass("child");
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
	Lmenu.li.find("div").not(":hidden").hide();
	Lmenu_def(Lmenu);
	
	//click시
	Lmenu.li.a.click(function(){		
		Lmenu.idx_01 = Lmenu.li.index($(this).parent());
		
		if(!$(this).hasClass("ov")){		
			Lmenu_open(Lmenu);
		}
		
		/*if($(this).parent().find(">ul").size() != 0) return false;
		else return true;*/
		
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
	Lmenu.li.ul.li.find(" div").not(":hidden").hide();
	Lmenu.li.find(">div").not(":hidden").slideUp(0);	
	Lmenu.find(" a.ov").removeClass("ov");
	
	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.idx_01);	
	deps_01.find(">a").addClass("ov");
    deps_01.find(">div>ul>li:eq(0)>a").addClass("ov");
	
	if(deps_01.find(">div").size() != 0){
		deps_01.find(">div").slideDown(0);
	}
}
function Lmenu_def(Lmenu){
	Lmenu.li.ul.li.find(" div").not(":hidden").hide();
	Lmenu.li.find(">div").not(":hidden").slideUp(0);
	Lmenu.find(" a.ov").removeClass("ov");
	
	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.code1);	
	deps_01.find(">a").addClass("ov");
	
	//2deps
	if(Lmenu.code2 != -1 && Lmenu.code2 != null){
		var deps_02 = deps_01.find(">div>ul>li").eq(Lmenu.code2);		
		deps_02.find(">a").addClass("ov");
		deps_01.find("div").slideDown(0,function(){
			if(Lmenu.code3 != -1 && Lmenu.code3 != null){
				var deps_03 = deps_02.find(">div>ul>li").eq(Lmenu.code3);		
				deps_03.find(">a").addClass("ov");
				deps_02.find(">div").slideDown(0);
			}
		});
	}
	Lmenu.idx_01 = Lmenu.code1;
	Lmenu.idx_02 = Lmenu.code2;
	Lmenu.idx_03 = Lmenu.code3;
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	layout function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){  
	Sns_AC();  //sns 공유
    if(!$("body").hasClass("pc")){
        $('#txt>.share>.snsbx').removeClass("on");
    }
});


 function Sns_AC(){
	$('#txt>.share>.s_btn').click(function(){
		$('#txt>.share>.snsbx').addClass("on");
		return false;
	});
	$('#txt>.share>.snsbx>.close').click(function(){
		$(this).parent().removeClass("on");
		return false;
	});
     
     
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	accordian_AC

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("[data-type='accordian']").size() != 0){
		accordian_AC();
	}
    /*if(!$("body").hasClass("pc")){
        $("[data-type='accordian'] .tits.on").removeClass("on");
        if(!$("[data-type='accordian'] .cons").is(":hidden")){
            $("[data-type='accordian'] .cons").slideUp(300);
        }
    }*/
});
function accordian_AC(){
	var obj = $("[data-type='accordian']");
		obj.question = obj.find(".tits");
		obj.answer = obj.find(".cons");

	//초기값

	obj.question.find("a").click(function(){
		var boxs = $(this).parent().siblings(".cons");

		if(boxs.is(":hidden")){
			boxs.not(":hidden").siblings(".question").removeClass("on");
			boxs.not(":hidden").slideUp(300);
			boxs.siblings(".tits").addClass("on");
			boxs.slideDown(300);
		} else {
			$(this).parent().removeClass("on");
			boxs.slideUp(300);
		}
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	bannerzone

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($(".bannerzone").size() != 0){
		//setting
		if($(".bannerzone ul li").size() < 1){
			$(".user #header .toputil_control a.alarm").remove();
			$(".bannerzone").remove();	
		} else {
			$(".user #header .toputil_control a.alarm").fadeIn(300);	
		}
		
		//popup_btn
		$(".user #header .toputil_control a.alarm").click(function() {
			if($(".bannerzone").is(":animated")) return false;
			$(".bannerzone").slideToggle(300);
				
			$(this).toggleClass("on");
			if(!$(this).hasClass("on")){
				$("#header").addClass("on");
				$(".bannerzone >strong").focus();
			} else {
				$("#header").removeClass("on");
			}

			return false;	
		});	
			
		//today_check
		if($(".today_check").size() != 0){
			$(".today_check .btn_close").click(function () {
                setCookieMobile( "todayCookie", "done" , 1);
                $(".popup_btn_toggle").fadeOut(300);
				$("#header").removeClass("on");
				$(".bannerzone").slideUp(300).addClass("hide");
			});
			
			function setCookieMobile ( name, value, expiredays ) {
				var todayDate = new Date();
				todayDate.setDate( todayDate.getDate() + expiredays );
				document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
			}
			function getCookieMobile () {
				var cookiedata = document.cookie;
				
				if (cookiedata.indexOf("todayCookie=done") < 0 ){
					setTimeout(function(){
						$(".bannerzone").slideDown(300);
						$(".popup_btn_toggle").find(">span").text("닫기");		
						$("#header").addClass("on");
					},300);
				}
				else {
					$(".bannerzone").addClass("hide");
					$(".popup_btn_toggle").remove();	
				}
			}
			getCookieMobile();
			
			return false;	
		}		
	}
});



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
		box.btn = box.find(".btn_group>a");
		box.c = box.find(".close");

	btn.click(function(){
		box.addClass("on");
		return false;
	});
	box.btn.click(function(){
		//버튼
		box.removeClass("on");
		return false;
	});
	box.c.click(function(){
		//닫기버튼
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


$(function(){
	$('[data-scroll="yes"]').niceScroll({cursorcolor: "#D2D5DA",cursorwidth:"10px"});
});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	login_box function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){  
    login_pop();
});


 function login_pop(){
	$('.user #header .toputil_control a.login.user').click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on");
        }else $(this).addClass("on");
		return false;
	});
     
     
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	field_box_tip function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*$(function(){  
    field_box_tip();  //sns 공유
});

 function field_box_tip(){
	$('[data-content="my_page"] .my_page_list .lists ul li strong .field_tip').click(function(){
		
        if($(this).hasClass("on")){
            $(this).removeClass("on");
        }else $(this).addClass("on");
		return false;
	});
}*/


 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	프린트 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$(".faq_print").click(function() {
     $(this).parents("ul").addClass("faq_list_print");
     $(this).parents("ul").find("li").removeClass("prints");
     $(this).parents("li").addClass("prints");
		printElem({
			printMode: 'popup',
			pageTitle:'프린트 미리보기', //팝업 타이틀
			printDelay : 1000,
			leaveOpen:false, //인쇄하고도 창을 띄우기(true)/안띄우기(false). Default는 false
			importCSS: true,            // import page CSS
			printContainer: true, 
			printBodyOptions : {
				classNameToAdd : 'user',
				styleToAdd: 'width:1023px; overflow-x:hidden;'
			},
		});
     //$(this).parents("ul").removeClass("faq_list_print");
		return false;
	});
});

function printElem(options){
	$("#txt .faq_list_print").printElement(options); //팝업으로 띄울 영역 Div 아이디
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

header_active function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){  
header_active();
});

function header_active(){
	var titles = $("#txt h3.title").text();
	titles = titles.trim();
	console.log(titles);
	 
	for(var i = 0; i< $("#header #nav #gnb>ul>li").size(); i++){
	    if($("#header #nav #gnb>ul>li").eq(i).find(">a>span").text() == titles){
	        $("#header #nav #gnb>ul>li").eq(i).find(">a").addClass("active");
	    }
	}
}