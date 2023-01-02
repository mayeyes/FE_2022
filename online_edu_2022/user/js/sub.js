/*
 ★ Coding By DumiCode
 ★ homepage: http://www.dumicode.com
*/
$(function(){
	
	//유사한 과정
	var similarSwiper = new Swiper('.similar_list .swiper-container',{
		//autoplay: 4000,
		slidesPerView: 'auto',
		spaceBetween: 20,
		prevButton:'.similar_list .swiper-button-prev',
		nextButton:'.similar_list .swiper-button-next',
		breakpoints: {
			767: {
				spaceBetween: 10,
			},
        },

	});
	$(".similar_list .swiper-slide a, .similar_list .swiper-slide .btn").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			similarSwiper.slideTo(index);
		});
	});

	//채널 신규 동영상
	var cnNewAutoSwiper = new Swiper('.channel_swiper_new_auto .swiper-container',{
		autoplay: 4000,
		slidesPerView: 'auto',
		spaceBetween: 20,
		prevButton:'.channel_swiper_new_auto .swiper-button-prev',
		nextButton:'.channel_swiper_new_auto .swiper-button-next',
		breakpoints: {
			767: {
				spaceBetween: 10,
			},
        },

	});

	//채널 인기 동영상
	var cnAutoSwiper = new Swiper('.channel_swiper_auto .swiper-container',{
		autoplay: 4000,
		slidesPerView: 'auto',
		spaceBetween: 20,
		prevButton:'.channel_swiper_auto .swiper-button-prev',
		nextButton:'.channel_swiper_auto .swiper-button-next',
		breakpoints: {
			767: {
				spaceBetween: 10,
			},
        },

	});

	$(".channel_swiper_new_auto  .swiper-slide a, .channel_swiper_new_auto .swiper-slide .btn").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			cnNewAutoSwiper.slideTo(index);
		});
	});
	$(".channel_swiper_new_auto .btn_stop").on("click",function(){
		cnNewAutoSwiper.stopAutoplay();
	});

	$(".channel_swiper_auto .swiper-slide a, .channel_swiper_auto .swiper-slide .btn").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			cnAutoSwiper.slideTo(index);
		});
	});
	$(".channel_swiper_auto .btn_stop").on("click",function(){
		cnAutoSwiper.stopAutoplay();
	});

	//채널 맞춤 동영상
	var cnSwiper = new Swiper('.channel_swiper .swiper-container',{
		//autoplay: 4000,
		slidesPerView: 'auto',
		spaceBetween: 20,
		prevButton:'.channel_swiper .swiper-button-prev',
		nextButton:'.channel_swiper .swiper-button-next',
		breakpoints: {
			767: {
				spaceBetween: 10,
			},
        },

	});
	$(".channel_swiper .swiper-slide a, .channel_swiper .swiper-slide .btn").each(function(index){
		$(this).on("focus", function(e){
			e.preventDefault();
			cnSwiper.slideTo(index);
		});
	});

	//교육후기 펼침
	$(".review_list li .btn_more").on("click",function(){
		$(this).parents("li").addClass("open");
	});


	//FAQ
	$(".faq_list .q a").on("click",function(){
		$(".faq_list li").not($(this).parents("li")).removeClass("open");
		$(this).parents("li").toggleClass("open");
		return false;
	});

	// 셀렉트 상세보기(모바일)
	$(".attention_box .tit a").on("click",function(){
		$(".attention_box").toggleClass("on");
		return false;
	});

	//모바일버전 table 스크롤
	$(".m_board_scroll").on("scroll",function(){
		$(this).find(".txt_ex_scroll").remove();
	});
	$(".m_board_scroll .txt_ex_scroll").on("click",function(){
		$(this).remove();
	});

	//통합검색 옵션
	$(".btn_search_opt").on("click",function(){
		$(this).toggleClass("active");
		$("#sc_option").toggle();
	});

	//시설사진
	var photoSwiper = new Swiper('.photo_box .swiper-container',{
		//autoplay: 4000,
		prevButton:'.photo_box .swiper-button-prev',
		nextButton:'.photo_box .swiper-button-next',

	});

});


