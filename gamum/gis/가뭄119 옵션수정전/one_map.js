function init(){
	Loca_On_AC();
	Location_AC();
	if($("#data_bx").size() !=0){data_tab_AC();}
	if($("[data-skin='slide']").size() !=0){Data_Slide_SET();}
	if($('a[data-popup]').size() != 0){dataPopup_AC();}
	if($("#options").size() != 0){Sel_Option_AC();}
	if($("#data_pop").size() != 0){Data_pop_AC();}
	Th_Change_AC();
	if($("#right_tools>.map_ctrl>.map_op").size() !=0){Map_Control();}
	if($("#step_bx").size() !=0){Stepbx_AC();}
	if($("#right_tools>.step_g").size() !=0){StepGraph_AC();}
	if($(".js_cal").size() !=0){
		setTimeout(function(){
		dataTime();
		},100);
	}
	
}





/*////////////////////////////////////////////////////////////////////////////////////////////////

	Map_menu
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
$(function() {
	menu_slide_AC();
});

function menu_slide_AC(){
	var obj = $("#header");
	var btn = $('[data-type="m_btn"]');

	function _Mswitch(){
		if(obj.attr("data-sw") == undefined){
			obj.attr("data-sw","check");
			$("#blind").fadeIn(200);
		} else{
			obj.removeAttr("data-sw");
			$("#blind").fadeOut(200);
		}
	}

	$("#blind").hide();
	btn.click(function() {
		_Mswitch();
		return false;
	});

	//반응형
	$(window).resize(function(){
		//모바일일때
		if(!$(".js_mobile_check").is(":hidden")){
			obj.removeAttr("data-sw");
			$("#blind").hide();
		}
	});
};


/*////////////////////////////////////////////////////////////////////////////////////////////////

	mob_header title
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
$(function(){
	mob_Head_T();
});

function mob_Head_T(){
	var btn = $("#gnb>ul>li>a");
	var tt = $("#mob_header>h3");

	btn.click(function(){
		var txt = $(this).text();
		tt.text(txt);

		return false;
	});
}



