/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Top Menu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function Tmenu_setting(){
}
$(document).ready(function(){
	Tmenu_setting_new();
});
function Tmenu_setting_new(codes){
	var obj = $("#header");
	var Tmenu = $("#gnb>ul");
		Tmenu.a = Tmenu.find(" a");
	//사이트맵 or 좌측메뉴 데이터 바인딩
	var slide_text = "한국법제연구원";


	$('<div id="slide_map"><strong class="slide_map_titles">전체메뉴보기<span>'+slide_text+'</span></strong><div class="binds"></div></div>').prependTo($("#wrap"));
	Tmenu.clone(false).appendTo($("#slide_map > .binds"));
	for(var r=0; r<$("#slide_map > .binds>ul>li").size(); r++){
		$("#slide_map > .binds>ul>li").eq(r).addClass("line_"+(r+1));
	}

	$('<div class="map_head"></div>').insertBefore($("#slide_map .binds"));
	$("#header .btn_link > ul").clone(false).appendTo($("#slide_map .map_head"));
	
	//하단
	$('<div class="map_foot"></div>').insertAfter($("#slide_map .binds"));
	$("#sub.user #path .quicks").clone(false).appendTo($("#slide_map .map_foot"));

	$('<div class="map_sns"><strong>SNS</strong><ul></ul></div>').insertAfter($("#slide_map .map_foot"));
	$("#slide_map .map_head > ul >li[class*='icon_']").appendTo($("#slide_map .map_sns > ul"));

	
	Tmenu.find(" li").removeAttr("class");
	

	Tmenu.a.on("mouseover focus",function(){
		obj.addClass("on");
	});

	obj.on("mouseleave",function(){
		obj.removeClass("on");
	});

	$(".btn_menu_all, #lnb a").focus(function(){
		obj.removeClass("on");
	});



	var objm = $("#slide_map .binds");
		objm.a = objm.find(" a");

	objm.find(">ul>li>ul>li>ul").remove();//3뎁스제거
	objm.a.click(function(){
		if($(this).siblings("ul").size() != 0){
			if($(this).siblings("ul").is(":hidden")){
				$(this).siblings("ul").slideDown(200);
				$(this).addClass("on");
			} else {
				$(this).siblings("ul").slideUp(200);
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

	btn.click(function(){
		if(!$("body").hasClass("gnb")) $("body").addClass("gnb");
		return false;
	});

	btn_close.click(function(){
		if($("body").hasClass("gnb")) $("body").removeClass("gnb");
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
		box_1_AC(); //발간물
		box_4_AC(); //공지사항 & 보도자료
		box_6_AC(); //팝업존
	}
});

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
		obj.moves = obj.find(" .move > ul");
		obj.li = obj.moves.find(">li");

	if(obj.li.size() < 2){
		fn_count(1);
		return false;
	}
	$('<div class="controll">\
		<span class="simbol">\
		</span>\
		<a href="#" class="btn_play">재생</a>\
		<a href="#" class="btn_stop">정지</a>\
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

//js_menu_select


























