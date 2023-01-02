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
	$(".header_mobile .btn_nav, .header_mobile .mask, .all_nav_wrap .btn_close").on("click",function(){
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