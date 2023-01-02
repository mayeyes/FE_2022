/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    Section Scroll

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    //common

    if($("body#main").length !== 0){
        //main
        main_full_scroll();
        main_focus();
    } else {
        //sub
    }
});

function main_full_scroll(str){
    var box = $('section[id*="page_"]');
    var cnt = 0;
    var delayVal = "Y";
    var delayTime = 500;

    function _pos(idx){
        $("body").attr("data-mian-step",idx);
        setTimeout(function(){
            delayVal = "Y";
        },delayTime);
    }

    function fn(event) {
        var idx = parseInt($("body").attr("data-mian-step"));
        if(delayVal === "Y"){
            event.preventDefault();
            if(event.wheelDelta === undefined && event.originalEvent === undefined){
                var ch = event.deltaY * -1;
            } else {
                var ch = event.wheelDelta ? event.wheelDelta : event.originalEvent.detail;    
            }
                
            delayVal = "N";
            
            if(ch < 0){
                // down
                idx++;
            } else {
                // up
                idx--;
            }

            if(idx > box.length) idx = box.length;
            else if(idx < 0) idx = 0;

            _pos(idx);
        }
    }

    if(str !== undefined){
        _pos(str);
    } else {
        _pos(cnt);

        document.addEventListener('wheel', fn, {passive: false});
        document.addEventListener('mousewheel', fn, false);
        document.addEventListener('DOMMouseScroll', fn, false);
    }
}

