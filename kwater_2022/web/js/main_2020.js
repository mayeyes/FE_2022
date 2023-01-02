/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	lazy Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".lazy, img").size() != 0){
		$("img").lazy();
		$(".lazy").lazy();
	}
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
	
	code[0] = parseInt(params.substr(0,2)); //eq(n) n번지수 찾기
	code[1] = parseInt(params.substr(2,2)); //eq(n) n번지수 찾기
	code[2] = parseInt(params.substr(4,2)); //eq(n) n번지수 찾기	
	code[3] = parseInt(params.substr(6,2)); //eq(n) n번지수 찾기	
	
	//PC	  
	var Tmenu = $("#gnb");
		Tmenu.ul = Tmenu.find(">ul");
		Tmenu.ul.li = Tmenu.ul.find(">li");
		Tmenu.ul.li.a = Tmenu.ul.li.find(">a");
		Tmenu.ul.li.ul = Tmenu.ul.li.find(">ul");
		Tmenu.ul.li.ul.li = Tmenu.ul.li.ul.find(">li");
		Tmenu.ul.li.ul.li.a = Tmenu.ul.li.ul.li.find(">a");
		Tmenu.ul.li.ul.li.ul = Tmenu.ul.li.ul.li.find(">ul");
		Tmenu.ul.li.ul.li.ul.li = Tmenu.ul.li.ul.li.ul.find(">li");
		Tmenu.ul.li.ul.li.ul.li.a = Tmenu.ul.li.ul.li.ul.li.find(">a");
		
		Tmenu.ul.li.ul.li.ul.li.ul = Tmenu.ul.li.ul.li.ul.li.find(">ul");
		Tmenu.ul.li.ul.li.ul.li.ul.li = Tmenu.ul.li.ul.li.ul.li.ul.find(">li");
		Tmenu.ul.li.ul.li.ul.li.ul.li.a = Tmenu.ul.li.ul.li.ul.li.ul.li.find(">a");
		Tmenu.blind = Tmenu.find(">#blind");
		Tmenu.intervals = "";
	
	Tmenu.ul.li.each(function(e){
	});
	$("<span class='blind'></span>").appendTo(Tmenu);
	
	setTimeout(function(){
		Tmenu_def(Tmenu,code);
	},100);

	Tmenu.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent());	
		Tmenu_open(Tmenu,idx);
		Tmenu.ul.li.ul.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">ul").addClass("on");
	});

	Tmenu.ul.li.ul.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent());	
		Tmenu_open(Tmenu,idx);
		Tmenu.ul.li.ul.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">ul").addClass("on");
	});

	Tmenu.ul.li.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent().parent().parent());

		Tmenu.ul.li.a.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">a").addClass("on");
	});
	
	Tmenu.ul.li.ul.li.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent().parent().parent().parent().parent());

		Tmenu.ul.li.a.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">a").addClass("on");
	});
	Tmenu.ul.li.ul.li.ul.li.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent().parent().parent().parent().parent());
		
		Tmenu.ul.li.a.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">a").addClass("on");
	});
	
	Tmenu.ul.mouseleave(function(){
		Tmenu.intervals = setTimeout(function(){
			Tmenu_def(Tmenu,code);
			$("#header").removeClass("active");
		},500);
	});

	Tmenu.ul.mouseenter(function(){
		clearTimeout(Tmenu.intervals);
	});

	Tmenu.ul.find(">li:eq(4) >ul >li").last().find(">a").on("focusout",function(){
		Tmenu.intervals = setTimeout(function(){
			Tmenu_def(Tmenu,code);
		},500);
	});

	
	//slide_map
	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div></div></div>').prependTo($("#wrap"));
	Tmenu.find(">ul.nav").clone(false).appendTo($("#slide_map >.inner > .binds"));
	
	
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
	$(window).resize(function(){
		mob_def();	
	});	
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("on");
		if(code[0] >= 0){
			var obj = mob_gnb_obj.box.gnb.ul.find(">li.sub0"+code[0]);
			obj.find(">a").addClass("on");
			if(code[1] >= 0){
				var obj = obj.find(">ul").find(">li.sub0"+code[0]+"_0"+code[1]);
				obj.parent().css({"display":"block"});
				obj.find(">a").addClass("on");
				if(code[2] >= 0){
					var obj = obj.find(">ul").find(">li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]);
					obj.parent().css({"display":"block"});
					obj.find(">a").addClass("on");
					
					if(code[3] >= 0){
						var obj = obj.find(">ul").find(">li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]+"_0"+code[3]);
						obj.parent().css({"display":"block"});
						obj.find(">a").addClass("on");
					}
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
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.ul.li.a.not(this).removeClass("on").siblings("ul").slideUp();
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			return false;	
		} else {
			return true;	
		}
	});
}
//PC Open
function Tmenu_open(Tmenu,code){
	if(code == 0) code = "0";
	idx = code;
	
	var obj = Tmenu.ul.li.eq(idx);
	if(obj.find(">ul").is(":animated")) return false;
	
	$("#header").addClass("active");
	Tmenu.ul.li.find(">.tmenu_ti").stop().animate({"opacity":0},0,function(){$(this).hide();});
	obj.find(">.tmenu_ti").css({"display":"block"}).stop().animate({"opacity":1},0);
	
	Tmenu.find(">.blind").fadeIn(300);
	Tmenu.ul.li.a.removeClass("on");
	obj.find(">a").addClass("on");
	
	if(Tmenu.hasClass("type_01")){
		Tmenu.ul.li.ul.not(":hidden").stop().animate({"opacity":0},100,function(){$(this).hide();});
		obj.find(">ul").show().stop().animate({"opacity":1},100);
		Tmenu.ul.stop().animate({"height":(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight())+"px"},300);	
		Tmenu.stop().animate({"height":(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight())+"px"},300);
		Tmenu.blind.show().stop().animate({"height":obj.find(">ul").innerHeight()},0);	
	} else if (Tmenu.hasClass("type_02")){
		Tmenu.maxH = 0;
		for(var i=0; i<Tmenu.ul.li.size(); i++){
			Tmenu.maxH = Math.max(Tmenu.maxH,Tmenu.ul.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		Tmenu.ul.li.ul.innerHeight(Tmenu.maxH).show().stop().animate({"opacity":1},0);
		Tmenu.ul.stop().animate({"height":(Tmenu.maxH + Tmenu.ul.li.a.innerHeight()) +"px"},300);
		Tmenu.stop().animate({"height":(Tmenu.maxH + Tmenu.ul.li.a.innerHeight()) +"px"},300);
		Tmenu.blind.show().stop().animate({"height":Tmenu.maxH +"px"},300);		
	} else if (Tmenu.hasClass("type_03")){
		Tmenu.ul.li.ul.not(":hidden").stop().animate({"opacity":0},100,function(){$(this).hide();});
		obj.find(">ul").show().stop().animate({"opacity":1},100);
	}
}
//PC Setting
function Tmenu_def(Tmenu,code){
	Tmenu.find(">.blind").fadeOut(300);
	Tmenu.ul.li.find("a.on").removeClass("on");
	Tmenu.ul.li.ul.stop().animate({"opacity":0},300,function(){$(this).hide();});
	Tmenu.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
	Tmenu.ul.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
	Tmenu.blind.stop().animate({"height":0},300,function(){$(this).hide();});
	
	if(code[0] <= 0){
		//Main
		Tmenu.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
		Tmenu.ul.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
		Tmenu.blind.stop().animate({"height":0},300,function(){$(this).hide();});		
	} else {
		//Sub
		var obj = Tmenu.ul.find(">li.sub0"+code[0]);
		
		obj.find(">a").addClass("on");
			
		if(code[1] > 0){
			obj = obj.find(">ul >li.sub0"+code[0]+"_0"+code[1]);
			obj.find(">a").addClass("on");
			if(code[2] > 0){
				obj = obj.find(">ul").find(">li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]);
				obj.find(">a").addClass("on");
				if(code[3] > -1){
					obj = obj.find(">ul >li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]+"_0"+code[3]);
					obj.find(">a").addClass("on");
				}
			}
		}
	}	
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$('<div class="side_link"></div>').appendTo($("#slide_map >.inner > .binds"));
	$("#header .toputil_control > div.lang_btn").clone(false).appendTo($("#slide_map >.inner > .binds >.side_link"));
		
	$(".allmenu_btn_open").click(function() {	
        $(".search_btn_open , #header").removeClass("active on");
		
		if(!$("#slide_map").is(":hidden")){
				$("body").addClass("fixed");
				$(this).toggleClass("on");
				if($(this).hasClass("on")){
					$(".search_form").fadeOut(300);
					$(this).html("<span>전체메뉴닫기</span>");
				} else {
					$(this).html("<span>전체메뉴열기</span>");	
					$("body").removeClass("fixed");		
				}
				return false;
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

	js_search Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
var _shift = false;
$(document).on("keydown",function(event){
	if(event.keyCode == 16) _shift = true;
});
$(document).on("keyup",function(event){
	if(event.keyCode == 16) _shift = false;
});

/*
$(document).ready(function(){
	top_search_AC();
});*/


$(document).ready(function(){
	top_search_AC();
});

function top_search_AC (){
	var btn = $(".toputil_control > a.search_btn_open");	
	var obj = $(".search_form");	
	var _spantag = $(".search_btn_open span");
	
	btn.click(function(){
		if(obj.is(":hidden")){
			$(this).addClass("on");
			obj.show().stop().animate({"opacity":0.98},200,function(){
				$(this).find("input[type='text']").focus();	
			});
            $("body").removeClass("fixed");	
		    $(".allmenu_btn_open").removeClass("on");
            $("#header").addClass("active");
		} else {
			$(this).removeClass("on");
			obj.stop().animate({"opacity":0},200,function(){
				$(this).hide();
			});
            $(".search_form").fadeOut(300);
		    $(".search_btn_open").focus();
            $("#header").removeClass("active");
		}
		return false;
	});
	
	btn.click(function(){
		 if($(".search_btn_open").hasClass("on")) _spantag.text("닫기");
		 else _spantag.text("열기"); 
	});
	
	if($(".search_btn").hasClass("on")){
			$("#totalsearch").focus();
		}
    
    $(".search_btn_open").keydown(function(event){
        if($(this).hasClass("on")){
            if(event.keyCode == 9){
                if(!_shift){
                    $("#searchTerm").focus();
                } else {
                    $("#searchTerm").siblings("input[type='submit']").focus();
                }

                return false;
            }
        }
	});
    
    $("#searchTerm").siblings("input[type='submit']").keydown(function(event){
        if($(".search_btn_open").hasClass("on")){
            if(event.keyCode == 9 && !_shift){
                $(".search_btn_open.on").focus();
               
                return false;
            }
        }
	});
	
	$("#searchTerm").keydown(function(event){
		if(event.keyCode == 9 && _shift){
			$(".search_btn_open.on").focus();
			
			return false;
		}
	});  
}
/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	relate_site Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".relate_site").size() != 0){
		js_relate ();
	}
});
function js_relate (){
	var obj = $(".relate_site"); 
	
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
		
		t.on("mouseleave",function() {
			$(this).find(">a").removeAttr("class");
			$(this).find(">ul").slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
		
		t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});		
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	fullpage Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$('#fullpage').fullpage({
		verticalCentered: true,
		navigation: true,
		responsiveWidth: 1025,
			
		'onLeave': function(index, nextIndex, direction){

			//네비
			if($(".js_mobile_check").is(":hidden") || $(".js_tablet_check").is(":hidden")){
				if (nextIndex == 1){
                    $("#header").removeClass("ty2");
					$("#fp-nav").removeClass("on");
                    if(!$(".today_check input[type='checkbox']").prop("checked")){
						$("#header").addClass("on");
						$(".bannerzone").slideDown(300);
					}
					if($(".bannerzone").size() < 1){
						$("#header").removeClass("on");
					}
					$(".popup_btn_toggle").removeClass("on").find(">span").text("닫기");
					icoMouse(nextIndex);
				} else if (nextIndex == 2) {
                    $("#header").addClass("ty2");
					$("#header").removeClass("on");
					$("#fp-nav").addClass("on");
					$(".bannerzone").slideUp(300);
					$(".popup_btn_toggle").addClass("on").find(">span").text("열기");
					icoMouse(nextIndex);
				} else if (nextIndex == 3) {
					$("#header").removeClass("ty2");
					$("#fp-nav").removeClass("on");
					$("#header").removeClass("on");
					$(".bannerzone").slideUp(300);
					$(".popup_btn_toggle").addClass("on").find(">span").text("열기");
					icoMouse(nextIndex);
				} else if (nextIndex == 4) {
					$("#header").addClass("ty2");
					$("#fp-nav").addClass("on");
					$("#header").removeClass("on");
					$(".bannerzone").slideUp(300);
					$(".popup_btn_toggle").addClass("on").find(">span").text("열기");
					icoMouse(nextIndex);
				} else if (nextIndex == 5) {
					$("#header").addClass("ty2");
					$("#fp-nav").removeClass("on");
					$("#header").removeClass("on");
					$(".bannerzone").slideUp(300);
					$(".popup_btn_toggle").addClass("on").find(">span").text("열기");
					icoMouse(nextIndex);
				} else if (nextIndex == 6) {
					$("#header").addClass("ty2");
					$("#fp-nav").removeClass("on");
					$("#header").removeClass("on");
					$(".bannerzone").slideUp(300);
					$(".popup_btn_toggle").addClass("on").find(">span").text("열기");
					icoMouse(nextIndex);
					icoMouse(nextIndex);
				}
                if(nextIndex != 1) $(".icoMouse_box").hide();
			}	
		},
		//섹션별 애니
		'afterLoad': function(index, nextIndex, direction){
			if(typeof main_vision_start == "undefined"){
				//기존
				if (nextIndex == 1){
					$(window).load(function(){
						$("#section0 .ani").addClass("on");  
					});	
					$(".user").removeClass("on");
				} else if (nextIndex == 2) {
					$("#section1 .ani").addClass("on");
					$(".user").addClass("on");
				} else if (nextIndex == 3) {
					$("#section2 .ani").addClass("on");
				} else if (nextIndex == 4) {
					$("#section3 .ani").addClass("on");
				}else if (nextIndex == 5) {
					$("#section4_m .ani").addClass("on");
				}else if (nextIndex == 6) {
					$("#section5 .ani").addClass("on");
				}
			} else {
				//추가된 비전선포식이 바인딩 된 경우
				if (nextIndex == 1){
					$(window).load(function(){
						$("#section0 .ani").addClass("on");  
					});	
					$(".user").removeClass("on");
				} else if (nextIndex == 2) {
					$("#section1 .ani").addClass("on");
					$(".user").addClass("on");
				} else if (nextIndex == 3) {
					$("#section2 .ani").addClass("on");
				} else if (nextIndex == 4) {
					$("#section3 .ani").addClass("on");
				}else if (nextIndex == 5) {
					$("#section4_m .ani").addClass("on");
				}else if (nextIndex == 6) {
					$("#section5 .ani").addClass("on");
				}
			}
		}
	});
    
	$("[id*='section']").attr("tabindex","0");
    
    //퀙네비 포커스 아웃 후 2섹션으로
	/*
    $("#fp-nav>ul>li:eq(5) a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
        	$("#fp-nav>ul>li:eq(1) a").trigger("click");
            setTimeout(function(){
                $("#section1 .kw").focus();
            },500);
            return false;
        }
    });
	*/
	/* 테스트 */
	$("#section0").on("keydown", function(event){
        if(event.keyCode == 9 && _shift){
            $("#fp-nav>ul>li:eq(0) a").focus();
            return false;
        }
    });
	$("#section0").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#fp-nav>ul>li:eq(1) a").focus();
            return false;
        }
    });
	$("#section1 .kw").on("keydown", function(event){
		if(event.keyCode == 9 && _shift){
			$("#fp-nav>ul>li:eq(0) a").focus();
			setTimeout(function(){
				$("#section0").focus();
			},500);
			return false;
		}
	});
	$("#fp-nav>ul>li:eq(1) a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#section1").focus();
            return false;
        }
    });

	$("#section1 .sns .kt").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#fp-nav>ul>li:eq(2) a").focus();
            return false;
        }
    });
	$("#fp-nav>ul>li:eq(2) a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#section2").focus();
            return false;
        }
    });
	$("#section2 .all_box .right_box>ul>li:last-child>a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#fp-nav>ul>li:eq(3) a").focus();
            return false;
        }
    });
	$("#section2 .all_box .left_box>ul>li:first-child>a").on("keydown", function(event){
        if(event.keyCode == 9 && _shift){
            $("#fp-nav>ul>li:eq(1) a").focus();
            setTimeout(function(){
                $("#section1 .sns .kt").focus();
            },500);
            return false;
        }
    });

	$("#fp-nav>ul>li:eq(3) a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#section3").focus();
            return false;
        }
    });
	$("#section3 .pop_ul .pub_noti .move ul li:last-child a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#fp-nav>ul>li:eq(4) a").focus();
            return false;
        }
    });
	$("#section3 .move > ul >li.noti[data-count='1'] .txts").on("keydown", function(event){
        if(event.keyCode == 9 && _shift){
            $("#fp-nav>ul>li:eq(2) a").focus();
            setTimeout(function(){
                $("#section2 .all_box .right_box>ul>li:last-child>a").focus();
            },500);
            return false;
        }
    });   

	$("#fp-nav>ul>li:eq(4) a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#section4_m").focus();
            return false;
        }
    }); 
	$("#section4_m .r_box .rb_box .js_slide .move ul li:not(:hidden) a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#fp-nav>ul>li:eq(5) a").focus();
            return false;
        }
    });
	$("#section4_m .l_box .js_slide .txts a").on("keydown", function(event){
        if(event.keyCode == 9 && _shift){
            $("#fp-nav>ul>li:eq(3) a").focus();
            setTimeout(function(){
                $("#section3 .pop_ul .pub_noti").attr("tabindex","0").focus();
            },500);
            return false;
        }
    });

	$("#fp-nav>ul>li:eq(5) a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $("#section5").focus();
            return false;
        }
    }); 

	$("#section5 .notice_list li:last-child a").on("keydown", function(event){
        if(event.keyCode == 9 && !_shift){
            $.fn.fullpage.moveTo(7,0);
			icoMouse('7');
            setTimeout(function(){
                $("#section6 .menu_link li:first-child a").focus();
            },500);
            return false;
        }
    });
	$("#section5 ul li.rec_in a:first-child").on("keydown", function(event){
        if(event.keyCode == 9 && _shift){
            $("#fp-nav>ul>li:eq(4) a").focus();
            setTimeout(function(){
                $("#section4_m .r_box .rb_box .js_slide").attr("tabindex","0").focus();
            },500);
            return false;
        }
    });
	$("#section6 .menu_link li:first-child a").on("keydown", function(event){
		if(event.keyCode == 9 && _shift){
			$("#fp-nav>ul>li:eq(5) a").focus();
			setTimeout(function(){
				$("#section5 .notice_list li:last-child a").focus();
			},500);
			return false;
		}
	});
    
    
    
    
	
    
    
	
	$("#fp-nav a").on("focus", function(){
		var idx = $(this).parent().index();

		if(idx == 0){
			$.fn.fullpage.moveTo(1,0);	
			icoMouse('1');
		} else if(idx == 1){
			$.fn.fullpage.moveTo(2,0);
			icoMouse('2');
			/*
			setTimeout(function(){
                $("#section1 .kw").focus();    //네비로 이동시 포커스
            },500);
			*/
		} else if(idx == 2){
			$.fn.fullpage.moveTo(3,0);	
			icoMouse('3');
			/*
			setTimeout(function(){
                $("#section2 .all_box .left_box>ul>li:first-child>a").focus();    //네비로 이동시 포커스
            },500);
			*/
		} else if(idx == 3){
			$.fn.fullpage.moveTo(4,0);	
			icoMouse('4');
			/*
			setTimeout(function(){
                $("#section3 .move > ul >li.noti[data-count='1'] .txts").focus();    //네비로 이동시 포커스
            },500);
			*/
		} else if(idx == 4){
			$.fn.fullpage.moveTo(5,0);	
			icoMouse('5');
			/*
			setTimeout(function(){
                $("#section4_m .l_box .js_slide .txts a").focus();    //네비로 이동시 포커스
            },500);
			*/
		}else if(idx == 5){
			$.fn.fullpage.moveTo(6,0);
			icoMouse('6');
			/*
			setTimeout(function(){
                $("#section5 ul li.rec_in a:first-child").focus();    //네비로 이동시 포커스
            },500);
			*/
		}
		return false;
	});

	$(".icoMouse").on("click", function(){
		var idx = $(this).attr('id');

		if(idx < 7){
			if(idx == 6){
				$(".icoMouse_box").css("display", "none");
			}else{
				$(".icoMouse_box").css("display", "block");
			}
			$.fn.fullpage.moveTo(idx,0);
			idx = Number(idx) + 1;
			$(this).attr("id" , idx);
		}		
		return false;
	});
});

