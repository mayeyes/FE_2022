/*
 ★ Coding By DumiCode
 ★ homepage: http://www.dumicode.com
*/
$(function(){

	//util mouse hover
	$(".header_pc .util .link_area").on("mouseenter",function(){
		$(this).addClass("active");
	});
	$(".header_pc .util .link_area").on("mouseleave",function(){
		$(this).removeClass("active");
	});
	//util tab focus
	$(".header_pc .util .link_area a").on("focus",function(){
		$(this).parents(".link_area").addClass("active");
	});
	$(".header_pc .the_logo, #pcLogin2 .link").on("focus",function(){
		$("#pcLogin1").removeClass("active");
	});
	$("#pcLogin1 a, .header_pc .util .btn").on("focus",function(){
		$("#pcLogin2").removeClass("active");
	});

	//GNB PC
	$("#gnb > li a").on("mouseenter focus",function(){
		$("#gnb > li").not($(this).parents("#gnb > li")).removeClass("active");
		$(this).parents("#gnb > li").addClass("active");
	});
	$("#gnb > li").on("mouseleave",function(){
		$(this).removeClass("active");
	});
	$(".header_pc .banner, .btn_allmenu").on("focus",function(){
		$("#gnb > li").removeClass("active");
	});

	//NAV MOBILE
	$(".header_mobile .btn_nav, .header_mobile .mask, .all_nav_wrap .btn_close, .all_nav_wrap .mobile-gnb-close").on("click",function(){
		$(".header_mobile .btn_nav").toggleClass("open");
	});
	

	$("#all_nav > li > a").on("click", function(){
		$("#all_nav > li > a").not($(this)).removeClass("active");
		$("#all_nav .in_depth_menu > li > a").removeClass("active");
		$(this).toggleClass("active");
	});
	$("#all_nav .in_depth_menu > li > a").on("click", function(){
		$("#all_nav .in_depth_menu > li > a").not($(this)).removeClass("active"); //다른영역클릭시 기존영역 닫김
		$(this).toggleClass("active");
	});
	$("#all_nav > li:eq(0) > a").addClass("active");



	//search mobile
	$(".btn_sc_toggle").on("click",function(){
		$(this).toggleClass("open");
	});


	//lnb
	$("#lnb > ul > li > a").on("click",function(){
		$("#lnb > ul > li").not($(this).parent("li")).removeClass("active");
		$(this).parent("li").toggleClass("active");
	});


	//mobile_locat
	if($(".mobile_locat > ul > li").length < 3)
	{
		$(".mobile_locat > ul").css("padding-right","33.3%");
	}
	
	$(".mobile_locat > ul > li > a").on("click",function(){
		$(".mobile_locat > ul > li").not($(this).parent("li")).removeClass("active");
		$(this).parent("li").toggleClass("active");
	});


	//foot banners
	var footBnSwiper = new Swiper('.foot_banners .swiper-container',{
		autoplay: 4000,
		slidesPerView: 6,
		prevButton:'.foot_banners .swiper-button-prev',
		nextButton:'.foot_banners .swiper-button-next',
		roundLengths:true, 
		onInit: function(swiper){
			$(".foot_banners .stop").on("click",function(){
				swiper.stopAutoplay();
				$(".foot_banners .stop").hide();
				$(".foot_banners .play").show();
			});
			$(".foot_banners .play").on("click",function(){
				swiper.startAutoplay();
				$(".foot_banners .play").hide();
				$(".foot_banners .stop").show();
			});
		},
		breakpoints: {
			1279: {
				slidesPerView: 4,
			},
			1023: {
				slidesPerView: 3,
			},
        },
	});
	$(".foot_banners .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			footBnSwiper.slideTo(index);
		});
	});
	
	$(".foot_banners .swiper-button-prev").on("click",function(){
		$(".foot_banners .stop").hide();
		$(".foot_banners .play").show();
	});
	$(".foot_banners .swiper-button-next").on("click",function(){
		$(".foot_banners .stop").hide();
		$(".foot_banners .play").show();
	});

});

//popup 이전페이지 연동
function popPrev(txtFocus,ts) {
	
	$(ts).parents('.layerpop').hide(); // 현재팝업 숨김
	$('[data-tooltip-con="' + txtFocus + '"]').show().focus(); // 이전팝업 노출 & 포커스
}
//popup 다음페이지 연동
function popNext(txtFocus,ts) {
	/*
		이전팝업 내용체크 판단할곳
	*/
	$(ts).parents('.layerpop').hide(); // 이전팝업 숨김
	/*
		ajax 내용 컨트롤 영역
	*/
	$('[data-tooltip-con="' + txtFocus + '"]').show().focus(); // 다음팝업 노출 & 포커스
}

//popup 접근성 관련 포커스 강제 이동
var thisFocus;

function accessibilityFocus() {
	$(document).on('keydown', '[data-focus-prev], [data-focus-next]', function(e){
		var next = $(e.target).attr('data-focus-next'),
		prev = $(e.target).attr('data-focus-prev'),
		target = next || prev || false;

		if(!target || e.keyCode != 9) { return; }

		if( (!e.shiftKey && !!next) || (e.shiftKey && !!prev) ) {
			setTimeout(function(){
				$('[data-focus="' + target + '"]').focus();
			}, 1); 
		}
	}); 
}