function main_focus(){  //섹션별 포커스 탭, 백탭
    var _shift = false;
    $(document).on("keydown",function(event){
        if(event.keyCode == 16) _shift = true;
    });
    $(document).on("keyup",function(event){
        if(event.keyCode == 16) _shift = false;
    });

    //퀵메뉴 <--> 메인
    $("#top_popup .big_btn").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("body#main #control>a:eq(0)").click();
            $("body#main #control>a:eq(0)").focus();
            return false;
        }
    });
    $("body#main #control>a:eq(0)").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#page_1 .vbx>.slogan>a").focus();
            return false;
        }
    });
    $("#page_1 .vbx>.slogan>a").keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("body#main #control>a:eq(0)").focus();
            return false;
        }
    });

    //메인 <--> 새소식
    $("#page_1 .vbx>.control>.btn_stop").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("body#main #control>a:eq(1)").click();
            $("body#main #control>a:eq(1)").focus();
            return false;
        }
    });
    $("body#main #control>a:eq(1)").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#page_2 .noti>ul>li:eq(0)>a").focus();
            return false;
        }
    });
    $("#page_2 .noti>ul>li:eq(0)>a").keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("body#main #control>a:eq(1)").focus();
            /*setTimeout(function(){
                $("#page_1 .vbx>.control>.btn_stop").focus();
            },500);*/
            return false;
        }
    });

    //새소식 <--> 사업안내
    $("#page_2 .noti>.more_btn").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("body#main #control>a:eq(2)").click();
            $("body#main #control>a:eq(2)").focus();
            return false;
        }
    });
    $("body#main #control>a:eq(2)").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#page_3 .lnkbx>ul>li:eq(0)").addClass("on");
            $("#page_3 .lnkbx>ul>li:eq(0)").find(".lnks").show();
            $("#page_3 .lnkbx>ul>li:eq(0)>.wr>.lnks>a").first().focus();
            return false;
        }
    });
    $("#page_3 .lnkbx>ul>li:eq(0)>.wr>.lnks>a").first().keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("body#main #control>a:eq(2)").focus();
            /*setTimeout(function(){
                $("#page_2 .noti>.more_btn").focus();
            },500);*/
            return false;
        }
    });

    //사업안내 <--> 기관소개
    $("#page_3 .lnkbx>ul>li:eq(0)>.wr>.lnks>a").last().keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#page_3 .lnkbx>ul>li:eq(0)").removeClass("on");
            $("#page_3 .lnkbx>ul>li:eq(0)>.wr>.lnks").hide();
            $("#page_3 .lnkbx>ul>li:eq(1)").addClass("on");
            $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks").show();
            $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks>a:eq(0)").focus();
            return false;
        }
    });
    $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks>a").last().keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#page_3 .lnkbx>ul>li:eq(1)").removeClass("on");
            $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks").hide();
            $("#page_3 .lnkbx>ul>li:eq(2)").addClass("on");
            $("#page_3 .lnkbx>ul>li:eq(2)>.wr>.lnks").show();
            $("#page_3 .lnkbx>ul>li:eq(2)>.wr>.lnks>a:eq(0)").focus();
            return false;
        }
    });
    $("#page_3 .lnkbx>ul>li:eq(2)>.wr>.lnks>a").last().keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("body#main #control>a:eq(3)").click();
            $("#page_3 .lnkbx>ul>li:eq(2)").removeClass("on");
            $("#page_3 .lnkbx>ul>li:eq(2)>.wr>.lnks").hide();
            $("body#main #control>a:eq(3)").focus();
            return false;
        }
    });
    $("body#main #control>a:eq(3)").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#page_4 .soge>ul>li:eq(0)>a").focus();
            return false;
        }
    });
    $("#page_4 .soge>ul>li:eq(0)>a").keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("body#main #control>a:eq(3)").focus();
            /*setTimeout(function(){
                $("#page_3 .lnkbx>ul>li:eq(2)").addClass("on");
                $("#page_3 .lnkbx>ul>li:eq(2)").find(".lnks").show();
                $("#page_3 .lnkbx>ul>li:eq(2)>.wr>.lnks>a").last().focus();
            },500);*/
            return false;
        }
    });
    $("#page_3 .lnkbx>ul>li:eq(2)>.wr>.lnks>a").first().keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("#page_3 .lnkbx>ul>li:eq(2)").removeClass("on");
            $("#page_3 .lnkbx>ul>li:eq(2)>.wr>.lnks").hide();
            $("#page_3 .lnkbx>ul>li:eq(1)").addClass("on");
            $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks").show();
            $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks>a").last().focus();
            return false;
        }
    });
     $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks>a").first().keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("#page_3 .lnkbx>ul>li:eq(1)").removeClass("on");
            $("#page_3 .lnkbx>ul>li:eq(1)>.wr>.lnks").hide();
            $("#page_3 .lnkbx>ul>li:eq(0)").addClass("on");
            $("#page_3 .lnkbx>ul>li:eq(0)>.wr>.lnks").show();
            $("#page_3 .lnkbx>ul>li:eq(0)>.wr>.lnks>a").last().focus();
            return false;
        }
    });


    //기관소개 --> 민원
    $("#page_4 .soge>ul>li:eq(2)>a").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("body#main #control>a:eq(4)").click();
            $("body#main #control>a:eq(4)").focus();
            return false;
        }
    });
    $("body#main #control>a:eq(4)").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#page_5 .minwon>.bx>.btns>a:eq(0)").focus();
            return false;
        }
    });
    $("#page_5 .minwon>.bx>.btns>a:eq(0)").keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("body#main #control>a:eq(4)").focus();
            return false;
        }
    });
}



/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

Slide Script

ex)
null : 옆으로 흐르는 배너 형태
type_02 : 팝업존 형태
type_03 : 비쥬얼 형태
type_04 : 포토슬라이드 형태(배너+이미지View)

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    if($(".js_slide").size() != 0){
        setTimeout(function(){ slide_AC(); }, 100);
    }
});

function slide_AC(){
var slide = $(".js_slide");

for(var i=0; i<slide.size(); i++){
    if(slide.eq(i).hasClass("type_02")) slide_type_02(slide.eq(i));//팝업존
    else if(slide.eq(i).hasClass("type_03")) slide_type_03(slide.eq(i));//비주얼
    else if(slide.eq(i).hasClass("type_04")) slide_type_04(slide.eq(i));//포토슬라이드
    else slide_type_01(slide.eq(i));//배너
}
}

