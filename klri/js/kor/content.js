/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Top Menu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function Tmenu_setting(){
}
$(document).ready(function(){
	Tmenu_setting_new();

	// Tmenu.view(3);
});

function Tmenu(){
	return{
		view:function(idx){
			var gnb = $("#gnb>ul");
			gnb.a = gnb.find(">li>a");
			var box = gnb.find(">li").eq(idx);
			
			$("body").addClass("header");
			box.siblings("li").removeClass("on");
			box.addClass("on");
			var h = box.find(">ul").innerHeight() + gnb.find(">li").eq(idx).find(">a").innerHeight();
	
			gnb.css({"height":h+"px"});
		}
	}
}
var Tmenu = Tmenu();

function Tmenu_setting_new(codes){
	var obj = $("#header");
	var Tmenu = $("#gnb>ul");
		Tmenu.a = Tmenu.find(">li>a");
	//사이트맵 or 좌측메뉴 데이터 바인딩
	var slide_text = "한국법제연구원";


	$('<div id="slide_map"><strong class="slide_map_titles">전체메뉴보기<span>'+slide_text+'</span></strong><div class="binds"></div></div>').prependTo($("#wrap"));
	Tmenu.clone(false).appendTo($("#slide_map > .binds"));
	for(var r=0; r<$("#slide_map > .binds>ul>li").size(); r++){
		var lis = $("#slide_map > .binds>ul>li").eq(r);
		lis.addClass("line_"+(r+1));
		if(lis.find(">ul").size() != 0){
			lis.addClass("child");
			for(var i=0; i<lis.find(">ul>li").size(); i++){
				var lis2 = lis.find(">ul>li").eq(i);
				if(lis2.find(">ul").size() != 0){
					lis2.addClass("child");
				}
			}
		}
	}
	
	//하단
	$('<div class="map_foot"></div>').insertAfter($("#slide_map .binds"));
	$("#header .btn_link > ul").clone(false).appendTo($("#slide_map .map_foot"));

	$('<div class="map_sns"><strong>SNS</strong><ul></ul></div>').insertAfter($("#slide_map .map_foot"));
	$("#slide_map .map_foot > ul >li[class*='icon_']").appendTo($("#slide_map .map_sns > ul"));

	$("#slide_map > .binds > ul > li > ul > li > ul > li > ul").remove();
	
	Tmenu.find(" li").removeAttr("class");

	function _set(idx){
		var box = Tmenu.find(">li").eq(idx);
// 		var h = box.find(">ul").innerHeight() + Tmenu.find(">li").eq(idx).find(">a").innerHeight();
// console.log(box.find(">ul").innerHeight());
// 		box.siblings("li").removeClass("on");
// 		box.addClass("on");
// 		Tmenu.css({"height":h+"px"});

		var gnb = $("#gnb>ul");
		gnb.a = gnb.find(">li>a");
		var box = gnb.find(">li").eq(idx);

		$("body").addClass("header");
		box.siblings("li").removeClass("on");
		box.addClass("on");
		var h = box.find(">ul").innerHeight() + gnb.find(">li").eq(idx).find(">a").innerHeight();

		gnb.css({"height":h+"px"});
	}

	function _def(){
		Tmenu.find(">li.on").removeClass("on");
		Tmenu.css({"height":"45px"});
	}
	
    /*2021.07.15 접근성 수정 focus 추가*/
	Tmenu.a.on("mouseover focus",function(){
		if(!$("body").hasClass("header") && !$("body").hasClass("search")){
			$("body").addClass("header");
		}
		var idx = Tmenu.find(">li").index($(this).parent());
		_set(idx);
	});

    /*2021.07.15 접근성 수정 focus 추가*/
	obj.on("mouseleave focus",function(){
		if($("body").hasClass("header")){
			$("body").removeClass("header");
		}
		_def();
	});

	$(".btn_menu_all, #lnb a, #visual .searchs .sear .selects strong a").focus(function(){
		if($("body").hasClass("header")){
			$("body").removeClass("header");
		}
		_def();
	});

	

	//접근성때문에 추가 2020.08.07
	//$('<span class="hidden">미래혁신과 국민행복을 추구하는 글로벌 입법 연구 플랫폼</span>').prependTo($("#gnb"));



	// var objm = $("#slide_map .binds");
	// 	objm.a = objm.find(" a");

	// objm.find(">ul>li:eq(0)>a").addClass("on");
	// objm.find(">ul>li:eq(0)>ul").show();
	
	// objm.a.click(function(){
	// 	if($(this).siblings("ul").size() != 0){
	// 		if($(this).siblings("ul").is(":hidden")){
	// 			$(this).parent().siblings("li").find(">ul").stop().slideUp(200);
	// 			$(this).parent().siblings("li").find(">a").removeClass("on");

	// 			$(this).siblings("ul").stop().slideDown(200);
	// 			$(this).addClass("on");
	// 		}
	// 		return false;
	// 	} else {
	// 		return true;
	// 	}
	// });


	//메뉴 변경전
	var objm = $("#slide_map .binds");
		objm.a = objm.find(" a");

	
	objm.a.click(function(){
		if($(this).siblings("ul").size() != 0){
			if($(this).siblings("ul").is(":hidden")){
				$(this).siblings("ul").stop().slideDown(200);
				$(this).addClass("on");
			} else {
				$(this).siblings("ul").stop().slideUp(200);
				$(this).removeClass("on");
			}
			return false;
		} else {
			return true;
		}
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	전체메뉴 클릭시 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	menu_all_AC();
});

function menu_all_AC(){
	var btn = $(".btn_menu_all");
	var btn_close = $(".btn_menu_all_close");

	btn.click(function(e){
		if(!$("body").hasClass("pc")){
			e.preventDefault();
			if(!$("body").hasClass("gnb")){
				$("body").removeClass("search").addClass("gnb");
				$("#slide_map>.binds>ul>li:eq(0)>a").addClass("on");
				$("#slide_map>.binds>ul>li:eq(0)>ul").show();
			}
			return false;
		} else {
			return true;
		}
	});

	btn_close.click(function(){
		if($("body").hasClass("gnb")) $("body").removeClass("gnb");
		if($("body").hasClass("search")) $("body").removeClass("search");
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	검색 클릭시 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	search_all_AC();
});

function search_all_AC(){
	var btn = $(".btn_search");
	var btn_close = $("#header .search_form .btn_close");

	btn.click(function(){
		if(!$("body").hasClass("search")) $("body").removeClass("search header gnb").addClass("search");
		return false;
	});

	btn_close.click(function(){
		if($("body").hasClass("search")){
			$("body").removeClass("search");
			btn.focus();
		}
		return false;
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

	main visual Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".main_visual").size() != 0){
		main_visual_AC();
	}
});

function main_visual_AC(){
	var vi = $(".main_visual");
	vi.ul = vi.find(">.move>ul");
	vi.li = vi.ul.find(">li");
	vi.cont = vi.find(" .controll > .btn_group");
	vi.nums = 0;
	vi.autos = "Y";
	vi.saveTime = "";
	vi.speeds = 6000;

	if(vi.li.size() < 2){
		if(vi.li.size() == 1) vi.li.eq(0).addClass("on");
		vi.cont.remove();
		return false;
	}

	vi.cont.find(">.num").remove();
	for(var i=vi.li.size(); i>0; i--){
		$('<a href="#" class="num">'+i+'</a>').prependTo(vi.cont);
	}

	vi.btn_num = vi.cont.find(">.num");
	vi.btn_stop = vi.cont.find(">.btn_stop");
	vi.btn_play = vi.cont.find(">.btn_play");

	//초기화
	vi.btn_num.removeClass("on");
	vi.btn_num.eq(0).addClass("on");
	vi.li.removeClass("on");
	vi.li.eq(0).addClass("on");

	function fn_move(str){
		var olds = vi.ul.find(">li.on");
		var news = vi.ul.find(">li").eq(str);

		if(olds.is(":animated")) return false;

		vi.btn_num.removeClass("on");
		vi.btn_num.eq(str).addClass("on");

		olds.css({"opacity":"1","left":"0","z-index":"0"}).animate({"left":"-50px","opacity":"0"},500);
		news.css({"opacity":"0","left":"50px","z-index":"1"}).animate({"left":"0px","opacity":"1"},500,function(){
			vi.li.removeClass("on");
			news.addClass("on");
			vi.nums = str;
			if(vi.autos == "Y"){
				vi.btn_play.click();
			}
		});
	}

	vi.btn_num.click(function(){
		var idx = vi.btn_num.index($(this));
		if(vi.ul.find(">li.on").is(":animated")) return false;
		vi.btn_stop.click();
		fn_move(idx);
		return false;
	});

	vi.btn_play.click(function(){
		var idx = vi.nums+1;
		if(idx > vi.li.size()-1) idx = 0;

		vi.autos = "Y";
		vi.btn_stop.show();
		vi.btn_play.hide();
		clearTimeout(vi.saveTime);

		vi.saveTime = setTimeout(function(){
			fn_move(idx);
		},vi.speeds);
		return false;
	});

	vi.btn_stop.click(function(){
		vi.btn_stop.hide();
		vi.btn_play.show();
		vi.autos = "N";
		clearTimeout(vi.saveTime);
		return false;
	});

	if(vi.autos == "Y"){
		vi.btn_play.click();
	} else {
		vi.btn_stop.click();
	}
}






/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function() {
	if($("#main.user").size() != 0){
		visual_search_AC(); //메인 비주얼영역 통합검색
		visual_popup_AC(); //메인 비주얼영약 팝업존
		visual_slide_AC(); //메인 비주얼영약 slide
		box_1_AC(); //발간물
		box_4_AC(); //공지사항 & 보도자료
		box_5_AC(); //공지사항 & 보도자료
		box_6_AC(); //팝업존
	}
});