/*////////////////////////////////////////////////////////////////////////////////////////////////

	Now Location 현 위치
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Loca_On_AC(){
	$("#top_tools>.btn_loca").click(function(){
		$("#top_tools>.btn_loca").addClass("on");

		return false;
	});
	$("#top_tools>.btn_loca").clone(true).appendTo($("#mob_header"));
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Location 위치 선택하기
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Location_AC(){
	var obj = $("#top_tools:not(.cals)");
	var btn = $(".locations>a");
	var cc = $("#top_tools>.searchbx>.search_ccle");

	function _Open(){
		if(!$(".js_mobile_check").is(":hidden")){
			obj.show();
			$("#blind").show();
		}
	}
	function _Close(){
		if(!$(".js_mobile_check").is(":hidden")){
			obj.hide();
			$("#blind").hide();
		}
	}

	_Close();

	btn.click(function(){_Open(); return false;});
	cc.click(function(){_Close(); return false;});

	//반응형 리사이즈
	$(window).resize(function(){
		if(!$(".js_mobile_check").is(":hidden")){
			obj.hide();
		} else{
			obj.show();
		}
	});
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Data Tab
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function data_tab_AC(){
	var tabs = $("#data_bx>.tabs");
	var boxs = $("#data_bx>.tab_bx");
	var c_btn = $("#data_bx>.close");
	var i_btn = $("#data_bx>.info_btn");
	var cnt = 0;
	
	function _set(idx){
		var ids = tabs.find(">li:eq("+idx+")>a").attr("href").replace("#","");
		boxs.removeClass("on");
		$("#"+ids).addClass("on");

		tabs.find(">li.on").removeClass("on");
		tabs.find(">li:eq("+idx+")").addClass("on");
		c_btn.show();
		boxs.parent().addClass("full");

		cnt = idx;
	}

	function _close(){
		tabs.find(">li").removeClass("on");
		boxs.removeClass("on");
		c_btn.hide();
		boxs.parent().removeClass("full");
	}

	function _Bottom(){
		if(!boxs.hasClass("on")){
			boxs.parent().css("bottom","0");
		} else{
			boxs.parent().removeAttr("style");
		}
	}

	_set(0);

	tabs.find(">li>a").click(function(){
		var idx = tabs.find(">li").index($(this).parent());
		_set(idx);
		return false;
	}); 

	c_btn.click(function(){
		_close();
		_Bottom();
		return false;
	});

	//가뭄119
	i_btn.click(function(){
		boxs.parent().toggleClass("on");
	});

	//모바일
	if(!$(".js_mobile_check").is(":hidden")){
		_close();
	}
	//반응형 리사이즈
	$(window).resize(function(){
		if(!$(".js_mobile_check").is(":hidden")){
			_close();
		} else{
			_set(cnt);
			_Bottom();
		}
	});
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	slide function 데이터 슬라이드
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Data_Slide_AC(str){
	var obj = str;
		obj.ul = obj.find(" >ul");
		obj.li = obj.ul.find(">li");
		obj.cnt = 1;
		obj.speeds = 300;
		obj.autos = "Y";
		obj.saveTime = "";
		obj.saveTimeSpeed = 6000;

	//왼쪽오른쪽
	$('<div class="controls">\
		<a href="#" class="btn_l">이전</a>\
		<a href="#" class="btn_r">다음</a>\
	</div>').prependTo(obj);

	//심볼버튼
	$('<div class="simbol" />').appendTo(obj.find(" .controls"));

		//컨트롤
		obj.btn_simbol = obj.find(" .simbol a:not([class*='btn_'])");
		obj.btn_l = obj.find(" .btn_l");
		obj.btn_r = obj.find(" .btn_r");
		obj.btn_stop = obj.find(" .btn_stop");
		obj.btn_play = obj.find(" .btn_play");

	function _check(){
		var a = obj.ul.innerWidth();
		var b = obj.li.innerWidth() + 30;
		var c = false;
		if(b > a) c = true; 
		return c;
	}
	function fn_set(){
		var _mobile = _check();
		var cnt = 0;
		for(var i=0; i<obj.li.size(); i++){
			if(_mobile){
				cnt++;
			} else {
				if(i%2==0) cnt++;
			}
			obj.li.eq(i).attr("data-cnt",cnt);
		}
		obj.li.css({"position":"absolute","top":"0","left":"100%"});

		
		if(_mobile){
			obj.li.eq(obj.cnt-1).css("left","0");
			obj.li.eq(obj.cnt).css("left","100%");
		} else {

			if(obj.cnt > Math.ceil((obj.li.size() / 2))){
				obj.cnt = Math.ceil((obj.li.size() / 2));
			}

			obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).css("left","0");
			obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(1).css("left","50%");
			
		}
		fn_simbol(1);

		if(!_mobile){
			if(obj.li.size()<=2){
				obj.addClass("off");
				obj.find(" .controls").hide();
			} else{
				obj.removeClass("off");
				obj.find(" .controls").show();
			}
		} else{
			if(obj.li.size()<=1){
				obj.addClass("off");
				obj.find(" .controls").hide();
			} else{
				obj.removeClass("off");
				obj.find(" .controls").show();
			}
		}
	}
	fn_set();
	function fn_simbol(idx){
		var _mobile = _check();
		var _size = obj.li.size();
		obj.find(" .simbol").empty();
		if(!_mobile) _size = Math.ceil((obj.li.size() / 2));
		for(var i=0; i<_size; i++){
			$('<a href="#">'+(i+1)+'</a>').appendTo(obj.find(" .simbol"));
		}
		obj.btn_simbol = obj.find(" .simbol a:not([class*='btn_'])");
		obj.btn_simbol.removeClass("on").eq(idx-1).addClass("on");


		
		obj.btn_simbol.click(function(){
			var idx = obj.btn_simbol.index($(this))+1;
			var str = "next";
			if(idx < obj.cnt) str = "prev";
			if(idx != obj.cnt){
				fn_move(str,idx);
			}
			return false;
		});
	}
	function fn_move(str,idx){
		var _mobile = _check();
		var _obj = obj;
		fn_stop();
		if(str == "prev"){
			if(_mobile){
				obj.ul.find(">li:not([data-cnt*='"+obj.cnt+"'])").css("left","-100%");
				//이전
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"100%"},obj.speeds*2,function(){_height()});

				obj.cnt--;
				if(idx != undefined) obj.cnt = idx;
				if(obj.cnt < 1) obj.cnt = obj.li.size();

				//다음
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"0"},obj.speeds*2,function(){_height()});

			} else {
				obj.ul.find(">li:not([data-cnt*='"+obj.cnt+"'])").css("left","-100%");
				//이전
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"100%"},obj.speeds*2);
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(1).stop().animate({"left":"100%"},obj.speeds,function(){_height()});

				obj.cnt--;
				if(idx != undefined) obj.cnt = idx;
				if(obj.cnt < 1) obj.cnt = Math.ceil((obj.li.size() / 2));

				//다음
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"0"},obj.speeds*2);
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(1).stop().animate({"left":"50%"},obj.speeds*2,function(){_height()});
			}
		} else if(str == "next"){
			if(_mobile){
				obj.ul.find(">li:not([data-cnt*='"+obj.cnt+"'])").css("left","100%");
				//이전
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"-100%"},obj.speeds,function(){_height()});

				obj.cnt++;
				if(idx != undefined) obj.cnt = idx;
				if(obj.cnt > obj.li.size()) obj.cnt = 1;

				//다음
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"0"},obj.speeds*2,function(){_height()});
			} else {
				obj.ul.find(">li:not([data-cnt*='"+obj.cnt+"'])").css("left","100%");
				//이전
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"-100%"},obj.speeds);
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(1).stop().animate({"left":"-100%"},obj.speeds*2,function(){_height()});

				obj.cnt++;
				if(idx != undefined) obj.cnt = idx;
				if(obj.cnt > Math.ceil((obj.li.size() / 2))) obj.cnt = 1;

				//다음
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(0).stop().animate({"left":"0"},obj.speeds*2);
				obj.ul.find(">li[data-cnt*='"+obj.cnt+"']").eq(1).stop().animate({"left":"50%"},obj.speeds*2,function(){_height()});
			}
		}

		fn_simbol(obj.cnt);

		if(obj.autos == "Y"){
			fn_stop();
		}
	}
	function fn_stop(){
		clearTimeout(obj.saveTime);
	}
	function fn_play(){
		obj.saveTime = setTimeout(function(){
			fn_move("next");
		},obj.saveTimeSpeed);
	}
	//높이값구하기
	function _height(){
		var li = obj.ul.find(">li[data-cnt='"+obj.cnt+"']");
		var max_h = 0;

		for(var i=0; i<li.size(); i++){
			max_h = Math.max(li.eq(i).find('>.li_wr').height(),max_h);
		}
		obj.ul.height(max_h);
	}	

	$(window).resize(function(){
		fn_set();
	});

	obj.btn_l.click(function(){
		fn_move("prev");
		return false;
	});

	obj.btn_r.click(function(){
		fn_move("next");
		return false;
	});

	obj.btn_stop.click(function(){
		obj.autos = "N";
		obj.btn_stop.hide();
		obj.btn_play.show();
		fn_stop();
		return false;
	});

	obj.btn_play.click(function(){
		obj.autos = "Y";
		obj.btn_stop.show();
		obj.btn_play.hide();
		fn_play();
		return false;
	});

	if(obj.autos == "Y"){
		obj.btn_play.click();
	}
}

function Data_Slide_SET(){
	for(var i=0; i<$("[data-skin='slide']").size(); i++){
		Data_Slide_AC($("[data-skin='slide']").eq(i));
	}
}

/*
$.get("가져올데이터주소",function(data){
	var targets = $("#tab_01 [data-skin='slide']");
	$(data).appendTo(targets.empty());
	Data_Slide_AC(targets)
});
*/


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	popup Function 팝업

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function popup_open_AC(str){
	var btn = $('a[data-popup="'+str+'"]');
	var box = $('[data-skin="popup"][data-name="'+str+'"]');
		box.close = box.find(" >.pbx>.close");

	btn.click(function(){
		box.addClass("on");
		return false;
	});
	box.close.click(function(){
		box.removeClass("on");
		if(!$(".js_mobile_check").is(":hidden")){
			_Tabpop(); //탭 누르면 팝업
		}

		return false;
	});
	box.click(function(event){
		if(event.target == this){
			box.removeClass("on");
			if(!$(".js_mobile_check").is(":hidden")){
				_Tabpop(); //탭 누르면 팝업
			}

			return false;
		}
	});

	//가뭄피해현황::탭+팝업
	var btn_pop = $('#data_bx.ty_04 a[data-popup="'+str+'"]');

	btn_pop.click(function(){
		if($(".js_mobile_check").is(":hidden")){
			box.removeClass("on");
		}

		$(window).resize(function(){
			if($(".js_mobile_check").is(":hidden")){
				box.removeClass("on");
			}
		});
		return false;
	});
}