function slide_type_01(slide){
    //배너
    var slide = slide;
    slide.titles = slide.find(">.title");
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

    //자동재생
    //slide.btn_play.click();

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

function slide_type_02(slide){
    //팝업존
    var slide = slide;
    slide.titles = slide.find(">.title");
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
    slide.autos = "Y";
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

    //자동재생
    slide.btn_play.click();

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

function slide_type_03(slide){
    //비주얼
    var slide = slide;
    slide.titles = slide.find(">.title");
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
    slide.times_speeds = 4000;
    slide.nums = 1;

    //제어
    if(slide.li.size() < 2){
        slide.controls.remove();
        return false;
    }

    //심볼
    $("<ul></ul>").prependTo(slide.controls);
    for(var i=0; i<slide.li.size(); i++){
        $('<li><a href="#">'+(i+1)+'번</a></li>').appendTo(slide.controls.find(">ul"));
    }
    slide.simbols = slide.controls.find(">ul>li");
    slide.simbols.eq(0).find(">a").addClass("on");

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

    //버튼 : 심볼
    slide.simbols.find(">a").click(function(){
        if($(this).hasClass("on")) return false;
        var idx = slide.simbols.index($(this).parent());
        slide.btn_stop.click();
        movement(idx);
        return false;
    });

    //자동재생
    slide.btn_play.click();

    //animate
    function movement(ty){
        slide.li = slide.ul.find(">li");

        var olds = 0;
        var news = 0;

        if(ty == "right"){
            //다음
            olds = slide.nums;
            news = slide.nums + 1;
            
            
            //alert(news);

            //if(news >= slide.li.size()) news = 0;
            if(news < slide.li.size()) {
                news = news;
            } else if (news > slide.li.size()) {
                news = 1;
            }
        } else if(ty == "left"){
            //이전
            olds = slide.nums;
            news = slide.nums - 1;

            if(news < 1) news = slide.li.size();
        } else {
            //심볼클릭
            olds = slide.nums;
            news = ty+1;
            if(news >= slide.li.size()) news = 0;
        }


        if(slide.li.eq(news-1).is(":animated")) return false;

        slide.li.eq(olds-1).stop().css({"opacity":"1","left":"0","z-index":"10"}).animate({"opacity":"0"},slide.speeds,function(){
            slide.li.eq(olds-1).css({"left":"100%","display":"none"});
            if(slide.autos == "Y"){
                slide.times = setTimeout(function(){
                    movement("right");
                },slide.times_speeds);
            }
        });

        slide.li.eq(news-1).css({"display":"block"}).stop().css({"opacity":"1","left":"0","z-index":"9"}).animate({"opacity":"1"},slide.speeds,function(){
        });

        slide.nums = news;

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");

        //심볼
        slide.simbols.find(">a.on").removeClass("on");
        slide.simbols.eq(slide.nums-1).find(">a").addClass("on");
    }
}

function slide_type_04(slide){
    //포토슬라이드
    var slide = slide;
    slide.titles = slide.find(">.title");
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
    slide.times_speeds = 5000;
    slide.nums = 1;

    //view
    //slide_view
    var setNum = $(".js_slide").index(slide);
    slide.attr("id","slide_view_"+setNum);
    $('<div class="slide_view_'+setNum+'"><span></span><img src="" alt="" /></div>').insertBefore(slide);
    views(0,$(".slide_view_"+setNum));

    //제어
    if(slide.li.size() < 2){
        slide.remove();
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

    slide.li.find(">a").click(function(){
        var idx = slide.li.index($(this).parent());
        var cl = $(this).parents(".js_slide").attr("id");

        views(idx,$("."+cl));
        return false;
    });

    //view
    function views(idx,obj){
        var idx = idx;
        var titles = slide.li.eq(idx).find(">a").attr("title");
        var imgs = slide.li.eq(idx).find(">a img")[0].src;
        var alts = slide.li.eq(idx).find(">a img").attr("alt");

        slide.li.find(">a.on").removeClass("on");
        slide.li.eq(idx).find(">a").addClass("on");
        obj.find(" img").attr("src",imgs);
        obj.find(" img").attr("alt",alts);
        if(titles){
            obj.find(" span").html("<strong>"+titles+"</strong>"+alts);
        } else {
            obj.find(" span").html(alts);
        }
        
        if(alts == ""){
            obj.addClass("notitle");
        } else {
            obj.removeClass("notitle");
        }
    }

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
            }
        });

        //총 카운트 적용
        slide.counts.html(slide.nums+"/<span>"+slide.li.size()+"</span>");
    }
}