function visual_slide_AC(){
	$('<div class="controll"></div>').prependTo($("#visual .slide"));
	for(var i=0; i<$("#visual .slide>.move>ul>li").size(); i++){
		$('<a href="#"><span>'+(i+1)+'</span></a>').appendTo($("#visual .slide>.controll"));
	}
	$('<a href="#" class="btn-play"><span>재생</span></a><a href="#" class="btn-stop"><span>정지</span></a>').appendTo($("#visual .slide>.controll"));
	var obj = $("#visual .slide");
		obj.li = obj.find(">.move>ul>li")
		obj.simbol = obj.find(" .controll>a:not([class*='btn-'])");
		obj.btnPlay = obj.find(" .controll>a.btn-play");
		obj.btnStop = obj.find(" .controll>a.btn-stop");
		obj.autos = "Y";
		obj.saveTime = "";
		obj.saveTimeSpeed = 8000;
		obj.cnt = 0;

	var __controll = {
		li:function(idx){
			obj.li.removeClass("on");
			obj.li.eq(idx).addClass("on");
			obj.cnt = idx;

			if(obj.autos==="Y"){
				this.plays();
			}
		},
		simbol:function(_this){
			clearTimeout(obj.saveTime);
			var idx = obj.simbol.index(_this);
			obj.simbol.removeClass("on");
			_this.addClass("on");
			this.li(idx);
		},
		plays:function(){
			obj.saveTime = setTimeout(function(){
				var c = (obj.cnt+1 > obj.li.size()-1) ? 0:obj.cnt+1;
				obj.cnt = c;
				__controll.simbol(obj.simbol.eq(obj.cnt));
			},obj.saveTimeSpeed);
		},
		play:function(){
			obj.autos = "Y";
			obj.btnPlay.hide();
			obj.btnStop.show();
			this.plays();
		},
		stop:function(){
			obj.autos = "N";
			obj.btnPlay.show();
			obj.btnStop.hide();
			clearTimeout(obj.saveTime);
		},
		init:function(){
			__controll.simbol(obj.simbol.eq(obj.cnt));
			obj.simbol.on("click",function(){__controll.simbol($(this));return false;});
			obj.btnPlay.on("click",function(){__controll.play();return false;});
			obj.btnStop.on("click",function(){__controll.stop();return false;});

			if(obj.autos==="Y"){
				this.play();
			}
		}
	}
	__controll.init();
}