function tooltip() {
	var openBtn = '[data-tooltip]',
	closeBtn = '.tooltip-close';
	
	function getTarget(t) {
		return $(t).attr('data-tooltip');
	}
	
	function open(t) {
		var showTarget = $('[data-tooltip-con="' + t + '"]');
		showTarget.show().focus();
		//showTarget.find('.tooltip-close').data('activeTarget', t);
	}
	
	function close(t) {
		t.parents(".layerpop").hide();
		thisFocus.focus();
	}

	$(document).on('click', openBtn, function(e){
		e.preventDefault();
		thisFocus = $(this);
		open(getTarget(this));
	}) .on('click', closeBtn, function(e) {
		e.preventDefault();
		close($(this));
	});
}
$(document).ready(function(){
	tooltip();
	accessibilityFocus();
});


// 추가
var shift = false;
$(document).ready(function(){
    $(document).keydown(function(event){
        if(event.keyCode == 16 && shift != true) shift = true;
    });
    $(document).keyup(function(event){
        if(event.keyCode == 16) shift = false;
    });
});
var _layout = {
	login:function(str){
		var obj = str;
			obj.btn = obj.find(">.head>a");
			obj.btnCheck = obj.find(">.midd a").last();
		var controll = {
			open:function(){
				var c = (obj.attr('data-sw') !== "on") ? "on":"off"; 
				obj.attr('data-sw',c);
				if(obj.attr('data-sw') !== "on"){
					obj.find(">.midd").slideUp(200);
				} else {
					obj.find(">.midd").slideDown(200);
				}
			},
			close:function(){
				obj.attr('data-sw','off');
				obj.find(">.midd").slideUp(200);
			}
		}

		obj.btn.on("click",function(){controll.open();return false;});
		obj.btnCheck.on("keydown",function(event){
			if(!shift && event.keyCode === 9){
				controll.close();
			}
		});
		obj.btn.on("keydown",function(event){
			if(shift && event.keyCode === 9){
				controll.close();
			}
		});
	},
	search:function(str){
		var obj = str;
			obj.box = $(".search_box");
			obj.t = obj.box.find(">.in input:text");
			obj.btnClose = obj.box.find(" .btn_search-close");
		var controll = {
			open:function(event){
				var c = (obj.attr('data-sw') !== "on") ? "on":"off"; 
				obj.attr('data-sw',c);
				obj.box.focus();
			},
			close:function(){
				obj.attr('data-sw','off');
				obj.focus();
				return false;
			}
		}
		obj.on("click",function(){controll.open();return false;});
		obj.btnClose.on("click",function(){controll.close();return false;});
	},
	popup:function(str){
		var obj = str;
			obj.box = $(".main_pop_wrap");
			obj.lastFocus = obj.box.find(" .btn_close");
		var controll = {
			open:function(){
				var c = (obj.attr('data-sw') !== "on") ? "on":"off"; 
				obj.attr('data-sw',c);
				if(c==="on"){
					obj.box.slideDown(200,function(){obj.box.find(" a").first().focus();});
					
				} else {
					obj.box.slideUp(200);
					obj.focus();
				}
			}
		}
		if($("#lnb").size() !== 0){
			obj.attr('data-sw','off');
			obj.box.slideUp(200);
		} else {
			controll.open();
		}
		obj.on("click",function(){controll.open();return false;});
		obj.lastFocus.on("click",function(){controll.open();return false;});
		obj.lastFocus.on("keydown",function(event){
			if(!shift && event.keyCode === 9){
				obj.box.focus();
			}
		});
	},
	topScroll:function(str){
		var obj = str;

		$(window).on("scroll",function(){
			var c = ($(this).scrollTop() < 30) ? "off":"on";
			obj.attr("data-sw",c);
		});
		obj.on("click",function(){
			$("html,body").animate({"scrollTop":"0"},500);
			return false;
		});
	},
	init:function(){
		if($(".login-select").size() !== 0) this.login($(".login-select"));//상단 로그인 셀렉트박스
		if($(".search-btn").size() !== 0) this.search($(".search-btn"));//상단 검색 버튼
		if($(".popup-select").size() !== 0) this.popup($(".popup-select"));//상단 popup 버튼
		if($("#footer .btn_top").size() !== 0) this.topScroll($("#footer .btn_top"));//상단 이동 버튼
	}
}
var _layoutMobile = {
	search:function(str){
		var obj = str;
			obj.box = obj.siblings(".search_box");
			obj.btnClose = obj.box.find(" .btn_search-close");

		obj.btnClose.on("click",function(){obj.trigger("click"); return false;});
	},
	sns:function(str){
		var obj = str;
			obj.box = obj.find(">ul");
			obj.btnOpen = obj.find(" .sns-btn");
			obj.btnClose = obj.find(" .sns-btn-close");
		var controll = {
			open:function(){
				obj.btnOpen.hide();
				obj.btnClose.show();
				obj.box.css("display","flex");
			},
			close:function(){
				obj.btnOpen.show();
				obj.btnClose.hide();
				obj.box.css("display","none");
			}
		}
		obj.btnOpen.on("click",function(){controll.open(); return false;});
		obj.btnClose.on("click",function(){controll.close(); return false;});
	},
	init:function(){
		if($(".btn_sc_toggle").size() !== 0) this.search($(".btn_sc_toggle"));//상단 검색
		if($("#sns").size() !== 0) this.sns($("#sns"));//상단 검색
		
	}
}
$(function(){
	_layout.init();
	_layoutMobile.init();
});