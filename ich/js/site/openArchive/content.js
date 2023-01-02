

$(function(){
	fin_bx()     // 제스처 스크립트 
	slide_veiw()
})



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	Top Menu Function
	
	ex)
	var Tmenu_code = "0101";//메뉴코드
	Tmenu_setting(Tmenu_code);//실행	

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
function Tmenu_setting(str){
	var params = str;
	var code = new Array();
		
	code[0] = parseInt(params.substr(0,2)) -1; //eq(n) n번지수 찾기
	code[1] = parseInt(params.substr(2,2)) -1; //eq(n) n번지수 찾기
	code[2] = parseInt(params.substr(4,2)) -1; //eq(n) n번지수 찾기	
	
	//PC	  
	var gnb_obj = $("#nav > #gnb > ul");
		gnb_obj.intervals = "";
		gnb_obj.li = gnb_obj.find(">li"); 
		gnb_obj.li.a = gnb_obj.li.find(">a");
		gnb_obj.li.ul = gnb_obj.li.find(">ul");
		gnb_obj.li.ul.li = gnb_obj.li.ul.find(">li"); 
		gnb_obj.li.ul.li.a = gnb_obj.li.ul.li.find(">a");
		gnb_obj.h = $("#header #nav"); 
		gnb_obj.blind = $("#nav > #blind"); 
	
		//default
	setTimeout(function(){
		gnb_def();
	},100);
	
	gnb_obj.mouseenter(function(){
		clearTimeout(gnb_obj.intervals);
	});	
	
	gnb_obj.mouseleave(function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
		
	gnb_obj.li.a.on("mouseover focus",function(){
		var idx = gnb_obj.li.index($(this).parent());
		gnb_open(idx);
	});
	
	gnb_obj.li.ul.mouseenter(function(){
		var idx = $(this).parent().index();
		
		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).siblings("a").addClass("on");
		gnb_obj.li.ul.not($(this)).removeClass("on");
		$(this).addClass("on");
	});
	
	gnb_obj.li.ul.li.a.on("mouseover focus",function(){
		var idx = $(this).parent().parent().parent().index();

		gnb_obj.li.find(">a.on").removeClass("on");
		$(this).parent().parent().siblings("a").addClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		$(this).parent().parent().addClass("on");
	});	
	
	gnb_obj.li.ul.li.last().find(">a").on("focusout",function(){
		gnb_obj.intervals = setTimeout(function(){
			gnb_def(gnb_obj);
		},500);
	});
	
	function gnb_def(){
		$("#header").removeClass("on");
		gnb_obj.find("a").removeClass("on");
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.ul.stop().animate({"opacity":0},150,function(){$(this).hide();});
		gnb_obj.h.stop().animate({"height":gnb_obj.li.a.innerHeight()+"px"},300);
		gnb_obj.blind.stop().animate({"height":0+"px"},300);
		
		
		if(code[0] > -1){
			var obj = gnb_obj.li.eq(code[0]);
			obj.find(">a").addClass("on");
			
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");

				}
			}
			
		}
	}
	
	function gnb_open(idx){
		$("#header").addClass("on");	
		gnb_obj.li.find(">a.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">a").addClass("on");	
		gnb_obj.li.find(">ul.on").removeClass("on");
		gnb_obj.li.eq(idx).find(">ul").addClass("on");
		gnb_obj.maxH = 0;
		for(var i=0; i<gnb_obj.li.size(); i++){
			gnb_obj.maxH = Math.max(gnb_obj.maxH,gnb_obj.li.eq(i).find(">ul").removeAttr("style").innerHeight());
		}
		gnb_obj.li.ul.innerHeight(gnb_obj.maxH -2).show().stop().animate({"opacity":1},200);
		gnb_obj.h.stop().animate({"height":(gnb_obj.maxH + (gnb_obj.li.a.innerHeight() + 50 ))+"px"},200);
		gnb_obj.blind.stop().animate({"height":(gnb_obj.maxH + (gnb_obj.li.a.innerHeight() + 50 ))+"px"},0);
	}
	
	
	//slide_map
	$('<div id="slide_map" tabindex="0"><div class="inner"><div class="binds"></div></div></div>').prependTo($("#wrap"));
	gnb_obj.clone(false).appendTo($("#slide_map >.inner > .binds"));
	
	//Mobile Menu	
	var mob_gnb_obj = $("#slide_map"); 
		mob_gnb_obj.box = mob_gnb_obj.find(">.inner"); 
		mob_gnb_obj.box.gnb = mob_gnb_obj.box.find(">.binds"); 
		mob_gnb_obj.box.gnb.ul = mob_gnb_obj.box.gnb.find(">ul");
		mob_gnb_obj.box.gnb.ul.li = mob_gnb_obj.box.gnb.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.a = mob_gnb_obj.box.gnb.ul.li.find(">a");
		mob_gnb_obj.box.gnb.ul.li.ul = mob_gnb_obj.box.gnb.ul.li.find(">ul");
		mob_gnb_obj.box.gnb.ul.li.ul.li = mob_gnb_obj.box.gnb.ul.li.ul.find(">li");
		mob_gnb_obj.box.gnb.ul.li.ul.li.a = mob_gnb_obj.box.gnb.ul.li.ul.li.find(">a");
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.each(function(){
		var i = $(this);
		
		if(i.siblings("ul").size() != 0){
			i.addClass("arrow");	
		}	
	});
	
	
	mob_def();
	// $(window).resize(function(){
	// 	mob_def();	
	// });	
	function mob_def(){
		mob_gnb_obj.box.find("a").removeClass("on");

		if(code[0] > -1){
			var obj = mob_gnb_obj.box.gnb.ul.li.eq(code[0]);
			obj.find(">a").addClass("on");
			obj.find(">a").siblings("ul").show();
			if(code[1] > -1){
				obj = obj.find(">ul>li").eq(code[1]);
				obj.find(">a").addClass("on");
				obj.find(">a").siblings("ul").show();
				if(code[2] > -1){
					obj = obj.find(">ul>li").eq(code[2]);
					obj.find(">a").addClass("on");
					obj.find(">a").siblings("ul").show();

				}
			}
			
		}
	}
	
	mob_gnb_obj.box.gnb.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.a.not(this).removeClass("on");
			$(this).toggleClass("on");
			return false;	
		} else {
			return true;	
		}
	});
	
	mob_gnb_obj.box.gnb.ul.li.ul.li.a.click(function(){
		if(mob_gnb_obj.box.gnb.ul.li.ul.is(":animated")) return false;
		if($(this).siblings("ul").size() != 0){
			mob_gnb_obj.box.gnb.ul.li.ul.li.a.not(this).removeClass("on");
			$(this).toggleClass("on");
			return false;	
		} else {
			return true;	
		}
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	allmenu Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	
    // $('<a href="#" class="m_close">전체메뉴닫기</a>').appendTo($("#slide_map >.inner > .binds"));
    // $("#header .line_2 >div").clone(false).prependTo($("#slide_map >.inner > .binds >.side_link"));
	// $("#header .line_2 .login").clone(false).prependTo($("#slide_map >.inner > .binds >.side_link"));
	
		
	$(".allmenu_btn_open").click(function() {	
		
		if($("#slide_map").is(":hidden") && !$("body").hasClass("pc")){
				$("body").addClass("fixed");
				$(this).toggleClass("on");
				if($(this).hasClass("on")){
				} else {
					
					$("body").removeClass("fixed");		
				}
				return false;
			} else {
				$(this).removeClass("on");
				return true;
			}
	});
    
    $("#slide_map>.inner>.binds>.m_close").click(function(){
		$("body").removeClass("fixed");
        $(".allmenu_btn_open").removeClass("on");
	});
	
	$(window).resize(function() {
		if(!$("#slide_map").is(":hidden")){
			$("#slide_map .inner").css({"margin-right":0});
		}
	});
    
    if($(".user #slide_map .inner .binds >ul >li >a.on").size() == 0){
        $(".user #slide_map .inner .binds >ul >li").first().find(">a").addClass("on");
    }
    
     $(document).click(function(e) { 
	    if($(e.target).parents("#slide_map").size() != 0) {
	         //메뉴 안
	    } else {
	        //밖
	        if(!$(".js_mobile_check").is(":hidden")){
				$("#slide_map .inner").stop().animate({"margin-left":-$("#slide_map .inner").innerWidth()},300,function(){
					/*$("#slide_map").fadeOut(300);*/
					$("body").removeClass("fixed");			
				});	
			}
	    } 
	});
});	



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

