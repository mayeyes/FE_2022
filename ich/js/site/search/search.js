

/* 검색 상세 보기  */

function detail_content(){
    var content = $('#dtail_search')
        
        if(!content.is(':hidden')){
            content.slideUp(200)
        }else{
             content.slideDown(200) 
        }
}


/* 서치 리스트  */

$(function(){
    $('.SearchTab_Title').on('click',function(){
        $(this).toggleClass('on')
        $('.SearchTab_ul ul').toggleClass('max min');
    });
})



$(function () {
	$(document).ready(function(){
		$('.SearchTab_ul ul li a').click(function(){
			var tab_id = $(this).attr('data-tab');

			$('.SearchTab_ul ul li a').removeClass('active');
			$('.tab-content').removeClass('active');

			$(this).addClass('active');

			$("#"+tab_id).addClass('active');
			
		})
	})
});



/****  datepicker  ******/

    $(function() {
		$( "#s_date , #e_date" ).datepicker({
			showOn: "button",
			buttonImage: "../../../images/core/icon_cal_03.svg",
			buttonImageOnly: true,
			showButtonPanel: true,
			dateFormat : "yy/mm/dd",
			showAnim : "",
			showOtherMonths: true,
	 		selectOtherMonths: true,
	 		changeMonth: true,
            changeYear: true,
            numberOfMonths: 1,
            showButtonPanel: true,
            minDate: -20,
            maxDate: "+1M +10D",
            showWeek: true,
            firstDay: 1
		});
	  });


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	popup

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	if($('a[data-popup]').size() != 0){
		dataPopup_AC();//탐색
	}
});
function popup_open_AC(str){
	var btn = $('a[data-popup="'+str+'"]');
	var box = $('[data-skin="popup"][data-name="'+str+'"]');
		box.btn = box.find(".btn_group>a");
		box.c = box.find(".close");
		box.d = box.find(".close_btn");

	btn.click(function(){
		box.addClass("on");
		return false;
	});
	box.btn.click(function(){
		//버튼
		box.removeClass("on");
		return false;
	});
	box.c.click(function(){
		//닫기버튼
		box.removeClass("on");
		return false;
	});
	box.d.click(function(){
		//닫기버튼
		box.removeClass("on");
		return false;
	});
}

function dataPopup_AC(){
	var sys = $('a[data-popup]');
	for(var i=0; i<sys.size(); i++){
		popup_open_AC(sys.eq(i).attr("data-popup"));
	}
}

$(function(){

	$(window).on('scroll', function () {
		var $winTop = $(window).scrollTop()
			$header = $('#header')
			$header_h = $header.height()
			$SearchTab_ul = $('.SearchTab_ul')
			$SearchTab_ul_h = $SearchTab_ul.height()
			$total_h = $header_h + $SearchTab_ul_h + 100
			$search_wrap_top = $('.search-wrap').offset().top;

		

		if($winTop > $total_h){
				$header.addClass('fixed');
				$SearchTab_ul.addClass('fixed');

		}else{
				$header.removeClass('fixed');
				$SearchTab_ul.removeClass('fixed');
		}
});

});