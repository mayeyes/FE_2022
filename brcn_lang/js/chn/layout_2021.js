
$(document).ready(function(){
	langbx_AC();	//언어선택
	search_AC();	//검색
});

function langbx_AC(){
	var obj = $("#header .langbx>ul");
	var btn = $("#header .langbx>.tt");

	obj.hide();
	btn.click(function() {
		if(obj.is(":hidden")){
			obj.slideDown(200);
			$(this).addClass("on");
		} else{
			obj.slideUp(200);
			$(this).removeClass("on");
		}

		return false;
	});
}

function search_AC(){
	var obj = $("#header .etcs .searchbx>.searchs");
	var btn = $("#header .etcs .searchbx>.s_btn");

	obj.hide();
	btn.click(function() {
		if(obj.is(":hidden")){
			obj.fadeIn(200);
			$(this).addClass("on");
			$('#header .etcs .searchbx').addClass('active');
			$('#rwd_header .gnb_btn').addClass('hide')
		} else{
			obj.fadeOut(200);
			$(this).removeClass("on");
			$('#rwd_header .gnb_btn').removeClass('hide');
			$('#header .etcs .searchbx').removeClass('active')
		}

		return false;
	});
}


//Top 버튼
$(document).ready(function(){  
	if($("#top_btn").size() != 0){
		floatingTop();	
	}
});
function floatingTop(){
	$(window).scroll(function (){
		var winTop = $(this).scrollTop();
		var headerTop = $(window).height()/4;
		var f_hight = $("#footer").innerHeight();

		if (winTop > headerTop) {
			$("#top_btn").fadeIn(300);
		} else if (winTop <= headerTop) {
			$("#top_btn").fadeOut(300);
		} 
        
        if(($(window).scrollTop() - $("#footer").height()) < ($(document).height() - $(window).height() - $("#footer").height())){
            $("#top_btn").removeClass("on");
        }else{
            $("#top_btn").addClass("on");
        }
        
        if($("#top_btn").hasClass("on")){
        	$("#top_btn").css("bottom",f_hight+45);
        	// console.log("on");
        }else{
            $("#top_btn").css("bottom","45px");
            // console.log("off");
        }
	});	
    
	$("#top_btn").click(function(){
        $("body,html").stop().animate({"scrollTop":"0"},300);
		return false;
	});
}

$(function(){
	$('[data-tab]>.in>ul>li.on>a').attr('href','#none');
	$('[data-tab]>.in>ul>li.on').click(function(){
		$('[data-tab]>.in>ul').toggleClass('on');
	})
});