탭

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($(".tab_wrap").size() != 0){
		main_tabs_js();		
	}
});

function main_tabs_js(){
	var obj = $(".tab_wrap");
		obj.tab = obj.find(">.tab_btn ul li a");
		obj.cont = obj.find(" .tab_cont");
    
    //초기 셋팅
    obj.tab.parent().parent().find("li:eq(0) a").addClass("on");
    obj.cont.eq(0).addClass("on");
    
	obj.tab.click(function(){
		var idx = $(this).parent().index();
		obj.tab.removeClass("on"). find(">strong").contents().unwrap().wrap('<span></span>');
		$(this).addClass("on"). find(">span").contents().unwrap().wrap('<strong></strong>');
		obj.cont.removeClass("on");
		obj.cont.eq(idx).addClass("on");
		return false;	
	});	 
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	셀랙트 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("[data-skin='select']").size() != 0){
		selectbox_AC();		
	}
});

function selectbox_AC (){
	var obj = $("[data-skin='select']"); 

	obj.each(function() {
		var t = $(this);
			t.btn = t.find(">a"); 
			t.ul = t.find(">ul"); 
			t.ul.li = t.ul.find(">li"); 
		
			
	    
		t.btn.on("click",function() {
			if(t.ul.is(":animated")) return false;
			$(this).parent().siblings("div").find(">a.on").removeClass("on").siblings("ul").slideUp(300);
			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			return false;
		});
	    
	    t.ul.li.find(">a").on("click",function() {
	        $(this).parent().siblings().find(">a.on").removeClass("on");
	        $(this).addClass("on");
	        t.btn.html($(this).find(">span").clone());
	        t.find(">input").attr("value",t.btn.text());
	        t.find(">ul").slideUp(300);
            
            return false;
	    });
		
	    
	    
		t.ul.on("mouseleave",function() {
			$(this).parent().find(">a").removeAttr("class");
			$(this).parent().find(">div").slideUp(300);
			return false;
		});
		
		/*t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			return false;
		});	*/	
	});
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	스크롤 js

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    layout_scroll_AC();
});
function layout_scroll_AC(){
    $("body").attr("data-scroll-count", "0");
    $("#wrap").on("scroll",function(){
        var t = 0;
        var arr = ['sec01','sec02','sec03','sec04','sec05','sec06','sec07','sec08'];
        var cnt = 0;
        
        for(var i=0; i<arr.length; i++){
            var ob = $("#"+arr[i]);
            var t2 = (t - ob.offset().top) + $(window).height();
            var step = Math.floor(t2 / ob.innerHeight() * 100);

            if(step < 10) step = 0;
            else step = Math.floor(step / 10);
            if(t2 > 0 && t2 < ob.innerHeight()){
                ob.attr("data-steps",step);
                ob.parent().parent().parent().attr("data-scroll-count",i);
            } else {
                if(t2 < 10){
                    ob.removeAttr("data-steps");
                }
                else{
                    ob.attr("data-steps","10");
                }
            }
        }
    });
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	mobile check Function
	
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function(){
	mobile_check_AC();
	$(window).resize(function(){
		mobile_check_AC();
	});
});