function visual_search_AC(){
	var obj = $("#visual");
		obj.se = obj.find(".sear .selects");
		obj.valsbox = obj.se.find(" input.se_val");
		obj.se.btn = obj.se.find(">strong>a");
		obj.se.textbtn = obj.se.find(">.lists ul>li>a");

	//검색 셀렉트
	obj.se.btn.click(function(){
		if(obj.se.hasClass("on")) obj.se.removeClass("on");
		else obj.se.addClass("on");
		return false;
	});

	obj.se.textbtn.click(function(){
		var vals = $(this).attr("href").replace("#","");
		obj.valsbox.val(vals);
		obj.se.removeClass("on");
		obj.se.btn.text($(this).text());
		return false;
	});
}

function visual_popup_AC(){
	var obj = $("#visual #pops");
		obj.btnHead = obj.find(" .head>a");
		obj.moves = obj.find(" .move > ul");
		obj.li = obj.moves.find(">li");

	obj.btnHead.on("click",function(){
		var c = (obj.attr("data-sw")==="on")?"off":"on"; 
		obj.attr("data-sw",c);
		return false;
	});

	if(obj.li.size() < 1){
		obj.remove();
		return false;
	}

	obj.btnHead.trigger("click");

	if(obj.li.size() < 2){
		fn_count(1);
		return false;
	}
	$('<div class="controll">\
		<span class="simbol">\
		</span>\
		<a href="#" class="btn_play">재생</a>\
		<a href="#" class="btn_stop">정지</a>\
	   </div>').appendTo(obj.find(" .midd"));
	for(var i=0; i<obj.li.size(); i++){
		$('<a href="#">'+(i+1)+'번</a>').prependTo(obj.find(" .controll .simbol"));
	}
		obj.btn_play = obj.find(" .controll .btn_play");
		obj.btn_stop = obj.find(" .controll .btn_stop");
		obj.btn_simbol = obj.find(" .controll .simbol a");
		obj.autos = "Y";
		obj.saveTime = "";
		obj.speeds = 5000;

	function fn_count(idx){
		obj.removeAttr("class").addClass("step_"+idx);
		if(obj.autos == "Y"){
			obj.btn_play.click();
		}
	}
	fn_count(1);

	function fn_play(){
		fn_stop();
		obj.saveTime = setTimeout(function(){
			var idx = parseInt(obj.attr("class").replace("step_",""))+1;
			if(idx > obj.li.size()) idx = 1;
			fn_count(idx);
		},obj.speeds);
	}
	function fn_stop(){
		clearTimeout(obj.saveTime);
	}

	obj.btn_simbol.click(function(){
		var idx = obj.btn_simbol.index($(this)) + 1;
		fn_count(idx);
		return false;
	});

	obj.btn_play.click(function(){
		obj.autos = "Y";
		obj.btn_play.hide();
		obj.btn_stop.show();
		fn_play();
		return false;
	});

	obj.btn_stop.click(function(){
		obj.autos = "N";
		obj.btn_stop.hide();
		obj.btn_play.show();
		fn_stop();
		return false;
	});
	if(obj.autos == "Y"){
		obj.btn_play.click();
	}

	/*2021.07.15 접근성 수정*/
	obj.li.find(">a").on("focus",function(){
		obj.btn_stop.click();
		obj.removeAttr("class").addClass("step_"+($(this).parent().index() +1));
	});
}

