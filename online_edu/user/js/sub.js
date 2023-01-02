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