function mobile_check_AC(){
	var ch = "";

	if($(".js_mobile_check").is(":hidden") && $(".js_tablet_check").is(":hidden")){
		ch = "pc";
	} else if($(".js_mobile_check").is(":hidden") && !$(".js_tablet_check").is(":hidden")){
		ch = "tab";
	} else {
		ch = "mobile";
	}

	if(!$("body").hasClass(ch)){
		if(ch == "mobile") $("body").removeClass("pc tab");
		if(ch == "tab") $("body").removeClass("pc mobile");
		if(ch == "pc") $("body").removeClass("tab mobile");
		$("body").addClass(ch);
	}
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    포커스 슬라이드 좌우터치 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

$(function(){
    getLoc();
});

function getLoc(){
    var drag_x = 0;
    var drag_x_end = 0;
    var drag_obj = "";
    var ch = 0;
    var mouseCheckVal1 = false;
    var mouseCheckVal2 = false;
    
        $(".touchss").on("mousedown touchstart",function(e){
            drag_obj = $(e.target).parents(".touchss");
            ch = drag_obj.size();
            drag_x = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
            mouseCheckVal1 = true;
        });

        $(".touchss").on("mouseup touchend",function(e){
            if(ch == 0) return false;
            
            if(mouseCheckVal1 && mouseCheckVal2){
                if(drag_x_end - drag_x > 100) {
                    drag_obj.find(".btn_left").trigger("click");
                }else if(drag_x_end - drag_x < -100) {
                    drag_obj.find(".btn_right").trigger("click");
                }
                mouseCheckVal1 = false;
                mouseCheckVal2 = false;
            }
        });

        $(".touchss").on("mousemove touchmove",function(e){
            if(mouseCheckVal1){
                mouseCheckVal2 = true;
                drag_x_end = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientX : e.clientX;
            } else {
                mouseCheckVal2 = false;
            }
        });
        $(".touchss").on("mousemove",function(e){
            e.preventDefault();
        });
        
}


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	js_lnbToggle Function

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(document).ready(function() {
	if($("#lnb").size() != 0){
		js_lnb();
	}
});
function js_lnb (){
	var obj = $("#remote.type_02 > #lnb >ul >li");

	obj.each(function() {
		var t = $(this);
		t.btn = t.find(">a");
		t.ul = t.find(">ul");
		t.ul.li = t.ul.find(">li");

		$("<em class='hidden'>열기</em>").appendTo(t.btn);

		t.btn.on("click",function() {
			if(t.ul.is(":animated")) return false;

			$(this).toggleClass("on").siblings("ul").slideToggle(300);
			if($(this).hasClass("on")){
				$(this).find(">em").text("닫기");
			} else {
				$(this).find(">em").text("열기");
			}
			return false;
		});

		t.on("mouseleave",function() {
			//if($(this).find(">ul").is(":animated")) return false;

			$(this).find(">a").removeAttr("class");
			$(this).find(">ul").slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});

		t.ul.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			t.btn.find(">em").text("열기");
			return false;
		});
	});

	$(".btn_share").click(function() {
		$(this).toggleClass("on");
        if($(this).hasClass("on")){
            $(this).siblings(".sns").fadeIn();
            $(this).find(" >em").text("닫기");
        }else{
            $(this).siblings(".sns").fadeOut();
            $(this).find(" >em").text("열기");
        }
		
		return false;
	});
}




