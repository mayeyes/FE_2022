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
	
	gnb_obj.h.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},200);
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
		$(this).parent().parent().parent().siblings("a").addClass("on");
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
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},200);
		gnb_obj.blind.stop().animate({"height":0+"px"},200);
		if(!$("#header .searchs").is(":hidden")){
			$('#shadow').show();
			$('body#main #header').addClass("on");
		} else{
			$('#shadow').hide();
			$('body#main #header').removeClass("on");
		}
		
		
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
		$('#shadow').show();
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight()+50);
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH).show().stop().animate({"opacity":1},300);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + gnb_obj.li.a.innerHeight())+"px"},300);
		gnb_obj.blind.stop().animate({"height":gnb_obj.maxH+"px"},300);
	}
	
	
	//slide_map
	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div></div></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));
	$('#header>.head_top>.opbx').clone(false).appendTo($("#slide_map >.inner > .binds"));
	$('<div class="head"><a href="#" class="close">닫기</a></div>').prependTo($("#slide_map >.inner > .binds"));

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
			i.addClass("child");	
		}	
	});
	
	
	mob_def();
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
	$(window).resize(function(){
		if(!$(".js_mobile_check").is(":hidden")){
			//Mobile일떄
			// mob_open();
		} else{
			mob_def();
		}
	});
	
	function mob_open(){
		mob_gnb_obj.box.gnb.ul.li.eq(0).find(" >a").addClass("on");
		mob_gnb_obj.box.gnb.ul.li.eq(0).find(" >ul").show();
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
	mob_open();
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	$(".allmenu_btn").click(function() {
		if($("#slide_map").is(":hidden")){		
			$("body").addClass("fixed");
			$("#slide_map").fadeIn(300).focus();
			
			if(!$(".js_mobile_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"right":0},300);	
			}
		}
		
		return false;
	});

	$(document).click(function(e) { 
	    if($(e.target).parents("#slide_map").size() != 0) {
	         //메뉴 안
	    } else {
	        //밖
	        if(!$(".js_mobile_check").is(":hidden")){
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
	});
	
	$(window).resize(function() {
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"right":0});
		}		
	});
});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Header function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	Open_link_AC();	 //유관기관
	search_Pop_AC();  //헤더 검색
});

function Open_link_AC(){
	var obj = $('#header .head_top>.opbx');
	obj.hide();

	$('#header .head_top>.opbtn').click(function(){
		$(this).toggleClass("on");
		if($(this).hasClass("on")){
			obj.fadeIn(200);
		} else{
			obj.fadeOut(200);
		}
		return false;
	});
}

function search_Pop_AC(){
	$('#header>.searchs').hide();

	$('#header .head_top>.search_btn').click(function(){
		$('#shadow').show();
		$('#header>.searchs').fadeIn(200);
		$('#header').addClass("on");
		return false;
	});
	$('#header>.searchs>.close').click(function(){
		$('#shadow').hide();
		$('#header>.searchs').fadeOut(200);
		$('#header').removeClass("on");
		return false;
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	layout function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){  
	Sns_AC();  //sns 공유
	//top 버튼
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

	첨부파일 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){

	var fileTarget = $('[data-skin="file"] .upload-hidden');

	fileTarget.each(function(index) { 
	if($(this).siblings('.upload-name').val()!='null' && $(this).siblings('.upload-name').val()!=''){
		$(this).siblings('.upload-name').next().css("display","inline-block");
		}
	});

	fileTarget.on('change', function(){
		if(window.FileReader){
			// 파일명 추출
			var filename = $(this)[0].files[0].name;
		}else {
			// Old IE 파일명 추출
			var filename = $(this).val().split('/').pop().split('\\').pop();
		};

		$(this).siblings('.upload-name').val(filename);

		if($(this).siblings('.upload-name').val()!='null' && $(this).siblings('.upload-name').val()!=''){
		$(this).siblings('.upload-name').next().css("display","inline-block");
		}
	});

});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	popup Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($('a[data-popup]').size() != 0){
		dataPopup_AC();//탐색
	}
});
function popup_open_AC(str){
	var btn = $('a[data-popup="'+str+'"]');
	var box = $('[data-skin="popup"][data-name="'+str+'"]');
		box.btn_no = box.find(" .btnbx>a.no");
		box.btn_ok = box.find(" .btnbx>a.ok");
		box.c = box.find(" .btn_close");

	box.hide();
	btn.click(function(){ box.fadeIn();	return false; });
	box.btn_ok.click(function(){ box.fadeOut(); return false; });  //확인
	box.btn_no.click(function(){ box.fadeOut(); return false; });  //취소
	box.c.click(function(){ box.fadeOut(); return false; });  //닫기

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
	if($('[data-skin="tab"]').size() != 0){
		tab_mobile();
		$(window).resize(function(){
			tab_mobile();
		});
	}
});

function tab_mobile(){
	var win_wid = $(window).width();
	var tab = $('[data-skin="tab"]');
		tab.ul = tab.find(">ul");
		tab.li = tab.find(">ul>li");
		tab.on = tab.find(">ul>li.on");
		tab.a = tab.li.find(">a");
	
	
	if(tab.find(">.title").size() == 0){
		$('<strong class="title"></strong>').prependTo(tab);
	}
	tab.ti = tab.find(">.title");
	tab.ti.html(tab.on.find(">a").clone());
	tab.btn = tab.ti.find(">a");
	
	tab.btn.click(function(){
		if(tab.ul.is(":hidden")){
			tab.ul.slideDown(200);
		} else {
			tab.ul.slideUp(200);
		}
		return false;
	});

	tab.a.click(function(){
		if(tab.hasClass("select")){
			tab.ul.slideUp(200);
			tab.find(">ul>li.on").removeClass("on");
			$(this).parent().addClass("on");
			tab.on = tab.find(">ul>li.on");
			tab_mobile_set(tab);
		}
	});
	
	if(win_wid <= 640){
		if(tab.hasClass("select")) return false;
		tab.addClass("select");		
	} else {
		if(!tab.hasClass("select")) return false;
		tab.removeClass("select");
		tab.ul.removeAttr("style");
	}
	
}

function tab_mobile_set(tab){
	
	var ti = tab.find(">.title");
	
	ti.html(tab.on.find(">a").clone());
	tab_mobile();
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	연구보고서 탭이동

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
	tab_view_AC();
});

function tab_view_AC(){
	var obj = $('#report .report_view .tabbx .tab_view');
	var btn = $('#report .report_view .tabbx .tab_btn>li>a');

	obj.hide().eq(0).show();
	btn.click(function(){
		btn.parent().removeClass("on");
		$(this).parent().addClass("on");

		var idx = $(this).parent().index();
		obj.hide().eq(idx).show();

		return false;
	});
}