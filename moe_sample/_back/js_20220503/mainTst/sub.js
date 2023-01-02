
$(function(){

	$('header').addClass('Sub');


	var MenuTitUl = $('.MenuTit > ul');
	// select layer
	MenuTitUl.each(function() {
		var MSelect = $(this).find('.selected > a');
		var MList = $(this).find('.list a');
		MSelect.click(function(){
			$(this).parent().next('.list').slideToggle('fast');
			$(this).addClass('active');
			return false;
		});
	});

	var Boardfile = $('.Boardfile td:nth-child(2)').addClass('fileLink');
	var fileLink = $('.fileLink');
	fileLink.each(function() {
		var fileLinkChild = $(this).children();
		for(var i= 0, len = fileLinkChild.length; i <len; i+=3){
			fileLinkChild.slice(i, i+3).wrapAll('<span></span>');
		}
	});

	$('.year > ul > li > a').each(function(){
		$(this).bind("click", function(){
			$('.year > ul > li > a').not().removeClass('selected');
			$(this).addClass('selected');
		});
	});
	$('.btn_bTy2').append('<i></i>');
	$('.btnSearch').wrap('<span></span>');
	$('.tblTy1 td a[target="_blank"]').append('<i></i>');
	
	
	var Iframe = $('.iframe');
	Iframe.each(function() {
		var IframeHeight = $(this).children('iframe').height();
		$(this).css('height',IframeHeight);
	});

	var NextItem = $('.btn_area');
	$('.box_Ty3').after(NextItem);

	var ThisPage = $('.ThisPage');

	ThisPage.each(function() {
		$(this).parent('div').addClass('AAA');
	});


	$('.BrgMenu .select .selected a').click(function(){
		$(this).parent().next('.list').slideToggle('fast');
		$(this).addClass('active');
		return false;
	});

	var MenuSub = $('.MenuSub');
	MenuSub.each(function(){
		var MenuSubLi = $(this).find('li');
		var MenuSubWidth = MenuSubLi.width();
		var MenuSubChild = MenuSubLi.length;
		var MenuSubWidthA = MenuSubWidth / MenuSubChild;
		var MenuSubA = $(this).find('a');
		MenuSubA.css('width',MenuSubWidthA);
	});

	var MenuSubA = $('.MenuSub a[target="_blank"]');
	MenuSubA.each(function(){
		$(this).append('<b class="newtab"></b>');
	});

	$('.MenuSub i').each(function(){
	$(this).append('<span class="icon"></span>');
		var SpanIcon = $(this).children('span.icon');
		SpanIcon.append('<b></b>');
	});
	
	$('select').each(function(){
		var $this = $(this), numberOfOptions = $(this).children('option').length;
		var ClassName = $(this).attr('class');
		var IdName = $(this).attr('id');
		var ParentClass = $(this).parent().parent();
		var ParentClassName = $(this).parent().parent().attr('class');
		
		var OptionOnClick =  $(this).children('option').attr('onclick');
		$this.addClass('selectHidden'); 
		$this.wrap('<article class="select"></article>');
		if(IdName == 'emailDomain'){
			$this.after('<div class="selectStyled ' + ClassName + ' " style="width:190px;"></div>');
		}else{
			$this.after('<div class="selectStyled ' + ClassName + ' "></div>');
		}
		
		
		$this.next('div.selectStyled').append('<a href="#:none;"></a>');

		var $styledSelect = $this.next('div.selectStyled');

		var $styledSelectPP = $styledSelect.children('a');
		if($this.children('option').is('[selected]')){
			$styledSelectPP.text($this.children('option').filter(':selected').text());
		}else{	
			$styledSelectPP.text($this.children('option').eq(0).text());
		}
		
		
		if(ParentClass.hasClass('forPc')){
			var i = $this.parent('article').index() + 1;
			$this.attr('id','forPc-menu0' + i);
			var menuNumber = 'forPc-menu0' + i;
			// 웹접근성 수정 시작 : 이승재
//			$this.before('<label for="'+ menuNumber +'">메뉴 선택</label>');
			// 웹접근성 수정 종료 : 이승재
		}else if(ParentClass.hasClass('forMbl')){
			var i = $this.parent('article').index() + 1;
			$this.attr('id','forMbl-menu0' + i);
			var menuNumber = 'forMbl-menu0' + i;
			// 웹접근성 수정 시작 : 이승재
//			$this.before('<label for="'+ menuNumber +'">메뉴 선택</label>');
			// 웹접근성 수정 종료 : 이승재
		}else{
			var i = $this.parent('article').index() + 1;
			$this.attr('id',ParentClassName +'-menu0' + i);
			var menuNumber = ParentClassName +'-menu0' + i;
			// 웹접근성 수정 시작 : 이승재
//			$this.before('<label for="'+ menuNumber +'">메뉴 선택</label>');
			// 웹접근성 수정 종료 : 이승재
		}
		
		if(IdName == 'emailDomain'){
			var $list = $('<ul />', {
				'class': 'selectOptions',
				'style': 'width:190px'
			}).insertAfter($styledSelect);
		}else{
			var $list = $('<ul />', {
				'class': 'selectOptions',
			}).insertAfter($styledSelect);
		}

		for (var i = 0; i < numberOfOptions; i++) {
			$('<a />', {
				text: $this.children('option').eq(i).text(),
				rel: $this.children('option').eq(i).val(),
				onclick: $this.children('option').eq(i).attr('onclick'),
				title: $this.children('option').eq(i).text(),
				href: "#:none;"
			}).appendTo($list);
		}
	  
		var $listItems = $list.children('a');
	   if($listItems.is('[onclick]')){
		   $listItems.eq(0).css('display','none');
		   
	   }
	   
	   // 셀렉트 박스 닫혀져 있을때 클릭한 경우 이벤트
		$styledSelect.click(function(e) {
			e.stopPropagation();
			$('div.selectStyled.active').not(this).each(function(){
				$(this).removeClass('active').next('ul.selectOptions').hide();
			});
			$(this).toggleClass('active').next('ul.selectOptions').toggle();
		});
	  
		
		// 셀렉트 박스 펼쳐져있을때 선택한 경우 이벤트
		$listItems.each(function(){
			$listItems.click(function(e) {
				if($(this).is('[onclick]')){
					$styledSelectPP.removeClass('active');
					e.stopPropagation();
					$this.val($(this).attr('rel'));
					$list.hide();
					$styledSelect.removeClass('active');
				}else{
					$styledSelectPP.text($(this).text()).removeClass('active');
					e.stopPropagation();
					$this.val($(this).attr('rel'));
					$list.hide();
					$styledSelect.removeClass('active');
					$styledSelect.focus();
				}
			});
		});
		
		if(numberOfOptions < 2){
			if($this.children('option').is('[onclick]')){
				var onclickLink = $this.children('option').attr('onclick');
				$styledSelectPP.attr('onclick', onclickLink);
				$styledSelectPP.text($this.children('option').eq(0).text());
				$styledSelectPP.parent('div').addClass('go');
			};
			$listItems.click(function(e) {
					$styledSelectPP.removeClass('active');
					e.stopPropagation();
					$this.val($(this).attr('rel'));
					$list.hide();
					$styledSelect.removeClass('active');
			});
		};

		$(document).click(function() {
			$styledSelect.removeClass('active');
			$list.hide();
		});

	});
	var $wrapper = $('.contents_inner'),
		$allTabs = $wrapper.find('.tab_content_data > div'),
		$tabMenu = $('.year > ul > li > a');
		$allTabs.not(':first-of-type').hide();  

		$tabMenu.each(function(i) {
			$(this).attr('data-tab', 'tab'+i);
		});

		$allTabs.each(function(i) {
			$(this).attr('data-tab', 'tab'+i);
		});

		$tabMenu.on('click', function() {

			var dataTab = $(this).data('tab'),
				$getWrapper = $(this).closest($wrapper);

			$getWrapper.find($tabMenu).removeClass('active');
			$(this).addClass('active');

			$getWrapper.find('.line').width(0);
			$getWrapper.find($allTabs).hide();
			$getWrapper.find($allTabs).filter('[data-tab='+dataTab+']').show();
		});



		// Auto Format Radio Btns
		function radioBtns(){
		  var $radioBtns = $('.radio'),
			  pre_label = "radio",
			  check_class = "checked",
			  option = "Option";

		  $radioBtns.each(function(){
			var $radio = $(this),
				$value = $radio.val(),
				$title = $radio.attr('title'),
				set = option + "--" + $radio.attr('name'),
				label = pre_label + "-" + $radio.attr('name') + "-" + $value.replace(/\s/g, '').toLowerCase();

			var $new_wrap = $(document.createElement('div')),
				$new_label = $(document.createElement('label'));
				$new_span_i = $(document.createElement('span'));
				$new_span_c = $(document.createElement('span'));
				$new_span_icon = $(document.createElement('span'));


			$radio.css({
			  "position" : "absolute",
			  "width" : "0px",
			  "height" : "20px"
			});
			$(".Option:nth-child(1)").addClass('checked')
			$new_wrap.addClass(option);
			$new_wrap.addClass(set);
			
			$new_span_i.addClass('OptionIdentifier');
			$new_span_c.addClass('OptionCnt');
			$new_span_icon.addClass('OptionIcon');

			$radio.addClass('OptionInput');
			$radio.attr('id', label);

			$new_label.addClass('OptionTxt');
			$new_label.attr('for', label);

			$radio.wrap($new_wrap);
			$new_label.append($new_span_i);
			$new_span_c.append($title);
			$new_label.append($new_span_icon);
			$new_label.append($new_span_c);
			$radio.after($new_label);
			
			// 웹접근성 수정 시작 : 이승재	
			$radio.bind("focus", function(){
				$(this).next().addClass("RadioFocused");			
				//window.scrollTo(0, $(this).next().offset().top-200);
				$new_label.css("background-color", "#C2E8FF");	// 접근성 추가
			});
			
			$radio.bind("blur", function(){
				$(this).removeClass("test");
				$(this).next().removeClass("RadioFocused");
				$new_label.css("background-color", "");	// 접근성 추가
			});
			// 웹접근성 수정 종료 : 이승재

			if ( $radio.attr( "disabled" ) ){
			  $(this).parent().addClass('is-disabled');
			}

			if ( $radio.attr( "checked" ) ){
			  $(this).parent().addClass(check_class);
			}

			$radio.on('click', function(){
			  $("." + check_class).each(function(){
				if ( $(this).hasClass(set) ){
				  $(this).removeClass(check_class);
				}
			  });

			  $(this).parent().addClass(check_class);
			});

		  });
		}
		radioBtns();

		// input value
		// 웹접근성 수정 시작 : 이승재
//		$('.summaryText').before('<label for="summaryText">기타의견</label>');
		// 웹접근성 수정 종료 : 이승재
		$('.summaryTextEtc').attr('id','summaryTextEtc');
		$('.summaryTextEtc').focus(function() {
			if (this.value == this.defaultValue) {
				this.value = '';
			}
			 $(this).css({
				 'border':'1px solid #8ab839',
			 });

		  }).blur(function() {
			if (this.value == '') {
				this.value = this.defaultValue;
			}
		});

		// input value
		// 웹접근성 수정 시작 : 이승재
//		$('.BoardTopText').before('<label for="summaryText">기타의견</label>');
		// 웹접근성 수정 종료 : 이승재
		$('.BoardTopText').attr('id','searchStr');
		$('.BoardTopText').focus(function() {
			if (this.value == this.defaultValue) {
				this.value = '';
			}
			 $(this).css({
				 'color':'#444',
			 });
		  }).blur(function() {
			if (this.value == '') {
				this.value = this.defaultValue;
			}
			 $(this).css({
				 'color':'#9e9fa3',
			 });
		});
		
		
		// 이용안내 리스트 클릭이벤트
		function listsList(){
			$('.listDetail .view > a').off('click');
			$('.listDetail .view > a').on('click' , function(){
				var title = $(this).parent('.view');
				if (title.hasClass('on')){
					$(".listDetail .view").removeClass("on");
				} else {
					title.addClass("on");
					$(".listDetail .view").not(title).removeClass("on");
				}
			});
		}
		listsList();
		
		// 뉴스홍보 이미지 백그라운드
		var BrgCntImg =$('.youtubeImg');

		BrgCntImg.each(function(index) {			
			var imgs =  $(this).find('img:first').attr('src');
			var imgLink = 'url(' + imgs +')' ;
			
			if (imgs !== undefined && ('' + imgs).length) {
			  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
			}
		});	

		// 이미지 백그라운드 - 디폴트
		var BrgCntImg =$('.BrgCnt .Cnt').find('a');

		BrgCntImg.each(function(index) {			
			var imgs =  $(this).find('img:first').attr('src');
			var imgLink = 'url(' + imgs +')' ;
			
			if (imgs !== undefined && ('' + imgs).length) {
			  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
			}
		});	

		// 이미지 백그라운드 - 디폴트
		var BrgImg =$('.BrgImg').children('a');

		BrgImg.each(function(index) {			
			var imgs =  $(this).find('img:first').attr('src');
			var imgLink = 'url(' + imgs +')' ;
			
			if (imgs !== undefined && ('' + imgs).length) {
			  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
			}
		});	

		// 이미지 백그라운드 - 디폴트
		var BoardGalImg =$('.BoardGalImg');

		BoardGalImg.each(function(index) {			
			var imgs =  $(this).find('img:first').attr('src');
			var imgLink = 'url(' + imgs +')' ;
			
			if (imgs !== undefined && ('' + imgs).length) {
			  $(this).css({'background': imgLink ,'background-repeat':'no-repeat','background-size':'cover','background-position':'center'});
			}
		});	


		var MblShare = $('.MblShare');
		var MblShareElements = $('.share-modal-overlay, .share-modal');

		$('.MblShare').click(function(){
			$(this).addClass('open');
			MblShareElements.addClass('active');
		});
		$('.share-modal .close').click(function(){
			MblShare.removeClass('open');
			MblShareElements.removeClass('active');
		});
		$('.share-modal-overlay').click(function(){
			MblShare.removeClass('open');
			MblShareElements.removeClass('active');
		});

		$('.PcShare').on('click', function(e){
			if($('.PcShare').hasClass('open') == 0) {
				$(this).find('a').attr('tabindex', '0');
			} else {
				$(this).find('a').attr('tabindex', '-1');
			}
			$(this).toggleClass("open");
			$(this).children('span').removeClass("no-animation");
			$(this).children('span').toggleClass("open");
		});



});