//메인 하단 슬라이드


$(window).load(function () {
    if ($(".arch_slide").size() != 0) {
        arch_slide()
    }
});

function arch_slide(slide) {
    //팝업존
    var slide = $(".arch_slide");
    slide.controls = slide.find(">.control");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 1000;
    slide.times = "";
    slide.times_speeds = 5000;
    slide.nums = 1;

    //제어
    if (slide.li.size() < 2) {
        slide.controls.remove();
        return false;
    }

    //넘버링
    for (var i = 0; i < slide.li.size(); i++) {
        slide.li.eq(i).attr("data-count", (i + 1));
    }


    //버튼 : 다음
    slide.btn_right.click(function () {
        movement("right");
        return false;
    });

    //버튼 : 이전
    slide.btn_left.click(function () {
        movement("left");
        return false;
    });


    //animate
    function movement(ty) {
        slide.li = slide.ul.find(">li");
        if (slide.li.eq(0).is(":animated")) return false;

        var w = -100;

        if (ty == "left") {
            slide.li.last().prependTo(slide.ul);
            slide.li = slide.ul.find(">li");
            slide.li.eq(0).show().css("left", w + "%");
            slide.li.eq(1).css("left", "0").stop().animate({
                "left": "100%"
            }, slide.speeds, "easeOutCubic", function () {
                $(this).hide();
            });

            w = 0;

            slide.nums = slide.li.eq(0).attr("data-count");
        } else {
            slide.li.eq(1).show().stop().animate({
                "left": "0"
            }, slide.speeds, "easeOutCubic", function () {
                slide.li.eq(0).hide().appendTo(slide.ul);
                if (slide.autos == "Y") {
                    slide.times = setTimeout(function () {
                        movement("right");
                    }, slide.times_speeds);
                }
            });
            slide.nums = slide.li.eq(1).attr("data-count");
        }
        slide.li.eq(0).stop().animate({
            "left": w + "%"
        }, slide.speeds, "easeOutCubic", function () {
            if (ty == "right") {
                slide.li.eq(0).css("left", "100%");
            }
        });
    }
}



// tab head 모바일 
$(function () {
    var sort_head = $("[data-box-list='1']>.sort_head");

    sort_head.click(function () {
        $(this).toggleClass('active');
    })
})


// 메인 썸네일 리스트 (masonry)

$(function () {

    $('#section_01 [data-box-list="1"] .sort_body>ul>li>.arch_lists>ul').masonry({
        itemSelector: '.arch_list',
        gutter: 0,
        horizontalOrder: true,
        transitionDuration: '0.5s',
        percentPosition: true
    });
})



