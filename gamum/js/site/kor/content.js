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
		gnb_def("first");
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
	
	gnb_obj.find(">li:nth-child(5)>ul>li").last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
	
	function gnb_def(str){
        var speed = 300;
        if(str == "first") speed = 0;
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},speed);
		gnb_obj.blind.stop().animate({"height":0+"px"},speed,function(){
            if(str == "first") $("#nav #gnb").css("opacity","1");
        });
		
		
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
        if($("#header #blind").height() < 20){
		  gnb_obj.li.ul.css("opacity","0").innerHeight(gnb_obj.maxH -2).show().stop().delay(200).animate({"opacity":1},300);
        }else{
            gnb_obj.li.ul.innerHeight(gnb_obj.maxH -2).show();
        }
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+"px"},300);
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+"px"},300);
	}
	
	
	//slide_map
    if($("#slide_map").size() === 0) $('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div><a href="#" data-js="allmenu_btn_open"><span>닫기</span></a></div></div>').prependTo($("#wrap"));
    
    if($("#slide_map #topMnu").size() === 0) gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));
	
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
	
	//mob_gnb_obj.box.gnb.ul.li.ul.niceScroll({cursorcolor: "#D2D5DA"});
	mob_gnb_obj.box.gnb.ul.find(" ul").hide();
	mob_gnb_obj.box.gnb.ul.find(" a").each(function(){
		var i = $(this);
		
		if(i.siblings("ul").size() != 0){
			i.addClass("child");	
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
				obj.find(">a").siblings("ul").stop().slideDown(200);
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");
					obj.find(">a").siblings("ul").show();

				}
			}
			
		}
	}

    
	mob_gnb_obj.box.gnb.ul.li.a.on("click",function(){
		var childs = $(this).siblings("ul");
		if($(this).hasClass("child")){
			$(this).parent().parent().find(">li>a.on").removeClass("on");
			$(this).addClass("on");
			return false;
		}
	});

	mob_gnb_obj.box.gnb.ul.li.ul.li.a.on("click",function(){
		var childs = $(this).siblings("ul");
		if($(this).hasClass("child")){
			$(this).parent().parent().find(">li>a.on").removeClass("on").siblings("ul").stop().slideUp(200);
			$(this).addClass("on");
			childs.stop().slideToggle(200);
			return false;
		}
	});
	
    if($("#slide_map .side_link").size() === 0) {
        $('<div class="side_link"></div>').prependTo($("#slide_map >.inner > .binds"));
        $("#header > .line_1 .layout > ul").clone(false).prependTo($("#slide_map >.inner > .binds >.side_link"));
    }
    
    
    $("#slide_map >.inner > .binds >.side_link>ul>li>a[data-js='search']").parent().remove();
    
    
    $("#header > .line_1 .layout > ul > li.ad_menu").clone(false).appendTo($(".user #slide_map .inner .binds>ul"));
    $(".user #slide_map .inner .binds>ul>li.ad_menu").removeClass("ad_menu").addClass("tt_me").find(">a").addClass("child");
    
    $(".user #slide_map .inner .binds>ul>li.tt_me > a").click(function(){
        var childs = $(this).siblings("ul");
		if($(this).hasClass("child")){
			$(this).parent().parent().find(">li>a.on").removeClass("on");
			$(this).addClass("on");
			return false;
		}
    });
	$(".user#main #slide_map .inner .binds>ul>li:first-child > a").addClass("on");
	
	
	$("[data-js='allmenu_btn_open']").click(function() {
		if(!$("body").hasClass("fixed")){
			$("body").addClass("fixed");
			if($("#slide_map .inner .binds>ul>li> a.on").size() == 0){
				$("#slide_map .inner .binds>ul>li:first-child > a").addClass("on");
			}
		} else {
			$("body").removeClass("fixed");
		}
		return false;
	});
	
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
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
                    drag_obj.find(".control a.btn_left").trigger("click");
                }else if(drag_x_end - drag_x < -100) {
                    drag_obj.find(".control a.btn_right").trigger("click");
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
        
        if($("body").width()<=640) $('<div class="fin_bx"><span>좌우로 넘겨보세요!</span></div>').prependTo($('#sec1 .js_slide.touchss'));
        
        $("#sec1 .touchss .control a").click(function(){
           $(".fin_bx").hide(); 
        });
        
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    header 급수지원현황, 가뭄기초조사, 관리자메뉴

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function() {
	if($(".ad_menu").size() != 0){
		ad_menu_select();
	}
	var menuid ="";
	$(".ad_menu_sup").mouseover(function(){
		menuid ="."+$(this).attr('id')+"_sup";
		$(menuid).css("display","block");
	
	})

	$(".ad_menu_sup").mouseout(function(){
		$(menuid).css("display","none");
	
	})
});
function ad_menu_select(){
	var obj = $(".ad_menu"); 
	
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

	main sec1 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
    sec1();
    link_bx();
});
function sec1(){
    var pop_btn = $("#sec1 #pop_vi .control a.btn_right,#sec1 #pop_vi .control a.btn_left");
    var cha_li = $("#sec1 #pop_vi .move ul li");
    var cha_li_d = cha_li.find("div");
    var cha_li_width = 100 / cha_li.size();
    if($("body").width()<=1024){
        cha_li.contents().unwrap();
        cha_li_d.wrap('<li></li>');
        cha_li = cha_li_d.parent();

        pop_btn.click(function(){
            $(this).parents().find("#sec1 #pop_vi .control").addClass("even");
            pop_btn.click(function(){
                if($("#sec1 #pop_vi .control").hasClass("even")){
                    $("#sec1 #pop_vi .control").removeClass("even");
                }else{
                    $("#sec1 #pop_vi .control").addClass("even");
                }
            });
            return false;
        });
    }
    if($("body").width()>1008){
        $("#sec1 #pop_vi .move ul").css("width","" + cha_li.size() * 100 + "%");
    }
    cha_li.css("width","" + cha_li_width.toFixed(1) + "%");
    
    if(cha_li.size() == 3 && $("body").width()>1008){
        cha_li.css("width","" + (cha_li_width + 0.0067).toFixed(5) + "%");
    }   
    
}

