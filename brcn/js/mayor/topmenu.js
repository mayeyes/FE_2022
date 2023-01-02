/*$(function(){  
    if($("body").hasClass("pc")){
        var obj = $("#tm li.th1");
        for(var i=0; i<obj.size(); i++){
            console.log(i,obj.eq(i).find(">a").text());
            obj.eq(i).find(">a").clone(false).prependTo(obj.eq(i).find(".th2"));

        }
    }
});*/

// 풀다운
function gnb(param,obj,btn,wrap,elem,scale,dur,meth){
	var param = $(param);
	var obj = param.find(obj); 
	var btn = param.find(btn);
	var wrap = param.find(wrap);
	var elem = elem-1; // jsp 메뉴 코드가 1부터 시작하기 때문에
	var new_h = 0;
	var maxNew_h = 0;
	var old_h = $("#gnb").height();
	var gimg_h = 0;
	var moresize = 0;
	var n = elem;
	var data = false;

	function _current(s){
		wrap.addClass("nobg");
		btn.not(s).removeClass("current").eq(s).addClass("current");
		btn.not(s).next().removeClass("ov");
		btn.eq(s).next().addClass("ov");
	}
	function _def(){
        /*if($("body").hasClass("pc")){
                    var obj2 = $("#tm li.th1");
                    for(var i=0; i<obj2.size(); i++){
                        obj2.eq(i).find(">a").clone(false).prependTo(obj2.eq(i).find(".th2"));
                    }
                }*/
		obj.css("padding-bottom","15px");
		$.each(obj,function(){if(new_h < $(this).innerHeight()) new_h = $(this).innerHeight(); });
		obj.height(new_h);
		var pd = parseInt(obj.css("padding-top")) * 2;
		maxNew_h = new_h+btn.height() + 90; 
	}
	_def();
	function _open(){
		// height 가 가장 큰 박스의 height 를 저장
		//$.each(obj,function(){if(new_h < $(this).parent().outerHeight()) new_h = $(this).parent().outerHeight(); });
		
		// padding-top 연산 가능하게 타입 변환하여 저장
		//moresize = Number(obj.css("padding-top").substr(0,2))*2;
		//moresize = moresize+btn.height();
		
		wrap.stop(true,false).animate({"height":maxNew_h+"px"},dur,meth);
	}

	function _close(){
		wrap.stop(true,false).animate({"height":old_h},dur,meth);
		$("#touchArea").hide();
		btn.removeClass("current");
		obj.removeClass("ov");
	}

	// 테블릿 터치 헨들링
	btn.bind("touchstart touchmove",function(event){
		if(chaked_OS() == true){
			if(data == false){
				data = true;
				_open();
				_current(n);
				event.preventDefault();
			}else{
				data = false;
			}
		}
	});

	btn.bind("mouseenter focusin",function(){
		if(chaked_OS() == true) return false;
		_open();
		_current($(this).parent().index());
		wrap.removeClass("nobg");
	});

	wrap.bind("mouseleave",function(){
		_close();
		//_current(n);
		wrap.addClass("nobg");
	});

	obj.bind("mouseenter",function(){
		btn.removeClass("current");
		obj.removeClass("ov");
		$(this).prev().addClass("current");
		$(this).addClass("ov");
	});

	obj.last().find(">li>a").last().bind("focusout",function(){
		_close();
		_current(n);
		wrap.addClass("nobg");
	});
    
}

$(document).ready(function(){
	search_AC();	//검색
});