//main 썸네일 리스트 박스

$(function () {

    var more_view_btn = $('#section_01 .more_view_btn>a')

    more_view_btn.click(function () {
        $('#section_01').toggleClass('on');
    });

    /* 반응형 */

    var delay = 300,
        timer = null;

    function window_width_respons() {
        if (window.innerWidth < 641) {
            more_view_btn.attr('href', 'www.naver.com')
        } else {
            more_view_btn.attr('href', '#none')
        };
    };

    $(window).on('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {

            window_width_respons();
        }, delay)
    });

    window_width_respons();

})




// header 검색 버튼 활성화 (모바일)

$(function () {
    var header = $('.arch_wrap.user #header');
    var arch_wrap = $('.arch_wrap.user')
    var search_wrap = $('.arch_wrap.user #header .search_wrap');


    $('.arch_wrap.user #header .line_2 .searchs').click(function () {
        if (header.hasClass('on')) {
            header.removeClass('on');
            search_wrap.slideUp(200);

            arch_wrap.removeClass('bg_on');


        } else {
            header.addClass('on');
            search_wrap.slideDown(200);

            arch_wrap.addClass('bg_on');
        };
    })
});



//Top 버튼
$(document).ready(function () {
    if ($("#quick_btns").size() != 0) {
        floatingTop();
    }
});


function floatingTop() {
    $(window).on('scroll', function () {
        var winTop = $(this).scrollTop();
        var headerTop = $(window).height() / 4;


        if (winTop > headerTop) {
            $("#quick_btns").fadeIn(300);
            $("#quick_btns").css('display', 'flex');
        } else if (winTop <= headerTop) {
            $("#quick_btns").fadeOut(300);
        }
    })

    $("#quick_btns>#top_btn").click(function () {
        $("body,html").stop().animate({
            "scrollTop": "0"
        }, 300);
        return false;
    });
}



/* btn bg_color*/

// $(function() {  
//     $('#section_02>.in>[data-box-list="2"]>li>a')
//       .on('mouseenter', function(e) {
//               var parentOffset = $(this).offset(),
//                 relX = e.pageX - parentOffset.left,
//                 relY = e.pageY - parentOffset.top;
//               $(this).find('.bg_color').css({top:relY, left:relX})
//       })
//       .on('mouseout', function(e) {
//               var parentOffset = $(this).offset(),
//                 relX = e.pageX - parentOffset.left,
//                 relY = e.pageY - parentOffset.top;
//           $(this).find('.bg_color').css({top:relY, left:relX})
//       });
//   });




/* 서브 페이지 네비 고정(모바일)*/


$(function(){

		if($('#arch_sub').length > 0 ){

			$(window).on('scroll', function () {
				var $winTop = $(window).scrollTop();
				var $path = $('#container>#content>#txt>.layout>.inner_wrap>.left_layout>.path');
				var $pathTop = $path.offset().top;    // 상대값
				var $path_h = $('#container>#content>#txt>.layout>.inner_wrap>.left_layout>.path').height();
				var $header_h = $('.arch_wrap #header').height();
				var $sub_visual_h = $('.arch_wrap #sub_visual').height();
				var $scroll_num = $sub_visual_h - ($header_h + $path_h);   // 서브 비주얼 높이에 따른 스크롤 값 적용

			if($winTop > $pathTop){ 
					$path.addClass('fixed');
					
				}else if($scroll_num > $winTop){
					$path.removeClass('fixed');
				}
			});
		}
});




/* 테이블 제스터 아이콘 (모바일) */

function fin_bx(){
	var board = $('[data-board="list"]');
		table = board.find('> table');
		finger = board.find('> .fin_bx');
		table_w = table.width();	
		win_w = $(window).innerWidth();

		if(table_w > win_w) finger.addClass('on');
		else finger.removeClass('on');

		table.click(function(){
			finger.removeClass('on');
		})	
};


	var delay = 200,
		timer = null;	

	// 반응형
	$(window).on('resize', function () {

		clearTimeout(timer);
		timer = setTimeout(function () {

			fin_bx();

		}, delay)
	})

	//터치시 
	$('[data-board="list"]>table').on("mousemove touchmove touchstart", function( e ) {

        e.preventDefault();

		alert('hi')
		$('[data-board="list"]>.fin_bx').removeClass('on');
	 });
	 

// 전체 체크박스 	 