function box_1_AC(){
	var obj = $("#box_1");
		obj.btn = obj.find(">ul>li>strong>a");

	function fn_count(idx){
		obj.removeAttr("class").addClass("step_"+idx);
	}
	fn_count(1);
	obj.btn.click(function(){
		var idx = obj.btn.index($(this))+1;
		fn_count(idx);
		return false;
	});
}

function box_4_AC(){
	var obj = $("#box_4");
		obj.btn = obj.find(" .titles>a");

	function fn_count(idx){
		obj.removeAttr("class").addClass("step_"+idx);
	}
	fn_count(1);
	obj.btn.click(function(){
		var idx = obj.btn.index($(this))+1;
		fn_count(idx);
		return false;
	});
}

function box_5_AC(){
	var obj = $("#box_5");
		obj.btn = obj.find(" .titles>a");

	function fn_count(idx){
		obj.removeAttr("class").addClass("step_"+idx);
	}
	fn_count(1);
	obj.btn.click(function(){
		var idx = obj.btn.index($(this))+1;
		fn_count(idx);
		return false;
	});
}

function box_6_AC(){
	var obj = $("#box_6 #popupzone");
		obj.moves = obj.find(" .move > ul");
		obj.li = obj.moves.find(">li");

	if(obj.li.size() < 2){
		fn_count(1);
		return false;
	}
	$('<div class="controll">\
		<a href="#" class="btn_play">재생</a>\
		<a href="#" class="btn_stop">정지</a>\
		<span class="simbol">\
		</span>\
	   </div>').appendTo(obj);
	for(var i=0; i<obj.li.size(); i++){
		$('<a href="#">'+(i+1)+'번</a>').prependTo(obj.find(" .controll .simbol"));
	}
		obj.btn_play = obj.find(" .controll .btn_play");
		obj.btn_stop = obj.find(" .controll .btn_stop");
		obj.btn_simbol = obj.find(" .controll .simbol a");
		obj.autos = "Y";
		obj.saveTime = "";
		obj.speeds = 5000;

	function fn_count(idx){
		obj.removeAttr("class").addClass("step_"+idx);
		if(obj.autos == "Y"){
			obj.btn_play.click();
		}
	}
	fn_count(1);

	function fn_play(){
		fn_stop();
		obj.saveTime = setTimeout(function(){
			var idx = parseInt(obj.attr("class").replace("step_",""))+1;
			if(idx > obj.li.size()) idx = 1;
			fn_count(idx);
		},obj.speeds);
	}
	function fn_stop(){
		clearTimeout(obj.saveTime);
	}

	obj.btn_simbol.click(function(){
		var idx = obj.btn_simbol.index($(this)) + 1;
		fn_count(idx);
		return false;
	});

	obj.btn_play.click(function(){
		obj.autos = "Y";
		obj.btn_play.hide();
		obj.btn_stop.show();
		fn_play();
		return false;
	});

	obj.btn_stop.click(function(){
		obj.autos = "N";
		obj.btn_stop.hide();
		obj.btn_play.show();
		fn_stop();
		return false;
	});
	if(obj.autos == "Y"){
		obj.btn_play.click();
	}

	/*2021.07.15 접근성 수정*/
	obj.li.find(">a").on("focus",function(){
		obj.btn_stop.click();
		obj.removeAttr("class").addClass("step_"+($(this).parent().index() +1));
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	main visual Function

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
        this.timer = setTimeout(function() { self.counter(str); }, 20);
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
        this.timer = setTimeout(function() { self.counterM(str); }, 20);
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

	sub quicks Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	quicks_AC();
});
function quicks_AC(){
	var obj = $(".quicks");
		obj.btn = obj.find(" .head > a");

	obj.btn.click(function(){
		if(obj.hasClass("on")) obj.removeClass("on");
		else obj.addClass("on");
		return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	sub menu select Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".user#sub").size() != 0){
		js_menu_select_menuset_AC();
	}
});
function js_menu_select_menuset_AC(){
	var obj = $(".js_menu_select:last");

	obj.clone(false).removeAttr("class").addClass("menu").attr("id","cnb").insertAfter($("#path"));
	
	var menu = $(".menu#cnb");

	menu.find(">strong>a").attr("href","#").text("메뉴보기");

	menu.find(">strong>a").click(function(){
		if(menu.hasClass("on")) menu.removeClass("on");
		else menu.addClass("on");
		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	infos_data Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".user#sub").size() != 0){
		for(var i=0; i<$(".infos_data").size(); i++){
			infos_data_AC($(".infos_data").eq(i));
		}
	}
});
function infos_data_AC(str){
	var obj = str;
		obj.li = obj.find(">.tabs>ul>li");
		obj.btn = obj.li.find(">a");
		obj.box = obj.find(" .views");
		
	function fn_play(str){
		obj.li.removeClass("on").eq(str).addClass("on");
		obj.box.hide().eq(str).stop().show();
	}
	fn_play(0);

	obj.btn.click(function(){
		var idx = obj.btn.parent().index($(this).parent());
		fn_play(idx);
		return false;
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	rss Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".btn.rss").size() != 0){
		btn_rss_AC();
	}
});