$(function() {
    //상단팝업 열기닫기
    top_popup_btn();

    //비주얼 슬로건 애니메이션
    visual_on();

    //사업안내 호버시 버튼 열림
    setTimeout(function(){
        if($(".tab_check").is(":hidden")){
            link_Open();
        }
    },100);

    //시험분석안내 닫기
    quick_AC();

    //메인 탑버튼
    if($("body#main #top_btn").size() != 0){
        if($(".tab_check").is(":hidden")){
            main_floatingTop();
        } else{
            mob_floatingTop();
        }
    }
});



function top_popup_btn(){
    $("#top_popup .big_btn").click(function(){
        if($("body").attr("data-mian-step") == 0){
            $("body").attr("data-mian-step","1");
            $(this).text("열기");
        } else if($("body").attr("data-mian-step") == 1){
            $("body").attr("data-mian-step","0");
            $(this).text("닫기");
        }

        //mob
        $("#top_popup").toggleClass("on");

        return false;
    });
}

function visual_on(){
    $("#page_1 .slogan").addClass("on");
}

function link_Open(){
    $(".lnkbx>ul>li").find(".lnks").hide();
    $(".lnkbx>ul>li").mouseenter(function(){
        $(this).addClass("on");
        $(this).find(".lnks").stop().slideDown(600);
    });
    $(".lnkbx>ul>li").mouseleave(function(){
        $(this).removeClass("on");
        $(this).find(".lnks").stop().slideUp(600);
    });
}

function quick_AC(){
    $("#quick_btn .close_btn").click(function(){
        $(this).parent().fadeOut(200);
    });
}

function main_floatingTop(){
    $("#top_btn").click(function(){
        $("body").attr("data-mian-step","1");
        return false;
    });
}

 function mob_floatingTop(){
    $("#top_btn").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
 }



 /* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

    포커스 슬라이드 좌우터치 

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
$(function(){
    getLoc();
});

function getLoc(){
    var drag_y = 0;
    var drag_y_end = 0;
    var drag_obj = "";
    var ch = 0;
    var mouseCheckVal1 = false;
    var mouseCheckVal2 = false;
    
        $(".touchss").on("touchstart",function(e){
            drag_obj = $(e.target).parents(".touchss");
            ch = drag_obj.size();
            drag_y = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientY : e.clientY;
            mouseCheckVal1 = true;
        });

        $(".touchss").on("touchend",function(e){
            if(ch == 0) return false;
            
            var cnt = ($("body[data-mian-step]").length != 1)?0:parseInt($("body").attr("data-mian-step"));
            //console.log($("body[data-mian-step]").length);
            if(mouseCheckVal1 && mouseCheckVal2){
                if(drag_y_end - drag_y > 100) {
                    cnt--;
                    if(cnt<0){
                        cnt = 0;
                    }
                }else if(drag_y_end - drag_y < -100) {
                    cnt++;
                    if(cnt>$("[id*='page_']").length){
                        cnt = $("[id*='page_']").length;
                    }
                }
                
                main_full_scroll(cnt);
                mouseCheckVal1 = false;
                mouseCheckVal2 = false;
            }
        });

        $(".touchss").on("touchmove",function(e){
            if(mouseCheckVal1){
                mouseCheckVal2 = true;
                drag_y_end = (e.originalEvent.touches != undefined) ? e.originalEvent.touches[0].clientY : e.clientY;
            } else {
                mouseCheckVal2 = false;
            }
        });
        $(".touchss").on("mousemove",function(e){
            e.preventDefault();
        });
}