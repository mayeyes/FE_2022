/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	header fixed Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#header").size() != 0){
		$(window).scroll(function() {
			js_header ();
		});			
	}	
});
function js_header (){
	if($(".js_mobile_check").is(":hidden")){ 
		
		
//		console.log($(window).scrollTop());
		
		if($("#gnb").position().top  < $(window).scrollTop()){
			$("#header").addClass("fixed");
		} else {
			$("#header").removeClass("fixed");	
		}		
	} else {
		$("#header").removeClass("fixed");		
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
		Tmenu.blind = Tmenu.find(">#blind");
		Tmenu.intervals = "";
	
	Tmenu.ul.li.each(function(e){
		//$(this).addClass("num"+(e+1));			
		$('<strong class="tmenu_ti"><span>'+$(this).find(">a >span").text()+'</span>명랑쌀핫도그 홈페이지에 <br />오신것을 환영합니다.</strong>').insertAfter($(this).find(">a"));
	});
	$("<span class='bar'></span>").appendTo(Tmenu);
	$("<span class='blind'></span>").appendTo(Tmenu);
	
	setTimeout(function(){
		Tmenu_def(Tmenu,code);
	},100);

	Tmenu.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent());	
		Tmenu_open(Tmenu,idx);
	});

	Tmenu.ul.li.ul.li.a.on("mouseover focus",function(){
		var idx = Tmenu.ul.li.index($(this).parent().parent().parent());
		
		Tmenu.ul.li.find(">.tmenu_ti").stop().animate({"opacity":0},0,function(){$(this).hide();	});
		Tmenu.ul.li.eq(idx).find(">.tmenu_ti").css({"display":"block"}).stop().animate({"opacity":1},0);
		Tmenu.find(">.bar").show().stop().animate({"opacity":1,"left":($(this).parent().parent().siblings("a").find(">span").offset().left + ($(this).parent().parent().siblings("a").find(">span").innerWidth()/2)) +"px","width":($(this).parent().parent().siblings("a").find(">span").innerWidth()/2)+"px","margin-left":-($(this).parent().parent().siblings("a").find(">span").innerWidth()/2)+"px","padding-left":($(this).parent().parent().siblings("a").find(">span").innerWidth()/2)+"px"},300);
		Tmenu.ul.li.a.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">a").addClass("on");
		Tmenu.ul.li.ul.removeClass("on");
		Tmenu.ul.li.eq(idx).find(">ul").addClass("on");
	});

	Tmenu.ul.mouseleave(function(){
		Tmenu.intervals = setTimeout(function(){
			Tmenu_def(Tmenu,code);
		},500);
	});

	Tmenu.ul.mouseenter(function(){
		clearTimeout(Tmenu.intervals);
	});

	Tmenu.ul.find(">li:eq(5) >ul >li").last().find(">a").on("focusout",function(){
		Tmenu.intervals = setTimeout(function(){
			Tmenu_def(Tmenu,code);
		},500);
	});
	
	//slide_map
	$('<div id="slide_map"><div class="inner"><div class="binds"></div><a href="#" class="close">닫기</a></div></div>').prependTo($("#wrap"));
	Tmenu.find(">ul").clone(false).appendTo($("#slide_map >.inner > .binds"));
	
	$(".toputil").clone(false).prependTo($("#slide_map >.inner"));	
	$(".membership >li").clone(false).prependTo($("#slide_map >.inner >.toputil"));
	$("#quick >ul >li").clone(false).appendTo($("#slide_map >.inner >.toputil"));	
	
	$(".btn_all").click(function(){
		$(this).toggleClass("on");	
		if($(this).hasClass("on")){
			$(this).html("<span>전체메뉴닫기<em></em></span>");	
		} else {
			$(this).html("<span>전체메뉴열기<em></em></span>");		
		}
		
		if(!$(".js_mobile_check").is(":hidden")){
			if($("#slide_map").is(":animated")) return false;
			
			//MOBILE 버전
			if($("#slide_map").is(":hidden")){
				$("#sub.user #visual, .user #container, .user #footer").addClass("on");
				$("body").addClass("fixed");
				$("#slide_map").fadeIn(300);
				$("#slide_map .inner").stop().animate({"margin-right":0},500,"easeOutExpo");	
			} else {
				$("#sub.user #visual, .user #container, .user #footer").removeClass("on");
				$("body").removeClass("fixed");
				$("#slide_map .inner").stop().animate({"margin-right":-$("#slide_map .inner").width()},500,"easeOutExpo");	
				$("#slide_map").fadeOut(500);
			}	
		} else {
			//PC 버전
			$("#slide_map").fadeToggle(100,function(){
				$(this).toggleClass("on");	
				$("body").toggleClass("fixed");
			});
			$("#slide_map .inner .close").fadeIn(300);	
		}
		
		return false;
	});
	
	$(window).resize(function() {
		if($(".js_mobile_check").is(":hidden")){
			$(".btn_all").removeClass("on").html("<span>전체메뉴열기<em></em></span>");
			$("#sub.user #visual, .user #container, .user #footer").removeClass("on");
			$("body").removeClass("fixed");
			$("#slide_map .inner").stop().animate({"margin-right":-$("#slide_map .inner").width()},500,"easeOutExpo");	
			$("#slide_map").hide();	
		}
	});
	
	/*
	$("#slide_map .inner .close").click(function(){
		if(!$("#slide_map").is(":hidden")){
			$(this).fadeOut(300);
			$("#slide_map").removeClass("on",function(){
				$(this).delay(500).fadeOut(300);	
			});
			$("body").removeClass("fixed");	
		}
		return false;
	});
	
	
	//Mobile Menu	
	/*
	var mob_gnb_obj = $("#slide_map"); 
		mob_gnb_obj.box = mob_gnb_obj.find(">.inner"); 
		mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds"); 
		mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
		mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");

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
	*/
}
//PC Open
function Tmenu_open(Tmenu,code){
	if(code == 0) code = "0";
	idx = code;
	
	var obj = Tmenu.ul.li.eq(idx);
	if(obj.find(">ul").is(":animated")) return false;
	
	Tmenu.ul.li.find(">.tmenu_ti").stop().animate({"opacity":0},0,function(){$(this).hide();});
	obj.find(">.tmenu_ti").css({"display":"block"}).stop().animate({"opacity":1},0);
	Tmenu.find(">.bar").show().stop().animate({"opacity":1,"left":(obj.find(">a >span").offset().left + (obj.find(">a >span").innerWidth()/2)) +"px","width":(obj.find(">a >span").innerWidth()/2)+"px","margin-left":-(obj.find(">a >span").innerWidth()/2)+"px","padding-left":(obj.find(">a >span").innerWidth()/2)+"px"},300);
	Tmenu.find(">.blind").fadeIn(300);
	Tmenu.ul.li.a.removeClass("on");
	obj.find(">a").addClass("on");
	
	if(Tmenu.hasClass("type_01")){
		Tmenu.ul.li.ul.not(":hidden").stop().animate({"opacity":0},100,function(){$(this).hide();});
		obj.find(">ul").show().stop().animate({"opacity":1},100);
		Tmenu.ul.stop().animate({"height":(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight())+"px"},300);	
		Tmenu.stop().animate({"height":(obj.find(">ul").innerHeight() + obj.find(">a").innerHeight())+"px"},300);
		Tmenu.blind.show().stop().animate({"height":obj.find(">ul").innerHeight()},300);	
	} else if (Tmenu.hasClass("type_02")){
		Tmenu.maxH = 0;
		for(var i=0; i<Tmenu.ul.li.size(); i++){
			Tmenu.maxH = Math.max(Tmenu.maxH,Tmenu.ul.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		Tmenu.ul.li.ul.removeClass("on").innerHeight(Tmenu.maxH).show().stop().animate({"opacity":1},0);
		obj.find(">ul").addClass("on");
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
	Tmenu.ul.li.find(">.tmenu_ti").stop().animate({"opacity":0},300,function(){$(this).hide();});
	Tmenu.find(">.bar").stop().animate({"opacity":0,"width":0+"px","margin-left":0+"px","padding-left":0+"px"},300,function(){$(this).hide();});
	Tmenu.find(">.blind").fadeOut(300);
	Tmenu.ul.li.find("a.on").removeClass("on");
	Tmenu.ul.li.ul.stop().animate({"opacity":0},300,function(){$(this).hide().removeClass("on");});
	Tmenu.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
	Tmenu.ul.stop().animate({"height":Tmenu.ul.li.a.innerHeight()+"px"},300);
	Tmenu.blind.stop().animate({"height":0},300,function(){$(this).hide();});
	
	if(code[0] > -1){		
		var obj = Tmenu.ul.find(">li.sub0"+code[0]);
		obj.find(">a").addClass("on");
		
		if(obj.find(">a").hasClass("on")){
			Tmenu.find(">.bar").show().stop().animate({"opacity":1,"left":(obj.find(">a >span").offset().left + (obj.find(">a >span").innerWidth()/2)) +"px","width":(obj.find(">a >span").innerWidth()/2)+"px","margin-left":-(obj.find(">a >span").innerWidth()/2)+"px","padding-left":(obj.find(">a >span").innerWidth()/2)+"px"},300);
		}	
		if(code[1] > -1){
			obj = obj.find(">ul >li.sub0"+code[0]+"_0"+code[1]);
			obj.find(">a").addClass("on");
			if(code[2] > -1){
				obj = obj.find(">ul >li.sub0"+code[0]+"_0"+code[1]+"_0"+code[2]);
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

js_visual Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($(".visual").size() != 0){
		js_visual ();	
	}
});
function js_visual(){
	var slide = $(".visual");
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
	
	$("<div class='visual_check'></div>").prependTo(slide);
	slide.check = slide.find(">.visual_check");
	 
	if(slide.check.is(":hidden")){
		slide.height(slide.li.find("img.pc").height());
	} else {
		slide.height(slide.li.find("img.mob").height());
	}
	$(window).resize(function() {
		if(slide.check.is(":hidden")){
			slide.height(slide.li.find("img.pc").height());
		} else {
			slide.height(slide.li.find("img.mob").height());
		}
	});
	
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
			slide.li.eq(olds-1).css({"left":"100%","display":"block"});
			$(this).removeClass("on");
			if(slide.autos == "Y"){
				slide.times = setTimeout(function(){
					movement("right");
				},slide.times_speeds);
			}
		});

		slide.li.eq(news-1).css({"display":"block"}).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
			$(this).addClass("on");
		});
		
		slide.nums = news;
	
		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	
		//심볼
		slide.simbols.find(">a.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

js_product Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".our_product").size() != 0){
		js_product ();	
	}
});
moving = "";
autoplay = "true";
function js_product (){
	var obj = $(".our_product .slider");	
		obj.prev = obj.find(".btn_prev"); 
		obj.next = obj.find(".btn_next"); 
		obj.controls = obj.find(">.controls >.pointer >ul >li >a");
		obj.move = obj.find(">.move"); 
		obj.saveNum = 0;
		obj.idx = 0;

	//setting
	def(obj);
	resize(obj);
	$(window).resize(function() {
		resize(obj);
	});
	
	//auto
	if(autoplay == "true"){
		auto(obj);
	}
	
	//control
	obj.next.click(function() {					
		clearInterval(moving);
		
		if(obj.move.find(">li").is(":animated")) return false;

		obj.idx = obj.saveNum-1;
		if(obj.idx < 0) obj.idx = obj.move.find(">li").size()-1;
		obj.controls.parent().removeClass("on");
		obj.controls.parent().parent().find(">li").eq(obj.idx).addClass("on");
		move(obj);
		
		return false;
	});
	obj.prev.click(function() {					
		clearInterval(moving);
		
		if(obj.move.find(">li").is(":animated")) return false;

		obj.idx = obj.saveNum+1;
		if(obj.idx >= obj.move.find(">li").size()) obj.idx = 0;
		obj.controls.parent().removeClass("on");
		obj.controls.parent().parent().find(">li").eq(obj.idx).addClass("on");
		move(obj);
		
		return false;
	});	
	obj.controls.click(function() {
		clearInterval(moving);
		
		if(obj.move.find(">li").is(":animated")) return false;

		if($(this).parent().index() < 6) {
			obj.idx = $(this).parent().index();
			obj.controls.not($(this)).parent().removeClass("on");
			$(this).parent().addClass("on");
			
			if(obj.idx == obj.saveNum) return false;
			move(obj);	
			
			return false;
		} else {
			return true;	
		}
	});
	obj.controls.parent().parent().parent().on("mouseleave",function(){
		clearInterval(moving);
		auto(obj);
	});	
}
function def(obj){
	obj.controls.parent().parent().find(">li:eq("+ obj.saveNum +")").addClass("on");
	obj.move.find(">li:eq("+ obj.saveNum +")").addClass("on");
}
function move(obj){	
	obj.move.find(">li:eq("+obj.saveNum+")").removeClass("on");
	obj.move.find(">li:eq("+obj.idx+")").addClass("on");
	obj.saveNum = obj.idx;
	def(obj);	
}
function auto(obj){
	clearInterval(moving);
	moving = setInterval(function(){
		if(obj.move.find(">li").is(":animated")) return false;
		
		obj.idx = obj.saveNum+1;
		if(obj.idx >= obj.move.find(">li").size()) obj.idx = 0;
		obj.controls.parent().removeClass("on");
		obj.controls.parent().parent().find(">li").eq(obj.idx).addClass("on");
		move(obj);
		
		return false;	
	},4000);
}
function resize(obj){
	var win = $(document).width();
	var size = obj.controls.parent().parent().parent().width();

	obj.controls.parent().width(size/7);

	/*
	if(win > 1280){
		obj.controls.parent().width(size/7);
	} else if (win <= 1280 && win > 840){
		obj.controls.parent().width(size/5);	
	} else if (win <= 840 && win > 480){
		obj.controls.parent().width(size/3);	
	}
	*/
}