function btn_rss_AC(){
	var btn = $(".btn.rss");
	
	btn.click(function(){
		copy_trackback($(this).attr("href"));
		console.log("값 : "+$(this).attr("href"));
		return false;
	});
}
function copy_trackback(trb) {
	var IE=(document.all)?true:false;
	var e = event;
	if(IE){
		console.log("confirm");
		if(confirm("이 글의 트랙백 주소를 클립보드에 복사하시겠습니까?")){
			if(e.clipboardData){
				e.clipboardData.setData("text/plain", trb);
			} else {
				window.clipboardData.setData("Text", trb);
			}
		}
	} else {
		console.log("prompt");
		temp = prompt("이 글의 트랙백 주소입니다. Ctrl+C를 눌러 클립보드로 복사하세요", trb);
	}
}







/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	exchange_tab Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#exchange_tab").size() != 0){
		exchange_tab_AC();
	}
});

function exchange_tab_AC(){
	var obj = $("#exchange_tab");
		obj.btn = obj.find(">ul>li>a");
	var viewbox = obj.find(" [id*='exchange_view_']");
	
	//set
	/*
	var setVal = "";
	var temp = 0;
	for(var i=0; i<viewbox.size(); i++){
		setVal += "<div id=\"exchange_view_"+(i+1)+"\">"+viewbox.eq(i).html()+"</div>";
		viewbox.eq(i).remove();
		if((i+1)%3==0 && i != 0 || i==viewbox.size()-1){
			$(setVal).insertAfter(obj.find(">ul").eq(temp));
			setVal = "";
			temp++;
		}
	}
	*/
	
	viewbox = obj.find(" [id*='exchange_view_']");
	viewbox.btn_close = viewbox.find(" .btn_close");
	
	//초기
	obj.find(">ul>li").eq(0).addClass("on");
	$("#"+obj.find(">ul>li:eq(0)>a").attr("href").replace("#","")).stop().show();

	obj.btn.click(function(){
		var boxid = $("#"+$(this).attr("href").replace("#",""));

		obj.find(">ul>li.on").removeClass("on");
		viewbox.stop().hide();
		$(this).parent().addClass("on");
		boxid.stop().show();
		return false;
	});
	
	viewbox.btn_close.click(function(){
		$(this).parent().hide();
		obj.find(">ul>li.on").removeClass("on");
		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	사이트맵 바인딩 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#con_sitemap").size() != 0){
		con_sitemap_AC();
	}
});