$(function(){
	$('#chk_all').click(function(){
		if($("#chk_all").is(":checked")) $('input[name="chk_group"]').prop("checked", true);
		else $('input[name="chk_group"]').prop("checked", false);
	});

	$('input[name="chk_group"]').click(function(){
		
		var total = $('input[name="chk_group"]').length;
		var checked = $('input[name="chk_group"]:checked').length;

		if(total != checked) $('#chk_all').prop("checked", false);
		
	})
})



function slide_veiw(){
	//팝업존
	var slide = $('#detail_veiw .veiw_slide');
	slide.controls = slide.find(">.control");
	slide.counts = slide.controls.find(">.count");
	slide.btn_left = slide.controls.find(".btn_left");
	slide.btn_right = slide.controls.find(".btn_right");
	slide.moves = slide.find(">.move");
	slide.ul = slide.moves.find(">ul");
	slide.li = slide.ul.find(">li");
	slide.a = slide.ul.find(">li>a");
	slide.speeds = 1000;
	slide.times = "";
	slide.times_speeds = 5000;
	slide.nums = 1;
	
	//제어
	if(slide.li.size() < 2){
		slide.controls.remove();
		return false;
	}
	
	//넘버링
	for(var i=0; i<slide.li.size(); i++){
		slide.li.eq(i).attr("data-count",(i+1));
	}
	
	//총 카운트 적용
	slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	
	//버튼 : 다음
	slide.btn_right.click(function(){
		movement("right");
		return false;
	});
	
	//버튼 : 이전
	slide.btn_left.click(function(){
		movement("left");
		return false;
	});
	
	
	//animate
	function movement(ty){
		slide.li = slide.ul.find(">li");
		if(slide.li.eq(0).is(":animated")) return false;
	
		var w = -100;
	
		if(ty == "left"){
			slide.li.last().prependTo(slide.ul);
			slide.li = slide.ul.find(">li");
			slide.li.eq(0).show().css("left",w+"%");
			slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,"easeOutCubic",function(){
				$(this).hide();
			});
	
			w = 0;
	
			slide.nums = slide.li.eq(0).attr("data-count");
		} else {
			slide.li.eq(1).show().stop().animate({"left":"0"},slide.speeds,"easeOutCubic",function(){
				slide.li.eq(0).hide().appendTo(slide.ul);
				// if(slide.autos == "Y"){
				// 	slide.times = setTimeout(function(){
				// 		movement("right");
				// 	},slide.times_speeds);
				// }   //자동 재생 중지 
			});
			slide.nums = slide.li.eq(1).attr("data-count");
		}
		slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,"easeOutCubic",function(){
			if(ty == "right"){
				slide.li.eq(0).css("left","100%");
			}
		});
	
		//총 카운트 적용
		slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
	}
	}


/* 키워드 등록  jquery.tag-editor */
$(function(){
	$('#key_box').tagEditor({
		delimiter: ', ', /* space and comma */
		placeholder: 'Keyword tags ...'
	});
})	



//****  viewer.js  ****//

// $(function(){
// 	// var zoom_btn = $('[data-list="view"]>._left>.veiw_slide>.control>.img_zoom>a');

// 	// zoom_btn.click(function(){
// 	// 	img_zoom()
// 	// });

// 	// function img_zoom(){

// 		var Viewer = window.Viewer;	
// 		var pictures = document.querySelector('[data-list="view"]>._left>.veiw_slide>.move ul');
	
// 		var viewer = new Viewer(pictures, {
// 			url: 'src',
// 			toolbar: {
// 				oneToOne: true,
// 				zoomIn: 4,
// 				zoomOut: 4,
// 				prev: function() {
// 					viewer.prev(true);
// 				},
	
// 				play: true,
	
// 				next: function() {
// 					viewer.next(true);
// 				},
// 			}
// 		})
// 	// }	
	  

// })



$(function(){
	var zoom = $('[data-list="view"]>._left>.veiw_slide>.control>.img_zoom')

	var Viewer = window.Viewer;	
	var pictures = document.querySelector('[data-list="view"]>._left>.veiw_slide>.move ul');

	var options = {
		url: 'src',
			toolbar: {
				oneToOne: true,
				zoomIn: 4,
				zoomOut: 4,
				prev: function() {
					viewer.prev(true);
				},
	
				play: true,
	
				next: function() {
					viewer.next(true);
				},
			}
	  };
	  var viewer = new Viewer(pictures, options);


		zoom.click(function(){
		
			viewer.show()
	 	 })
}) 






	
	

  
	




