$(document).ready(function() {
	lang_ev(); // lang_site
	/*search_ev();*/ // total_search
	mobile_gnb(); // Mobile GNB Menu
	footer_ev (); // footer_m
	toggle_ev (); //toggle_ev
    popup_slide ();
	
	$(window).resize(function(){	
		if($("#rwd_header").is(":hidden")){
			$("#wrap>*").css("left","0px");	
			$(".shadow_bg").fadeOut(200);
		}
	});
	
	$(".search_btn").click(function(){
		$(this).find(">a").css({"background":"#4e5865 url(/images/kor/common/total_search_bg.png) no-repeat center 50%"});
		$(".search_input_rwd").stop().show();
		$(".search_input_rwd").find("#search_rwd").focus();	
	});
	
	$(".search_input_rwd .close_btn").click(function(){
		$(".search_btn").find(">a").css({"background":"#1a8dca url(/images/kor/common/total_search_bg.png) no-repeat center 50%"});
		$(".search_input_rwd").stop().hide();	
	});	
});

// lang_site
function lang_ev (){
	var lang = $(".lang");
		lang.dt = lang.find(">dt>a");
		lang.dd = lang.find(">dd");
		lang.btn = lang.find(">dd>.close");
		
	lang.dt.bind("click touchstart",function(e){
		e.preventDefault();
		$(this).parent().next().stop().show();
	});	
	
	lang.btn.bind("click touchstart",function(e){
		e.preventDefault();
		$(this).parent().stop().hide();
		lang.dt.focus();
	});
	
	lang.dd.mouseleave(function(e){
		e.preventDefault();
		$(this).stop().hide();
	});	
}

// total_search
function search_ev (){
	var total_search = $(".total_search");
		total_search.btn = total_search.find(">.btn");
		total_search.input = total_search.find(">.search_input");
		
	total_search.btn.bind("click touchstart",function(e){
		e.preventDefault();
		$(this).next().stop().show();	
		$(this).next().find("#total_search").focus();
		$(this).stop().hide();
	});
	
	total_search.input.bind("mouseleave",function(){
		$(this).prev().stop().show();	
		$(this).stop().hide();
	});	
}

// Mobile GNB Menu
$(function() {
	mobileMenu();
	function mobileMenu(){
		$(".depth1 h2").click(function(e){
			e.preventDefault();
			$(".depth1 h2").not(this).removeClass("on").next().slideUp();
			$(this).toggleClass("on").next().slideToggle();
			$(".depth2 h3").not(this).next().slideUp();
		});
		$(".depth2 h3").click(function(e){
			//e.preventDefault();
			if($(this).next().length != 0){
				e.preventDefault();
				$(".depth2 h3").not(this).removeClass("on").next().slideUp();
				$(this).toggleClass("on").next().slideToggle();	
			}
		});
	};
});

function mobile_gnb(a,b,c){
	$('#rwd_header .gnb_btn').click(function(){
		var wrapHeight = $('#wrap').outerHeight();  
		$('.rwd_gnb').css('height',wrapHeight);
		$('#wrap>*').animate({'left':220},0);
		$('.rwd_gnb').css('left',0);
		$(".shadow_bg").fadeIn(200);
		return false;
	});
	
	$("#rwd_header .shadow_bg").click(function(){
		$("#wrap>*").animate({"left":0},0,function(){
				$(".depth1").find(".on").removeClass("on");
				$(".depth2, .depth3").hide();
				$(".depth1>li").eq(a-1).find("h3").addClass("on").next().show().children("li").eq(b-1).find(".depth3").show().children("li").eq(c-1).addClass("on");
			});
		$('.rwd_gnb').css('left',-220);
		$(".shadow_bg").delay(400).fadeOut(200);
		return false;
	});	
}

// footer_m
function footer_ev (){
	$(".rwd_footer_btn").bind("click touchstart",function(e){
		e.preventDefault();
		$(".footer_m").stop().slideToggle(200);
		$(this).toggleClass("over");
	});
	
	$(window).resize(function(){	
		var win_width = $(window).width();
		if(win_width > 983){
			if($(".footer_m").is(":hidden")){
				$(".footer_m").stop().show();	
			}
		} else {
			$(".rwd_footer_btn").removeClass("over");
			$(".footer_m").stop().hide();
		}
	});
}


//toggle_ev
function toggle_ev (){
	var toggle_list = $(".open-hide > li > a");	

	toggle_list.click(function(){
		toggle_list.not(this).removeClass("open");
		$(this).toggleClass("open");
		toggle_list.not(this).next().slideUp();
		$(this).next().slideToggle();
	});
}