function icoMouse(idx){
	if(idx < 7){
		if(idx == 6){
			$(".icoMouse_box").css("display", "none");
		}else{
			$(".icoMouse_box").css("display", "block");
		}
		idx = Number(idx) + 1;
		$(".icoMouse").attr("id" , idx);
	}		
	return false;
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_visual

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	if($("#section0").size() != 0){
		setTimeout(function(){
			js_visual();		
		},100);
	}
});
function js_visual(){
	var slide = $("#section0 .slider");
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
	slide.speeds = 0;
	slide.autos = "Y";
	slide.times = "";
	slide.times_speeds = 4000;
	slide.nums = 1;
	
	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}
	
	//심볼
	$("<ul></ul>").prependTo(slide.controls);
	for(var i=0; i<slide.li.size(); i++){
		$('<li><a href="#">'+(i+1)+'</a></li>').appendTo(slide.controls.find(">ul"));
	}
	slide.simbols = slide.controls.find(">ul>li");
	slide.simbols.eq(0).find(">a").addClass("on");
	
	slide.moves.addClass("on");
	slide.li.removeClass("on");
	slide.ul.find(">li:first").addClass("on");
	
	
	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}
	
	//총 카운트 적용
	slide.counts.html("<span>"+slide.nums+"</span>"+slide.li.size());
	
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
	slide.btn_play.click();
	
	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
	
		var olds = 0;
		var news = 0;
	
		if(ty == "right"){
			//다음
			olds = slide.nums;
			news = slide.nums + 1;
			
			if(news < slide.li.size()) {
				news = news;
			} else if (news > slide.li.size()) {
				news = 1;
			}
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
	
		slide.li.eq(news-1).show().css({"left":0}).addClass("on");
		slide.li.eq(olds-1).show().css({"left":0+"%"}).removeClass("on");
		
		if(slide.autos == "Y"){
			slide.times = setTimeout(function(){
				movement("right");
			},slide.times_speeds);
		}
	
		slide.nums = news;
	
		//총 카운트 적용
		slide.counts.html("<span>"+slide.nums+"</span>"+slide.li.size());
	
		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

Slide Script

ex)
null : 옆으로 흐르는 배너 형태
type_02 : 팝업존 형태
type_03 : 비쥬얼 형태
type_04 : 포토슬라이드 형태(배너+이미지View)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	if($(".js_slide").size() != 0){
		setTimeout(function(){ slide_AC(); }, 100);
	}
});

