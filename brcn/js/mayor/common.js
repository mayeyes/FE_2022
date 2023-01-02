$(document).ready(function() {
	main_visual (); // 메인 비주얼
	
	/* depth2_tab */
	var tab_size = $(".depth2_tab > ul > li").size();
	if (tab_size >= 3){
		$(".depth2_tab > ul > li").addClass("ac");
	}
	if (tab_size <= 1){
		$(".depth2_tab").addClass("ac1");
	}
});

 // 메인 비주얼
function main_visual (){
	$(".auto_btn .stop").click(function() { 
		$(this).hide();
		$(".auto_btn .play").show();
		 $(".slide_event").cycle('pause'); 
	});
	$(".auto_btn .play").click(function() { 
		$(this).hide();
		$(".auto_btn .stop").show();
		 $(".slide_event").cycle('resume'); 
	});
		
	$(".slide_event").cycle({
		fx:      'fade',
		timeout:  4000,
		pager:   '#vi_pointer',
		width: 0,
		next:   '.next', 
		prev:   '.prev'
		//pagerAnchorBuilder: pagerFactory
	});
}


