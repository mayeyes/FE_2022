
/* ��ü�޴� */
$(window).load(function(){
		$(".allmenu").click(function(){
			$('#allmenu').toggle();
			return false;
		});
		$('#allmenu .btn_close').click(function(){
			$('#allmenu').toggle();
			return false;
		})
		$('#allmenu').click(function(){
			$(this).addClass('select');
			$('.allmenuBox>div').hide();
		});
		$('#allmenu').click(function(){
			$(this).addClass('select');	
			$('.allmenuBox>div').hide();
		});
	});	
	$(window).ready(function(){
});	

/* gnb  2022.07 수정 작업 */

$(window).load(function(){	

	mouseenter();  //gnb mouseenter 오버 이벤트 
	mouseleave();  //gnb mouseleave  이벤트
	mouseclick()

	function mouseenter(){
		$("ul#lnb>li").mouseenter(function(){
			$(this).siblings().children('a').removeClass('on');
			$(this).children('a').addClass('on');
					
			$("div.submenu").stop().slideDown(300);
			if ( $(this).find("div.submenu").length>0 ) {
				$div_sub = $(this).find("div.submenu");
				var menuNo = $div_sub.attr("id").replace("submenu","");
				$div_sub.stop().slideDown(300);
				$("header").addClass("on");
			}
		});
	};

	function mouseclick(){
		$("ul#lnb>li").click(function(){
			$(this).siblings().children('a').removeClass('on');
			$(this).children('a').addClass('on');
					
			$("div.submenu").stop().slideDown(300);
			if ( $(this).find("div.submenu").length>0 ) {
				$div_sub = $(this).find("div.submenu");
				var menuNo = $div_sub.attr("id").replace("submenu","");
				$div_sub.stop().slideDown(300);
				$("header").addClass("on");
			}
		});
	};

	function mouseleave(){
		$("nav").mouseleave(function(){
			$('ul#lnb>li').children('a').removeClass('on');
			$("div.submenu").stop().slideUp(100);
			if ( $(this).find("div.submenu").length>0 ) {
				$div_sub = $(this).find("div.submenu");
				var menuNo = $div_sub.attr("id").replace("submenu","");
				$div_sub.hide();
				$("header").removeClass("on");
			}
		});
	};


	// 전체메뉴 열기	
	$(".moe_all_btn a").mouseenter(function(){
 
		var $nav = $('header nav');
			$nav_ul_li = $nav.find('>ul>li');
		
			$nav_ul_li.siblings().children('a').removeClass('on');
			$nav_ul_li.children('a').addClass('on');
				
		$("div.submenu").stop().slideDown(300);
		$("header").addClass("on");
	});		
	


	$("nav h2").click(function(){
		$("nav h2 a").toggleClass('on');
		$('body').toggleClass('mo_bg');

		/*if($('nav h2 a').hasClass('on').length === 0){
			$('header>h1>a').attr('href','https://www.moe.go.kr/')
		}else{
			$('header>h1>a').attr('href', 'javascript:void(0)')
		}*/

		$("#lnb").toggleClass('mb_hidden');
	});


    // gnb 반응형 작업

	$(window).resize(function(){
		var w=$(window).width();

		if(w>1025){
			mouseenter();
			mouseleave();
			mouseclick()
		}

		if(w<1024){
			
			$("ul#lnb>li").off("mouseenter"); // pc 모바일 일때 마우스 오버 이벤트 막기
			$("nav").off("mouseleave");

			$("ul#lnb>li").click(function(){
				$(this).siblings().children('a').removeClass('on');		
				$(this).children('a').addClass('on');	
				$("header").removeClass("on");	
				$li_sub = $(this);
				$div_sub =  $li_sub.find("div.submenu");

				if ( $li_sub.find("div.submenu").length>0 ) {
					$div_sub.show();
				}
				$li_sub.siblings().children('div.submenu').hide();
			});
		} 
		
	}).resize();

});



/* sub location */
$(document).ready(function() {
	$(".secondMenu").mouseenter(function(){
		$(".topNaviMenu2 ul").addClass("on");
	});	
	$(".location").mouseleave(function(){
		$(".topNaviMenu2 ul").removeClass("on");
	});	
});

