
$(function(){
	// 창 크기 별 CSS
	$(window).resize(function(){
		photoZoneResize();
		popupZoneResize();
		MCT03MBL();
	});


	// === MainSlide (메인비주얼 슬라이더) :s === //
		var MainSlideSlider;
		function MainSlideSliderConfiguration() {
		  var windowWidth = $(window).width();
		  var WidthPC = $(window).width() / 4;
		  var WidthMBL = $(window).width();

		  if (windowWidth < 1200) {
			touchOfVisibleSlides = true;
		  }
		  else {
			touchOfVisibleSlides = false;
		  }
		  return {
			minSlides: 1,
			maxSlides: 10,
			moveSlides: 1,
			mode: 'horizontal',
			pause:8000,
			auto:false,
			autoStart:false,
			autoControls: false,
			controls:false,
			touchEnabled:touchOfVisibleSlides
		  };
		}
		function MainSlideconfigureSlider() {
		  var MainSlideconfig = MainSlideSliderConfiguration();

		  if (MainSlideSlider && MainSlideSlider.reloadSlider) {
			MainSlideSlider.reloadSlider(MainSlideconfig);
		  }
		  else {
			MainSlideSlider = $('.MainSlide .slide').bxSlider(MainSlideconfig);
		  }
		}

		$('.MainSlide .prevWrap').click(function () {
		  var current = MainSlideSlider.getCurrentSlide();
		  MainSlideSlider.goToPrevSlide(current) - 1;
		});
		$('.MainSlide .nextWrap').click(function () {
		  var current = MainSlideSlider.getCurrentSlide();
		  MainSlideSlider.goToNextSlide(current) + 1;
		});
		
		$('.MainSlide .prevWrap').keydown(function (key) {
			if(key.keyCode==13){
				var current = MainSlideSlider.getCurrentSlide();
				MainSlideSlider.goToPrevSlide(current) - 1;
			}
		});
		$('.MainSlide .nextWrap').keydown(function (key) {
			if(key.keyCode==13){
				var current = MainSlideSlider.getCurrentSlide();
				  MainSlideSlider.goToNextSlide(current) + 1;
			}
		});
		
		$(window).on("orientationchange resize", MainSlideconfigureSlider);

		MainSlideconfigureSlider();
	// === MainSlide (메인비주얼 슬라이더) :e === //


	// === MainCnt02 (바로가기 슬라이더) :s === //
		var mainCnt02Slider;
		function mainCnt02SliderConfiguration() {
		  var windowWidth = $(window).width();
		  var WidthPC = $(window).width() / 4;
		  var WidthMBL = $(window).width();

		  if (windowWidth < 680) {
			numberOfVisibleSlides = 1;
			widthOfVisibleSlides = WidthMBL;
		  }
		  else if(windowWidth < 1200){
			numberOfVisibleSlides = 2;
			widthOfVisibleSlides = WidthMBL;
		  }
		  else {
			numberOfVisibleSlides = 4;
			widthOfVisibleSlides = WidthPC;
		  }
		  return {
			slideWidth: widthOfVisibleSlides,
			minSlides: numberOfVisibleSlides,
			maxSlides: 10,
			mode: 'horizontal',
			pause:10000,
			sepeed:1000,
			pager:true,
			auto:false,
			autoStart:false,
			autoControls:false,
			controls: false
		  };
		}

		function mainCnt02configureSlider() {
		  var mainCnt02config = mainCnt02SliderConfiguration();

		  if (mainCnt02Slider && mainCnt02Slider.reloadSlider) {
			mainCnt02Slider.reloadSlider(mainCnt02config);
		  }
		  else {
			mainCnt02Slider = $('.mainCnt02 .C .cnt .slide').bxSlider(mainCnt02config);
		  }
		}

		$('.mainCnt02 .C .cnt .prevWrap').click(function () {
		  var current = mainCnt02Slider.getCurrentSlide();
		  mainCnt02Slider.goToPrevSlide(current) - 1;
		});
		$('.mainCnt02 .C .cnt .nextWrap').click(function () {
		  var current = mainCnt02Slider.getCurrentSlide();
		  mainCnt02Slider.goToNextSlide(current) + 1;
		});
		$(window).on("orientationchange resize", mainCnt02configureSlider);

		mainCnt02configureSlider();

		//BG 슬라이더
		/*
		var mainCnt02BGSlider = $('.mainCnt02 .BG .slide').bxSlider({
			mode: 'fade',
			pause:10000,
			sepeed:5000,
			auto:true,
			autoControls:false,
			pager:false,
			easing :'easeInBounce',
			controls: false
		});
		*/
	// === MainCnt02 (바로가기 슬라이더) :e === //




	// === MainCnt01 (콘텐츠):s === //

		// 보도자료
		$('.mainCnt01 .tabBoard > ul > li > a').click(function(){
			var i = $(this).parent().index();
			$('.mainCnt01 .tabBoard > ul > li > a').removeClass('tabOn');
			$(this).addClass('tabOn');
			$('.mainCnt01 .bxBoard .tabBoard .tabCnt').hide().eq(i).fadeIn();
		});
		
		// 캘린더 팝업
		$('.calendarOpen').on('click',function(){ 
				$('.calendarOpenOn').show();
				$(this).hide();
				$('.calendar').addClass('Open');
				$('.calendar .cnt').show();
		});
		$('.calendarOpenOn').on('click',function(){ 
				$('.calendarOpen').show();
				$(this).hide();
				$('.calendar').removeClass('Open');
				$('.calendar .cnt').hide();
		});

		//팝업존
		var popupZoneSlider;
		function popupZoneSliderConfiguration() {
		  var windowWidth = $(window).width();
		  if (windowWidth < 1200) {
			autoOfVisibleSlides=false;
		  }
		  else {
			autoOfVisibleSlides=true;
		  }
		  return {
			minSlides: 1,
			maxSlides: 10,
			mode: 'horizontal',
			pause:7000,
			sepeed:1000,
			pager:false,
			auto:autoOfVisibleSlides,
			autoStart:true,
			autoControls:false,
			controls: false
		  };
		}

		function popupZoneconfigureSlider() {
		  var popupZoneconfig = popupZoneSliderConfiguration();

		  if (popupZoneSlider && popupZoneSlider.reloadSlider) {
			popupZoneSlider.reloadSlider(popupZoneconfig);
		  }
		  else {
			popupZoneSlider = $('.popupZone .cnt .slide2').bxSlider(popupZoneconfig);
		  }
		}

		$('.popupZone .prevWrap').click(function () {
		  var current = popupZoneSlider.getCurrentSlide();
		  popupZoneSlider.goToPrevSlide(current) - 1;
		});
		$('.popupZone .nextWrap').click(function () {
		  var current = popupZoneSlider.getCurrentSlide();
		  popupZoneSlider.goToNextSlide(current) + 1;
		});
		$('.popupZone .btnPrev').click(function () {
		  var current = popupZoneSlider.getCurrentSlide();
		  popupZoneSlider.goToPrevSlide(current) - 1;
		});
		$('.popupZone .btnNext').click(function () {
		  var current = popupZoneSlider.getCurrentSlide();
		  popupZoneSlider.goToNextSlide(current) + 1;
		});



		$('.popupZone .btnStart').on('click',function(){ 
				popupZoneSlider.startAuto(); 
				$('.popupZone .btnStart').hide();
				$('.popupZone .btnStop').show();
				$('.popupZone .btnStop').focus();
				return true;
		});
		$('.popupZone .btnStop').on('click',function(){ 
				popupZoneSlider.stopAuto(); 
				$('.popupZone .btnStop').hide();
				$('.popupZone .btnStart').show();
				$('.popupZone .btnStart').focus();
				return true;
		});

		$(window).on("orientationchange resize", popupZoneSlider);

		popupZoneconfigureSlider();

		function popupZoneResize() {
			var popupZoneImg =$('.mainCnt01 .popupZone .cnt').children('li');

			popupZoneImg.each(function(index) {			
				var imgg =  $(this).find('img');
				var imgliHeight = $('.mainCnt01 .popupZone .bx-wrapper').height();
				var imgs =  $(this).find('img:first').attr('src');
				var imgLink = 'url(' + imgs +')' ;

				imgg.css({'height':imgliHeight});
				if (imgs !== undefined && ('' + imgs).length) {
				  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
				}
			});	
		};
		popupZoneResize();

		//현장소식
		var photoZoneSlider;
		function photoZoneSliderConfiguration() {
		  var windowWidth = $(window).width();
		  if (windowWidth < 1200) {
			pagerOfVisibleSlides = false;
			autoOfVisibleSlides=false;
		  }
		  else {
			pagerOfVisibleSlides = true;
			autoOfVisibleSlides=true;
		  }
		  return {
			minSlides: 1,
			maxSlides: 10,
			mode: 'horizontal',
			pause:7000,
			sepeed:1000,
			pager:pagerOfVisibleSlides,
			auto:autoOfVisibleSlides,
			autoStart:true,
			autoControls:false,
			controls: false
		  };
		}

		function photoZoneconfigureSlider() {
		  var photoZoneconfig = photoZoneSliderConfiguration();

		  if (photoZoneSlider && photoZoneSlider.reloadSlider) {
			photoZoneSlider.reloadSlider(photoZoneconfig);
		  }
		  else {
			photoZoneSlider = $('.photoZone .cnt .slide2').bxSlider(photoZoneconfig);
		  }
		}

		$('.photoZone .prevWrap').click(function () {
		  var current = photoZoneSlider.getCurrentSlide();
		  photoZoneSlider.goToPrevSlide(current) - 1;
		});
		$('.photoZone .nextWrap').click(function () {
		  var current = photoZoneSlider.getCurrentSlide();
		  photoZoneSlider.goToNextSlide(current) + 1;
		});
		$('.photoZone .btnPrev').click(function () {
		  var current = photoZoneSlider.getCurrentSlide();
		  photoZoneSlider.goToPrevSlide(current) - 1;
		});
		$('.photoZone .btnNext').click(function () {
		  var current = photoZoneSlider.getCurrentSlide();
		  photoZoneSlider.goToNextSlide(current) + 1;
		});
		$('.photoZone .btnStart').on('click',function(){ 
				photoZoneSlider.startAuto(); 
				$('.photoZone .btnStart').hide();
				$('.photoZone .btnStop').show();
				$('.photoZone .btnStop').focus();
				return true;
		});
		$('.photoZone .btnStop').on('click',function(){ 
				photoZoneSlider.stopAuto(); 
				$('.photoZone .btnStop').hide();
				$('.photoZone .btnStart').show();
				$('.photoZone .btnStart').focus();
				return true;
		});

		$(window).on("orientationchange resize", photoZoneSlider);

		photoZoneconfigureSlider();

		function photoZoneResize() {

			var photoZoneImg =$('.mainCnt01 .photoZone .cnt').children('a');

			photoZoneImg.each(function(index) {			
				var imgg =  $(this).find('img');
				var imgliHeight = $('.mainCnt01 .photoZone .bx-wrapper').height();
				var imgs =  $(this).find('img:first').attr('src');
				var imgLink = 'url(' + imgs +')' ;

				imgg.css({'height':imgliHeight});
				
				if (imgs !== undefined && ('' + imgs).length) {
				  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
				}
			});	
		};

		photoZoneResize();




		var CalendarElements = $('.calendar-modal-overlay, .calendar-modal');

		$('.calendar td').click(function(){
			CalendarElements.addClass('active');
		});

		$('.calendar-modal .close').click(function(){
			CalendarElements.removeClass('active');
		});
		/*
		$('.calendar-modal-overlay').click(function(){
			CalendarElements.removeClass('active');
		});
		*/
	// === MainCnt01 (콘텐츠):e === //


	// === MainCnt03 (sns 알리미 슬라이더 - 디폴트 ) :s === //
		var SlideImg03 =$('.mainCnt03').find('span');
		SlideImg03.each(function(index) {			
			var imgs =  $(this).find('img:first').attr('src');
			var imgLink = 'url(' + imgs +')' ;

			if (imgs !== undefined && ('' + imgs).length) {
			  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
			}
		});	
	// === MainCnt03 (sns 알리미 슬라이더 - 디폴트 ) :e === //


	// === MainCnt03 (sns 알리미 슬라이더) 01 :s === //
		var MCT03Lyr01Slider;
		function MCT03Lyr01SliderConfiguration() {
			windowWidth = $(window).width();
			Width = $('.cntWrap').width();

		  if(windowWidth < 800){
			touchOfVisibleSlides = false;
		  }else if (windowWidth < 1200) {
			touchOfVisibleSlides = false;
		  }else {
			touchOfVisibleSlides = false;
		  }
		  return {
			slideWidth: Width,
			minSlides: 1,
			mode: 'fade',
			pause:7000,
			speed:1000,
			pager:true,
			auto:true,
			autoStart:true,
			autoControls:true,
			controls: false,
			captions: true,
			touchEnabled:touchOfVisibleSlides
		  };
		}

		function MCT03Lyr01configureSlider() {
		  var MCT03Lyr01config = MCT03Lyr01SliderConfiguration();

		  if (MCT03Lyr01Slider && MCT03Lyr01Slider.reloadSlider) {
			MCT03Lyr01Slider.reloadSlider(MCT03Lyr01config);
		  }
		  else {
			MCT03Lyr01Slider = $('.mainCnt03 .C .layer01 .slides').bxSlider(MCT03Lyr01config);
		  }
		}
		
		$('.mainCnt03 .C .layer01 .prevWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr01Slider.getCurrentSlide();
				MCT03Lyr01Slider.goToPrevSlide(current) - 1;
			}
		});
		
		$('.mainCnt03 .C .layer01 .nextWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr01Slider.getCurrentSlide();
				MCT03Lyr01Slider.goToNextSlide(current) + 1;
			}
		});
		
		$('.mainCnt03 .C .layer01 .prevWrap').click(function () {
		  var current = MCT03Lyr01Slider.getCurrentSlide();
		  MCT03Lyr01Slider.goToPrevSlide(current) - 1;
		});
		$('.mainCnt03 .C .layer01 .nextWrap').click(function () {
		  var current = MCT03Lyr01Slider.getCurrentSlide();
		  MCT03Lyr01Slider.goToNextSlide(current) + 1;
		});
		$(window).on("orientationchange resize", MCT03Lyr01configureSlider);

		MCT03Lyr01configureSlider();
	// === MainCnt03 (sns 알리미 슬라이더) 01 :e === //


	// === MainCnt03 (sns 알리미 슬라이더) 02 :s === //
		var MCT03Lyr02Slider;
		function MCT03Lyr02SliderConfiguration() {
			windowWidth = $(window).width();
			Width = $('.cntWrap').width();

		  if(windowWidth < 800){
			touchOfVisibleSlides = false;
		  }else if (windowWidth < 1200) {
			touchOfVisibleSlides = false;
		  }else {
			touchOfVisibleSlides = false;
		  }
		  return {
			slideWidth: Width,
			minSlides: 1,
			mode: 'fade',
			pause:7000,
			sepeed:1000,
			pager:true,
			auto:true,
			autoStart:true,
			autoControls:true,
			controls: false,
			touchEnabled:touchOfVisibleSlides
		  };
		}

		function MCT03Lyr02configureSlider() {
		  var MCT03Lyr02config = MCT03Lyr02SliderConfiguration();

		  if (MCT03Lyr02Slider && MCT03Lyr02Slider.reloadSlider) {
			MCT03Lyr02Slider.reloadSlider(MCT03Lyr02config);
		  }
		  else {
			MCT03Lyr02Slider = $('.mainCnt03 .C .layer02 .slides').bxSlider(MCT03Lyr02config);
		  }
		}
		
		$('.mainCnt03 .C .layer02 .prevWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr02Slider.getCurrentSlide();
				MCT03Lyr02Slider.goToPrevSlide(current) - 1;
			}
		});
		
		$('.mainCnt03 .C .layer02 .nextWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr02Slider.getCurrentSlide();
				MCT03Lyr02Slider.goToNextSlide(current) + 1;
			}
		});

		$('.mainCnt03 .C .layer02 .prevWrap').click(function () {
		  var current = MCT03Lyr02Slider.getCurrentSlide();
		  MCT03Lyr02Slider.goToPrevSlide(current) - 1;
		});
		$('.mainCnt03 .C .layer02 .nextWrap').click(function () {
		  var current = MCT03Lyr02Slider.getCurrentSlide();
		  MCT03Lyr02Slider.goToNextSlide(current) + 1;
		});
		
		$(window).on("orientationchange resize", MCT03Lyr02configureSlider);

		MCT03Lyr02configureSlider();
	// === MainCnt03 (sns 알리미 슬라이더) 02 :e === //


	// === MainCnt03 (sns 알리미 슬라이더) 03 :s === //
		var MCT03Lyr03Slider;
		function MCT03Lyr03SliderConfiguration() {
			windowWidth = $(window).width();
			Width = $('.cntWrap').width();

		  if(windowWidth < 800){
			touchOfVisibleSlides = false;
		  }else if (windowWidth < 1200) {
			touchOfVisibleSlides = false;
		  }else {
			touchOfVisibleSlides = false;
		  }
		  return {
			slideWidth: Width,
			minSlides: 1,
			mode: 'fade',
			pause:7000,
			sepeed:1000,
			pager:true,
			auto:true,
			autoStart:true,
			autoControls:true,
			controls: false,
			touchEnabled:touchOfVisibleSlides
		  };
		}

		function MCT03Lyr03configureSlider() {
		  var MCT03Lyr03config = MCT03Lyr03SliderConfiguration();

		  if (MCT03Lyr03Slider && MCT03Lyr03Slider.reloadSlider) {
			MCT03Lyr03Slider.reloadSlider(MCT03Lyr03config);
		  }
		  else {
			MCT03Lyr03Slider = $('.mainCnt03 .C .layer03 .slides').bxSlider(MCT03Lyr03config);
		  }
		}
		$('.mainCnt03 .C .layer03 .prevWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr03Slider.getCurrentSlide();
				MCT03Lyr03Slider.goToPrevSlide(current) - 1;
			}
		});
		
		$('.mainCnt03 .C .layer03 .nextWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr03Slider.getCurrentSlide();
				MCT03Lyr03Slider.goToNextSlide(current) + 1;
			}
		});
		
		$('.mainCnt03 .C .layer03 .prevWrap').click(function () {
		  var current = MCT03Lyr03Slider.getCurrentSlide();
		  MCT03Lyr03Slider.goToPrevSlide(current) - 1;
		});
		$('.mainCnt03 .C .layer03 .nextWrap').click(function () {
		  var current = MCT03Lyr03Slider.getCurrentSlide();
		  MCT03Lyr03Slider.goToNextSlide(current) + 1;
		});
		$(window).on("orientationchange resize", MCT03Lyr03configureSlider);

		MCT03Lyr03configureSlider();
	// === MainCnt03 (sns 알리미 슬라이더) 03 :e === //


	// === MainCnt03 (sns 알리미 슬라이더) 04 :s === //
		var MCT03Lyr04Slider;
		function MCT03Lyr04SliderConfiguration() {
			windowWidth = $(window).width();
			Width = windowWidth - 100;

		  if(windowWidth < 800){
			touchOfVisibleSlides = false;
		  }else if (windowWidth < 1200) {
			touchOfVisibleSlides = false;
		  }else {
			touchOfVisibleSlides = false;
		  }
		  return {
			slideWidth: Width,
			minSlides: 1,
			mode: 'fade',
			pause:7000,
			sepeed:1000,
			pager:true,
			auto:true,
			autoStart:true,
			autoControls:true,
			controls: false,
			touchEnabled:touchOfVisibleSlides
		  };
		}

		function MCT03Lyr04configureSlider() {
		  var MCT03Lyr04config = MCT03Lyr04SliderConfiguration();

		  if (MCT03Lyr04Slider && MCT03Lyr04Slider.reloadSlider) {
			MCT03Lyr04Slider.reloadSlider(MCT03Lyr04config);
		  }
		  else {
			MCT03Lyr04Slider = $('.mainCnt03 .C .layer04 .slides').bxSlider(MCT03Lyr04config);
		  }
		}

		$('.mainCnt03 .C .layer04 .prevWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr04Slider.getCurrentSlide();
				MCT03Lyr04Slider.goToPrevSlide(current) - 1;
			}
		});
		
		$('.mainCnt03 .C .layer04 .nextWrap').keydown(function(key) {
			if(key.keyCode == 13){
				var current = MCT03Lyr04Slider.getCurrentSlide();
				MCT03Lyr04Slider.goToNextSlide(current) + 1;
			}
		});
		
		$('.mainCnt03 .C .layer04 .prevWrap').click(function () {
		  var current = MCT03Lyr04Slider.getCurrentSlide();
		  MCT03Lyr04Slider.goToPrevSlide(current) - 1;
		});
		$('.mainCnt03 .C .layer04 .nextWrap').click(function () {
		  var current = MCT03Lyr04Slider.getCurrentSlide();
		  MCT03Lyr04Slider.goToNextSlide(current) + 1;
		});
		$(window).on("orientationchange resize", MCT03Lyr04configureSlider);

		MCT03Lyr04configureSlider();
	// === MainCnt03 (sns 알리미 슬라이더) 04 :e === //


	// === MainCnt03 (sns 알리미 슬라이더) MOBILE :s === //
	function MCT03MBL(){
		$("#bx-pager").show();
		if($(window).width() <= 800){
			var MCT03MBLSlider;
			function MCT03MBLSliderConfiguration() {
			var windowWidth = $(window).width();
			  if(windowWidth < 800){
			  }else {
			  }
			  return {
				slideWidth: windowWidth,
				minSlides: 1,
				mode: 'horizontal',
				pause:10000,
				sepeed:1000,
				pager:true,
				pagerCustom:'#bx-pager',
				auto:false,
				autoStart:true,
				autoControls:false,
				controls: false,
				touchEnabled:false,
				adaptiveHeight: true
			  };
			}
			function MCT03MBLconfigureSlider() {
				var MCT03MBLconfig = MCT03MBLSliderConfiguration();

				if (MCT03MBLSlider && MCT03MBLSlider.reloadSlider) {
					MCT03MBLSlider.reloadSlider(MCT03MBLconfig);
				}
				else {
					MCT03MBLSlider = $('.mainCnt03 .MblSlide').bxSlider(MCT03MBLconfig);
				}
				if( $(window).width() < 800){
					MCT03MBLSlider;
				}else{	
					MCT03MBLSlider.destroySlider();
				
				}
			}
			/*
			$('.mainCnt03 .C > .prevWrap').click(function () {
				var current = MCT03MBLSlider.getCurrentSlide();
				MCT03MBLSlider.goToPrevSlide(current) - 1;
			});
			$('.mainCnt03 .C > .nextWrap').click(function () {
				var current = MCT03MBLSlider.getCurrentSlide();
				MCT03MBLSlider.goToNextSlide(current) + 1;
			});
			*/
			$(window).on("orientationchange resize", MCT03MBLconfigureSlider);
			MCT03MBLconfigureSlider();
		};
	};
	MCT03MBL();
	// === MainCnt03 (sns 알리미 슬라이더) MOBILE :e === //

	var Caption = $('.Caption');
	Caption.each(function(){
		var CaptionH1 = $(this).find('h1');
		var CaptionP = $(this).find('p');
		var CaptionPText = CaptionP.text();
		var CaptionH1Onclick = CaptionH1.attr('onclick');
		/*CaptionP.attr('onclick', CaptionH1Onclick );
		CaptionP.attr('title',CaptionPText);*/
	});
});