function search_AC(){
	var obj = $("#header .searchbx>.searchs");
	var btn = $("#header .searchbx>.s_btn");

	obj.hide();
	btn.click(function() {
		if(obj.is(":hidden")){
			obj.fadeIn(200);
			$(this).addClass("on");
		} else{
			obj.fadeOut(200);
			$(this).removeClass("on");
		}

		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	layout function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){  
    setTimeout(function(){
        if($("#top_btn").size() != 0){
            floatingTop();
        }
    },100);
});

 function floatingTop(){
    $("#top_btn").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });

    //default
    $("#top_btn").hide();
    
    $(window).scroll(function(){
    	var had = $("#header").innerHeight();
    	var t = $(this).scrollTop();

    	if(had<t){
    		var ft = $("#footer").offset().top + $("#top_btn").height();

    		$("#top_btn").fadeIn(200);
    		if(t + $(window).innerHeight() >= ft){
				$("#top_btn").addClass("fix");
			} else {
				$("#top_btn").removeClass("fix");
			}
    	} else{
    		$("#top_btn").fadeOut(200);
    	}
    });

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
    
    //총 카운트 적용
    slide.counts.html("0"+slide.nums+"<span>/"+"0"+slide.li.size()+"</span>");

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
		slide.counts.html("0"+slide.nums+"<span>/"+"0"+slide.li.size()+"</span>");
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
	slide.times_speeds = 5000;
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
        
		slide.li.eq(olds-1).stop().removeClass("on").css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
			slide.li.eq(olds-1).css({"left":"100%","display":"none"});
			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});

		slide.li.eq(news-1).css({"display":"block"}).stop().addClass("on").css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
		});

		slide.nums = news;

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

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

	btn_share Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	btn_share();
});

function btn_share(){
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

    서브페이지 gnb on

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(window).load(function(){
    if($("#sub_visual").size() != 0){
        depth_titles();
    }
});
function depth_titles(){
    var idx = $(".location .navi li:nth-child(2)").text().replace(/\n|\r|\s*/g, "");
    if($("body").hasClass("pc")) var gnb_li = $("#animate #tm >li.th1");
    else gnb_li = $("#slide_map .inner .binds > ul > li");
    
    for(var i=0; i<gnb_li.size(); i++){
        gnb_li.txt = gnb_li.eq(i).find(">a").text().replace(/\n|\r|\s*/g, "");
        if(idx == gnb_li.txt){
            gnb_li.removeClass("on");
            gnb_li.eq(i).addClass("on");
        }
    }
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
    var params = "";
    var code = new Array();
		
	   code[0] = parseInt(params.substr(0,2)) -1; //eq(n) n번지수 찾기
	   code[1] = parseInt(params.substr(2,2)) -1; //eq(n) n번지수 찾기
	   code[2] = parseInt(params.substr(4,2)) -1; //eq(n) n번지수 찾기	 
    
    var gnb_obj = $("#tm");
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
	
	/*mob_gnb_obj.box.gnb.ul.li.ul.niceScroll({cursorcolor: "#D2D5DA"});*/
	mob_gnb_obj.box.gnb.ul.find(" ul").hide();
	mob_gnb_obj.box.gnb.ul.find(" a").each(function(){
		var i = $(this);
		
		if(i.siblings("ul").size() != 0){
			i.addClass("child");	
		}
	});
	
	
	//mob_def();
	// $(window).resize(function(){
	// 	mob_def();	
	// });	
	function mob_def(){
		mob_gnb_obj.box.find("li").removeClass("on");
		if(code[0] >= 0){
			var obj = mob_gnb_obj.box.gnb.ul.find(">li.sub0"+code[0]);
			obj.addClass("on");
			if(code[1] >= 0){
				var obj = obj.find(">ul").find(">li.sub0"+code[0]+"_0"+code[1]);
				obj.parent().css({"display":"block"});
				obj.addClass("on");
				if(code[2] >= 0){
					var obj = obj.find(">ul").find(">li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]);
					obj.parent().css({"display":"block"});
					obj.addClass("on");
					
					if(code[3] >= 0){
						var obj = obj.find(">ul").find(">li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]+"_0"+code[3]);
						obj.parent().css({"display":"block"});
						obj.addClass("on");
					}
				}
			}
		}
	}

    
	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).parent().removeClass("on");
            mob_gnb_obj.box.gnb.ul.li.a.not(this).parent().find(">ul").slideUp();
			$(this).parent().toggleClass("on");
            $(this).parent().find(">ul").slideToggle();
			return false;	
		} else {
			return true;	
		}
	});

	mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).parent().removeClass("on");
            mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).parent().find(">ul").slideUp();
			$(this).parent().toggleClass("on");
            $(this).parent().find(">ul").slideToggle(300);
			return false;	
		} else {
			return true;	
		}
	});
    
	
    $('<div class="head"><a href="#" class="close">닫기</a></div>').prependTo($("#slide_map >.inner > .binds"));
	$('<div class="side_link"></div>').prependTo($("#slide_map >.inner > .binds >.head"));
	$("#snb .top_util .left").clone(false).prependTo($("#slide_map >.inner > .binds >.head >.side_link"));
	
    /*setTimeout(function(){
        if($("#slide_map .inner .binds>ul>li.on> a").size() != 0){
            $("#slide_map .inner .binds>ul>li.on > a + ul").slideDown();
        }
    },1000);*/
    
    
	$(".allmenu_btn").click(function() {
		if(!$("body").hasClass("fixed") && !$("body").hasClass("pc")){
			$("body").addClass("fixed");
            $("#slide_map .inner").stop().animate({"right":0},300);	
			/*if($("#slide_map .inner .binds>ul>li> a.on").size() == 0){
				$("#slide_map .inner .binds>ul>li:first-child > a").addClass("on");
                $("#slide_map .inner .binds>ul>li:first-child > a + ul").slideDown();
			}*/
		} else {
			$("body").removeClass("fixed");
		}
		return false;
	});
    
    $(document).click(function(e) { 
	    if($(e.target).parents("#slide_map").size() != 0) {
	         //메뉴 안
	    } else {
	        //밖
	        if(!$(".js_mobile_check").is(":hidden") && $(".js_tablet_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"right":-$("#slide_map .inner").innerWidth()},300,function(){
					$("#slide_map").fadeOut(300);
					$("body").removeClass("fixed");			
				});	
			}
	    } 
	});
    
    $("#slide_map .head>.close").click(function(){
		$("#slide_map .inner").stop().animate({"right":-$("#slide_map .inner").innerWidth()},300,function(){
			$("#slide_map").fadeOut(300);
			$("body").removeClass("fixed");			
		});	
        return false;
	});
});

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	btn_share Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	search_btn();
});