function link_bx (){
    var obj = $("#sec1 > .js_slide > .txt .btn a");
    var obj_pro = $("#sec1 > .js_slide > .txt .btn a.pro_btn");
    var obj_gen = $("#sec1 > .js_slide > .txt .btn a.gen_btn");
    var obj_box = $("#sec1 > .js_slide > .link_bx");
    var close_btn = $("#sec1 > .js_slide > .link_bx > div a.close_btn");
    
    obj.click(function(){
        $(this).addClass("on"); 
        if(obj.hasClass("on")){
            obj_box.addClass("menu_op").find("div").css({"opacity":"0","visibility":"hidden"});
            if(obj.hasClass("gen_btn on")){
                obj_box.find(".gen_bx").css({"opacity":"1","visibility":"visible"});
                obj_pro.click(function(){
                    $(this).siblings().removeClass("on");
                    obj_box.find(".gen_bx").css({"opacity":"0","visibility":"hidden"});
                    obj_box.find(".pro_bx").css({"opacity":"1","visibility":"visible"});
                });
            }else if(obj.hasClass("pro_btn on")){
                obj_box.find(".pro_bx").css({"opacity":"1","visibility":"visible"});
                obj_gen.click(function(){
                    $(this).siblings().removeClass("on");
                    obj_box.find(".pro_bx").css({"opacity":"0","visibility":"hidden"});
                    obj_box.find(".gen_bx").css({"opacity":"1","visibility":"visible"});
                });
            }
        }
        return false;
    });
    close_btn.click(function(){
        $(this).parent().css({"opacity":"0","visibility":"hidden"}).parent().removeClass("menu_op").siblings().find(".btn a").removeClass("on");
        return false;
    });
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Notibox Function sec2

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".l_box").size() != 0){
		news_js();		
	}
});

function news_js(){
	var obj = $(".l_box");
		obj.tab = obj.find(">.tab_btn ul li a");
		obj.cont = obj.find(" .tab_cont");
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

	select_box Function sec3

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".sel_b").size() != 0){
		sec3_select();
	}
});
function sec3_select(){
	var obj = $(".sel_b"); 
	
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

    main sec4 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    sec4();
});

