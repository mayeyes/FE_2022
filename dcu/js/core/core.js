/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	IMAGE OVER Function

	ex)
	<a href="#link" class="js_img_ov"><img src="" alt="" /></a>

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	img_over_AC();
	setTimeout(function(){img_over_AC();},300);
});
function img_over_AC(){
	var imgs = $(".js_img_ov");
	var imgsOV = $(".js_img_ov on");

	imgsOV.over = imgsOV.find(">img")[0];
	if(imgsOV.size() != 0){
		imgsOV.over = imgsOV.find(">img")[0];
		if(imgsOV.over.src.indexOf("_ov.") == -1){
			imgsOV.types = imgsOV.over.src.split(".");		
			imgsOV.types = imgsOV.types[imgsOV.types.length - 1];
			imgsOV.over.src = imgsOV.over.src.replace("."+imgsOV.types,"_ov."+imgsOV.types);
		}
	}

	imgs.on("mouseover focus",function(){
		if(!$(this).hasClass("on")){
			imgs.over = $(this).find(">img")[0];
			if(imgs.over.src.indexOf("_ov.") == -1){
				imgs.types = imgs.over.src.split(".");		
				imgs.types = imgs.types[imgs.types.length - 1];
				imgs.over.src = imgs.over.src.replace("."+imgs.types,"_ov."+imgs.types);
			}
		}
	});

	imgs.on("mouseout blur",function(){
		if(!$(this).hasClass("on")){
			imgs.out = $(this).find(">img")[0];		
			imgs.types = imgs.out.src.split(".");		
			imgs.types = imgs.types[imgs.types.length - 1];
			imgs.out.src = imgs.out.src.replace("_ov."+imgs.types,"."+imgs.types);
		}
	});
}


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

	URL get Param Function
	
	ex)
	$.params['name'];

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
(function($) {
    $.params = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; i++)
        {
            var p=a[i].split('='); 
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); //공백으로 변환 후 디코딩
        }
        return b;
    })(window.location.search.substr(1).split('&')) //파라미터 정보만 분리
})(jQuery);



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	BLIND Function

	ex)
	blind_on()
	blind_off()
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function blind_on(str){
	var callback = arguments[arguments.length-1];
	var binds = $("body");
	if(typeof callback === 'function') {}
	else {
		if(str) binds = arguments[0];
	}
	if(arguments.length > 1) binds = arguments[0];
	
	$("#blind").remove();
	$('<div id="blind" />').prependTo(binds);
	
	var bl = $("#blind");

	var h = 0;

	if($(document).height() > $("#wrap").height()) h = $(document).height();
	else h = $("#wrap").height();
	
	bl.css({
		"position":"absolute",
		"left":"0",
		"top":"0",
		"z-index":"1000",
		"width":"100%",
		"height":h+"px",
		"background":"#000",
		"opacity":"0"
	});

	bl.animate(
		{"opacity":"0.7"},300,function(){
			if(typeof callback === 'function') {
				callback();
			}
		}
	);

	bl.click(function(){
		return false;
	});
}