//댓글 수정
function cmtEdit(ts)
{
	var cmtP = $(ts).parents("li").find("p");
	cmtP.after('<textarea cols="" rows="" title="댓글입력">' + cmtP.text() + '</textarea>');
	cmtP.remove();
	$(ts).parents("li").find("textarea").focus();
}


// 추가
var _content = {
	question:function(str){
		var obj = str;
			obj.li = obj.find(">li");
			obj.btn = obj.li.find(">.head");

		var __controll = {
			open:function(_this){
				var box = _this.siblings(".midd");
				obj.li.attr("data-sw","off");
				obj.li.find(">.midd").slideUp(200);

				if(box.is(":hidden")){
					_this.parent().attr("data-sw","on");
					_this.siblings(".midd").stop().slideDown(200);
				}
			},
			init:function(){
				__controll.open(obj.li.eq(0).find(">.head"));
			}
		}
		__controll.init();

		obj.btn.on("click",function(){__controll.open($(this));return false;});
	},
	starAdd:function(str){
		var obj = str;
			obj.li = obj.find(">ul>li");
			obj.btn = obj.li.find(" input:checkbox");
			obj.val = obj.find(" input.val");

		obj.btn.on("change",function(){
			var c = $(this).is(":checked");
			var count = obj.li.find(" input:checkbox:checked").size();
			var idx = obj.li.index($(this).parent());
			var idx_this = $(this).parent().find(" input:checkbox").index($(this));
			var jum5 = 0;
			obj.btn.prop("checked",false);
			
			if(idx_this === 0){				
				jum5 = 0.5;
				$(this).prop("checked",true);
			} else {
				idx = idx+1;
			}
			obj.find(">ul>li:lt("+(idx)+") input:checkbox").prop("checked",true);
			obj.val.val(idx+jum5);
			if(!c && count===0){
				obj.btn.prop("checked",false);
				obj.val.val(0);
			}
		});
	},
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
		__controll.init();


		obj.li.on("focus",function(){__controll.focusObject($(this));});
		obj.btnPrev.on("click",function(){__controll.move("prev");return false;});
		obj.btnNext.on("click",function(){__controll.move("next");return false;});
		obj.btnStop.on("click",function(){__controll.stop();return false;});
		obj.btnPlay.on("click",function(){__controll.play();return false;});
	},
	init:function(){
		if($(".question_list").size() !== 0) this.question($(".question_list"));
		if($(".star-add").size() !== 0){
			for(var i=0; i<$(".star-add").size(); i++){
				this.starAdd($(".star-add").eq(i));
			}
		}
		if($('[data-js="photo-slide"]').size() !== 0) this.slideImg($('[data-js="photo-slide"]'));
	}
}
var _board = {
	type:function(str){
		var btn = str;
		var list = $('[data-board="list"]')
		var __controll = {
			change:function(_this){
				var ty = _this.attr('data-board-type');
				list.attr('data-board-type',ty);

				btn.removeClass("on");
				_this.addClass("on");
			}
		}

		btn.on("click",function(){__controll.change($(this)); return false;});
		btn.eq(0).trigger("click");
	},
	eduEtcList:function(str){
		var obj = str;
			obj.box = obj.find(">.move>ul");
			obj.li = obj.box.find(">li");
			obj.btnPrev = obj.find(" .controll .prev");
			obj.btnNext = obj.find(" .controll .next");
		var __controll = {
			move:function(str){
				obj.li = obj.box.find(">li");
				var l = obj.li.eq(0).width() + ~~(obj.li.eq(0).css("margin-right").replace("px",""));
					l = l * -1;

				if(str === "prev"){
					obj.li.last().prependTo(obj.box);
					obj.box.css("left",l+"px");
					l = 0;
				}
				obj.box.animate({"left":l+"px"},500,function(){
					if(str === "next"){
						obj.li.eq(0).appendTo(obj.box);
						obj.box.css("left","0");
					}
				});
			}
		}

		obj.btnPrev.on("click",function(){__controll.move("prev");return false;});
		obj.btnNext.on("click",function(){__controll.move("next");return false;});
	},
	init:function(){
		if($('button[data-board-type]').size() !== 0) this.type($('button[data-board-type]'));
		if($('[data-board-view="edu-etc"]').size() !== 0) this.eduEtcList($('[data-board-view="edu-etc"]'));
	}
}
$(function(){
	_content.init();
	_board.init();
});