function dataPopup_AC(){
	var sys = $('a[data-popup]');
	for(var i=0; i<sys.size(); i++){
		popup_open_AC(sys.eq(i).attr("data-popup"));
	}
}
function _Tabpop(){
	$("#data_bx").removeClass("full");
	$("#data_bx>.tabs>li").removeClass("on");
	$("#data_bx>.tab_bx").removeClass("on");
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Option Select
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Sel_Option_AC(){
	var obj = $('#options');
		obj.c = obj.find(" >.close_btn");
	var parnt = $('#options>.op_wr>.sbjt>.tt>input[type="checkbox"]');
	var btn = $(".op_btn>a");
	var chks = $('#options >.op_wr>.sbjt>ul >li input[type="checkbox"]');
	var lstbtn = $('#options>.op_wr>.sbjt>.icolst>li>a');
	var lstul = $('#options>.op_wr>.sbjt>.icolst>li>ul');

	function _Close(){
		obj.fadeOut(200);
		btn.parent().show();
		$("#data_pop.ty_2").removeClass("mov");
	}
	function _Open(){
		obj.fadeIn(200);
		btn.parent().hide();
		$("#data_pop.ty_2").addClass("mov");
	}

	obj.c.click(function(){_Close(); return false;});
	btn.click(function(){_Open(); return false;});

	//모바일일때
	if(!$(".js_mobile_check").is(":hidden")){
		_Close();
	} else{
		_Open();
	}
	//반응형 리사이즈
	$(window).resize(function(){
		if(!$(".js_mobile_check").is(":hidden")){
			if(obj.is(":hidden")){_Close();}
		} else{
			if(!obj.is(":hidden")){_Open();}
		}
	});

	function _Set(){
		var sbj = $('#options >.op_wr>.sbjt');
		for(var i=0; i<sbj.size(); i++) {
			var li = sbj.eq(i).find(">ul>li");
			var cnt = sbj.eq(i).find('>ul>li input[type="checkbox"]:checked').size();

			if(li.size()<=cnt){
				sbj.eq(i).find(".tt input:checkbox").prop("checked",true);
			} else{
				sbj.eq(i).find(".tt input:checkbox").prop("checked",false);
			}
		}
	}

	_Set();

	parnt.change(function(){
		var box = $(this).parent().siblings("ul").find(' >li input[type="checkbox"]');

		if($(this).is(":checked")){
			box.prop('checked', true);
		} else{
			box.prop('checked', false);
		}
	});
	chks.change(function(){
		var li = $(this).parent().parent();
		var cnt = li.parent().find(' input[type="checkbox"]:checked').size();

		if(li.parent().find(">li").size()<=cnt){
			li.parent().siblings(".tt").find(" input:checkbox").prop("checked",true);
		} else{
			li.parent().siblings(".tt").find(" input:checkbox").prop("checked",false);
		}

	});

	lstbtn.click(function(){
		if($(this).siblings("ul").is(":hidden")){
			lstul.hide();
			lstbtn.removeClass("on");
			$(this).siblings("ul").show();
			$(this).addClass("on");
		} else{
			$(this).siblings("ul").hide();
			$(this).removeClass("on");
		}

		return false;
	});
};


/*////////////////////////////////////////////////////////////////////////////////////////////////

	DataPop
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Data_pop_AC(){
	Data_pop_Off();
	$("#data_pop>.close").click(function(){
		$("#data_pop").hide();
	});
}
function Data_pop_Off(){
	$("#data_pop").hide();
}
function Data_pop_On(){
	$("#data_pop").show();
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Table th change 테이블 모바일 변형
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Th_Change_AC(){
	var obj = $(".js_tb");
		obj.th = obj.find(" >thead>tr>th");
		obj.bth = obj.find(" >tbody>tr>th");
		obj.td = obj.find(" >tbody>tr>td");

		function _th(){
			if(obj.find(" >thead").is(":hidden")){
				//모바일
				if(obj.find(" >tbody td strong").size() == 0){
					for(var i=0; i<=obj.th.size(); i++){
						var num = i;
						if($("#data_pop").hasClass("ty_2")){
							num = num+1;
						}
						$(obj.td.eq(i)).prepend("<strong>"+obj.th.eq(num).text()+"</strong>");
					}
				}
			} else{
				if(obj.find(" >tbody td strong").size() != 0){
					obj.find(" >tbody td strong").remove();
				}
			}
		}

		_th();
		
		$(window).resize(function(){
			_th();
		});
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Map Control 지도 타입 선택
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Map_Control(){
	var obj = $("#right_tools>.map_ctrl>.map_op");
		maps = obj.find(" >.map_btn");
		skys = obj.find(" >.sky_btn");

	maps.click(function(){
		$(this).parent().attr("data-option","map");
		skys.removeAttr("data-option");
	});

	skys.click(function(){
		$(this).parent().attr("data-option","sky");
		maps.removeAttr("data-option");
	});
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Stepbx 가뭄단계 정보
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Stepbx_AC(){
	var obj = $("#step_bx>[data-name]");
		btn = obj.find(">.tbtn");
		bx = obj.find(">.bxs");

		btn.click(function(){
			if($(this).parent().hasClass("on")){
				$(this).parent().removeClass("on");
			} else{
				$(this).parent().addClass("on");
			}
			return false;
		});
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Step Graph 가뭄단계 그래프
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function StepGraph_AC(){
	var obj = $("#right_tools>.step_g");
		btn = $("#right_tools>.step_g>.btns");

	btn.click(function(){
		if(obj.hasClass("on")){
			obj.removeClass("on");
		} else{
			obj.addClass("on");
		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	DATEPICKER(달력플러그인) Function

	ex)
	<input type="text" class="datepicker" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

function dataTime(){
	$( ".js_cal" ).datepicker({  
		// 달력 아이콘  
		showOn: "both",  
		buttonImage: "images/common/icon_cal.svg",  
		buttonImageOnly: true,
		buttonText:"달력선택",
		// 달력 하단의 종료와 오늘 버튼 Show  
		showButtonPanel: false,  
		// date 포멧  
		dateFormat : "yy년 mm월 dd일",  
		// 달력 에니메이션 ( show(default),slideDown,fadeIn,blind,bounce,clip,drop,fold,slide,"")  
		showAnim : "",  
		// 다른 달의 일 보이기, 클릭 가능  
		showOtherMonths: false,  
		selectOtherMonths: true,  
		// 년도, 달 변경  
		changeMonth: true,  
		changeYear: true, 
		showMonthAfterYear: true,        /* 년과 달의 위치 바꾸기 */ 
        /* 한글화 */ 
        monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
        monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], 
        dayNames : ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
		// 여러달 보이기  
		numberOfMonths: 1,  
		showButtonPanel: false,
		showWeek: false,  
		firstDay: 0,
		autoSize:true
	});
	$('#ui-datepicker-div').hide();
}