function sec4(){
    if($("body").width()<=640){
        $("#sec4 .info_box > ul >li.ico3 > .js_slide .control").hide();
        $("#sec4 .info_box > ul >li.ico3 > .js_slide .move > ul li").parent().contents().unwrap().parent().contents().unwrap().parent().contents().unwrap().parent().contents().unwrap();
    }
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   ul numbering

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*$(function(){
	if($('[data-skin="list_num"]').size() != 0){
		Ul_Numbering_AC();
	}
});

function Ul_Numbering_AC(){
	var li = $('[data-skin="list_num"]>li');

	for(var i=0; i<=li.size(); i++){
		var cnt = i+1;
		$("<em>"+cnt+"</em>").prependTo(li.eq(i));
	}
}
*/

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   scroll

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*$(function(){
	$("[data-scroll='yes']").niceScroll({cursorcolor: "#D2D5DA"});
});
*/

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   footer select

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	footer_select_AC();
});
function footer_select_AC(){
	var obj = $('#footer > .line_1 [data-js="select"]');
		obj.btn = obj.find(">a");
		obj.btn.html('<strong>패밀리 사이트</strong><span class="hidden">축소됨</span>');

	obj.btn.on("click",function(){
		/*obj.find(" [data-scroll='yes']").niceScroll({cursorcolor: "#D2D5DA"});*/
		if(obj.attr("data-open") != "on"){
			obj.attr("data-open","on");
			obj.btn.html('<strong>패밀리 사이트</strong><span class="hidden">확장됨</span>');
		}else{
			obj.attr("data-open","off");
			obj.btn.html('<strong>패밀리 사이트</strong><span class="hidden">축소됨</span>');
			
		}
		return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   navi 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	navi_AC();
});
function navi_AC(){
	if($('#sns').size() == 0) return false;
	var obj = $('#sns>ul>li[data-icon="sns"]');
		obj.btn_on = obj.find(">a.open");
		obj.btn_off = obj.find(">a.close");
		obj.fir = obj.find("ul a").eq(0);
	function _on(){
		if(obj.attr("data-open") != "on") obj.attr("data-open","on");
		else obj.attr("data-open","off");
	}
	obj.btn_on.on("click",function(){
		_on();
		obj.fir.focus();
		return false;
	});
	obj.btn_off.on("click",function(){
		_on();
		obj.btn_on.focus();
		return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   top search 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	topSearch_AC();
});
function topSearch_AC(){
	if($('#top-search').size() == 0) return false;
	var obj = $('#top-search');
		obj.btn_on = $("#header .line_1 [data-js='search'], [data-js='search_btn_open']");
		obj.btn_off = obj.find(">a.close");

	function _on(){
		if($("body").attr("data-search-open") != "on") $("body").attr("data-search-open","on");
		else $("body").attr("data-search-open","off");
	}
	obj.btn_on.on("click",function(){
		_on();
		//obj.first().focus();]
        $('#top-search .layout .midd input[type="text"]').focus();
		return false;
	});
	obj.btn_off.on("click",function(){
		_on();
		obj.btn_on.focus();
		return false;
	});
    
    var _shift = false;
    $(document).on("keydown",function(event){
        if(event.keyCode == 16) _shift = true;
    });
    $(document).on("keyup",function(event){
        if(event.keyCode == 16) _shift = false;
    });
    
    $('#top-search .layout .midd input[type="text"]').keydown(function(event){
        if(event.keyCode == 9 && _shift){
            if(!_shift){
                    
                } else {
                    obj.btn_on.focus();
                }
            
        }
    });
    $('#top-search .close').keydown(function(event){
        if(event.keyCode == 9 && _shift){
            if(!_shift){
                    console.log("back");
                } else {
                    console.log("back1");
                }
            
        }
        if(event.keyCode == 9){
            obj.first().focus();
        }
    });
    /*$(".search_btn_open").keydown(function(event){
        if($(this).hasClass("on")){
            if(event.keyCode == 9){
                if(!_shift){
                    $(".search_form ").find("#searchTerm").focus();
                } else {
                    $(".search_form ").find("input[type='submit']").focus();
                }
                return false;
            }
        }
	});
    
    $(".search_form ").find("input[type='submit']").keydown(function(event){
        if($(".search_btn_open").hasClass("on")){
            if(event.keyCode == 9 && !_shift){
                $(".search_btn_open.on").focus();
                return false;
            }
        }
	});
	
	$(".search_form ").find("#searchTerm").keydown(function(event){
		if(event.keyCode == 9 && _shift){
			$(".search_btn_open.on").focus();
			return false;
		}
	});*/
    
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
		box.btn = box.find(".btn_group>a");
		box.c = box.find(".close");

	btn.click(function(){
		box.addClass("on");
		box.attr("tabindex","0").focus();
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
		$('a[data-popup="'+str+'"]').focus();
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

	탭 셀렉트변환 이동 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_tab").size() != 0){
		tab_mobile();
		$(window).resize(function(){
			var tab = $(".js_tab .tab_btn");
				tab.ul = tab.find(" ul");
			if($(window).width() < 1008){
				if(tab.hasClass("select")) return false;
				tab.addClass("select");	
			} else {
				if(!tab.hasClass("select")) return false;
				tab.removeClass("select");
				tab.ul.removeAttr("style");
			}
		});
		$(window).trigger("resize");
	}
});
function tab_mobile(){
	var b = $(window).width();
	var tab = $(".js_tab .tab_btn");
		tab.ul = tab.find(">ul");
		tab.li = tab.find(">ul>li");
		tab.on = tab.find(" li.on").last();
		tab.a = tab.li.find(" a");
    
	if(tab.find(">.title").size() == 0){
		$('<strong class="title"></strong>').prependTo(tab);
	}
		tab.ti = tab.find(">.title");
		
	tab.ti.html(tab.on.find(">a").clone());
		tab.btn = tab.ti.find(">a");
	
		
	function _titleAC(){
		if(tab.ul.is(":hidden")){
			tab.ul.slideDown(200);
		} else {
			tab.ul.slideUp(200);
		}
		return false;
	}
	
	tab.btn.bind("click",function(){_titleAC();});

	tab.a.click(function(){
		if(tab.hasClass("select")){console.log("!!");
			var dep2 = $(this).siblings("ul");console.log(dep2.size());
			if(dep2.size() ==0){
				tab.ul.slideUp(200);
				tab.find(">ul>li.on").removeClass("on");
				$(this).parent().addClass("on");
				tab.on = $(this).clone();
				
				tab.ti.html(tab.on);
				tab.ti.find(">a").bind("click",function(){_titleAC();});
			} else{
				$(this).parent().addClass("child");
				if(dep2.is(":hidden")){
					dep2.stop().slideDown(200);
				} else{
				 	dep2.stop().slideUp(200);
				}
			}
		}
		
		
	});

	if(tab.li.find(" >ul").size() !=0){
		tab.li.find(" >ul").parent().addClass("child");
	}
		
	
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_accodions Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".acco_box").size() != 0){
		js_accodions ();
	}
    boo ();
});
function js_accodions (){
	var obj = $(".acco_box");	
		obj.btn = obj.find("a.titles");
		obj.list = obj.find(".accordion");
		obj.em = obj.find("em");
    var de_btn = $("#ga_stat_indu .maparc_box a.mo_btn");
    var de_btn_on = $("#ga_stat_indu .maparc_box a.mo_btn.on");
    obj.btn.click(function(){
		if(obj.list.is(":animated")) return false;	
		obj.btn.not($(this)).removeClass("on").next(".accordion").slideUp(300);			$(".acco_tips").hide();
		$(this).toggleClass("on").next(".accordion").slideToggle(300);	

        obj.find("a.titles").find("em").text("열기");
        
		if($(this).hasClass("on")){
			$(this).find("em").text("닫기");
		}
		
		return false;	
	});
    
    if(obj.find(".titles").hasClass("on")){
       obj.find(".acco_tips").hide();
    }else{
        obj.find(".acco_tips").show();
    }
    de_btn.click(function(){
        $(this).parent().addClass("on");
        return false;
    });
    
    de_btn.click(function(){
        if(de_btn.hasClass("on")){
            de_btn.parent().find(".acco_box").css({"display":"none"});
            de_btn.parent().find(".roof_tit").css({"display":"block"});
            de_btn.removeClass("on").html("상세정보 확인하기");
        }else{
            de_btn.parent().find(".acco_box").css({"display":"block"});
            de_btn.parent().find(".roof_tit").css({"display":"none"});
            
            de_btn.addClass("on").html("지도 확인하기");
        }
        return false;
    });
    
}
function boo (){
    var idx= $("#ga_stat_indu .maparc_box .acco_box");
    var tar = $("#ga_stat_indu .maparc_box .acco_box .thi_box .txts");
    var tar_normal = $("#ga_stat_indu .maparc_box .acco_box .thi_box.normal_thi_box");
    tar_normal.hide();
    tar.find(">div").hide();
    if(idx.hasClass("attention")){
        tar.find("> .attention").show();
    }else if(idx.hasClass("warning")){
        tar.find("> .warning").show();
    }else if(idx.hasClass("awful")){
        tar.find("> .awful").show();
    }else if(idx.hasClass("terrible")){
        tar.find("> .terrible").show();
    }else if(idx.hasClass("normal")){
        tar.parent().hide();
        tar_normal.show();
    }
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_anal_tab 탭 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".cont_tab").size() != 0){
		contab_js();		
	}
});