function blind_off(){
	var callback = arguments[arguments.length-1];
	var bl = $("#blind");

	if(typeof callback === 'function') {
		callback();
	}

	bl.animate(
		{"opacity":"0"},300,function(){
			$("#blind").remove();
		}
	);
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	DATEPICKER(달력플러그인) Function

	ex)
	<input type="text" class="datepicker" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	setTimeout(function(){
		$( ".js_cal" ).datepicker({  
			// 달력 아이콘  
			showOn: "both",  
			buttonImage: "/images/core/icon_cal.gif",  
			buttonImageOnly: true,
			buttonText:"달력선택",
			// 달력 하단의 종료와 오늘 버튼 Show  
			showButtonPanel: false,  
			// date 포멧  
			dateFormat : "yy-mm-dd",  
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
			firstDay: 1,
			autoSize:true
		});
		$('#ui-datepicker-div').hide();	
		$(".ui-datepicker-trigger").css({"padding":"0px 0px 0px 5px"});
	},100);
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	INPUT AUTO VAL Function
	
	ex)
	<input type="text" value="" class="js_input_val" title="검색어를 입력하세요" />

	ㆍ기본표현되는 텍스트는 title="" 의 값으로 합니다.
	ㆍ실행은 class="js_input_val" 클래스로 실행됩니다.

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	input_val_AC();
});
function input_val_AC(){
	var inputs = $(".js_input_val");
	for(var i=0; i<inputs.size(); i++){
		if(!inputs.eq(i).val()){
			inputs.titles = inputs.eq(i).attr("title");
			inputs.eq(i).val(inputs.titles);
		}
	}
	
	inputs.siblings("input[type=image], input[type=submit], input[type=button] , a").click(function(){
		var obj = $(this).siblings("input[type=text]"); 
		var v = obj.val();
		var t = obj.attr("title");
		
		if(v == t){
			obj.val("");			
		}
	});

	inputs.on("focus",function(){
		var t = $(this).attr("title");
		var v = $(this).val();

		if(t == v || v == ""){
			$(this).val("");
		}
	});
	inputs.on("blur",function(){
		var t = $(this).attr("title");
		var v = $(this).val();

		if(v == ""){
			$(this).val(t);
		}
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	shift save Function
	
	ex)
	alert(shift);
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
var shift = false;
$(document).ready(function(){
    $(document).keydown(function(event){
        if(event.keyCode == 16 && shift != true) shift = true;
    });
    $(document).keyup(function(event){
        if(event.keyCode == 16) shift = false;
    });
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	replaceAll Function

	ex)
	변수.replaceAll("검색문자","변경문자");

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
String.prototype.replaceAll = function(str1, str2)
{
  var temp_str = this.trim();
  temp_str = temp_str.replace(eval("/" + str1 + "/gi"), str2);
  return temp_str;
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	input number Function

	ex)
	<input type="text" class="js_number" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	number_AC();
});
function number_AC() {
	var obj = $("input[type*=text].js_number");

	obj.bind("keyup",function(){
		obj.vals = $(this).val();
		obj.vals = obj.vals.replace(/[^(0-9)]/gi,"");

		obj.val(obj.vals);
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	input korea Function

	ex)
	<input type="text" class="js_ko" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	korean_AC();
});
function korean_AC() {
	var obj = $("input[type*=text].js_ko");

	obj.bind("keyup",function(){
		obj.vals = $(this).val();
		obj.vals = obj.vals.replace(/[^(ㄱ-ㅎ)+(ㅏ-ㅣ)+(가-힣)]/gi,"");

		obj.val(obj.vals);
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	input english Function

	ex)
	<input type="text" class="js_en" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	english_AC();
});
function english_AC() {
	var obj = $("input[type*=text].js_en");

	obj.bind("keyup",function(){
		obj.vals = $(this).val();
		obj.vals = obj.vals.replace(/[^(a-z)+(A-Z)]/gi,"");

		obj.val(obj.vals);
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	PRICE Function

	ex)
	price("6000");
	결과값 = 6,000

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	price_AC();
});
function price(num) {
	var num = num.replace(/[^(0-9)]/gi,"");
		num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num;
}
function price_AC() {
	var obj = $(".js_price");
		
	for(var i=0; i<obj.size(); i++){
		pr = obj.eq(i);
		pr.n = pr[0].tagName.toLowerCase();

		if(pr.n == "input"){
			pr.vals = pr.val();
			pr.vals = pr.vals.replaceAll(",","");
			pr.vals = price(pr.vals);

			pr.val(pr.vals);

			pr.bind("keyup",function(){
				var setT_vals = $(this).val();
				setT_vals = setT_vals.replaceAll(",","");
				setT_vals = price(setT_vals);

				$(this).val(setT_vals);
			});
		} else if(pr.n == "span"){
			pr.vals = pr.text();
			pr.vals = pr.vals.replaceAll(",","");
			pr.vals = price(pr.vals);

			pr.text(pr.vals);
		}
	}
}









/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	SELECTBOX(UL) Function
	
	ex)
	<div class="selectbox select1">
	    <ul>
	        <li><input type="radio" name="radio_g1" id="radio_g1_1" /><label for="radio_g1_1">선택 : 네이버</label></li>
	        <li><input type="radio" name="radio_g1" id="radio_g1_2" /><label for="radio_g1_2">선택 : 다음</label></li>
	        <li><input type="radio" name="radio_g1" id="radio_g1_3" /><label for="radio_g1_3">선택 : SE네이버</label></li>
	        <li><input type="radio" name="radio_g1" id="radio_g1_4" /><label for="radio_g1_4">선택 : 구글</label></li>
	    </ul>
	</div>	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
    selectbox_AC();
});

function selectbox_AC(){
    var sb = $(".js_selectbox");
    sb.ul = sb.find(">ul");
    sb.ul.li = sb.ul.find(">li");
    sb.ul.li.a = sb.ul.li.find(" a");
    sb.ul.li.inputs = sb.ul.li.find(" input");
    sb.shift = false;
     
    for(var i=0; i<sb.size(); i++ ){
        if(sb.eq(i).hasClass("selectbox_top")){
            sb.eq(i).find(">ul").css({"position":"absolute","left":"0","bottom":"0"});
        } else {
            sb.eq(i).find(">ul").css({"position":"absolute","left":"0","top":"0"});
        }
    }
 
    sb.ul.li.hide();
    sb.ul.li.find(">input:checked").removeAttr("checked");
    sb.ul.find(">li:first").show().addClass("on").find(" input[type=radio]").attr("checked","checked");
 
    //마우스및 포커스시 해당 selectbox포인트
    $(".js_selectbox a, .js_selectbox input, .js_selectbox>ul").on("mouseover focus",function(){
        $(this).parents(".js_selectbox").addClass("on");
    });
    $(".js_selectbox a, .js_selectbox input, .js_selectbox>ul").on("mouseout blur",function(){
        $(this).parents(".js_selectbox").removeClass("on");
    });
     
    //링크이벤트
    sb.ul.li.a.click(function(e){
        var obj = $(this).parents(".js_selectbox");
        if(obj.find(">ul>li:hidden").size() != 0){
            e.preventDefault();    
            obj.find(">ul>li").show();
            obj.css("z-index","100");
        } else {
            obj.find(">ul>li").hide();
            obj.find(">ul>li.on").removeClass();
            $(this).parent().show().addClass("on");
            obj.css("z-index","0");
        }
    });
    sb.ul.on("mouseleave blur",function(){
        var obj = $(this).parents(".js_selectbox");
        obj.find(">ul>li").hide();
        obj.find(">ul>li.on").show();
        obj.css("z-index","0");
    });
    $(".js_selectbox > ul > li > a, .js_selectbox > ul > li > input").on("keypress",function(e){
        if(e.keyCode == 27){
            var obj = $(this).parents(".js_selectbox");
            obj.find(">ul>li").hide();
            obj.find(">ul>li.on").show();
            obj.css("z-index","0");
        }
    });
    sb.ul.find(">li:last>a").keypress(function(e){       
        if(shift == false && e.keyCode == 9){
            var obj = $(this).parents(".js_selectbox");
            obj.find(">ul>li").hide();
            obj.find(">ul>li.on").show();
        }
    });
    sb.ul.find(">li:first>a").keypress(function(e){
        if(shift == true && e.keyCode == 9){
            var obj = $(this).parents(".js_selectbox");
            obj.find(">ul>li").hide();
            obj.find(">ul>li.on").show();
        }
    });
 
 
    //form select
    sb.ul.li.click(function(e){
        var obj = $(this).parents(".js_selectbox");
         
        if(obj.find(" input").size() != 0){
            if(obj.find(">ul>li:hidden").size() != 0){
                e.preventDefault();
                obj.find(">ul>li").show();
                obj.css("z-index","100");
            } else {
                e.preventDefault();
                obj.find(">ul>li.on").removeClass("on");
                //obj.find(">ul>li").hide();
                obj.find(">ul>li>input:checked").removeAttr("checked");
                $(this).show().addClass("on").find("input[type=radio]").attr("checked","checked");
 
                //모바일에서만 작동
                $(document).on("touchstart",function(){
                    obj.find(">ul>li:not('.on')").hide();
                });
            }
        }
         
    });
     
    $(".js_selectbox > ul > li > input").keypress(function(e){   
        if(e.keyCode == 13){
            var obj = $(this).parents(".js_selectbox");
 
            if(obj.find(">ul>li:hidden").size() != 0){
                e.preventDefault();
                obj.find(">ul>li").show();
                obj.css("z-index","100");
            } else {
                obj.find(">ul>li").hide();
                $(this).parent().show();
            }
        } else if(e.keyCode == 9){
            var obj = $(this).parents(".js_selectbox");
            obj.find(">ul>li").hide();
            $(this).parent().show();
        }
    });
 
     
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	IMG AUTO ALIGN Function

	ex)
	<img src="/def/img/common/sample.jpg" class="js_img_auto" alt="" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