/* two tab */
function show_leemocon(tabnum){
	var i;
	var d = new Array(2);
	var tm = document.getElementById("tabmenu").getElementsByTagName("li");
	for(i=0; i<=1; i++){
		
  d[i] = document.getElementById("tabcontent"+i);
  d[i].style.display = "none";
  tm[i].className = "";
	};  
  switch(tabnum){
   case 0:
    d[0].style.display = "";
	tm[0].className = "on";
    break;
   case 1:
    d[1].style.display = "";
	tm[1].className = "on";
    break;
  };
};

/* modal */
$(document).ready(function() {
	$(".openModal").click(function(){
		$(".overlay").addClass("ons");
	});	
	$(".seeCloseBtn").click(function(){
		$(".overlay").removeClass("ons");
	});	
});

/* main Slider */
$(document).ready(function() {
	$("#moeSlider").owlCarousel({
		autoPlay: false,
		items : 2,
		itemsDesktop : [1199,2],
		itemsDesktopSmall : [768,1]
	});
});

/* mainTab */
function show_main(tabnum){
	var i;
	var d = new Array(2);
	var tm = document.getElementById("visualTab").getElementsByTagName("li");
	for(i=0; i<=1; i++){
		
  d[i] = document.getElementById("tabcontentSn"+i);
  d[i].style.display = "none";
  tm[i].className = "";
	};  
  switch(tabnum){
   case 0:
    d[0].style.display = "";
	tm[0].className = "on";
    break;
   case 1:
    d[1].style.display = "";
	tm[1].className = "on";
    break;
  };
};





/* 2019�� 1�� 15�� �߰� */

jQuery(function($){  
var tab = $('.tab_list');  
tab.removeClass('js_off'); 
 function onSelectTab(){  
	var t = $(this);  
	var myClass = t.parent('li').attr('class');  
	t.parents('.tab_list:first').attr('class', 'tab_list '+myClass);
	
	if(myClass == "m1"){
		$("#listM1").show();
		$("#listM2").hide();
	}else{
		$("#listM1").hide();
		$("#listM2").show();
	}
	
 }  
tab.find('>ul>li>a').click(onSelectTab).focus(onSelectTab);  
});  

$(document).ready(function() {
	$("#owl-demo").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem : true,
		items : 1
	});
});




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

 2022.07 추가 작업 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */


$(function(){
	main_noti_AC();//동정자료실 연설문 
})

function main_noti_AC(){
    function _set(str){
        var obj = str.find(">.in");
            obj.btn = obj.find(">ul>li>.head>a");
        
        obj.btn.on("click",function(){
            obj.find(">ul>li>.head").attr("data-open","off");
            $(this).parent().attr("data-open","on");
            return false;
        });
    }

    for(var i=0; i<$('[data-item="3"]').length; i++){
        _set($('[data-item="3"]').eq(i));
    }
}


$(function(){
	var main_sc = $('.vbx_right_menu .schedule_box>.in>.list_box>ul>li.main_sc>a');
	    list_box = $('.vbx_right_menu .schedule_box>.in>.list_box');
		
	main_sc.click(function(){
		list_box.toggleClass('on');
	})
});


// 외부영역 클릭 시 메뉴 닫기
$(document).mouseup(function (e){
	
	var $mo_lnb = $("header nav #lnb");
	    $header =  $('header');
		$header_nav = $('header nav h2 a');
    
	if($mo_lnb.has(e.target).length === 0 && $header.has(e.target).length === 0 ){
		$mo_lnb.addClass("mb_hidden");
		$header_nav.removeClass('on');

		$('body').removeClass('mo_bg');
		$('ul#lnb>li').children('a').removeClass('on');
		$("div.submenu").stop().slideUp(100);
	}	
});

// 모바일 메뉴 클릭시 초기화
$(function(){
	var mo_nav_btn=  $('header nav h2 a');  

	mo_nav_btn.click(function(){
		$('ul#lnb>li').children('a').removeClass('on');
		$("div.submenu").stop().slideUp(100);
	})
});