function contab_js(){
	var obj = $(".cont_tab");
		obj.tab = obj.find(">.tab_btn ul li");
		obj.cont = obj.find(" .tab_cont");
	obj.tab.find(">a").click(function(){
		var idx = $(this).parent().index();
		obj.tab.removeClass("on").find("strong").contents().unwrap().wrap('<span></span>');
		$(this).parent().addClass("on").find("span").contents().unwrap().wrap('<strong></strong>');
		obj.cont.removeClass("on");
		obj.cont.eq(idx).addClass("on");
		return false;	
	});	 
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_anal_news Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function() {
	if($("#ga_anal_news .roof_tit .txts.chart_box").size() != 0){
		ga_anal_news();		
	}
});

function ga_anal_news(){
    var btn = $("#ga_anal_news .mo_btn");
    var par = $("#ga_anal_news .roof_tit")
    
    btn.click(function(){
        if(btn.hasClass("on")){
            par.removeClass("on");
            btn.removeClass("on").html("상세정보 확인하기");
        }else{
            par.addClass("on");
            btn.addClass("on").html("지도 확인하기");
        }
        return false;
    });
    
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_stat_livi Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function() {
	if($("#ga_stat_livi").size() != 0){
		ga_stat_livi();		
	}
});

function ga_stat_livi(){
    var btn = $("#ga_stat_livi .mo_btn");
    
    
    btn.click(function(){
        if(btn.hasClass("on")){
            btn.siblings(".roof_tit").find(".txts.maps").css({"display":"block"});
            btn.siblings(".roof_tit").find(".txts.cont").css({"display":"none"});
            btn.removeClass("on").html("상세정보 확인하기");
        }else{
            btn.siblings(".roof_tit").find(".txts.maps").css({"display":"none"});
            btn.siblings(".roof_tit").find(".txts.cont").css({"display":"block"});
            btn.addClass("on").html("지도 확인하기");
        }
        return false;
    });
    
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_waan_ecol Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function() {
	if($("#ga_waan_ecol").size() != 0){
		ga_waan_ecol();		
	}
});

function ga_waan_ecol(){
    var btn = $("#ga_waan_ecol .mo_btn");
    
    
    btn.click(function(){
        if(btn.hasClass("on")){
            btn.siblings(".roof_tit").find(".txts > .svg_wrap").css({"display":"block"});
            btn.siblings(".roof_tit").find(".txts > .table_wrap").css({"display":"none"});
            btn.removeClass("on").html(" 상세정보 확인하기");
        }else{
            btn.siblings(".roof_tit").find(".txts > .svg_wrap").css({"display":"none"});
            btn.siblings(".roof_tit").find(".txts > .table_wrap").css({"display":"block"});
            btn.addClass("on").html("지도 확인하기");
        }
        return false;
    });
    
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	#ga_waan_curr Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(function(){
	ga_waan_curr();
    
    $('.menus_4 .tooltip span').attr("tabindex","0");
    $('.menus_4 .tooltip span').focus(function(){             
            $('.menus_4 .tooltip span').find("i").css("display","block");
                                      });
    $('.menus_4 .tooltip span').focusout(function(){
         $('.menus_4 .tooltip span').find("i").css("display","none");
    });
   
    
    
    
});

