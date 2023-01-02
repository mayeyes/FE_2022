

$(document).ready(function() {  
	if($(".btn-group.setting").size() != 0){
		sec05_setting ();	
	}
});
function sec05_setting (){
    $(".visual-wrap #sec05 .t_line .con_bx >div.btn-group .btn").click(function(){
        
        $(this).parent().addClass("active");
        return false;
    });
    
    $(".visual-wrap #sec05 .t_line .con_bx >div.btn-group.setting  .close_btn").click(function(){
        $(this).parents(".setting.active").removeClass("active");
        return false;
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
		buttonImage: "images/icon_cal.gif",  
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
		firstDay: 0,
		autoSize:true
	});
	$('#ui-datepicker-div').hide();
}

$(document).ready(function(){
	if($(".js_cal").size() !=0){
		setTimeout(function(){
		dataTime();
		},100);
	}
});


/**
 * 
 * datetime
 * @returns
 */

function fromdatepicker(){
	if($('.from-date-picker').size() == 0) return false;
	$('.from-date-picker').datetimepicker({
        dateFormat: 'yy-mm-dd',
        timeFormat: 'HH:mm',
        showOn: "both",
		buttonImage: "images/icon_cal.gif",  
		buttonImageOnly: true,
		buttonText:"달력선택",
        timeInput: true,
        stepHour: 1,
        stepMinute: 1,
		stepSecond: 1,
		currentText: '현재',
		closeText: '닫기',
		timeText:'시간',
		hourText:'시',
		minuteText:'분',
		millisecText:'밀리초',
		microsecText:'마이크로초',
		timezoneText:'타임존'
    });
	$('#ui-datepicker-div').hide();
}

function fromDateTimePicker () {
	if($('.from-datetime-picker').size() == 0) return false;
	$('.from-datetime-picker').datetimepicker({
		dateFormat: 'yy-mm-dd',
		timeFormat: 'HH:mm:ss',
		showOn: "both",
		buttonImage: "images/icon_cal.gif",  
		buttonImageOnly: true,
		buttonText:"달력선택",
		timeInput: true,
		stepHour: 1,
		stepMinute: 1,
		stepSecond: 1,
		currentText: '현재',
		closeText: '닫기',
		timeText:'시간',
		hourText:'시',
		minuteText:'분',
		secondText: '초',
		millisecText:'밀리초',
		microsecText:'마이크로초',
		timezoneText:'타임존'
	});
	$('#ui-datepicker-div').hide();
}

$(document).ready(function(){
	setTimeout(function(){
		fromdatepicker();
		fromDateTimePicker();
	},100);
});

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   footer select

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	footer_select_AC();
});
function footer_select_AC(){
	var obj = $('.footer [data-js="select"]'); 
		obj.btn = obj.find(">a");
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

    Data Count

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
   countdown();
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


$(function(){
    var obj = $("header >ul > li");
    for(var i=0; i<obj.size(); i++){
        console.log(i,obj.eq(i).find(">a").text());
        obj.eq(i).find(">a").clone(false).prependTo(obj.eq(i).find(">div"));

    }
    
    $(window).scroll(function () {
		var winTop = $(this).scrollTop();
		var headerTop = $(".header").height();
		
			if (winTop > headerTop) {
				$(".header ").addClass("fixed");	
			} else if (winTop <= headerTop) {
				$(".header ").removeClass("fixed");	
			}
	});
    
    
    
    
    /*var nav = document.getElementById('nav');
    var tmp = nav.cloneNode(true);
    tmp.style.visibility = 'hidden';
    var rectTop = nav.getBoundingClientRect().top;

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > rectTop) {
        nav.parentNode.appendChild(tmp);
        nav.style.position = 'fixed';
        nav.style.top = 0;
      } else {
        nav.parentNode.removeChild(tmp);
        nav.style.position = 'relative';
        nav.style.top = '';
      }
    });*/
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
		
	code[0] = parseInt(params.substr(0,2)) -1; //eq(n) n번지수 찾기
	code[1] = parseInt(params.substr(2,2)) -1; //eq(n) n번지수 찾기
	code[2] = parseInt(params.substr(4,2)) -1; //eq(n) n번지수 찾기	
	
	//PC	  
	var gnb_obj = $("header");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">ul>li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">div>ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("header"); 
		gnb_obj.blind = $("header #blind"); 
	
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
		$(this).parent().siblings("a").addClass("on");
		gnb_obj.li.find(">div").not($(this)).removeClass("on");
		$(this).addClass("on");
	});
	
	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		var idx = $(this).parent().parent().parent().index();

		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).parent().parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find("div.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});	
	
	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
	
	function gnb_def(){
		$(".header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">div.on").removeClass("on");
		gnb_obj.li.find(">div").stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":64+"px"},200);
		gnb_obj.blind.stop().animate({"height":0+"px"},200);
		
		
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
		$(".header").addClass("on");	
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");	
		gnb_obj.li.find(">div.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">div").addClass("on");
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">div").removeAttr("style").innerHeight());
		}
		gnb_obj.li.find(">div").innerHeight(gnb_obj.maxH -2).show().stop().animate({"opacity":1},200);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH)+"px"},200);
		gnb_obj.blind.stop().animate({"height":(gnb_obj.maxH)+"px"},200);
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
			$(this).toggleClass("on").siblings("ul").slideToggle(200);
			return false;	
		} else {
			return true;	
		}
	});
}