function con_sitemap_AC(){
	$("#gnb.js_menu>ul").clone(false).appendTo($("#con_sitemap .codein"));
	var obj = $("#con_sitemap .codein");
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	연혁 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#con_history").size() != 0){
		con_history_AC();
	}
});

function con_history_AC(){
	var obj = $("#con_history");
		obj.sc = obj.find(" .midd");
		obj.btn = obj.find(" .history_tab>ul>li>a");

	obj.find(" .midd").mCustomScrollbar({
		autoHideScrollbar:true,
		theme:"light-thin",
		scrollInertia:350,
		callbacks:{
		    whileScrolling:function(){
		    	var t = parseInt(obj.sc.find(" .mCSB_container").css("top")) * -1;
		    	var set_t = obj.sc.find(" .lis:eq(1)").position().top;
		    	if(t >= set_t){
		    		if(!obj.hasClass("step_02")) obj.removeClass("step_01").addClass("step_02");
		  		} else {
		  			if(!obj.hasClass("step_01")) obj.removeClass("step_02").addClass("step_01");
		  		}
		    }
		}
	});


	obj.btn.click(function(){
		var idx = obj.btn.parent().index($(this).parent());
		var tp = 0;
		if(idx != 0) tp = obj.sc.find(" .lis:eq(1)").position().top+2;
		obj.find(" .midd").mCustomScrollbar("scrollTo",tp);
		return false;
	});

}






/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	개인정보보호정책 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
var con_udata_AC = {
	set:function(str){
		var obj = str;
			obj.btn = obj.find(" .udata>ul>li>.head>a");

		var controll = {
			on:function(str){
				str.addClass("on");
			},
			off:function(str){
				str.removeClass("on");
			}
		}
	
		obj.btn.click(function(){
			var hit = $(this).parent().parent();
			if(hit.hasClass("on")){
				controll.off(hit);
			} else {
				controll.on(hit);
                $(this).focus();
			}
			return false;
		});
	},
	target:function(idx){
        var li = $("#con_udata .udata>ul>li:eq("+(idx-1)+")");
		var b = li.find(">.head>a");
		var t = b.position().top;
		b.trigger("click");

        
		$("html, body").animate({"scrollTop":t+"px"},500);
	},
	init:function(){
		for(var i=0; i<$("#con_udata").length; i++){
			this.set($("#con_udata").eq(i));
		}
	}
}
var __userData = {
	set:function(str){
		var obj = str;
			obj.btn = obj.find(">.midd>.head>ul a");
			obj.btnClose = obj.find(">.midd>.midd>ul>li .close");
			obj.box = obj.find(">.midd>.midd>ul>li");
		var controll;

		controll = {
			tabChange:function(idx){
				obj.find(">.midd>.head>ul>li>strong>a").unwrap().wrap($('<span />'));
				obj.find(">.midd>.head>ul>li:eq("+idx+") a").unwrap().wrap($('<strong />'));
			},
			on:function(str){
				var idx = obj.btn.index(str);
				obj.attr("data-page",idx+1);

				this.tabChange(idx);
			},
			off:function(){
				obj.removeAttr("data-page");
				obj.find(">.midd>.head>ul>li>strong>a").unwrap().wrap($('<span />'));
			},
			init:function(){
				if($(window).width() <= 900){
					if(obj.attr("data-page")){
						controll.off();
					}
				} else {
					if(!obj.attr("data-page")){
						controll.on(obj.btn.eq(0));
					}
				}
			}
		}
		controll.init();

		obj.btn.on("click",function(){controll.on($(this));return false;});
		obj.btnClose.on("click",function(){controll.off();return false;});

		$(window).on("resize",function(){controll.init();});
	},
	init:function(){
		for(var i=0; i<$(".databox").length; i++){
			this.set($(".databox").eq(i));
		}
	}
}
$(function(){
    con_udata_AC.init();
    __userData.init();
});




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	개인정보보호정책 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#con_related").size() != 0){
		setTimeout(function(){con_related_AC()},500);
	}
});

