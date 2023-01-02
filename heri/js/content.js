/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	item Slide :: 공연/전시/교육 슬라이드

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    if($(".js_item").size() != 0){
        setTimeout(function(){ item_All(); }, 100);
    }
});

function item_All(){
	var slide = $(".js_item");

	for(var i=0; i<slide.size(); i++){

	    item_Slide(slide.eq(i));
	}
}


function item_Slide(slide){
    var slide = slide;
    slide.controls = slide.find(">.control");
    slide.counts = slide.controls.find(">.count");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.btn_play = slide.controls.find(">.btn_play");
    slide.btn_stop = slide.controls.find(">.btn_stop");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 1000;
    slide.autos = "N";
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
        slide.btn_stop.click();
        movement("right");
        return false;
    });

    //버튼 : 이전
    slide.btn_left.click(function(){
        slide.btn_stop.click();
        movement("left");
        return false;
    });

    //버튼 : 재생
    slide.btn_play.click(function(){
        slide.btn_play.hide();
        slide.btn_stop.css("display","inline-block");
        slide.autos = "Y";
        slide.times = setTimeout(function(){
            movement("right");
        },slide.times_speeds);
        return false;
    });

    //버튼 : 정지
    slide.btn_stop.click(function(){
        slide.btn_stop.hide();
        slide.btn_play.css("display","inline-block");
        slide.autos = "N";
        clearTimeout(slide.times);
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
            slide.li.eq(1).css("left","0").stop().animate({"left":"100%"},slide.speeds,function(){
                $(this).hide();
            });

            w = 0;

            slide.nums = slide.li.eq(0).attr("data-count");
        } else {
            slide.li.eq(1).show().stop().animate({"left":"0"},slide.speeds,function(){
                slide.li.eq(0).hide().appendTo(slide.ul);
                if(slide.autos == "Y"){
                    slide.times = setTimeout(function(){
                        movement("right");
                    },slide.times_speeds);
                }
            });
            slide.nums = slide.li.eq(1).attr("data-count");
        }
        slide.li.eq(0).stop().animate({"left":w+"%"},slide.speeds,function(){
            if(ty == "right"){
                slide.li.eq(0).css("left","100%");
            }
        });

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
    }
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    cere Slide :: 기증/기탁식 슬라이드

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    if($(".js_cere").size() != 0){
        setTimeout(function(){ cere_All(); }, 100);
    }
});

function cere_All(){
    var slide = $(".js_cere");

    for(var i=0; i<slide.size(); i++){

        cere_Slide(slide.eq(i));
    }
}


function cere_Slide(slide){
    var slide = slide;
    slide.controls = slide.find(">.control");
    slide.counts = slide.controls.find(">.count");
    slide.btn_left = slide.controls.find(">.btn_left");
    slide.btn_right = slide.controls.find(">.btn_right");
    slide.btn_play = slide.controls.find(">.btn_play");
    slide.btn_stop = slide.controls.find(">.btn_stop");
    slide.moves = slide.find(">.move");
    slide.ul = slide.moves.find(">ul");
    slide.li = slide.ul.find(">li");
    slide.a = slide.ul.find(">li>a");
    slide.speeds = 500;
    slide.autos = "N";
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
        slide.btn_stop.click();
        movement("right");
        return false;
    });

    //버튼 : 이전
    slide.btn_left.click(function(){
        slide.btn_stop.click();
        movement("left");
        return false;
    });

    //버튼 : 재생
    slide.btn_play.click(function(){
        slide.btn_play.hide();
        slide.btn_stop.css("display","inline-block");
        slide.autos = "Y";
        slide.times = setTimeout(function(){
            movement("right");
        },slide.times_speeds);
        return false;
    });

    //버튼 : 정지
    slide.btn_stop.click(function(){
        slide.btn_stop.hide();
        slide.btn_play.css("display","inline-block");
        slide.autos = "N";
        clearTimeout(slide.times);
        return false;
    });

    //animate
    function movement(ty){
        if(slide.ul.is(":animated")) return false;

        slide.li = slide.ul.find(">li");
        var w = slide.li.eq(0).innerWidth() * -1;

        if(ty == "left"){
            slide.li.last().prependTo(slide.ul);
            slide.ul.css("left",w+"px");

            w = 0;
            slide.nums = slide.li.last().attr("data-count");
        } else {
            slide.nums = slide.li.eq(0).attr("data-count");
        }

        slide.ul.stop().animate({"left":w+"px"},slide.speeds,function(){
            if(ty == "right"){
                slide.li.eq(0).appendTo(slide.ul);
                slide.ul.css("left","0");

                if(slide.autos == "Y"){
                    slide.times = setTimeout(function(){
                        movement("right");
                    },slide.times_speeds);
                }
            }
        });

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
    }
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	전체목록 이미지 팝업

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    list_Pop();
});

function list_Pop(){
	var obj = $("[data-skin='popup']");
		obj.cl = obj.find(".close");
	var btn = $("[data-pop='btn']");
	obj.appendTo("#wrap");
	obj.hide();

	btn.click(function(){
		obj.fadeIn();
		return false;
	});
	obj.cl.click(function(){
		obj.fadeOut();
		return false;
	});
}



 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	전체목록 상세검색

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    detail_Search();
});

function detail_Search(){
	var btn = $("#all_lst [data-js='btn']");
	var obj = $("#all_lst [data-js='box']");

	obj.hide();
	btn.click(function(){
		obj.slideDown();
		return false;
	});

	obj.find(">.close").click(function(){
		obj.slideUp();
		return false;
	});

	//선택조건 삭제
	$("#all_lst .topbx [data-skin='search'] .hashs>a:not(.reset)").click(function(){
		$(this).hide();
	});
}



 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    소장품 검색 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    collect_Search();
});

function collect_Search(){
    var obj = $("#colct_lst [data-skin='search']>ul>li");

    //검색조건 라디오 선택시 변경
    obj.r = obj.find(" [data-skin='radio']");

    obj.eq(2).hide();

    obj.r.find("input[type='radio']").click(function(){
        if(obj.r.eq(0).find("input[type='radio']").is(":checked")){
            obj.eq(1).show();
            obj.eq(2).hide();
        } else{
            obj.eq(1).hide();
            obj.eq(2).show();
        }
    });

    //분류유형 선택
    obj.find(".divi>div>.wbx>a").click(function(){ $(this).toggleClass("on"); return false; });
}


 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    사이트맵

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    sitemap_AC();
});

function sitemap_AC(){ $("#gnb").clone().prependTo("#sitemap"); }


 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    문화재별 검색 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    if($('[data-skin="search_menu"]').size() != 0) sub_01();
});

function sub_01(){
    var obj = $('[data-skin="search_menu"]');
    var btn = $('[data-skin="search_menu"] [class*="line"] .s_wrap .in .select_btn');
    var close = $('[data-skin="search_menu"] [class*="line"] .s_wrap .in .pops .btn_bx .close');
    var hide_btn = $('[data-skin="search_menu"] .line1 >a');
    
    
    btn.click(function(){
        btn.removeClass("on");
        $(this).addClass("on");
       return false; 
    });
    
    close.click(function(){
        btn.removeClass("on");
        return false; 
    });
    
    hide_btn.click(function(){
        if(obj.hasClass("hide")){
            obj.removeClass("hide");
        }else obj.addClass("hide");
        
        return false; 
    });
}