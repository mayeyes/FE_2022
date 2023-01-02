const { unstable_renderSubtreeIntoContainer } = require("react-dom");

/*
 ★ Coding By DumiCode
 ★ homepage: http://www.dumicode.com
*/
$(function(){

	$('.header_pc #gnb > li').css('width','25%');
	
	//main visual
	var mvisualSwiper = new Swiper('.main_visual .swiper-container',{
		autoplay: 4000,
		loop : true,
		centeredSlides : true,
		slidesPerView: 2,
		pagination : '.main_visual .swiper-pagination',
		paginationClickable :true,
		prevButton:'.main_visual .swiper-button-prev',
		nextButton:'.main_visual .swiper-button-next',
		onInit: function(swiper){
			$(".main_visual .count .active").text(swiper.realIndex + 1);
			$(".main_visual .count .total").text(swiper.slides.length - 4);
			$(".main_visual video").load();
			$(".main_visual .swiper-slide").removeAttr("aria-hidden");
			$(".main_visual .swiper-slide-duplicate").attr("aria-hidden",true);
			$(".main_visual .swiper-slide a, .main_visual .swiper-slide .btn").attr("tabindex","-1");
			$(".main_visual .swiper-slide-active a, .main_visual .swiper-slide-active .btn").attr("tabindex","0");
		},
		onSlideChangeStart: function(swiper){
			$(".main_visual .count .active").text(swiper.realIndex + 1);
			$(".main_visual .count .total").text(swiper.slides.length - 4);
			$(".main_visual .swiper-slide").removeAttr("aria-hidden");
			$(".main_visual .swiper-slide-duplicate").attr("aria-hidden",true);
			$(".main_visual .swiper-slide a, .main_visual .swiper-slide .btn").attr("tabindex","-1");
			$(".main_visual .swiper-slide-active a, .main_visual .swiper-slide-active .btn").attr("tabindex","0");
			$(".main_visual video").not(".main_visual .swiper-slide-active video").load();
		},
		breakpoints: {
			1279: {
				centeredSlides : false,
				slidesPerView: 1,
				onInit: function(swiper){
					$(".main_visual .count .active").text(swiper.realIndex + 1);
					$(".main_visual .count .total").text(swiper.slides.length - 2);
					$(".main_visual video").load();
					$(".main_visual .swiper-slide").removeAttr("aria-hidden");
					$(".main_visual .swiper-slide-duplicate").attr("aria-hidden",true);
					$(".main_visual .swiper-slide a, .main_visual .swiper-slide .btn").attr("tabindex","-1");
					$(".main_visual .swiper-slide-active a, .main_visual .swiper-slide-active .btn").attr("tabindex","0");
				},
				onSlideChangeStart: function(swiper){
					$(".main_visual .count .active").text(swiper.realIndex + 1);
					$(".main_visual .count .total").text(swiper.slides.length - 2);
					$(".main_visual .swiper-slide").removeAttr("aria-hidden");
					$(".main_visual .swiper-slide-duplicate").attr("aria-hidden",true);
					$(".main_visual .swiper-slide a, .main_visual .swiper-slide .btn").attr("tabindex","-1");
					$(".main_visual .swiper-slide-active a, .main_visual .swiper-slide-active .btn").attr("tabindex","0");
					$(".main_visual video").not(".main_visual .swiper-slide-active video").load();
				},
			},
        },
	});
	$(".main_visual .swiper-slide a, .main_visual .swiper-slide .btn").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mvisualSwiper.slideTo(index);
		});
	});

	//main tab slide
	//all
	var mtsAllSwiper = new Swiper('#mts_all .swiper-container',{
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetBefore : 40,
		slidesOffsetAfter : 40,
		pagination : '#mts_all .swiper-pagination',
		paginationClickable :true,
		prevButton:'#mts_all .swiper-button-prev',
		nextButton:'#mts_all .swiper-button-next',
		onInit:function(swiper){
			swiper.slideTo(1,0);
		},
		breakpoints: {
			1279: {
				slidesOffsetBefore : 0,
				slidesOffsetAfter : 0,
			},
        },
	});
	$("#mts_all .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mtsAllSwiper.slideTo(index);
		});
	});
	//mts01
	var mts01Swiper = new Swiper('#mts01 .swiper-container',{
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetBefore : 40,
		slidesOffsetAfter : 40,
		pagination : '#mts01 .swiper-pagination',
		paginationClickable :true,
		prevButton:'#mts01 .swiper-button-prev',
		nextButton:'#mts01 .swiper-button-next',
		onInit:function(swiper){
			swiper.slideTo(1,0);
		},
		breakpoints: {
			1279: {
				slidesOffsetBefore : 0,
				slidesOffsetAfter : 0,
			},
        },
	});
	$("#mts01 .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mts01Swiper.slideTo(index);
		});
	});
	//mts02
	var mts02Swiper = new Swiper('#mts02 .swiper-container',{
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetBefore : 40,
		slidesOffsetAfter : 40,
		pagination : '#mts02 .swiper-pagination',
		paginationClickable :true,
		prevButton:'#mts02 .swiper-button-prev',
		nextButton:'#mts02 .swiper-button-next',
		onInit:function(swiper){
			swiper.slideTo(1,0);
		},
		breakpoints: {
			1279: {
				slidesOffsetBefore : 0,
				slidesOffsetAfter : 0,
			},
        },
	});
	$("#mts02 .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mts02Swiper.slideTo(index);
		});
	});
	//mts03
	var mts03Swiper = new Swiper('#mts03 .swiper-container',{
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetBefore : 40,
		slidesOffsetAfter : 40,
		pagination : '#mts03 .swiper-pagination',
		paginationClickable :true,
		prevButton:'#mts03 .swiper-button-prev',
		nextButton:'#mts03 .swiper-button-next',
		onInit:function(swiper){
			swiper.slideTo(1,0);
		},
		breakpoints: {
			1279: {
				slidesOffsetBefore : 0,
				slidesOffsetAfter : 0,
			},
        },
	});
	$("#mts03 .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mts03Swiper.slideTo(index);
		});
	});
	//mts04
	var mts04Swiper = new Swiper('#mts04 .swiper-container',{
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetBefore : 40,
		slidesOffsetAfter : 40,
		pagination : '#mts04 .swiper-pagination',
		paginationClickable :true,
		prevButton:'#mts04 .swiper-button-prev',
		nextButton:'#mts04 .swiper-button-next',
		onInit:function(swiper){
			swiper.slideTo(1,0);
		},
		breakpoints: {
			1279: {
				slidesOffsetBefore : 0,
				slidesOffsetAfter : 0,
			},
        },
	});
	$("#mts04 .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mts04Swiper.slideTo(index);
		});
	});
	//mts05
	var mts05Swiper = new Swiper('#mts05 .swiper-container',{
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetBefore : 40,
		slidesOffsetAfter : 40,
		pagination : '#mts05 .swiper-pagination',
		paginationClickable :true,
		prevButton:'#mts05 .swiper-button-prev',
		nextButton:'#mts05 .swiper-button-next',
		onInit:function(swiper){
			swiper.slideTo(1,0);
		},
		breakpoints: {
			1279: {
				slidesOffsetBefore : 0,
				slidesOffsetAfter : 0,
			},
        },
	});
	$("#mts05 .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mts05Swiper.slideTo(index);
		});
	});
	//tab click focus
	$(".main_tab_slide h2 a, .main_tab_slide .ctrl_box button").on("click focus", function(e){
		e.preventDefault();
		$(this).parents(".main_tab_slide").find(".in_wrap").removeClass("active");
		$(this).parents(".in_wrap").addClass("active");
		if($(this).parents(".in_wrap").find("h2 a").attr("href")=="#mts_all")
		{
			mtsAllSwiper.update();
		}
		else if($(this).parents(".in_wrap").find("h2 a").attr("href")=="#mts01")
		{
			mts01Swiper.update();
		}
		else if($(this).parents(".in_wrap").find("h2 a").attr("href")=="#mts02")
		{
			mts02Swiper.update();
		}
		else if($(this).parents(".in_wrap").find("h2 a").attr("href")=="#mts03")
		{
			mts03Swiper.update();
		}
		else if($(this).parents(".in_wrap").find("h2 a").attr("href")=="#mts04")
		{
			mts04Swiper.update();
		}
		else if($(this).parents(".in_wrap").find("h2 a").attr("href")=="#mts05")
		{
			mts05Swiper.update();
		}
		else
		{
			return;
		}
	});

	//main open slide
	$(".main_open_slide > ul > li").on("click focus",function(){
		$(".main_open_slide > ul > li").not($(this)).removeClass("active");
		$(this).addClass("active");
	});
	$(".main_open_slide > ul > li a").on("click focus",function(){
		$(".main_open_slide > ul > li").not($(this).parents("li")).removeClass("active");
		$(this).parents("li").addClass("active");
	});

	//main notice tab
	var $tabtit = $(".main_notice_tab h2 a");
	var $tabmore = $(".main_notice_tab > li .btn_more");
	$tabtit.on("click focus", function(e){
		e.preventDefault();
		$(this).parents(".main_notice_tab").find("li").removeClass("active");
		$(this).parents("li").addClass("active");
	});
	$tabmore.on("focus", function(e){
		e.preventDefault();
		$(this).parents(".main_notice_tab").find("li").removeClass("active");
		$(this).parents("li").addClass("active");
	});

	//main pop zone
	var pzSwiper = new Swiper('.main_popzone .swiper-container',{
		autoplay: 3000,
		effect : 'fade',
		pagination : '.main_popzone .swiper-pagination',
		paginationType : 'fraction',
		prevButton:'.main_popzone .swiper-button-prev',
		nextButton:'.main_popzone .swiper-button-next',
		onInit: function(swiper){
			$(".main_popzone .btn_stop").on("click",function(){
				swiper.stopAutoplay();
			});
		},
	});
	$(".main_popzone .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			pzSwiper.slideTo(index);
		});
	});
	
});

//playPause
function playPause(ts) {
	var vdo = $(ts).parents(".video_section").find("video").get(0);

	if (vdo.paused)
		vdo.play();
	else 
		vdo.pause();
} 



function btnPlay(ts) {
	$(ts).next(".btn").addClass("play");
}
function btnPause(ts) {
	$(ts).next(".btn").removeClass("play");
}
function btnLoad(ts) {
	$(ts).next(".btn").removeClass("play");
}