function con_related_AC(){
	var obj = $("#con_related .tab_view");
	var maxH = 0;
	var saveRoll = "";

	obj.show();
	function roll(){
		for(var i=0; i<obj.size(); i++){
			maxH = 0;
			var ob = obj.eq(i).find(" > ul > li");
			ob.find(">a").removeAttr("style");
			if(ob.parent().hasClass("type_02")){
				for(var t=0; t<ob.size(); t++){
					maxH = Math.max(maxH,ob.eq(t).find(">a").innerHeight());
					if((t+1)%3==0 && t!=0){
						ob.eq(t).find(">a").height(maxH);
						ob.eq(t-1).find(">a").height(maxH);
						ob.eq(t-2).find(">a").height(maxH);
						maxH = 0;
					}
					if(t == ob.size()-1 && (t+1)%3!=0){
						var nm = ob.size()%3;
						for(var r=t; r>t-nm; r--){
							ob.eq(r).find(">a").height(maxH);
						}
						maxH = 0;
					}
				}
			} else if(ob.parent().hasClass("type_03")){
				for(var t=0; t<ob.size(); t++){
					maxH = Math.max(maxH,ob.eq(t).find(">a").innerHeight());
					if((t+1)%2==0 && t!=0){
						ob.eq(t).find(">a").height(maxH);
						ob.eq(t-1).find(">a").height(maxH);
						maxH = 0;
					}
					if(t == ob.size()-1 && (t+1)%2!=0){
						var nm = ob.size()%2;
						for(var r=t; r>t-nm; r--){
							ob.eq(r).find(">a").height(maxH);
						}
						maxH = 0;
					}
				}
			}
		}
	}
	roll();
	$(window).resize(function(){
		clearTimeout(saveRoll);
		saveRoll = setTimeout(function(){roll()},500);
	});
	obj.hide().eq(0).show();
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	탑 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".top_icon").size() != 0){
		top_icon_AC();
	}
});

function top_icon_AC(){
	var obj = $(".top_icon");

	function fn_scroll(){
		var t = $(window).scrollTop();
		var b = $("#wrap").innerHeight() - ($(window).scrollTop() + $(window).height());
		var bset = $("#footer").innerHeight();
		bset = bset-45;

		if(t<50){
			if(!obj.hasClass("off")) obj.addClass("off");
		} else {
			if(obj.hasClass("off")) obj.removeClass("off");
		}

		if(b<=bset){
			if(!obj.hasClass("fix")) obj.addClass("fix");
		} else {
			if(obj.hasClass("fix")) obj.removeClass("fix");
		}
	}

	$(window).scroll(function(){
		fn_scroll();
	});
	fn_scroll();

	obj.click(function(){
		$("html, body").animate({"scrollTop":"0"},1000);
		return false;
	});
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	메인 비주얼 옆 퀵링크 Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#main.user #visual .quicks .head a").size() != 0){
		quicks_link_AC();
	}
});

function quicks_link_AC(){
    $("#main.user #visual .quicks .head a").on("focus",function(){
		$(this).css("border","2px solid black");
		$(this).keydown(function(event){
            if(event.keyCode == 9){
            	$(this).removeAttr("style");
            }
		});
	});
}






