/*////////////////////////////////////////////////////////////////////////////////////////////////

	Page Load
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Page_Load(idx,callback){
	$.get("./page_0"+idx+".html",function(data){
		$(data).appendTo($("#bind").empty());
		init();
		callback();
	});
}
$(function(){
	Gnb_AC();
	if(_param('intro')=="y"){
		Tutorial_Page.intro();
	}
});

function Gnb_AC(){
	var obj = $("#gnb");
		obj.btn = obj.find(">ul>li>a");

	obj.btn.click(function(){
		var idx = obj.btn.parent().index($(this).parent());

		function Login_Pop(){
			var pops = $("#login_19");
			pops.show();
			pops.find(">.bxs>.close").click(function(){
				pops.hide();
			});
		}

		var cnts = 0;
		function Pop_Step(){
			var arr = ["weather", "farm", "fire", "water"];
			var gap = 450;
		    var times = (cnts != 0) ? gap : 0;
		    setTimeout(function(){
		        $("#step_bx>[data-name='"+arr[cnts]+"']").addClass("on");
		        cnts++;
		        if(cnts < arr.length){
		        	Pop_Step();	
		        }
		    },times);
		}

		

		obj.find(">ul>li>a.on").removeClass("on");
		$(this).addClass("on");
		Page_Load(idx+1,function(){
			if(idx == 0){
				if($(".js_mobile_check").is(":hidden")){
					Pop_Step();

					$(window).resize(function(){
						if(!$(".js_mobile_check").is(":hidden")){
							$("#step_bx>[data-name]").removeClass("on");
						}
					});
				}
			}
			if(idx == 5){
				Login_Pop();
				//로그인 하기전에는 로그인하라는 팝업이 뜸.
				return false;
			}
		});
		$("#header").removeAttr("data-sw");
	});
}


//지도로 보는 가뭄 인트로
function _param(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}




/*////////////////////////////////////////////////////////////////////////////////////////////////

	Tutorial
	
