/*
 ★ Coding By DumiCode
 ★ homepage: http://www.dumicode.com
*/
$(function(){

	//mainPop
	var mPopSwiper = new Swiper('.main_pop',{
		effect : 'fade',
		prevButton:'.main_pop .swiper-button-prev',
		nextButton:'.main_pop .swiper-button-next',
	});
	$(".main_pop .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			mPopSwiper.slideTo(index);
		});
	});
	

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
	$(".main_visual .swiper-button-prev").on("click",function(){
		$("#swp_stop").hide();
		$("#swp_play").show();
	});
	$(".main_visual .swiper-button-next").on("click",function(){
		$("#swp_stop").hide();
		$("#swp_play").show();
	});
	
	$("#swp_stop").click(function(){
		mvisualSwiper.stopAutoplay();
	});
	$("#swp_play").click(function(){
		mvisualSwiper.startAutoplay();
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
				$(".main_popzone .btn_stop").hide();
				$(".main_popzone .btn_play").show();
			});
			$(".main_popzone .btn_play").on("click",function(){
				swiper.startAutoplay();
				$(".main_popzone .btn_stop").show();
				$(".main_popzone .btn_play").hide();
			});
		},
	});
	$(".main_popzone .swiper-slide a").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			pzSwiper.slideTo(index);
		});
	});
	
	$(".main_popzone .swiper-button-prev").on("click",function(){
		$(".main_popzone .btn_stop").hide();
		$(".main_popzone .btn_play").show();
	});
	$(".main_popzone .swiper-button-next").on("click",function(){
		$(".main_popzone .btn_stop").hide();
		$(".main_popzone .btn_play").show();
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


//close main pop
function closeMainPop() {
	$(".main_pop_wrap").slideUp("fast");
}