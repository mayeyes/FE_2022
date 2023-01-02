/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Section Scroll

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    page_sc();
});

function page_sc(){
    var obj = $('[id*="page_"]');
    var btn = $('#control>ul>li>a');

    //클릭 시 이동
    btn.click(function(){
        var idx = $(this).parent().index();

        var sum = $("#header").innerHeight();
        for(var i=0; i<idx; i++){
            sum += obj.eq(i).innerHeight();
            console.log(sum);
        }
        
        $("#wrap").stop().animate({"scrollTop":sum +"px"});

        btn.parent().removeClass("on");
        $(this).parent().addClass("on");

        return false;
    });

    $(window).trigger("scroll");
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    섹션별 애니메이션

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    layout_scroll_AC();
});
function layout_scroll_AC(){
    function _set(){
        var t = 0;
        var arr = ['page_1','page_2','page_3','page_4'];
        
        for(var i=0; i<arr.length; i++){
            var ob = $("#"+arr[i]);
            var t2 = (t - ob.offset().top) + $(window).height();
            var step = Math.floor(t2 / ob.innerHeight() * 100);
        
            if(step < 10) step = 0;
            else step = Math.floor(step / 10);
            if(t2 > 0 && t2 < ob.innerHeight()){
                ob.attr("data-steps",step);
                $('#control>ul>li').eq(i).addClass("on");
            } else {
                $('#control>ul>li').eq(i).removeClass("on");

                if(t2 < 10) ob.removeAttr("data-steps");
                else ob.attr("data-steps","10");
            }
        }
    }
    _set();
    $("#wrap").on("scroll",function(){
        _set();
    });
}




/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    새로운 아카이브 슬라이드

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    if($(".js_arch").size() != 0){
        new_Arch();
    }
});

function new_Arch(){
    //배너
    var slide = $(".js_arch");
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
    slide.autos = "Y";
    slide.times = "";
    slide.times_speeds = 3000;
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

    //자동재생
    slide.btn_play.click();

    //animate
    function movement(ty){
        if(slide.ul.is(":animated")) return false;

        slide.li = slide.ul.find(">li");
        var w = slide.li.eq(0).innerHeight() * -1;

        if(ty == "top"){
            slide.li.last().prependTo(slide.ul);
            slide.ul.css("top",w+"px");

            w = 0;
            slide.nums = slide.li.last().attr("data-count");
        } else {
            slide.nums = slide.li.eq(0).attr("data-count");
        }

        slide.ul.stop().animate({"top":w+"px"},slide.speeds,function(){
            if(ty == "right"){
                slide.li.eq(0).appendTo(slide.ul);
                slide.ul.css("top","0");

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
