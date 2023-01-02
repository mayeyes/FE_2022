$(function () {
	var $mainBox = $('div.mainBox') ;									// 메인 박스
	var $content_wrap = $mainBox.find('> div.content_wrap') ;						// 메인 미들컨텐츠 박스	
	var $footBox = $mainBox.find('> div.footBox') ;							// 메인 푸터컨텐츠 박스
	var $slideBox = $content_wrap.find('div.slideBox') ; 							// 메인 이미지슬라이드 박스
	var $browser = $(window) ; 										// 현재 브라우저	
	winHalfWidth = ($browser.width() - $mainBox.width()) / 2 ;					// 브라부어 여백 길이의 중간 값	

	
	var $naviBox = $('ul.naviBox') ;
	var $naviWrapBox = $('<div class="naviWrap" />').append('<div class="movingBox" />') ;
	$naviBox.wrap( $naviWrapBox ) ;
	$naviWrapBox = $('div.naviWrap') ;
	var $movingBox = $('div.movingBox') ;
	$movingBox.append('<p class="shadow"></p>') ;

	$naviBox.bind( 'mouseenter' , naviBoxOverHandler ) ;
	$movingBox.bind( 'mouseleave' , naviBoxOutHandler ) ;
	$naviBox.find('> li').bind( 'mouseenter' , naviBoxListOverHandler ) ;	

	/* [ 최초 브라우저 백그라운드 셋업 ] */
	function browserSet () {
		//if ( $mainBox.find('div.bgSet').length == 0 ) {
		//	var $mainBg = $('<div class="bgSet" />') ;
		//	$mainBox.prepend( $mainBg.clone().addClass('left').append('<div class="box" />') , $mainBg.clone().addClass('right').append('<div class="box" />') ) ;
		//	$content_wrap.prepend( $mainBg.clone().addClass('left') ) ;
		//	$footBox.prepend( $mainBg.clone().addClass('left') , $mainBg.clone().addClass('right') ) ;

			//$slideBox.find('div.imgBox div').each(function (idx) {
			//	$(this).addClass( 'idx' + idx ) ;
			//})			
		//	browserResize () ;
		//} else {
		//	browserResize () ;
		//}
	}

	browserSet () ;

	// [ 왼쪽 메뉴 ] //
	//var $castCategory = $('ul.castCategory') ;
	//var $castDetail = $castCategory.find('div.detail') ;	
	//var $castCategoryClose = $castCategory.find('a.close') ;	
	//var moveWidth = 640 ;
	// $castDetail.wrap('<div class="screen" />') ;	

	/* [ 브라우저 좌우 배경 리사이즈 셋업 ] */
	function browserResize () {
		//$mainBox.find('div.bgSet').css({ 'width' : winHalfWidth + 'px' }) ;
		//$mainBox.find('div.bgSet.left').css({ 'left' : -winHalfWidth + 'px' }) ;
		//$mainBox.find('div.bgSet.right').css({ 'right' : -winHalfWidth + 'px' }) ;

		if ( $(window).width() > 960 ) {
			$('body, html').css({ 'overflow-x' : 'hidden' }) ;
			$naviWrapBox.css({ 'width' : $browser.width() , 'margin-left' : -(($browser.width() - 960) / 2) + 'px' }) ;
		} else {
			$('body, html').removeAttr("style") ;
			$naviWrapBox.css({ 'width' : '960px' , 'margin-left' : '0px' }) ;
		}
	}

	/* [ 브라우저 리사이즈 제어 ] */
	$browser.resize(function () {
		winHalfWidth = ($browser.width() - $mainBox.width()) / 2 ;
		if ( $browser.width() > 960 ) {
			// slideBoxWidth = $browser.width() - winHalfWidth - $castCategory.find('div.intro').width() ;
		}
		browserSet () ;
	})

	
	
	// [ 내비게이션 ] //
	function naviBoxOverHandler () {
		$naviBox.find('ul').css({ 'visibility' : 'visible' }) ;
		$naviBox.stop().animate({ 'height' : '330px' } , 100 ) ;
		$movingBox.stop().animate({ 'height' : '330px' } , 100 , function () {
			$movingBox.addClass( 'chk' ) ;
		}) ;
	}

	function naviBoxOutHandler () {
		if ( $movingBox.hasClass( 'chk' ) ) {
			$naviBox.stop().animate({ 'height' : '80px' } , 100 ) ;
			$movingBox.stop().animate({ 'height' : '80px' } , 100  , function () {
				$naviBox.find('ul').css({ 'visibility' : 'hidden' }) ;
				$movingBox.removeClass( 'chk' ) ;
			}) ;
		}
		$naviBox.find('> li > a').removeClass( 'active' ) ;
		$('#on_active').addClass( 'active' ) ;
	}

	function naviBoxListOverHandler (e) {
		e.stopPropagation() ;
		$(this).closest('li').siblings().find('> a').removeClass( 'active' ) ;
		$(this).closest('li').find('> a').addClass( 'active' ) ;
	}

	$naviBox.find('> li').bind( 'focusin' , naviBoxFocusinHandler ) ;
	function naviBoxFocusinHandler (e) {
		if ( !$movingBox.hasClass( 'chk' ) ) {
			$movingBox.addClass( 'chk' ) ;
			naviBoxOverHandler () ;
		}
	}

	$naviBox.find('li:last').bind( 'keydown' , naviBoxLastKeydownHandler ) ;
	function naviBoxLastKeydownHandler (e) {
		if ( e.keyCode == 9 ) {
			naviBoxOutHandler () ;
			$movingBox.removeClass( 'chk' ) ;
		}
	}
})