function ga_waan_curr(){
	var obj = $("#ga_waan_curr .roof_tit");
		obj.gph = obj.find(" [data-value]");

	for(var i=0; i<obj.gph.size(); i++){
		obj.gph.eq(i).css("width",obj.gph.eq(i).attr("data-value")+"%");
		console.log(obj.gph.eq(i).attr("data-value"));
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_east_asia Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	ga_east_asia();
});

function ga_east_asia(){
    var obj =$("#ga_east_asia .map .pin .pin_tit");
    var close =$("#ga_east_asia .map .pin .info .close_btn");
    var par = $("#ga_east_asia .map .pin");
    
    obj.click(function(){
        if(par.hasClass("on")){
            par.removeClass("on");
            obj.siblings(".info").hide().parent().css("z-index","0");
        }
        $(this).siblings(".info").show();
        $(this).parent().addClass("on").css("z-index","1");
        return false;
    });
    
    close.click(function(){
        $(this).parent().hide();
        $(this).parent().parent().removeClass("on").css("z-index","0");
        return false;
    });
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_waan_ecol Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function() {
	if($("#ga_nume_sgi").size() != 0){
		ga_nume_sgi();		
	}
});

function ga_nume_sgi(){
    var btn = $("#ga_nume_sgi .mo_btn");
    
    
    btn.click(function(){
        if(btn.hasClass("on")){
            btn.siblings(".roof_tit").find(".txts.maps").css({"display":"block"});
            btn.siblings(".roof_tit").find(".txts.cont").css({"display":"none"});
            btn.removeClass("on").html(" 상세정보 확인하기");
        }else{
            btn.siblings(".roof_tit").find(".txts.maps").css({"display":"none"});
            btn.siblings(".roof_tit").find(".txts.cont").css({"display":"block"});
            btn.addClass("on").html("지도 확인하기");
        }
        return false;
    });
    
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_waan_stat Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(document).ready(function() {
	if($("#ga_waan_stat").size() != 0){
		ga_waan_stat();		
	}
});

function ga_waan_stat(){
    var btn = $("#ga_waan_stat .mo_btn");
    
    
    btn.click(function(){
        if(btn.hasClass("on")){
            btn.siblings(".left_wrap").css({"display":"block"});
            btn.siblings(".right_wrap").css({"display":"none"});
            btn.removeClass("on").html(" 상세정보 확인하기");
        }else{
            btn.siblings(".left_wrap").css({"display":"none"});
            btn.siblings(".right_wrap").css({"display":"block"});
            btn.addClass("on").html("지도 확인하기");
        }
        return false;
    });
    
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	#mana_resp_emer 
    가뭄대응 > 가뭄대응 비상연락망

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("#mana_resp_emer").size() !=0){
		mana_resp_emer();
	}
});

function mana_resp_emer(){
    if($("body").width()<1008){
        
	   $("#mana_resp_emer .divi_2.divi_201 .sec_table > .move > .table > tbody").contents().unwrap().clone(false).appendTo("#mana_resp_emer .divi_2.divi_201 .fir_table> .move > .table > tbody");
        $("#mana_resp_emer .divi_2.divi_201 .sec_table").hide();
        
        $("#mana_resp_emer .divi_2.divi_202 .sec_table > .move > .table > tbody").contents().unwrap().clone(false).appendTo("#mana_resp_emer .divi_2.divi_202 .fir_table> .move > .table > tbody");
        $("#mana_resp_emer .divi_2.divi_202 .fir_table > .move > .table > thead tr th:first-child").html("광역시&middot;도명");
        $("#mana_resp_emer .divi_2.divi_202 .sec_table").hide();
        
        $("#mana_resp_emer .divi_2.divi_204 .sec_table > .move > .table > tbody").contents().unwrap().clone(false).appendTo("#mana_resp_emer .divi_2.divi_204 .fir_table> .move > .table > tbody");
        $("#mana_resp_emer .divi_2.divi_204 .sec_table").hide();
        
        $("#mana_resp_emer .divi_2.divi_205 .sec_table > .move > .table > tbody").contents().unwrap().clone(false).appendTo("#mana_resp_emer .divi_2.divi_205 .fir_table> .move > .table > tbody");
        $("#mana_resp_emer .divi_2.divi_205 .sec_table").hide();
    }
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	select_box Function ga_anal_tab

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".select_box").size() != 0){
		ga_anal_tab();
	}
});
function ga_anal_tab(){
	var obj = $(".select_box"); 
	
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

	Life cal Pop

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*
$(function(){
	if($("#life_cals").size() !=0){
		Step_info();
	}
});*/

function Step_info(){
	var obj = $("#life_cals>[data-skin='popup']");

	obj.fadeIn(0);
	setTimeout(function() {
		obj.fadeOut(200);
	}, 2000);
	setTimeout(function() {
		obj.removeAttr("style");
	}, 2300);
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	mana_stve

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("#mana_stve").size() !=0){
		mana_stve();
	}
});