var img_auto_resize = "";
$(document).ready(function(){
	setTimeout(function(){
		img_auto_AC();
	},500);
	$(window).resize(function(){
		clearTimeout(img_auto_resize);
		img_auto_resize = setTimeout(function(){img_auto_AC();},510);
	});
});

function img_auto_AC(){
	var imgs = $("img.js_img_auto");
	imgs.removeAttr("style");
	imgs.cnt = imgs.size();

	for(var i=0; i<imgs.cnt; i++){
		imgs.box = imgs.eq(i).parent();
		imgs.w = imgs.eq(i).width();				
		imgs.box.w = imgs.box.width();		
		
		if(imgs.box.w < imgs.w){						
			imgs.eq(i).width(imgs.box.w);			
		}

		imgs.box.h = imgs.box.height();
		imgs.h = imgs.eq(i).height();
		if(imgs.box.h < imgs.h){
			imgs.eq(i).removeAttr("style");
			imgs.eq(i).height(imgs.box.h);
		}

		var h = (imgs.eq(i).parent().height() - imgs.eq(i).height())/2;
		var w = (imgs.eq(i).parent().width() - imgs.eq(i).width())/2;
		//console.log(w);
		imgs.eq(i).css("padding-top",h+"px");
		imgs.eq(i).css("padding-left",w+"px");
	}
}





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
			$(this).siblings("a").append("<span class='ico'></span>")
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
	Lmenu.li.ul.li.find("ul").not(":hidden").hide();
	Lmenu.li.find(">ul").not(":hidden").slideUp(300);	
	Lmenu.find("a.ov").removeClass("ov");
	
	//1deps
	var deps_01 = Lmenu.li.eq(Lmenu.idx_01);	
	deps_01.find(">a").addClass("ov");
	
	if(deps_01.find(">ul").size() != 0){
		deps_01.find(">ul").slideDown(300);
	}
}
function Lmenu_def(Lmenu){
	Lmenu.li.ul.li.find("ul").not(":hidden").hide();
	Lmenu.li.find(">ul").not(":hidden").slideUp(300);
	Lmenu.find("a.ov").removeClass("ov");
	
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
	
	LEFT:select MENU Function
	작성자 : publishers

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#remote .js_menu_select").size() != 0){
    	lnb_navi_AC();
	}
});
function lnb_navi_AC(){
	var lnb = $("#remote .js_menu");
		lnb.btn = lnb.find(">.js_menu_select>strong>a");
		lnb.interval = "";

	lnb.find(">.js_menu_select").mouseleave(function(){
		var obj = $(this).find(">ul");
		
		lnb.interval = setTimeout(function(){
			obj.stop().slideUp(200);
		},200);
	});
	lnb.find(">.js_menu_select").mouseenter(function(){
		clearTimeout(lnb.interval);
	});
	lnb.btn.click(function(){
		var obj = $(this).parent().siblings("ul");

		if(obj.is(":animated")) return false;
		
		lnb.find(">.js_menu_select>ul").not(":hidden").stop().slideUp(200);
		if(obj.is(":hidden")){
			obj.stop().slideDown(200);
		} else {
			obj.stop().slideUp(200);
		}
		return false;
	});
}






/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	layout left,right Height auto Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
    //container_AC();
    $(window).resize(function(){
    	//container_AC();
    });
});