////////////////////////////////////////////////////////////////////////////////////////////////*/
function Tutorial_Page(){
	var cnt = 1;

	function _Set(){
		$("#tutorial").attr("data-step",cnt);
		return cnt;
	}
	return{
		next:function(){
			cnt++;
			_Set();
		},
		prev:function(){
			cnt--;
			_Set();
		},
		close:function(){
			cnt=0;
			_Set();

			var menus = Number($("#tutorial").attr("data-menu")) - 1;
			var checks = $("#tutorial .tutos:eq(0) .txts:eq("+menus+") .cbx .checks input:checkbox").is(":checked");

			if(checks){
				$.cookie('Tutorial_intro'+(menus+1), checks, '');
			}
		},
		open:function(){
			cnt=2;
			_Set();
		},
		intro:function(){
			cnt=1;
			_Set();
			var idx = 0;
			if($("#gnb>ul>li>a.on").size() !=0){
				idx = $("#gnb>ul>li").index($("#gnb>ul>li>a.on").parent());
			}
			$("#tutorial").attr("data-menu",idx+1);
		}
	}
}

var Tutorial_Page=Tutorial_Page();



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	COOKIE Function

	ex)
	$.cookie('key', 'ok', {expires:7,domain:'.myhost.com', path:'/', secure:0});
	$.cookie('key', 'ok', '');
	alert($.cookie('key'));

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