function mana_stve(){
    var obj = $("#mana_stve .ch_box");
        obj.rad = obj.find(".table tbody tr.f_tr td");
        obj.txt = obj.find(".table tbody tr.s_tr");
        obj.do_th = obj.siblings(".down_table").find(".table thead tr");
        obj.do_tb = obj.siblings(".down_table").find(".table tbody tr");
    
    obj.rad.find(".sec_ra").click(function(){
       obj.txt.find("th").html("기준월");
        obj.txt.find("td div").hide();
        obj.txt.find("td [data-skin='select']").show();
        obj.do_tb.find(".names").html("가뭄 전망도");
        obj.do_th.find(".stand").html("기준월");
    });
    
    obj.rad.find(".fir_ra").click(function(){
       obj.txt.find("th").html("기준일자");
        obj.txt.find("td div").hide();
        obj.txt.find("td [data-skin='cal']").show();
        obj.do_tb.find(".names").html("가뭄 현황도");
        obj.do_th.find(".stand").html("기준일자");
    });
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	ga_case_fore

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#ga_case_fore").size() != 0){
		ga_case_fore();		
	}
});

function ga_case_fore(){
	var obj = $("#ga_case_fore");
		obj.tab = obj.find(".map_box ul li a");
		obj.cont = obj.find(".tab_cont");
	obj.tab.click(function(){
		var idx = $(this).parent().index();
		obj.tab.removeClass("on");
		$(this).addClass("on");
		obj.cont.removeClass("on");
		obj.cont.eq(idx).addClass("on");
		return false;	
	});	 
}


$(document).ready(function() {
	if($("#ga_expe").size() != 0){
		ga_expe();		
	}
});


function ga_expe(){
    var slide = $("#ga_expe .js_slide_box .slide_06") ;
        slide.titles = slide.find(">.title");
        slide.controls = slide.find(">.control");
        slide.btn_left = slide.controls.find(">.btn_left");
        slide.btn_right = slide.controls.find(">.btn_right");
        slide.moves = slide.find(">.move");
        slide.ul = slide.moves.find(">ul");
        slide.li = slide.ul.find(">li");
        slide.a = slide.ul.find(">li>a");
        slide.cnt = 0;

	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}
    
    //심볼
    $("<ul></ul>").appendTo(slide.controls);
        for(var i=0; i<slide.li.size(); i++){
            $('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
        }
        slide.simbols = slide.controls.find(">ul>li");
    
    
    if(slide.li.size() > 2){
        var liClone = slide.li.clone();
        liClone.appendTo(slide.ul);
    }
    
    
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
        });
    }
    _set(slide.cnt);
    
    
    slide.simbols.find(">a").click(function(){
        var idx = slide.simbols.index($(this).parent());
        _set(idx);
        return false;
    });
    
    
    slide.btn_left.click(function(){
        var idx = slide.cnt-1;
        if(idx < 0) idx = slide.li.size()-1;
        _set(idx);
        return false;
    });
    slide.btn_right.click(function(){
        var idx = slide.cnt+1;
        if(idx > slide.li.size()) idx = 0;
        _set(idx);
        return false;
    });

}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    센터소개&참여 > 국가가뭄센터란 > 조직 
    #part_cent_orga 드롭다운

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#part_cent_orga").size() != 0 && $(window).width()<=824){
		part_cent_orga();
	}
});
function part_cent_orga(){
	var obj = $("#part_cent_orga .sel_box"); 
	
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

	ga_case_kor

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("#ga_case_kor").size() !=0){
		ga_case_kor();
	}
});
function ga_case_kor(){
    
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	sitemap Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($("#sitemap").size() != 0){
		$("#gnb >ul").clone(false).appendTo($("#sitemap"));
        $("#sitemap > ul > li > ul > li > a").wrap("<span></span>");
        $("#sitemap > ul > li > ul > li > ul > li > a").contents().unwrap();
	}
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	gong_u Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".gong_u").size() != 0){
		//gong_u_AC();
	}
});