function slide_AC(){
	var slide = $(".js_slide");
	
	for(var i=0; i<slide.size(); i++){
		if(slide.eq(i).hasClass("type_02")) slide_type_02(slide.eq(i));//팝업존
		else if(slide.eq(i).hasClass("type_03")) slide_type_03(slide.eq(i));//비주얼
		else if(slide.eq(i).hasClass("type_04")) slide_type_04(slide.eq(i));//포토슬라이드
		else slide_type_01(slide.eq(i));//배너
	}
}

function slide_type_01(slide){
	//배너
	var slide = slide;
	slide.titles = slide.find(">.title");
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
	
	//자동재생
	//slide.btn_play.click();
	
	//animate
	function movement(ty){
		if(slide.ul.is(":animated")) return false;
	
		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;
	
		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");
	
			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {
			slide.nums = slide.li.eq(0).attr("data-count");
		}
	
		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");
	
				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			}
		});
	
		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
}

function slide_type_02(slide){
	//팝업존
	var slide = slide;
	slide.titles = slide.find(">.title");
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
	slide.speeds = 1000;
	slide.autos = (slide.attr("data-auto") == "N") ? "N":"Y";
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
	slide.counts.html(slide.nums+"<span>"+slide.li.size()+"</span>");
	
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
	
	//자동재생
	if(slide.autos == "Y") slide.btn_play.click();
	
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
				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			});
			slide.nums = slide.li.eq(1).attr("data-count");
		}
		slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,"easeOutCubic",function(){
			if(ty == "right"){
				slide.li.eq(0).css("left","100%");
			}
		});
	
		//총 카운트 적용
		slide.counts.html(slide.nums+"<span>"+slide.li.size()+"</span>");
	}
}