(function($){
  $.cookie = function(key, value, options) {
   if(arguments.length > 1) {
    var o = $.extend({}, $.cookie.defaults, options);
    
    if (value === null || value === undefined) {
     value = '';
     o.expires = -1;
    }
    if (o.expires.constructor != Date) {
     var today = new Date();
     today.setDate(today.getDate() + o.expires);
     o.expires = today;
    }
    // Create the cookie string
    document.cookie = 
     key + '=' + value + '; expires=' + o.expires.toUTCString() +
       (o.path? '; path=' + (o.path) : '') +
       (o.domain? '; domain=' + (o.domain) : '') +
       (o.secure? '; secure' : '');
   } else {
    if(result = new RegExp(key+"=(.*?)(?:;|$)").exec(document.cookie))
     return decodeURIComponent(result[1]);  
    return false;
   }
  }; //' $.cookie = function(key, value, options) 
  $.cookie.defaults = {
   expires: 365,
   path: '/'
  } // '$.cookie.defaults
 })(jQuery);



 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    포커스 슬라이드 좌우터치 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function getLoc(str){
	var obj = str;
	var btn = obj.find(" >.pbx>.hads");
    var gap_x = 0;
    var gap_y = 0;
    var moveCheck = false;

    $("[data-skin='manypop']").css("z-index","1000");

	btn.on("mousedown touchstart",function(e){
		moveCheck = true;
		var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
		var y = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientY : e.clientY;
		gap_x = x-obj.offset().left;
		gap_y = y-obj.offset().top;
		
		$("[data-skin='manypop']").css("z-index","1000");
		obj.css("z-index","1001");
	});

	$(document).on("mouseup touchend",function(e){
		moveCheck = false;
	});

	$(document).on("mousemove touchmove",function(e){
		if(!moveCheck) return false;
		var x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
		var y = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientY : e.clientY;

		x = x - gap_x;
		y = y - gap_y;

		obj.css({"left":x+"px","top":y+"px"});
	});
	btn.on("mousemove",function(e){
		e.preventDefault();
	});
}

function page3_movePop(str){
	$('<div data-skin="manypop" data-name="'+str+'">\
			<div class="pbx">\
				<strong class="hads">운영정보</strong>\
				<div class="midd"></div>\
				<a href="#" class="close">닫기</a>\
			</div>\
		</div>').prependTo($("body"));

	var obj = $('[data-skin="manypop"][data-name="'+str+'"]');
		obj.midd = obj.find(">.pbx>.midd");
		obj.btn_close = obj.find(">.pbx>.close");

	$.get("page_03_pop.html",function(data){
		$(data).appendTo(obj.midd);
	});

	obj.btn_close.click(function(){
		obj.remove();
		return false;
	});

	getLoc(obj);
}

function page6_movePop(str){
	$('<div data-skin="manypop" data-type="2" data-name="'+str+'">\
			<div class="pbx">\
				<strong class="hads">용수 지원 시설</strong>\
				<div class="midd"></div>\
				<a href="#" class="close">닫기</a>\
			</div>\
		</div>').prependTo($("body"));

	var obj = $('[data-skin="manypop"][data-name="'+str+'"]');
		obj.midd = obj.find(">.pbx>.midd");
		obj.btn_close = obj.find(">.pbx>.close");

	$.get("page_06_pop.html",function(data){
		$(data).appendTo(obj.midd);
	});

	obj.btn_close.click(function(){
		obj.remove();
		return false;
	});

	getLoc(obj);
}
//page3_movePop("movepop1");