function gong_u_AC(){
	var obj = $(".gong_u");
		obj.box = $(".sns_box");
		obj.btn_close = obj.box.find(" .btn_close");

	obj.click(function(){
		blind_on(function(){
			obj.box.fadeIn(200);
		});

		$("#blind").bind("click",function(){
			obj.btn_close.click();			
		});
		return false;
	});

	obj.btn_close.click(function(){
		obj.box.fadeOut(200,function(){
			blind_off();	
		});
		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	프린트 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	$("[data-icon='print'] a").click(function() {

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

	Top Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {  
	if($(".floating_top").size() != 0){
		floatingTop ();	
	}
});
function floatingTop (){
	$(window).scroll(function () {
		var winTop = $(this).scrollTop();
		var headerTop = $(window).height()/4;
		var f_hight = $("#footer").height() + 20;
        
		if (winTop > headerTop) {
			$(".floating_top").fadeIn(300);
		} else if (winTop <= headerTop) {
			$(".floating_top").fadeOut(300);
		} 
        
        if(($(window).scrollTop() - $("#footer").height()) < ($(document).height() - $(window).height() - $("#footer").height())){
            $(".floating_top").removeClass("on");
        }else{
            $(".floating_top").addClass("on");
        }
        
        if($(".floating_top").hasClass("on")){
        	if($("body").width()>1008){
        		$(".floating_top").css({"bottom":"calc("+f_hight+"px + 5em)"});
        	}else{
        		$(".floating_top").css({"bottom":"calc("+f_hight+"px + 7%)"});
        	}
        }else{
            $(".floating_top").css({"bottom":"10%","z-index":"2"});
        }
	});	
    
	$(".floating_top a").click(function(){
        $("body,html").stop().animate({"scrollTop":"0"},500);
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	접근성 추가

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("[data-skin='radio']").size() != 0){
		
		$("[data-skin='radio'] input").keydown(function(event){
			if(event.keyCode == 13){
				$(this).parent().find("input").trigger("click");
			}
		});
	}
	
	if($(".menu_4 .tooltip").size() != 0){
		$(".menu_4 .tooltip span").attr("tabindex","0");
		$(".menu_4 .tooltip span").focus(function(){
			$(".menu_4 .tooltip span").find("i").css("display","block");
		});
		$(".menu_4 .tooltip span").focusout(function(){
			$(".menu_4 .tooltip span").find("i").css("display","none");
		});
	
	}
	
	if($("#basi_stat_list").size() != 0){
		setTimeout(function(){
			$('#basi_stat_list .tab_cont .table_scroll .move .table tbody tr td a[data-skin="btn"]').keydown(function(event){
				if(event.keyCode == 13){
					setTimeout(function(){
						$(".ui-dialog").attr("tabindex","0").focus();
						$('.ui-dialog').keydown(function(event){
							if(event.keyCode == 9){
								$(".ui-dialog-titlebar-close").focus();
							}
						});
					},1000);
				}
			});
			
			$('#basi_stat_list .tab_cont .table_scroll .move .table tbody tr td a[data-skin="btn"]').click(function(){
				setTimeout(function(){
					$(".ui-dialog").attr("tabindex","0").focus();
				},1000);
			});
		},1000);
	}
	
	if($("#ga_nort_weat").size() != 0){
		$('div[id^=NK] .rightbox ul>li>a').siblings(".scrollbox").attr("축소됨");
		$('div[id^=NK] .rightbox ul>li>a').siblings(".scrollbox").find("ul").hide();
		$('div[id^=NK] .rightbox').find("ul>li>a").click(function(){
			if($(this).parent().hasClass("on")){
				$(this).siblings(".scrollbox").attr("축소됨");
				$(this).siblings(".scrollbox").find("ul").hide();
			}else{
				$(this).siblings(".scrollbox").attr("확장됨");
				$(this).siblings(".scrollbox").find("ul").show();
			}
		});
	}
	
	$('input[type="checkbox"]').on('keypress',function(event){
		if(event.which === 13){
			this.checked = !this.checked;
		}
	});
	
	if($("#life_cals").size() != 0){
		var _shift = false;
		$(document).on("keydown",function(event){
			if(event.keyCode == 16) _shift = true;
		});
		$(document).on("keyup",function(event){
			if(event.keyCode == 16) _shift = false;
		});
		
		setTimeout(function(){
			$('.ui-datepicker select').attr("title","연도 선택");
			$('.ui-datepicker tr:last-child td:nth-child(3)').keydown(function(event){
				if(event.keyCode == 9){
					$('#life_cals .date .date_pick .btn_r').focus();
					return false;
				}
			});
			
			$('.ui-datepicker tr td').keydown(function(event){
				if(event.keyCode == 13){
					$('#life_cals .date .date_pick .btn_r').focus();
					return false;
				}
			});
			
			$('.ui-datepicker select').keydown(function(event){
				if(event.keyCode == 9){
					if(!_shift){
						
					}else{
						$('#life_cals .date .date_pick .btn_l').focus();
						return false;
					}
				}
			});
		},1000);
		
	}
	
	
	
	if($("#ga_educ").size() != 0){
		setTimeout(function(){
			setTimeout(function(){
				$('#ga_educ .pop_education .drought-judgebox dl dt strong a').click(function(){
					var idxs = ($(this).parent().parent().parent().index()) + 1;
					setTimeout(function(){
						$('#ga_educ .pop_education .pop-droughtjudge.judge_0'+idxs+'').attr("tabindex","0").focus();
						return false;
					},1000);
					
					$('#ga_educ .pop_education .pop-droughtjudge.judge_0'+idxs+' button').click(function(){
						$('#ga_educ .pop_education .drought-judgebox dl:nth-child('+idxs+') dt strong a').focus();
						return false;
					});
				});
			},1000);
		},1000);
		
	}
	
});

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    #sub_01_04_02_03 가뭄 교육신청
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function () {
    if ($("#sub_01_04_02_03").size() != 0) {
        sub_01_04_02_03();
    }
});

function sub_01_04_02_03() {
    var obj = $("#sub_01_04_02_03 .boardwrite table tr td div.pops .close");

    obj.click(function () {
        $(this).parent().hide();
        return false;
    });

    obj.parent().parent().find('input[type="checkbox"]').on('click', function () {
        if ($(this).prop('checked')) {
            obj.parent().show();
        } else {
            obj.parent().hide();
        }
    });
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	스크롤 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("#info_boxs").size() != 0){
		layout_scroll_AC2();
	}
});
function layout_scroll_AC2(){
				var t = 0;
				var arr = ['info_boxs'];
				var cnt = 0;

		$(window).on("scroll",function(){
				for(var i=0; i<arr.length; i++){
						var ob = $("#"+arr[i]);
						//var t2 = (t - ob.offset().top) + $(window).height();
                        var t2 = (t - (($(window).scrollTop() - ob.offset().top) * -1)) + $(window).height();
						var step = Math.floor(t2 / ob.innerHeight() * 100);
                    
                    

						if(step < 10) step = 0;
						else step = Math.floor(step / 10);
						if(t2 > 0 && t2 < ob.innerHeight()){
								$("body").attr("data-steps",step);
						} else {
								if(t2 < 10){
										$("body").removeAttr("data-steps");
								}
								else{
										$("body").attr("data-steps","10");
								}
						}
                    //console.log( ($(window).scrollTop() - ob.offset().top) * -1, $(window).height(), step);
				}
		});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	스크롤 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	if($("#ga_expe").size() != 0){
		ga_expe_scroll();
	}
});
function ga_expe_scroll(){
				var t = 0;
				var arr = ['ga_expe'];
				var cnt = 0;

		$(window).on("scroll",function(){
				for(var i=0; i<arr.length; i++){
						var ob = $("#"+arr[i]);
						//var t2 = (t - ob.offset().top) + $(window).height();
                        var t2 = (t - (($(window).scrollTop() - ob.offset().top) * -1)) + $(window).height();
						var step = Math.floor(t2 / ob.innerHeight() * 100);
                    
                    

						if(step < 10) step = 0;
						else step = Math.floor(step / 10);
						if(t2 > 0 && t2 < ob.innerHeight()){
								$("body").attr("data-steps",step);
						} else {
								if(t2 < 10){
										$("body").removeAttr("data-steps");
								}
								else{
										$("body").attr("data-steps","10");
								}
						}
                    //console.log( ($(window).scrollTop() - ob.offset().top) * -1, $(window).height(), step);
				}
		});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Data Count

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
   //countdown();
});