function slide_type_03(slide){
	//비주얼
	var slide = slide;
	slide.titles = slide.find(">.title");
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
	slide.times_speeds = 4000;
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
	slide.counts.html("<span>"+slide.nums+"</span>"+slide.li.size());
	
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
	
	//영역IN
	slide.a.on("mouseenter",function(){
		slide.autos = "N";
		clearTimeout(slide.times);
		return false;
	});
	//영역OUT
	slide.moves.on("mouseleave",function(){
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
	slide.btn_play.click();
	
	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
	
		var olds = 0;
		var news = 0;
	
		if(ty == "right"){
			//다음
			olds = slide.nums;
			news = slide.nums + 1;
			
			
			//alert(news);
	
			//if(news >= slide.li.size()) news = 0;
			if(news < slide.li.size()) {
				news = news;
			} else if (news > slide.li.size()) {
				news = 1;
			}
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
			slide.li.eq(olds-1).css({"left":"100%","display":"none"});
			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});
	
		slide.li.eq(news-1).css({"display":"block"}).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
		});
	
		slide.nums = news;
	
		//총 카운트 적용
		slide.counts.html("<span>"+slide.nums+"</span>"+slide.li.size());
	
		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
	}
}

function slide_type_04(slide){
	//포토슬라이드
	var slide = slide;
	slide.titles = slide.find(">.title");
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
	slide.times_speeds = 5000;
	slide.nums = 1;
	
	//view
	//slide_view
	var setNum = $(".js_slide").index(slide);
	slide.attr("id","slide_view_"+setNum);
	$('<div class="slide_view_'+setNum+'"><span></span><img src="" alt="" /></div>').insertBefore(slide);
	views(0,$(".slide_view_"+setNum));
	
	//제어
	if(slide.li.size() < 2){
		slide.remove();
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
	
	slide.li.find(">a").click(function(){
		var idx = slide.li.index($(this).parent());
		var cl = $(this).parents(".js_slide").attr("id");
	
		views(idx,$("."+cl));
		return false;
	});
	
	//view
	function views(idx,obj){
		var idx = idx;
		var titles = slide.li.eq(idx).find(">a").attr("title");
		var imgs = slide.li.eq(idx).find(">a img")[0].src;
		var alts = slide.li.eq(idx).find(">a img").attr("alt");
	
		slide.li.find(">a.on").removeClass("on");
		slide.li.eq(idx).find(">a").addClass("on");
		obj.find(" img").attr("src",imgs);
		obj.find(" img").attr("alt",alts);
		if(titles){
			obj.find(" span").html("<strong>"+titles+"</strong>"+alts);
		} else {
			obj.find(" span").html(alts);
		}
		
		if(alts == ""){
			obj.addClass("notitle");
		} else {
			obj.removeClass("notitle");
		}
	}
	
	//animate
	function movement(ty){
		if(slide.ul.is(":animated")) return false;
	
		slide.li = slide.ul.find(">li");
		var w = slide.li.eq(0).innerWidth() * -1;
	
		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.ul.css("left",w+"px");
	
			w = 0;
			slide.nums = slide.li.last().attr("data-count");
		} else {
			slide.nums = slide.li.eq(0).attr("data-count");
		}
	
		slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).appendTo(slide.ul);
				slide.ul.css("left","0");
			}
		});
	
		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	bannerzone

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($(".bannerzone").size() != 0){
		//setting
		if($(".bannerzone ul li").size() < 1){
			$(".popup_btn_toggle").remove();
			$(".bannerzone").remove();	
		} else {
			$(".popup_btn_toggle").fadeIn(300);	
		}
		
		//popup_btn
		$(".popup_btn_toggle").click(function() {
			if($(".bannerzone").is(":animated")) return false;
			
			$(".bannerzone").slideToggle(300);
				
			$(this).toggleClass("on");
			if(!$(this).hasClass("on")){
				$(this).find(">span").text("닫기");
				$("#header").addClass("on");
				$(".bannerzone >strong").focus();
			} else {
				$(this).find(">span").text("열기");
				$("#header").removeClass("on");
				$("#slide_map").removeClass("padd_on");	
			}

			return false;	
		});	
			
		//today_check
		if($(".today_check").size() != 0){
			$(".today_check .btn_close").click(function () {
				if($(".today_check input[type='checkbox']").prop("checked")){
					setCookieMobile( "todayCookie", "done" , 1);
					$(".popup_btn_toggle").fadeOut(300);
				} else {
					$(".popup_btn_toggle").addClass("on").find(">span").text("열기");	
				}
				$("#header").removeClass("on");
				$(".bannerzone").slideUp(300);
				$(".popup_btn_toggle").focus();
				$("#slide_map").removeClass("padd_on");
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
					$(".bannerzone").remove();
					$(".popup_btn_toggle").remove();	
				}
			}
			getCookieMobile();
			
			return false;	
		}		
	}
});

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
			$(".top_btn").show().stop().animate(500,"easeOutCubic");	
		} else if (winTop <= headerTop) {
			$(".top_btn").stop().animate(500,"easeOutCubic",function(){
				$(this).hide();	
			});	
		}
	});	
	$(".top_btn").click(function() {
		$("body,html").stop().animate({"scrollTop":0 +"px"},500,"easeInOutExpo");
		return false;
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
	
	메인 퀵메뉴
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function(){
    section0_p_check();
});

function section0_p_check(){
    var idx = $('#section0 [data-main="01_02"] .js_slides .move');
        idx.ul = idx.find('>ul');
        idx.ul.li = idx.ul.find('>li');
        idx.ul.li.ul = idx.ul.li.find('>ul');
        idx.ul.li.ul.li = idx.ul.li.ul.find('>li');
    var prev = $('#section0 [data-main="01_02"] .js_slides .control .btn_left');
    var next = $('#section0 [data-main="01_02"] .js_slides .control .btn_right');
    var c_cnt = $('#section0 [data-main="01_02"] .js_slides .control .count');
    c_cnt.html("<span>1</span> / "+ idx.ul.li.size() + "</span>");
    var count = 0;
    prev.click(function(){
        count--;
        if(idx.hasClass("pc")){
            if(count < 0){
                count = 0;
            }else if(count - Math.ceil(idx.width() / idx.ul.li.ul.li.width()) == 1 ){
                count = count;
            }else{
                idx.attr('data-count',count);
            }
        }else if(idx.hasClass("mo")){
            if(count < 0){
                count = 0;
            }else{
                idx.attr('data-count',count);
                c_cnt.find(">span").html(count+1);
            }
        }
        return false;
    });

    next.click(function(){
        count++;
        if(idx.hasClass("pc")){
            if(count >= idx.ul.li.ul.li.size()){
                count = idx.ul.li.ul.li.size();
            }else if(idx.ul.li.ul.li.size() - count < Math.ceil(idx.width() / idx.ul.li.ul.li.width())){
                count--;
            }else{
                idx.attr('data-count',count);
            }
        }else if(idx.hasClass("mo")){
            if(count >= idx.ul.li.size()){
                count = idx.ul.li.size();
            }else{
                idx.attr('data-count',count);
                c_cnt.find(">span").html(count+1);
            }
        }
        return false;
    });  
    
    var drag_x = 0;
    var drag_x_end = 0;
    var drag_obj = "";
    var ch = 0;
    var mouseCheckVal1 = false;
    var mouseCheckVal2 = false;

    $(".js_slides").on("mousedown touchstart",function(e){
        drag_obj = $(e.target).parents(".js_slides");
        ch = drag_obj.size();
        drag_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
        mouseCheckVal1 = true;
    });

    $(".js_slides").on("mouseup touchend",function(e){
        if(ch == 0) return false;
        if(mouseCheckVal1 && mouseCheckVal2){
            if(drag_x_end - drag_x > 100) {
                drag_obj.find(".control a.btn_left").trigger("click");
            }else if(drag_x_end - drag_x < -100) {
                drag_obj.find(".control a.btn_right").trigger("click");
            }
            mouseCheckVal1 = false;
            mouseCheckVal2 = false;
        }
    });

    $(".js_slides").on("mousemove touchmove",function(e){
        if(mouseCheckVal1){
            mouseCheckVal2 = true;
            drag_x_end = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
            $("#section0 .fin_bx").remove();
        } else {
            mouseCheckVal2 = false;
        }
    });
    $(".js_slides").on("mousemove",function(e){
        e.preventDefault();
    });
    
    function def(){
        var c = (idx.hasClass("mo")) ? true : false;
        if(prev.is(":hidden")){
            idx.removeClass("pc");
            idx.addClass("mo");
        }else{
            idx.removeClass("mo");
            idx.addClass("pc");
        }
        if(prev.is(":hidden") && !c){
            idx.attr("data-count","0");
            count = 0;
            $("#section0 .fin_bx").remove();
            $('<div class="fin_bx"><span>좌우로 넘겨보세요!</span></div>').prependTo($('#section0 .js_slides'));
            idx.ul.css("width",(idx.ul.li.size() * 100) + "%");
            idx.ul.li.css("width","calc(100% / " + idx.ul.li.size() + ")");
            idx.attr('data-count',count);
            
        }else if(!prev.is(":hidden") && c){
            idx.attr("data-count","0");
            count = 0;
            idx.ul.css("width",(idx.ul.li.ul.li.width() * idx.ul.li.ul.li.size()) + "px");
            idx.ul.li.css("width","auto");
            idx.attr('data-count',count);
        }
    }
    def();
    $(window).resize(function(){
        def();
    });
}