function search_btn(){
    $(".total_search .s_btn").click(function() {
		//$(this).parent().addClass("on");
        if($(this).parent().hasClass("on")){
            $(this).parent().removeClass("on");
        }else{
            $(this).parent().addClass("on");
        }
		
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	프린트 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*$(document).ready(function() {
	$(".print").click(function() {
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
	$('.container').printElement(options); //팝업으로 띄울 영역 Div 아이디
}*/


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

sitemap Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
    if($("#sitemap").size() != 0){
        $("#animate #tm").clone(false).appendTo($("#sitemap"));
        $("#sitemap > ul > li > ul > li > a").wrap("<span></span>");
        $("#sitemap > ul > li > ul > li > ul > li > a").contents().unwrap();
    }
});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    본인확인서비스

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(window).load(function(){
	if($(".auth_box").size() != 0){
		auth_box_AC();
	}
});

function auth_box_AC(){
    var obj = $(".auth_box");
    obj.find(">div>p").wrap("<div></div>");
    obj.find(">div>a").attr({"data-btn":"2","data-size":"s"});
    obj.find(">div:eq(0)>a").html("<span>휴대폰인증 바로가기</span>");
    obj.find(">div:eq(1)>a").html("<span>I-PIN 인증 바로가기</span>");
    
    obj.siblings("ul").removeClass("h5_ul").attr("data-list","1").find(">li>ul").removeClass("h7_ul").attr("data-list","3");
}