function container_AC(){
	var c = $("#container");
	var r = $("#remote");

	c.css("min-height","10px");

	if(c.height() < r.height()){
		c.css("min-height",r.height());
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	language Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_language").size() != 0){
		language_AC();
	}
});
function language_AC(){
	var lan = $(".language_btn");
		lan.ul = lan.siblings("ul");

	lan.click(function(){
		if(lan.ul.is(":hidden")){
			//open
			lan.ul.slideDown(200);
		} else {
			//close
			lan.ul.slideUp(200);
		}
		return false;
	});

	lan.parent().mouseleave(function(){
		lan.ul.slideUp(200);
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	공유 Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".path_etc").size() != 0){
		//gong_u_AC();
	}
});
function gong_u_AC(){
	var g = $(".path_etc > .gong_u");
		g.ul = g.siblings("ul");

	g.click(function(){
		if(g.ul.is(":hidden")){
			g.addClass("on");
			g.ul.show();
		} else {
			g.removeClass("on");
			g.ul.hide();
		}
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Top Btn Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("a.js_top").size() != 0){
		setTimeout(function() {
			top_btn_AC();
		},200);
	}
});
function top_btn_AC(){
	var btn = $("a.js_top");
		btn.h = btn.innerHeight();
		btn.times = "";

	function action_start(){
		var t = ($(document).innerHeight() - $(window).innerHeight()) - $(this).scrollTop();
		var h = $("#footer").innerHeight();
		
		if($("#content_etc").size() != 0){
			h = h + $("#content_etc").innerHeight() - 5;
		}

		if(t <= h){
			btn.css("bottom",(h-t)+"px");
		} else {
			btn.css("bottom","0px");
		}
	}

	action_start();
	$(window).scroll(function(){
		action_start();
	});

	$(window).resize(function(){
		clearTimeout(btn.times);
		btn.times = setTimeout(function(){
			action_start();
		},500);
	});

	btn.click(function(){
		var speeds = 500;
		if($(window).scrollTop() == 0){
			speeds = 0;
		}
		$(window).scrollTo( {top:'0',left:'0'}, speeds ,function(){
			$(".print").focus();
		});
		
		return false;
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Popup Btn Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("a.js_popup_btn").size() != 0){
		popup_btn_AC();
	}
});
function popup_btn_AC(){
	var po = $("#js_popup");
		po.btn = $("a.js_popup_btn, #js_popup .end");
		po._this = "";
		po.btn_start = po.find(" .start > a"); 
		po.btn_end = po.find(" .end"); 

	po.btn.click(function(){
		if(po.is(":hidden")){
			po._this = $(this);
			po.show();
			po.btn_start.focus();
			var h = po.height();
			$("body").stop().animate({"margin-top":h+"px"},500);
			$("a.js_popup_btn > span").text("팝업닫기");
		} else {
			$("body").stop().animate({"margin-top":"0px"},500,function(){
				po.hide();
				po._this.focus();
				$("a.js_popup_btn > span").text("팝업보기");
			});
		}
		return false;
	});


	po.btn_end.keydown(function(e){
		if(e.keyCode == 9){
			po.btn_start.focus();
			return false;
		}
	});

	po.btn_start.keydown(function(e){
		if(e.keyCode == 9 && shift){
			po.btn_end.focus();
			return false;
		}
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
	var mc = $(".js_mobile_check");
	var ch = "";

	if(mc.is(":hidden")){
		ch = "pc";
	} else {
		ch = "mobile";
	}

	if(!$("body").hasClass(ch)){
		if(ch == "mobile") $("body").removeClass("pc");
		if(ch == "pc") $("body").removeClass("mobile");
		$("body").addClass(ch);
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	탭 복사 이동 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_tab_bind").size() != 0){
		tabmovebind_AC();
	}
});
function tabmovebind_AC(){
	var bindObj = $(".js_tab_bind");
	var cloneObj = $(".js_tab");
	
	cloneObj.appendTo(bindObj.empty());
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
	
	// 입시도우미 게시판 탭 예외처리	
	var val = $("input[name=bbsGroupCode]").attr("value");
	tab.li.find(">input").each(function(){
		if($(this).attr("value") == val){
			$(this).parent().addClass("on");
		}	
	});
	
	if(tab.find(">.title").size() == 0){
		$('<strong class="title"></strong>').prependTo(tab);
	}
		tab.ti = tab.find(">.title");
		
	tab.ti.html(tab.on.find(">a").clone());
		
		tab.btn = tab.ti.find(">a");
		
	tab.btn.removeAttr("onclick");
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




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	만족도 체크 이동 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".satisfaction").size() != 0){
		satisfaction_AC();
	}
});
function satisfaction_AC(){
	var obj = $(".satisfaction");
		obj.btn = obj.find(" input[type=submit]");

	obj.btn.click(function(){
		obj.checks = obj.find(" input[type=radio]:checked");
		if(obj.checks.size() == 0){
			alert("점수(매우만족, 만족, 보통, 불만족, 매우불만족)를 선택해주세요.");
			return false;
		}
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	scorll Y축

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){			
	$(".scroll_y").mCustomScrollbar({
		autoHideScrollbar:true,
		theme:"light-thin",
		scrollInertia:350
	});

	$(".scroll_xy").mCustomScrollbar({
		autoHideScrollbar:true,
		theme:"light-thin",
		scrollInertia:350
	});	
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	메인 공지사항 

	ex)
	<script type="text/javascript">
		var tab_board_obj = ".notice";//오브젝트 "id" or "class"
		var tab_board_action = "over";//행동패턴 (click, over)
		var tab_board_textTop = 88;//view box y좌표
		tab_board_setting(tab_board_obj,tab_board_action,tab_board_textTop);
	</script>

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function tab_board_setting(str1,str2,str3){
	var tboard = $(str1);
	tboard.li = tboard.find(">li");
	tboard.li.a = tboard.li.find(">a");
	tboard.li.ul = tboard.li.find(">ul");

	tboard.li.css({"float":"left"});
	tboard.li.ul.css({"position":"absolute","left":"0","top":str3+"px","margin-top":"0"});
	tboard.li.find(" .more").css({"position":"absolute"}).hide();

	tab_board_view(tboard,0);
	
	if(str2 == "click" || str2 == ""){
		tboard.li.a.click(function(){
			var idx = tboard.li.a.index($(this));
			tab_board_view(tboard,idx);
			return false;
		});
	}
	if(str2 == "over"){
		tboard.li.a.on("mouseover focus",function(){
			var idx = tboard.li.a.index($(this));
			tab_board_view(tboard,idx);
			return false;
		});
	}
}
function tab_board_view(tboard,str){
	var obj = tboard.li.eq(str);	
	obj.ul = obj.find(">ul");
	obj.news = obj.find(">a");	
	if(obj.news.find(">img").size() != 0){
		obj.news.imgs = obj.news.find(">img")[0];	
		obj.news.types = obj.news.imgs.src.split(".");
		obj.news.types = obj.news.types[obj.news.types.length - 1];
	}
	obj.olds = tboard.li.find(">a.on");
	if(obj.news.find(">img").size() != 0 && obj.olds.size() > 0){
		obj.olds.imgs = obj.olds.find(">img")[0];
		obj.olds.types = obj.olds.imgs.src.split(".");
		obj.olds.types = obj.olds.types[obj.olds.types.length - 1];
	}


	tboard.li.ul.hide();
	tboard.li.find(" .more").hide();
	tboard.li.eq(str).find(" .more").show();
	obj.ul.show();

	obj.olds.removeClass("on");
	obj.news.addClass("on");
	
	if(obj.news.find(">img").size() != 0){
		if(obj.olds.size() > 0){
			obj.olds.imgs.src = obj.olds.imgs.src.replace("_ov."+obj.olds.types,"."+obj.olds.types);
		}
		if(obj.news.imgs.src.indexOf("_ov.") == -1){
			obj.news.imgs.src = obj.news.imgs.src.replace("."+obj.news.types,"_ov."+obj.news.types);
		}
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
$(document).ready(function(){
	if($(".js_slide").size() != 0){
		slide_AC();
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
	slide.btn_play.click();

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
	slide.btn_play.click();

	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
		if(slide.li.eq(0).is(":animated")) return false;

		var w = -100;

		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.li = slide.ul.find(">li");
			slide.li.eq(0).css("left",w+"%");
			slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,function(){
			});

			w = 0;

			slide.nums = slide.li.eq(0).attr("data-count");
		} else {
			slide.li.eq(1).stop().animate({"left":"0"},slide.speeds,function(){
				slide.li.eq(0).appendTo(slide.ul);
				if(slide.autos == "Y"){
					slide.times = setTimeout(function(){
						movement("right");
					},slide.times_speeds);
				}
			});
			slide.nums = slide.li.eq(1).attr("data-count");
		}
		slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,function(){
			if(ty == "right"){
				slide.li.eq(0).css("left","100%");
			}
		});

		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
}

function slide_type_03(slide){
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
		$('<li><span>'+(i+1)+'번</span></li>').appendTo(slide.controls.find(">ul"));
	}
	slide.simbols = slide.controls.find(">ul>li");
	slide.simbols.eq(0).find(">span").addClass("on");

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

			if(news >= slide.li.size()) news = 0;
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
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

		//심볼
		slide.simbols.find(">span.on").removeClass("on");
		slide.simbols.eq(slide.nums-1).find(">span").addClass("on");
	}
}

function slide_type_04(slide){
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
	
	Board Type Select

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#js_board_type_select").size() != 0){
		board_type_select_AC();
	}
});
function board_type_select_AC(){
	var board = $("#js_board_type_select");
	var vals = "";
	
	for(var i=0; i<board.find(">option").size(); i++){
		obj = board.find(">option").eq(i);
		if($(".board").hasClass(obj.val())){
			obj.prop("selected",true);
		} else {
			obj.prop("selected",false);
		}
	}
	board.change(function(){
		var v = $(this).find(">option:selected").val();
		$(".board *").removeAttr("style");
		$(".board").removeAttr("class").addClass("board").addClass("list").addClass(v);

		if(v == "faq"){
			setTimeout(function(){board_list_faq_AC();},200);
		} else {
			$(".board.list a strong").unbind("click");
			board_list_secret_AC();
		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Board List FAQ

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".board.list.faq").size() != 0){
		board_list_faq_AC();
	}
});