function countdown(){
    var obj = $('[data-skin="count"]');

    function _set(str){
        var count= str.text();//value
        var speeds = 2000;//2초간 진행

        if(count == "" || count == undefined) count = 0;
        count = count.replace(",","");
    
        $({ val : 0 }).animate({ val : count }, {
            duration: speeds,
            step: function() {
                var num = commas(Math.floor(this.val));
                str.text(num);
            },
            complete: function() {
                var num = commas(Math.floor(this.val));
                str.text(num);
            }
        });
        function commas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
    }

    for(var i=0; i<obj.size(); i++){
        _set(obj.eq(i));
    }
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    국민행동요령 인포그래픽 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {  
   if($("#info_boxs").size() != 0){
		info_boxs ();	
	}
});
function info_boxs (){
	var obj = $("#info_boxs .img_maps [name='image-map'] area");
	var attrs = '';
	obj.click(function(){
		attrs = $(this).attr("class");
		$(this).parents("#info_boxs").removeAttr("data-level-name");
		$(this).parents("#info_boxs").attr("data-level-name",attrs);
		$(this).parents("#info_boxs").addClass("on");
		$(this).parents("#info_boxs").find(".step_box li").removeClass("on");
		$(this).parents("#info_boxs").find(".step_box li." + attrs +"").addClass("on");
		return false;
	});    
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    성능 백그라운드 이미지 loading lazy

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages;    

  if ("IntersectionObserver" in window) {
    lazyloadImages = document.querySelectorAll(".lazy");
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function(image) {
      imageObserver.observe(image);
    });
  } else {  
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    

      lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
})


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    가뭄교육 체험 동영상 클릭시 src 연결

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {  
    checkResize();
    $(window).on('resize', function() {
      checkResize();
    });

    
    function checkResize() {
        if($('[data-skin="popup"][data-name="pop22"]').size() != 0){
            $('[data-skin="popup"][data-name="pop22"]>.bx .txts').find("video").attr("src","");

           setTimeout(function() {
                $("#sec3 .slide_wrap > .js_slide > .move > ul > li.ico3 > a[data-popup='pop22']").click(function(){
                    console.log("aaa");
                    $('[data-skin="popup"][data-name="pop22"]').addClass("on");
                    $('[data-skin="popup"][data-name="pop22"]>.bx .txts').find("video").attr("src","https://www.drought.go.kr/data/video/Drought_education.mp4");
                    return false;
                });
                $('[data-skin="popup"][data-name="pop22"]>.bx .close').click(function(){
                    $('[data-skin="popup"][data-name="pop22"]').removeClass("on");
                    $('[data-skin="popup"][data-name="pop22"]>.bx .txts').find("video").attr("src","");
                    return false;
                });
            }, 2000);
        }

    }
});