// lnb
function leftmenu(){
	var param = $(".lm_2th");
	var btn = param.find(">li>a");
	var hide_obj = btn.next();
	var show_obj = param.find(".ov").next();

	param.find(">li").first().addClass("first");

	hide_obj.hide();
	show_obj.show();

	btn.bind("click",function(event){
		var t = $(this);
		if(t.attr("href") == "#none"){ // 메뉴 URL을 #none 으로 설정하면
			btn.attr("class","link_2th").next().hide();
			t.attr("class","ov").next().show();
			event.preventDefault();
		}
	});

	// border 도 포함된다. 따라서 border 만큼 감소시켜 적용
	function lnbwrap(){
		$("#lnbwrap").width($("#lnb").width()-1);
	}

	$(window).resize(function(){ lnbwrap(); });
	$(window).scroll(function(){ lnbwrap(); });
}

// popup
function popup_slide (){
	var bannerNum = 0;
	
	var banner_intervalID = 0;
	var banner_intervalNum = 3000;
	var banner_isPlayNext  = false;
	var banner_isMovePlay  = false;
	var banner_isStopEvent = false;
		
	$(document).ready(function() {
		bannerNum = $("#slide_pop_list li").size();
		
		if(bannerNum == 0){
			$("#open_popup_wrap").hide();
		} else {
			//오픈시 열고 닫기
			/*
			$(".open_popup").hide();
			$(".open_popup").delay(400).slideDown(400,function(){
				$(".open_popup").delay(400).slideUp(400);
				$("#open_popup_wrap .close_btn").hide();
				$("#open_popup_wrap .open_btn").show();
			});
			*/
		}
			
		//if (bannerNum <= 2 && bannerNum > 0) {
		//	$(".prev_btn").hide();
		//	$(".next_btn").hide();
		//} else {		
			//banner_intervalID = setInterval(banner_fadeStart, banner_intervalNum);
		


			$(".open_popup .prev_btn").click(function(event){
				$("#slide_pop_list li:first").css("display", "none");
				$("#slide_pop_list li:first").appendTo( $("#slide_pop_list") );
				$("#slide_pop_list li:last").fadeIn(0);
				
				banner_isPlayNext = false;
				banner_isMovePlay = true;
				event.preventDefault();	
			}).mouseenter(function() {
				//clearInterval(banner_intervalID);
			}).mouseleave(function() {
				//banner_intervalID = setInterval(banner_fadeStart, banner_intervalNum);
			});
		
			$(".open_popup .next_btn").click(function(event){
				$("#slide_pop_list li:last").fadeOut(0,function() {
					$(this).prependTo( $("#slide_pop_list") );
					$("#slide_pop_list li:first").css("display", "block");
				})
				banner_isPlayNext = true;
				banner_isMovePlay = true;
				event.preventDefault();	
			}).mouseenter(function() {
				clearInterval(banner_intervalID);
			}).mouseleave(function() {
				//banner_intervalID = setInterval(banner_fadeStart, banner_intervalNum);
			});
		//};		
		
			$("#slideBtn .close_btn").click(function(event){
				event.preventDefault();	
				$(this).hide();
				$("#slideBtn .open_btn").show();
				$("#open_popup_wrap").slideUp(300,function(){
					$("#open_popup_wrap").css("height", "0");	
				});	
			});	
			
			$("#slideBtn .open_btn").click(function(event){
				event.preventDefault();	
				$(this).hide();
				$("#slideBtn .close_btn").show();
				$("#open_popup_wrap").slideDown(300,function(){
					$("#open_popup_wrap").css("height", "126px");	
				});
			});
			//		$("#open_popup_wrap .close_btn").click(function(event){
			//			event.preventDefault();	
			//			$(this).hide();
			//			$("#open_popup_wrap .open_btn").show();
			//			$(".open_popup").slideUp(300,function(){
			//				$(".open_popup").css("display", "none");	
			//			});	
			//		});	
			//		
			//		$("#open_popup_wrap .open_btn").click(function(event){
			//			event.preventDefault();	
			//			$(this).hide();
			//			$("#open_popup_wrap .close_btn").show();
			//			$(".open_popup").slideDown(300,function(){
			//				$(".open_popup").css("display", "block");	
			//			});
			//		});
	});
	
	function fadeBannerStart() {	
		$(".popup_box li:last").fadeOut("slow",function() {
			$(this).prependTo( $(".popup_box") );
			$(".popup_box li:first").css("display", "block");
		})
	}
	
	function banner_fadeStart() {
		if (banner_isPlayNext) {
			$("#slide_pop_list li:last").fadeOut("fast",function() {
				$(this).prependTo( $("#slide_pop_list") );
				$("#slide_pop_list li:first").css("display", "block");
			})
		} else {
			/*
			$("#slide_pop_list li:first").css("display", "none");
			$("#slide_pop_list li:first").appendTo( $("#slide_pop_list") );
			$("#slide_pop_list li:last").fadeIn("fast");
			*/
		}
	}	
}	