function board_list_faq_AC(){
	var obj = $(".board.list.faq");
		obj.titles = obj.find(" a > strong");
		obj.texts = obj.find(" a .ntt_cn");

	//초기값
	obj.find(" li:eq(1) a > strong").addClass("on");
	obj.find(" li:eq(1) a .ntt_cn").css("display","block");

	obj.titles.click(function(){
		var boxs = $(this).siblings(".ntt_cn");

		if(boxs.is(":hidden")){
			obj.titles.removeClass("on");
			obj.texts.not(":hidden").slideUp(300);
			boxs.siblings("strong").addClass("on");
			boxs.slideDown(300);
		} else {
			obj.titles.removeClass("on");
			boxs.slideUp(300);
		}
	});
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Board List secret

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".board").size() != 0){
		//board_list_secret_AC();
	}
});

function board_list_secret_AC(){
	var obj = $(".board.list a.js_secret");
	var htmls = '';
		htmls += '<div class="js_password_box">';
		htmls += '	<strong>비밀번호 확인</strong>';
		htmls += '	<div>';
		htmls += '		<input type="text" title="비밀번호를 입력해주세요." />';
		htmls += '		<a href="#" class="btn">확인</a>';
		htmls += '	</div>';
		htmls += '</div>';

	if($(".js_password_box").size() == 0){
		$(htmls).prependTo($("body"));
	}
	var pw_box = $(".js_password_box");


	obj.click(function(){
		if(!obj.find(" .js_secret").is(":hidden")){
			blind_on();
			pw_box.fadeIn(200);

			//검색
			pw_box.find(" .btn").click(function(){
				$("#js_board_secret_form").submit();
				return false;
			});

			$("#blind").click(function(){
				pw_box.fadeOut(200,function(){
					blind_off();
				});
			});
			return false;
		}
	});
}





