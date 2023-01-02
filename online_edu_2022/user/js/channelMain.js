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



// 추가
var _channel = {
	slideImg:function(str){
		var obj = str;
			obj.count = obj.find(" .controll>strong");
			obj.btnPrev = obj.find(" .controll>.prev");
			obj.btnNext = obj.find(" .controll>.next");
			obj.btnStop = obj.find(" .controll>.stop");
			obj.btnPlay = obj.find(" .controll>.play");
			obj.move = obj.find(" .move>ul")
			obj.cnt = 0;
			obj.li = obj.move.find(">li");
			obj.autos = "Y";
			obj.saveTime = "";
			obj.saveTimeSpeed = 6000;
		var __controll;

		__controll = {
			counts:function(){
				obj.count.html((obj.cnt+1)+'/'+obj.li.size());
			},
			move:function(str){
				var idx = (str==="next") ? obj.cnt+1:obj.cnt-1;
					idx = (idx>obj.li.size()-1) ? 0:(idx<0) ? obj.li.size()-1:idx;
				this.moveActive(idx);
			},
			playActive:function(){
				obj.saveTime = setTimeout(function(){__controll.move("next");},obj.saveTimeSpeed);
			},
			play:function(){
				obj.autos = "Y";
				obj.btnStop.show();
				obj.btnPlay.hide();
				this.playActive();
			},
			stop:function(){
				obj.autos = "N";
				obj.btnStop.hide();
				obj.btnPlay.show();
				clearTimeout(obj.saveTime);
			},
			moveActive:function(idx){
				clearTimeout(obj.saveTime);
				obj.li.removeClass("on").eq(idx).addClass("on");
				obj.cnt = idx;
				this.counts();
				if(obj.autos === "Y"){
					this.playActive();
				}
			},
			focusObject:function(_this){
				var idx = obj.li.index(_this);
				this.moveActive(idx);
			},
			def:function(){
				obj.li.attr("tabindex","0").eq(obj.cnt).addClass("on");
				this.counts();
			},
			init:function(){
				this.def();
				this.play();
			}
		}

		if(obj.li.size() < 2){
			obj.find(" .controll").remove();
			if(obj.li.size() === 1){
				__controll.def();
			}
			return false;
		}
		if(obj.li.size() !== 0){
			obj.find(" .def>strong").remove();
		}
		__controll.init();


		obj.li.on("focus",function(){__controll.focusObject($(this));});
		obj.btnPrev.on("click",function(){__controll.move("prev");return false;});
		obj.btnNext.on("click",function(){__controll.move("next");return false;});
		obj.btnStop.on("click",function(){__controll.stop();return false;});
		obj.btnPlay.on("click",function(){__controll.play();return false;});
	},
	mainMovieSlide:function(str){
		$('<div data-set="scroll"><span></span></div>').appendTo(str.find(">.midd>.move"));
		var obj = str;
			obj.list = obj.find(">.midd>.move");
			obj.li = obj.list.find(">ul>li");
			obj.btnPrev = obj.find(" .btn-prev");
			obj.btnNext = obj.find(" .btn-next");

		var __controll = {
			ac:function(a,b,c){
				var w = 0;
				for(var i=0; i<a.find(">li").size(); i++){
					w += a.find(">li").eq(i).width() + ~~(a.find(">li").eq(i).css("margin-right").replace("px",""));
				}
				var p = c.width()/w*100;
				
				if(w <= c.width()){
					b.parent().hide();
					return false;
				} else {
					b.parent().show();
				}
				var l = a.scrollLeft()/w*100;
				b.css({
					"width":p+"%",
					"left":l+"%"
				});
			},
			scrollSet:function(str){
				var a = str.find(">ul");
				var b = str.find(">[data-set='scroll']>span");
				var c = str.find(">[data-set='scroll']");

				__controll.ac(a,b,c);
				a.on("scroll",function(){__controll.ac(a,b,c);});
				$(window).on("resize",function(){__controll.ac(a,b,c);});

				// 제스처 추가
				var mouseCheck = false;
				var moveCheck = false;
				var _x = "";
				var totX = "";
				
				$(document).on("mousedown",function(e){
					_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
					mouseCheck = true;
					moveCheck = false;
					return false;
				});
				a.on("mousemove",function(e){
					totX = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
					totX = totX - _x;
					totX = totX * -1;
					if(mouseCheck){
						if(totX > 10 || totX < -10){
							moveCheck = true;
							e.preventDefault();
						}
					}
					e.stopPropagation();
					return false;
				});
				$(document).on("mouseup",function(e){
					if(moveCheck){
						mouseCheck = false;
						a.stop().animate({"scrollLeft":a.scrollLeft()+totX},300);
						e.preventDefault();
					}
					return false;
				});
			},
			move:function(str){
				obj.li = obj.list.find(">ul>li");
				var l = (obj.li.eq(0).innerWidth()+~~(obj.li.eq(0).css("margin-right").replace("px",""))) * -1;

				if(str==="prev"){
					obj.li.last().prependTo(obj.list.find(">ul"));
					obj.list.find(">ul").css("left",l+"px");
					l = 0;
				}
				obj.list.find(">ul").animate({"left":l+"px"},300,function(){
					if(str === "next"){
						obj.li.eq(0).appendTo(obj.list.find(">ul"));
						obj.list.find(">ul").css("left","0");
					}
				});
			}
		}

		if(obj.li.size() !== 0){
			obj.find(" .empty").remove();
		}
		if(obj.li.size() < 2){
			obj.btnPrev.remove();
			obj.btnNext.remove();
		} else {
			obj.btnPrev.on("click",function(){__controll.move("prev");return false;});
			obj.btnNext.on("click",function(){__controll.move("next");return false;});
		}
		__controll.scrollSet(obj.list);
	},
	init:function(){
		if($('#channel-line-1 .popupzone').size() !== 0) this.slideImg($('#channel-line-1 .popupzone'));
		if($('#channel-line-1 .moviebox').size() !== 0) this.mainMovieSlide($('#channel-line-1 .moviebox'));
	}
}
$(function(){
	_channel.init();
});