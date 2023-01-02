$(function(){

	// === Header :s === //

		//PC(1200px 이상)

			// HEADER
			var lyrSnb = $('.lyrSnb');
			var PcSnb = lyrSnb.find('.snb');
			var PcSubMenu = lyrSnb.find('.subMenu');
			var PcSubMenuLi = PcSubMenu.children('li');

			//마우스 오버 시
			var gnb = $('#gnb li a');
			gnb.bind('mouseenter focus' , function(){
				$('header.forPc').addClass('hover');
				var i = $(this).parent('li').index() + 1;
				lyrSnb.show();
				PcSubMenuLi.hide();
				$('.lyrSnb > .snb .gnb0' + i).show();
				$('.overlay').show();
				return false;
			});

			
			// 웹접근성 수정 시작 : 이승재			
			$('.lyrSnb .snb').bind('mouseleave focusout' , function(){
				$('.lyrSnb, .lyrSnb .snb > ul > li').hide();
				$('.overlay').hide();
			});
			
			$('.lyrSnb .snb a').bind('focusout' , function(event){
				var visible_link_size = $('.lyrSnb .snb a:visible').size();
				var this_idx = $('.lyrSnb .snb a:visible').index(this);
				if(this_idx <  visible_link_size-1) event.stopPropagation();
			});			
			// 웹접근성 수정 종료 : 이승재

			$('header.forPc').bind('mouseenter focus' , function(){
				$(this).addClass('hover');
				return false;
			});

			$('header.forPc').bind('mouseleave blur' , function(){
				$(this).removeClass('hover');
				return false;
			});

			$('.depth3 li a[target^="_blank"]').each(function() {
			var Target = $(this).attr('target');
			var blank = '_blank';
			var Title = $(this).attr('title');
			var NewTabs = Title + ' 새창으로 열립니다';
				if(Target = blank){
					$(this).append('<i></i>');
					$(this).attr('title', NewTabs);
				}
			});

			//스크롤 내렸을 때
			if ( $(window).width() >= 1200){
				$(window).on("scroll",function(){
					if($(window).scrollTop() > 5){
						$('header.forPc').addClass('scroll');
						$('header.forPc').fadeIn();
					}else{
						$('header.forPc').removeClass('scroll');
					}
				});
			}else{
				$('header.forPc').removeClass('scroll');
			}

			var lyrSrch = $('.lyrSrch');

			// 검색 레이어
			$('.SearchforPc > a').on('click', function(){
				if($(this).hasClass('btnClose')){
					$(this).removeClass('btnClose');
					lyrSrch.stop().slideUp('fast');
					$(this).attr('title','검색하기');
					return false;
				} else {
					$(this).addClass('btnClose');
					lyrSrch.stop().css({'display':'table'}).slideDown('fast');
					$(this).attr('title','검색닫기');
					return false;
				}
			});
			$('.lyrSrchInput').attr('id', 'lyrSrchInput' );
			$('.lyrSrchInput').attr('class', 'lyrSrchInput' );
			$('.lyrSrchInput').before('<label for="lyrSrchInput" class="moehidden">검색하기</label>');
			$('.lyrSrchInput').focus(function() {
				if (this.value == this.defaultValue) {
					this.value = '';
				}
				 $(this).css({
					 'color':'#ffffff',
					 'border':'1px solid #8ab839',
				 });

			  }).blur(function() {
				if (this.value == '') {
					this.value = this.defaultValue;
					$(this).css('color' , '#9e9fa3');
				}
			});

			$('.lyrSrch .select .selected a').click(function(){
				$(this).parent().next('.list').slideToggle('fast');
				$(this).addClass('active');
				return false;
			});

			$('.lyrSrch .select .list a').click(function(){
				var val = $(this).text();
				$('.lyrSrch .select .selected a').html(val);
				$(this).parents('.list').hide();
				$(this).removeClass('active');
				return false;
			});


		//MOBILE(1200px 이하)

			// HEADER
			$('#LNB li:nth-child(1)').addClass('active');
		
			var Lnb = $('#LNB li a');
			Lnb.click(function(){
				var i = $(this).parent('li').index() + 1;
				$('#LNB li').removeClass('active');
				$(this).parent('li').addClass('active');
				$('.LNB .lnb0' + i).addClass('on').siblings().removeClass('on');
				return false;
			});

			$('.MMenu').click(function(){
				$('html').addClass('noScroll');
				$('.LeftNaviBar').show();
				$('.LeftNaviBar .Wrap').show().css('right' , '-100%').stop().animate({'right': 0}, 250 ,"easeInOutExpo");
			});


			$('.MenuClose').on('click', function(e) {
				$('html').removeClass('noScroll');
				$('.LeftNaviBar .Wrap').stop().animate({'right': '-100%'}, 250 ,"easeInOutExpo");
				$('.LeftNaviBar').fadeOut(800);
			});
			
			$('.LeftNaviBar').on('click', function(e) {
				var target = $(e.target);
				if( ! target.closest('.LeftNaviBar .Wrap').length){	
					$('html').removeClass('noScroll');
					$('.LeftNaviBar .Wrap').stop().animate({'right': '-100%'}, 250 ,"easeInOutExpo");
					$('.LeftNaviBar').fadeOut(800);
				}
			});

			// 서브메뉴 터치시
			var LNBDepth2 = $('.LNBWrap > li > div > a');
			var LNBDepth3 = $('.LNBWrap > li > div > ul');

			var LNBDepth2Div = $('.LNBWrap > li > div');
			
			LNBDepth2Div.each(function(){
				var LNBA = $(this).children('a:first-child');
				var LNBDepth2Href = LNBA.attr('href');
				var Link = 'location.href=\'' + LNBDepth2Href + '\';';
				var Depth3 = $(this).find('.depth3');
				var Li = Depth3.children('li');
				var LiLength = Li.length;
				if(LiLength < 2){	
					LNBA.attr('onclick', Link);
					LNBA.attr('href','javascript:;');
					LNBA.addClass('go');
					Depth3.addClass('noData');
				}
			});
			LNBDepth2.click(function(){
				$(this).next('.depth3:not(.noData)').slideUp('fast');
				$(this).next('.depth3:not(.noData)').parent('div').toggleClass('on').siblings().removeClass('on');
				$(this).next('.depth3:not(.noData)').stop().slideToggle('fast');
				$(this).next('.depth3:not(.noData)').find('li:first-child').addClass('active');
				return false;
			});
			
			$('.BrgMenu .select .list li a[target="_blank"]').append('<i></i>');
			$('.LNBWrap > li > div > a[target="_blank"]').append('<i></i>');

			// 검색 레이어
			$('.MSearch').click(function(){
				$('html').addClass('noScroll');
				$('.MobileSearch').show();
				$('.MobileSearch .Wrap').show().css('right' , '-100%').stop().animate({'right': 0}, 250 ,"easeInOutExpo");
			});

			$('.back').on('click', function(e) {
				$('html').removeClass('noScroll');
				$('.MobileSearch .Wrap').stop().animate({'right': '-100%'}, 250 ,"easeInOutExpo");
				$('.MobileSearch').fadeOut(800);
			});
			
			$('.MobileSearch').on('click', function(e) {
				var target = $(e.target);
				if( ! target.closest('.MobileSearch .Wrap').length){	
					$('html').removeClass('noScroll');
					$('.MobileSearch .Wrap').stop().animate({'right': '-100%'}, 250 ,"easeInOutExpo");
					$('.MobileSearch').fadeOut(800);
				}
			});

			$('.MobileSearchInput').before('<label for="MobileSearchInput">검색하기</label>');
			$('.MobileSearchInput').attr('id','MobileSearchInput');
			$('.MobileSearchInput').focus(function() {
				if (this.value == this.defaultValue) {
					this.value = '';
				}
				 $(this).css({
					 'color':'#666',
					 'border':'1px solid #8ab839',
				 });

			  }).blur(function() {
				if (this.value == '') {
					this.value = this.defaultValue;
					$(this).css('color' , '#9e9fa3');
				}
			});

	// === Header :e === //

	// === footer (배너모음 슬라이더) :s === //
		var footerSlider;
		function footerSliderConfiguration() {
		  var windowWidth = $(window).width();
		  var WidthPC = $(window).width() / 10;
		  var WidthMBLThree = $(window).width() / 3;
		  var WidthMBLFive = $(window).width() / 5;

		  if(windowWidth < 800){
			numberOfVisibleSlides = 3;
			widthOfVisibleSlides = WidthMBLThree;
			touchOfVisibleSlides = true;
		  }else if (windowWidth < 1200) {
			numberOfVisibleSlides = 5;
			widthOfVisibleSlides = WidthMBLFive;
			touchOfVisibleSlides = true;
		  }else {
			numberOfVisibleSlides = 8;
			widthOfVisibleSlides = WidthPC;
			touchOfVisibleSlides = false;
		  }
		  return {
			slideWidth: widthOfVisibleSlides,
			minSlides: numberOfVisibleSlides,
			maxSlides: 10,
			mode: 'horizontal',
			pause:10000,
			sepeed:1000,
			pager:false,
			auto:false,
			autoControls:false,
			controls: false,
			touchEnabled:touchOfVisibleSlides
		  };
		}

		function footerconfigureSlider() {
		  var footerconfig = footerSliderConfiguration();

		  if (footerSlider && footerSlider.reloadSlider) {
			footerSlider.reloadSlider(footerconfig);
		  }
		  else {
			footerSlider = $('.footer .wrap02 .slide3').bxSlider(footerconfig);
		  }
		}

		$('.footer .wrap02 .prevWrap').click(function () {
		  var current = footerSlider.getCurrentSlide();
		  footerSlider.goToPrevSlide(current) - 1;
		});
		$('.footer .wrap02 .nextWrap').click(function () {
		  var current = footerSlider.getCurrentSlide();
		  footerSlider.goToNextSlide(current) + 1;
		});
		$(window).on("orientationchange resize", footerconfigureSlider);

		footerconfigureSlider();
	// === footer (배너모음 슬라이더) :e === //

	// === Footer :s === //
		var footerElements = $('.footer-modal-overlay, .footer-modal');

		$('.footer .list01').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list01').addClass('show');
			$('.list01').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list02').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list02').addClass('show');
			$('.list02').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list03').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list03').addClass('show');
			$('.list03').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list04').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list04').addClass('show');
			$('.list04').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list05').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list05').addClass('show');
			$('.list05').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list06').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list06').addClass('show');
			$('.list06').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list07').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list07').addClass('show');
			$('.list07').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list08').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list08').addClass('show');
			$('.list08').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list09').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list09').addClass('show');
			$('.list09').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list10').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list10').addClass('show');
			$('.list10').attr("tabindex","-1").focus();	// 접근성 수정
		});
		$('.footer .list11').click(function(){
			$('.current').removeClass('current');		// 접근성 추가
			$(this).children('a').addClass('current');	// 접근성 추가
			
			$('html').addClass('noScroll');
			footerElements.addClass('active');
			footerElements.find('.list11').addClass('show');
			$('.list11').attr("tabindex","-1").focus();	// 접근성 수정
		});
		
		$('.footer-modal .close').click(function(){
			$('html').removeClass('noScroll');
			footerElements.removeClass('active');
			footerElements.find('.modal-content').removeClass('show');
			$('.current').focus();						// 접근성 추가
		});
		$('.footer-modal-overlay').click(function(){
			$('html').removeClass('noScroll');
			footerElements.removeClass('active');
			footerElements.find('.modal-content').removeClass('show');
			//$('[name="listTab"]').focus();			// 접근성 수정
			$('.current').focus();						// 접근성 추가
		});
	// === Footer :e === //


	// 이미지 백그라운드 - 디폴트
	var SlideImg =$('.slide').children('li');

	SlideImg.each(function(index) {			
		var imgs =  $(this).find('img:first').attr('src');
		var imgLink = 'url(' + imgs +')' ;
		
		if (imgs !== undefined && ('' + imgs).length) {
		  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
		}
	});	



});