/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	input[type=file] preview Image Function

	ex)
	<input type="file" class="preview" />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_file_preview").size() != 0){
		file_preview_AC();
	}
});

function file_preview_AC(){
	var box = $(".js_file_preview");
	var obj = box.find("input[type=file]");
	var ch = "";

	for(var i=0; i<$(".file_img_preview").size(); i++){
		ch = $(".file_img_preview").eq(i);
		if(ch.html() != ""){
			ch.siblings(".file_img_preview_del").show();
			ch.siblings(".file_name_preview").show().css("left","0px");
		}
	}

	$(".file_img_preview").click(function(){
		$(this).siblings("input:file").click();
	});

	$(".file_img_preview_del").click(function(){
		$(this).siblings("input:file").clone(true).insertAfter($(this).siblings("input:file"));
		$(this).siblings("input:file").eq(0).remove();

		$(this).siblings(".file_img_preview").removeClass("on").removeClass("file").empty();
        $(this).siblings(".file_name_preview").css("left","-300px").text("");
        $(this).siblings("textarea").val("");
        $(this).hide();
		return false;
	});

	obj.change(function(){
		var _this = $(this)[0];
		previewImage(_this);
	});
}

function previewImage(targetObj) {
	var preview = $(targetObj).siblings(".file_img_preview")[0]; //div id   
	var ua = window.navigator.userAgent;

	if (ua.indexOf("MSIE") > -1) {//ie일때

	    targetObj.select();

	    try {
	        var src = document.selection.createRange().text; // get file full path 
	        var img = preview; //이미지가 뿌려질 곳 

	        var imageType = src.split(".");
	        imageType = imageType[imageType.length-1];
	        var file_name = src.split("\\");
	        	file_name = file_name[file_name.length-1];

	        if(imageType != "gif" && imageType != "png" && imageType != "jpg" && imageType != "jpeg" && imageType != "bmp"){
	        	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("file");

	        	if(imageType == "zip") src = "/images/common/icon_preview_zip.gif";
	        	else if(imageType == "ai") src = "/images/common/icon_preview_ai.gif";
	        	else if(imageType == "xls" || imageType == "xlsx") src = "/images/common/icon_preview_xls.gif";
	        	else if(imageType == "ppt" || imageType == "pptx") src = "/images/common/icon_preview_ppt.gif";
	        	else if(imageType == "doc") src = "/images/common/icon_preview_doc.gif";
	        	else if(imageType == "pdf") src = "/images/common/icon_preview_pdf.gif";
	        	else if(imageType == "hwp") src = "/images/common/icon_preview_hwp.gif";
	        	else if(imageType == "psd") src = "/images/common/icon_preview_psd.gif";
	        	else if(
	        		imageType == "wmv" || imageType == "wma" || 
	        		imageType == "mp4" || imageType == "mp3" || 
	        		imageType == "mkv" || imageType == "avi" || 
	        		imageType == "mpeg" || imageType == "mpe" || 
	        		imageType == "asf" || imageType == "asx" || 
	        		imageType == "flv" || imageType == "rm" || 
	        		imageType == "mov" || imageType == "dat" || 
	        		imageType == "ogg" || imageType == "mmf" || 
	        		imageType == "ra" || imageType == "tta"
	        	) src = "/images/common/icon_preview_music.gif";
	        	else src = "/images/common/icon_preview_file.gif";
        	} else {
        		$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("on");
        	}

        	$(targetObj).siblings(".file_img_preview_del").show();
		    $(targetObj).siblings(".file_name_preview").css("left","0px").text(file_name);

			$('<img src="'+src+'" />').appendTo($(img).empty());
	    } catch (e) {
	    	
	    }
	} else { //ie가 아닐때
	    var files = targetObj.files;
	    for ( var i = 0; i < files.length; i++) {

	        var file = files[i];


	        var prevImg = $(preview).find(">img")[0]; //이전에 미리보기가 있다면 삭제
	        if (prevImg) {
	            preview.removeChild(prevImg);
	        }

	        var img = document.createElement("img"); //크롬은 div에 이미지가 뿌려지지 않는다. 그래서 자식Element를 만든다.
	        img.id = "prev_" + i;
	        img.classList.add("obj");
	        img.file = file;
	        
	        preview.appendChild(img);


	        var bytes = file.size/1024;
	        if(bytes >= 1000){
	        	bytes = bytes / 1024;
	        	bytes = bytes.toFixed(1)+"MB";
	    	} else {
	    		bytes = bytes.toFixed(1)+"KB";
	    	}


	        var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
	        if (!file.type.match(imageType)){
	        	//이미지가 아닐때

	        	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("file");
        		$(targetObj).siblings(".file_img_preview_del").show();
        		$(targetObj).siblings(".file_name_preview").css("left","0px").text(file.name+"("+bytes+")");

	        	if(file.type.indexOf("zip") != -1) $(preview).find(">img")[0].src = "/images/common/icon_preview_zip.gif";
	        	else if(file.type.indexOf("postscript") != -1) $(preview).find(">img")[0].src = "/images/common/icon_preview_ai.gif";
	        	else if(file.type.indexOf("spreadsheetml.sheet") != -1) $(preview).find(">img")[0].src = "/images/common/icon_preview_xls.gif";
	        	else if(file.type.indexOf("presentationml.presentation") != -1) $(preview).find(">img")[0].src = "/images/common/icon_preview_ppt.gif";
	        	else if(file.type.indexOf("doc") != -1) $(preview).find(">img")[0].src = "/images/common/icon_preview_doc.gif";
	        	else if(file.type.indexOf("pdf") != -1) $(preview).find(">img")[0].src = "/images/common/icon_preview_pdf.gif";
	        	else if(file.type.indexOf("hwp") != -1) $(preview).find(">img")[0].src = "/images/common/icon_preview_hwp.gif";
	        	else if(
	        		file.type.indexOf("wmv") != -1 || file.type.indexOf("wma") != -1 || 
	        		file.type.indexOf("mp4") != -1 || file.type.indexOf("mp3") != -1 || 
	        		file.type.indexOf("mkv") != -1 || file.type.indexOf("avi") != -1 || 
	        		file.type.indexOf("mpeg") != -1 || file.type.indexOf("mpe") != -1 || 
	        		file.type.indexOf("asf") != -1 || file.type.indexOf("asx") != -1 || 
	        		file.type.indexOf("flv") != -1 || file.type.indexOf("rm") != -1 || 
	        		file.type.indexOf("mov") != -1 || file.type.indexOf("dat") != -1 || 
	        		file.type.indexOf("ogg") != -1 || file.type.indexOf("mmf") != -1 || 
	        		file.type.indexOf("ra") != -1 || file.type.indexOf("tta") != -1
	        	) $(preview).find(">img")[0].src = "/images/common/icon_preview_music.gif";
	        	else $(preview).find(">img")[0].src = "/images/common/icon_preview_file.gif";
	        	
	            continue;
	        } else {
	        	//psd 예외처리
	        	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("file");
        		$(targetObj).siblings(".file_img_preview_del").show();
        		$(targetObj).siblings(".file_name_preview").css("left","0px").text(file.name+"("+bytes+")");

	        	if(file.type.indexOf("photoshop") != -1){
	        		$(preview).find(">img")[0].src = "/images/common/icon_preview_psd.gif";

	        		continue;
	        	}
	        }


	    	$(targetObj).siblings(".file_img_preview").removeClass("on").removeClass("file").addClass("on");
	    	$(targetObj).siblings(".file_img_preview_del").show();
	        $(targetObj).siblings(".file_name_preview").css("left","0px").text(file.name+"("+bytes+")");

	        if (window.FileReader) { // FireFox, Chrome, Opera 확인.
	            var reader = new FileReader();
	            reader.onloadend = (function(aImg) {
	                return function(e) {
	                    aImg.src = e.target.result;
	                };
	            })(img);
	            reader.readAsDataURL(file);
	        } else { 
	        }
	    }
	}
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Site Map Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($("#txt .js_menu").size() != 0){
		sitemap_AC();

		$(window).resize(function(){
			sitemap_AC();
		});
	}
});