/* 이전소스
$(document).ready(function() {
	if($(".our_product").size() != 0){
		js_product ();	
	}
});
moving = "";
function js_product (){
	var obj = $(".our_product .slider");	
		obj.prev = obj.find(".btn_prev"); 
		obj.next = obj.find(".btn_next"); 
		obj.controls = obj.find(">.controls >.pointer >ul >li >a");
		obj.move = obj.find(">.move"); 

	resize(obj);
	$(window).resize(function() {
		resize(obj);
	});
	
	obj.controls.parent().each(function(){
		var i = $(this).index();
		$(this).attr("data-count",(i+1));	
	});
	
	//obj.controls.parent().first().addClass("on");
	//obj.move.find(">li:first").addClass("on");

	//control
	obj.prev.click(function() {					
		clearInterval(moving);
		
		if(obj.controls.parent().parent().is(":animated")) return false;
		
		var move = obj.find(">.controls >.pointer >ul >li:eq(1)").position().left; 
	
		obj.find(">.controls >.pointer >ul").css({"left":-move}).stop().animate({"left":0},300);
		obj.find(">.controls >.pointer >ul >li:last").prependTo(obj.find(">.controls >.pointer >ul"));	
		
		
		
		if($(this).parent().hasClass("on")) {
			return false;
		} else {
			obj.controls.not($(this)).parent().removeClass("on");
			obj.find(">.controls >.pointer >ul >li:eq(3)").addClass("on");

			var idx = obj.find(">.controls >.pointer >ul >li.on").attr("data-count")-1;
			
			obj.move.find(">li").removeClass("on");	
			obj.move.find(">li:eq("+idx+")").addClass("on");
				
		}
		
			
		
		return false;
	});	
	obj.next.click(function() {		
		clearInterval(moving);
		
		
		if(obj.controls.parent().parent().is(":animated")) return false;
		
		var move = obj.find(">.controls >.pointer >ul >li:eq(1)").position().left; 

		obj.find(">.controls >.pointer >ul").stop().animate({"left": -move},300,function(){
			obj.find(">.controls >.pointer >ul >li:first").appendTo(obj.find(">.controls >.pointer >ul"));		
			$(this).css({"left":0});
		});
		
		
		
		if($(this).parent().hasClass("on")) {
			return false;
		} else {
			obj.controls.not($(this)).parent().removeClass("on");
			obj.find(">.controls >.pointer >ul >li:eq(4)").addClass("on");

			var idx = obj.find(">.controls >.pointer >ul >li.on").attr("data-count")-1;
			
			obj.move.find(">li").removeClass("on");	
			obj.move.find(">li:eq("+idx+")").addClass("on");
				
		}
		
		
		
		return false;
		
	});
	obj.controls.click(function() {
		clearInterval(moving);
		
		
		if(obj.controls.parent().parent().is(":animated")) return false;
		
		
		if($(this).parent().hasClass("on")) {
			return false;
		} else {
			obj.controls.not($(this)).parent().removeClass("on");
			$(this).parent().addClass("on");
			
			var idx = $(this).parent().attr("data-count")-1;
		
			obj.move.find(">li").removeClass("on");	
			obj.move.find(">li:eq("+idx+")").addClass("on");	
		}
		
		return false;
	});
	
	auto(obj);
}
function auto(obj){
	clearInterval(moving);
	moving = setInterval(function(){
		if(obj.move.find(">li").is(":animated")) return false;
		
		var move = obj.find(">.controls >.pointer >ul >li:eq(1)").position().left; 

		obj.find(">.controls >.pointer >ul").stop().animate({"left": -move},300,function(){
			obj.find(">.controls >.pointer >ul >li:first").appendTo(obj.find(">.controls >.pointer >ul"));		
			$(this).css({"left":0});
		});
		
		
		
		if($(this).parent().hasClass("on")) {
			return false;
		} else {
			obj.controls.not($(this)).parent().removeClass("on");
			obj.find(">.controls >.pointer >ul >li:eq(4)").addClass("on");

			var idx = obj.find(">.controls >.pointer >ul >li.on").attr("data-count")-1;
			
			obj.move.find(">li").removeClass("on");	
			obj.move.find(">li:eq("+idx+")").addClass("on");
				
		}
		
		
		
		return false;	
	},4000);
}




function resize(obj){
	var win = $(document).width();
	var size = obj.controls.parent().parent().parent().width();

	if(win > 1280){
		obj.controls.parent().width(size/7);
	} else if (win <= 1280 && win > 840){
		obj.controls.parent().width(size/5);	
	} else if (win <= 840 && win > 480){
		obj.controls.parent().width(size/3);	
	}
}
*/





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
		
		t.on("mouseleave",function() {
			//if($(this).find(">ul").is(":animated")) return false;
			
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
	
	$(".btn_share").click(function() {
		$(this).toggleClass("on");
		$(this).siblings(".sns").toggleClass("on");

		return false;
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

	API map

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#map").size() != 0){
		//map_AC();
	}
});
function map_AC(){
	var obj = $("#map");
	var map_div = '';
	
	for(var i = 0; i < obj.size(); i++){
		obj.vals = $.trim(obj.eq(i).text()).split("/");
		obj.codes = obj.vals[0];
		obj.keys = obj.vals[1];
	
		map_div = '<div id="daumRoughmapContainer'+obj.codes+'" class="root_daum_roughmap root_daum_roughmap_landing" style="width:100%;"></div>';
	
		obj.eq(i).empty().html(map_div);
	
		new daum.roughmap.Lander({
			"timestamp" : obj.codes,
			"key" : obj.keys
		}).render();
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	product_js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".product").size() != 0){
		product_js ();
	}
});
function product_js (){
	var obj = $(".product");	
		obj.list = obj.find("ul >li >a");
		obj.modal = obj.find(".modal");
		obj.modal.title = obj.modal.find(".name");
		obj.modal.photo = obj.modal.find(".photo"); 
		obj.modal.close_ = obj.find(".btn_close");
		
	obj.list.click(function() {
		var t = $(this).find(">.name").text();
		var i = $(this).find(">.b_photo").clone(false);
		
		//$(this).addClass("on");
		obj.modal.title.text(t);
		i.appendTo(obj.modal.photo);
		obj.modal.fadeIn(200).focus();
		
		return false;
	});	
	obj.modal.close_.click(function() {
		obj.modal.fadeOut(200,function(){
			obj.modal.photo.find(">img").remove();	
			//obj.list.parent().find(">a.on").focus();
			//obj.list.removeClass("on");
		});
		
		return false;
	});	
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

sitemap Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($("#sitemap").size() != 0){
		$("#gnb >ul").clone(false).appendTo($("#sitemap"));
	}
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

scroll check Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
var _scrollAC = {
    set:function(str){
        var obj = str;
            obj.box = obj.find('>[data-scroll-ac^="box-"]');
        var __controll;

        __controll = {
            scroll:function(){
                var wt = $(window).scrollTop() + $(window).innerHeight();
                for(var i=0; i<obj.box.length; i++){
                    var y = wt - obj.box.eq(i).offset().top;
					var _y = $(window).scrollTop() - obj.box.eq(i).offset().top;
                    var h = obj.box.eq(i).innerHeight();
                    var per = ~~(y / h * 100);
					if(per > 100) per = 100;

					var a = ~~(per/10);
					var b = (a === 0 && _y < 0) ? 0:per;
                    obj.box.eq(i).attr("data-per",a);
                    obj.box.eq(i).attr("data-per-num",b);
                }

				if(($('[data-scroll-ac="box-3"]').attr('data-per')==="8" && $('[data-scroll-ac="box-3"]').attr('data-per-num')==="85") || 
				($('[data-scroll-ac="box-3"]').attr('data-per')==="-6" && $('[data-scroll-ac="box-3"]').attr('data-per-num')==="-66")){
					for(var i=0; i<$('[data-scroll-ac="box-3"] [data-skin="count"]').size(); i++){
						__countdown.set($('[data-scroll-ac="box-3"] [data-skin="count"]').eq(i));//숫자 카운트
					}
				}
            }
        }
        __controll.scroll();

        $(window).on("scroll",function(){__controll.scroll();});
    },
    init:function(){
        if($('[data-scroll-ac="wrap"]').length !== 0){
            this.set($('[data-scroll-ac="wrap"]'));
        }
    }
}
$(function(){
    _scrollAC.init();

	var tt = "";
	for(var i=0; i<101; i++){
		tt += '[data-scroll-ac="box-8"][data-per-num="'+i+'"]>div::before{width:'+i+'%;}';
	}
	console.log(tt)
});

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   숫자 카운트

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	// __countdown.init();//숫자 카운트
});
var __countdown = {
	set:function(str){
		var max= str.attr("data-max");//value
		var min= str.attr("data-min");//value
		var jum = "";
		// var speeds = (max-min)*10;//숫자에 따른 속도 진행
		var speeds = 2000;//2초간 진행

		if(max == "" || max == undefined) max = 0;

		if(max.indexOf(".") != -1){
			max = max+"";
			jum = max.split(".");
			jum = "."+jum[1];
		}
		
		max = max.replace(",","");
	
		$({ val : min }).animate({ val : max }, {
			duration: speeds,
			step: function() {
				var num = commas(Math.floor(this.val));
				str.text(num+jum);
			},
			complete: function() {
				var num = commas(Math.floor(this.val));
				str.text(num+jum);
			}
		});
		function commas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}
	},
	init:function(){
		for(var i=0; i<$('[data-skin="count"]').size(); i++){
			this.set($('[data-skin="count"]').eq(i));
		}
	}
>>>>>>> fd0312e1 (asd)
}