function sitemap_AC(){
	var si = $("#txt .js_menu");
		si.li = si.find(">ul>li");
		si.h = 0;

	si.li.removeAttr("style");
	for(var i=0; i<si.li.size(); i++){
		si.h = Math.max(si.li.eq(i).height(),si.h);
	}

	si.li.height(si.h);

	si.h = 0;
	var cnt = 0;
	for(var i=0; i<si.li.size(); i++){
		if(i != 0 && si.li.eq(i).position().left == si.li.eq(0).position().left){
			for(var r=cnt; r<i; r++){
				si.h = Math.max(si.li.eq(r).removeAttr("style").height(),si.h);
			}
			for(var r=cnt; r<i; r++){
				si.li.eq(r).height(si.h);
			}
			si.h = 0;
			cnt = i;
		}
	}
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	input tooltip

	ex)
	<input type="text" class="js_tooltip" title="*성명을 입력해주세요." />

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($(".js_tooltip").size() != 0){
		tooltip_ac();
	}
});
function tooltip_ac(){
	$(".js_tooltip").focus(function(){
		var texts = $(this).attr("title");
		var lefts = $(this).offset().left;
		var tops = $(this).offset().top;

		tip(texts);
		function tip(str){
			if($('.js_layer_tip').size() == 0){
				$('<div class="js_layer_tip">'+str+'</div>').appendTo($("body"));
			} else {
				$('.js_layer_tip').stop().empty().css({"opacity":1});
				$('.js_layer_tip').html(str);
			}
			
			tops = tops-$('.js_layer_tip').innerHeight();
			$('.js_layer_tip').css({"left":lefts+"px","top":tops+"px"})
				.stop()
				.delay(2000)
				.animate({"opacity":0},500,function(){
					$('.js_layer_tip').empty();
				});
		}
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	텍스트에디터

	ex)
	<textarea class="edit 사이트코드">

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	/*
	if($("textarea.edit").size() != 0){
		var site = $.trim($("textarea.edit").attr("class").replace("edit",""));
		textedit(site);
	}
	*/
});
function textedit(site){
	tinymce.init({
		  selector: ".edit",
		  height: 500,
		  language : 'ko_KR',
		  convert_urls: false,
		  force_br_newlines: true,
	      force_p_newlines: false,
	      forced_root_block: false,
	      entities : "",
	    	  cleanup : false,
	    	  verify_html : false,
	    	  remove_trailing_brs: false,
		  
		  protect: [
		             /<( )*col([^>])*?>/g,  //table col
		            /<\/?(span)[^>]*>/g, //span,
		            /<\/?(em)[^>]*>/g //em
		          ],
		  
		  plugins: [
		    "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
		    "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
		    "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker textpattern"
		  ],

		  toolbar1: "styleselect fontselect fontsizeselect | cut copy paste | outdent indent | undo redo | template code preview",
		  toolbar2: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | link unlink anchor image media | insertdatetime | forecolor backcolor | table | subscript superscript | charmap emoticons | print fullscreen | spellchecker | visualchars visualblocks nonbreaking pagebreak restoredraft",

		  menubar: false,
		  toolbar_items_size: 'small',

		  plugin_preview_width : "1000", //This do the trick
	      plugin_preview_height : "600",

	  style_formats: [{
	    title: 'title_01',
	    block: 'h4'
	  }, {
	    title: 'title_02',
	    block: 'h5'
	  }, {
	    title: 'title_03',
	    block: 'h6'
	  }, {
	    title: 'title_04',
	    inline: 'strong',
	    classes: 'h7'
	  }],

	  templates: [{
	    title: 'list_01',
	    content: 
	    '<ul class="list_01">\
		    <li>가나다</li>\
		    <li>가나다</li>\
		    <li>가나다</li>\
	    </ul>'
	  }, {
	    title: 'list_02',
	    content: 
	    '<ul class="list_02">\
		    <li>가나다</li>\
		    <li>가나다</li>\
		    <li>가나다</li>\
	    </ul>'
	  }, {
	    title: 'list_03',
	    content: 
	    '<ul class="list_03">\
		    <li>가나다</li>\
		    <li>가나다</li>\
		    <li>가나다</li>\
	    </ul>'
	  }],
	  content_css: [
	    '/css/core/core.css',
		'/css/common.css',
		'/css/layout.css',
		'/css/contents.css'
	  ]
	  /*
	  content_css: [
	    '/css/core/core.css',
		'/css/'+site+'/skin.css',
		'/css/'+site+'/layout.css',
		'/css/'+site+'/content.css',
		'/css/'+site+'/media.css'
	  ]
	  */
	});

	//컨트롤 추가
	//미리보기
	$("a.preview").click(function(){
		var targets = $("#"+$(this).attr("name")).find(" [aria-label='Preview'] > button");
		targets.click();
		return false;
	});

	//소스코드
	$("a.code").click(function(){
		var targets = $("#"+$(this).attr("name")).find(" [aria-label='Source code'] > button");
		targets.click();
		return false;
	});
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	이미지 맵(반응형)

	ex)
	$('img[usemap]').rwdImageMaps();

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(window).load(function(){
	$('img[usemap]').rwdImageMaps();
});



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	SNS 퍼가기

	ex)
	<a href="#" onclick="facebookOpen();return false;">페이스북</a>
	<a href="#" onclick="twitterOpen();return false;">트위터</a>
	<a href="#" onclick="blogOpen();return false;">블로그</a>

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//blog
function blogOpen(){
	var titl = $("#contents h3").text();
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace ('"', '&quot;');
	titl = encodeURIComponent(titl);
	var link = encodeURIComponent(location.href); 
	var url = "http://blog.naver.com/openapi/share?url=" + link + "&title=" + titl;
	snswindowOpen (url, 900, 450, 'no');
}
//페이스북
function facebookOpen(){
	var titl = $("#contents h3").text();
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace ('"', '&quot;');
	titl = encodeURIComponent(titl);
	var link = encodeURIComponent(location.href); 
	var url = "http://www.facebook.com/sharer.php?u=" + link + "&t=" + titl;
	snswindowOpen (url, 900, 450, 'no');
}
//twitter
function twitterOpen(){
	var titl = $("#contents h3").text();
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace('&gt;','>');
	titl = titl.replace('&gt;','>');
	titl = encodeURIComponent(titl);
	var link = encodeURIComponent(location.href); 
	var url = "http://twitter.com/share?text=" + titl + "&url=" + link;
	snswindowOpen (url, 800, 400, 'yes');
}
function snswindowOpen(){
	var nUrl; var nWidth; var nHeight; var nLeft; var nTop; var nScroll;
	nUrl = arguments[0];
	nWidth = arguments[1];
	nHeight = arguments[2];
	nScroll = (arguments.length > 3 ? arguments[3] : "no");
	nLeft = (arguments.length > 4 ? arguments[4] : (screen.width/2 - nWidth/2));
	nTop = (arguments.length > 5 ? arguments[5] : (screen.height/2 - nHeight/2));
	winopen=window.open(nUrl, 'SNS', "left="+nLeft+",top="+nTop+",width="+nWidth+",height="+nHeight+",scrollbars="+nScroll+",toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no");
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	Q&A

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	js_qna ();
});
function js_qna(){
var qna_obj = $(".qna_list > li > a");	
	qna_obj.click(function(){
		qna_obj.not(this).next().slideUp(300);
		qna_obj.not(this).removeClass("on");
		$(this).toggleClass("on");
		$(this).siblings(".answer").slideToggle(300);
		return false;
	});
}





