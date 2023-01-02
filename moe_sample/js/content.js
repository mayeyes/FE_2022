$(function(){
    //공통
    niceScroll_AC();//scroll
    header_selectbox_AC();//header selectbox
    gnb();//상단 메뉴
    header_search_AC();//header search
    sns_AC();//sns 공유
    footer_slide_AC();// 하단 슬라이드
    tab_AC();//tab
    
    //메인
    if($("body#main").length !== 0){
        //mian_changebox();//열린부총리실 위치변경
        mian_changebox3();//주요메뉴바로가기 위치변경
        //mian_changebox4();// 위치변경
        mian_changebox2();//사진영상뉴스 위치변경
        
        top_popup_AC();//메인 상단 팝업
        main_popupzone_AC();//메인 팝업존
        main_photoList_AC();//메인 사진 영상뉴스
        main_noti_AC();//보도자료 공지사항
        main_snsList_AC();//주요정책 소통망
        main_alimList_AC();//알린판
        getLoc();//터치슬라이드
    } else {
        //서브
        gnb_ov_AC();
        remote_AC();//left menu
        faq_AC();//FAQ
        tab_view_AC();//탭 뷰
        mapBtn_AC();//지도건너뛰기
        history_AC();//연혁 스크롤
        procedure_AC();//업무처리절차 
        file_list_popup_AC();//파일리스트 팝업
        photo_slide_AC();//게시판 포토슬라이드
        nuri_AC();//누리집
        board_popup_AC();//게시판 운영지침 팝업
    }
    

    //스크롤 호버 체크
    function scroll_mobile_check(){
        if(isMobile.any()){
            //$('[data-js="scroll"]').addClass('disable-hover')
            $('[data-js="scroll"]').getNiceScroll().remove();
            for(var i=0; i<$('[data-js="scroll"]').length; i++){
                $('[data-js="scroll"]').eq(i).css("overflow","auto");
            }
        } else {
            niceScroll_AC();
        }
    }
    scroll_mobile_check();
    $(window).resize(function(){scroll_mobile_check();});

});


// 모바일 에이전트 구분
var isMobile = {
    Android: function () {return navigator.userAgent.match(/Android/i) == null ? false : true;},
    BlackBerry: function () {return navigator.userAgent.match(/BlackBerry/i) == null ? false : true;},
    IOS: function () {return navigator.userAgent.match(/iPhone|iPad|iPod/i) == null ? false : true;},
    Opera: function () {return navigator.userAgent.match(/Opera Mini/i) == null ? false : true;},
    Windows: function () {return navigator.userAgent.match(/IEMobile/i) == null ? false : true;},
    any: function () {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows());}
};


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////
	shift save Function
	
	ex)
	alert(shift);
/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
var shift = false;
$(document).ready(function(){
    $(document).keydown(function(event){
        if(event.keyCode == 16 && shift != true) shift = true;
    });
    $(document).keyup(function(event){
        if(event.keyCode == 16) shift = false;
    });
});


/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	COOKIE Function

	ex)
	$.cookie('key', 'ok', {expires:7,domain:'.myhost.com', path:'/', secure:0});
	$.cookie('key', 'ok', '');
	alert($.cookie('key'));

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */

(function($){
    $.cookie = function(key, value, options) {
     if(arguments.length > 1) {
      var o = $.extend({}, $.cookie.defaults, options);
      
      if (value === null || value === undefined) {
       value = '';
       o.expires = -1;
      }
      if (o.expires.constructor != Date) {
       var today = new Date();
       today.setDate(today.getDate() + o.expires);
       o.expires = today;
      }
      // Create the cookie string
      document.cookie = 
       key + '=' + value + '; expires=' + o.expires.toUTCString() +
         (o.path? '; path=' + (o.path) : '') +
         (o.domain? '; domain=' + (o.domain) : '') +
         (o.secure? '; secure' : '');
     } else {
      if(result = new RegExp(key+"=(.*?)(?:;|$)").exec(document.cookie))
       return decodeURIComponent(result[1]);  
      return false;
     }
    }; //' $.cookie = function(key, value, options) 
    $.cookie.defaults = {
     expires: 365,
     path: '/'
    } // '$.cookie.defaults
   })(jQuery);

function niceScroll_AC(){
    var times = ""
    function _set(str){
        if(str.attr("data-type") === "1"){
            //메인 주요 정보 바로가기
            str.niceScroll({
                cursorcolor:"#fff",
                cursorborder:"0 solid #fff",
                cursoropacitymax:0.76,
                cursorwidth:"10px",
                cursorborderradius:"5px",
                background:"#BBC6D1",
                backgroundradius:"5px",
                touchbehavior:true,
                preservenativescrolling:true,
                autohidemode:false,
                railpadding:{
                    top:-22,
                    right:0,
                    left:0,
                    bottom:0
                },
                bouncescroll:false,
                emulatetouch: true,
                cursordragontouch: true
            });
        } else {
            str.niceScroll({
                cursorcolor:"#BFBFBF",
                cursorborder:"0 solid #fff",
                cursoropacitymax:0.76,
                cursorwidth:"10px",
                cursorborderradius:"5px",
                background:"#EAEEF1",
                backgroundradius:"5px",
                touchbehavior:true,
                preservenativescrolling:true,
                autohidemode:false,
                bouncescroll:false,
                emulatetouch: true,
                cursordragontouch: true
            });
        }
        str.removeAttr('tabindex');
    }
    setTimeout(function(){
        for(var i=0; i<$('[data-js="scroll"]').length; i++){
            _set($('[data-js="scroll"]').eq(i));
        }
    },500);
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	loading

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*
    loading 애니메이션 
    
    명령어
    - 실행 : loading.on()
    - 삭제 : loading.off()
*/
loading = loading();
function loading(){
    return {
        on:function(){
            $('<div data-skin="loading"><div><span></span><span></span><span></span><span></span></div></div>').appendTo($("body"));

            $('[data-skin="loading"]').attr("style","position:fixed; left:0; top:0; z-index:3000; width:100%; height:100%; background-color:rgba(0,0,0,0.5);");
            $('[data-skin="loading"]>div').attr("style","position:fixed; left:50%; top:50%; width:30em; height:30em;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);");
            //console.log("on");
        },
        off:function(){
            $('[data-skin="loading"]').remove();
            //console.log("off");
        }
    }
}

//메인 상단
function top_popup_AC(){
    function _set(str){
        var obj = str;
            obj.ul = obj.find(" .midd>ul");
            obj.li = obj.ul.find(">li");
            obj.checks = obj.find(" #data_pop_top");
            obj.btn_close = obj.find(" .close");
            obj.cnt = 0;

        if($.cookie('header-popup') === "on"){
            $("body").attr("data-TopPop","off");//끔
            return false;
        } else {
            $("body").attr("data-TopPop","on");//켬
        }
        
        obj.btn_close.on("click",function(){
            if(obj.checks.prop("checked")){
                $.cookie('header-popup', 'on', {expires:1});
            }
            $("body").attr("data-TopPop","off");//끔

            setTimeout(function(){
                for(var i=0; i<$('[data-js="scroll"]').length; i++){
                    $('[data-js="scroll"]').eq(i).getNiceScroll().resize();
                }
            },500);
            return false;
        });

        if(obj.li.length < 2){
            obj.li.eq(0).attr("data-open","on");
        } else {
            $('<div class="control" />').appendTo(obj.find(" .midd"));
            for(var i=0; i<obj.li.length; i++){
                $('<button class="num">'+(i+1)+'</button>').appendTo(obj.find(" .control"));
            }
            $('<button class="stop">정지</button>\
               <button class="play">재생</button>').appendTo(obj.find(" .control"));
            

            obj.btn = obj.find(" .control .num");
            obj.btn_play = obj.find(" .control .play");
            obj.btn_stop = obj.find(" .control .stop");
            

            function _move(idx){
                _stop();
                obj.li.attr("data-open","off")
                    .eq(idx).attr("data-open","on");
                obj.btn.attr("data-open","off")
                    .eq(idx).attr("data-open","on");

                obj.cnt = idx;
                if(obj.autos === "Y"){
                    _play();
                }
            }

            obj.autos = "Y";
            obj.times = "";
            obj.speeds = 6000;

            function _play(){
                obj.times = setTimeout(function(){
                    var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
                    _move(idx);
                },obj.speeds);
            }

            function _stop(){
                clearTimeout(obj.times);
            }

            obj.btn.on("click",function(){
                var idx = obj.btn.index($(this));console.log($(this).text())
                _move(idx);
            });

            obj.btn_play.on("click",function(){
                obj.autos = "Y";
                obj.btn_play.hide();
                obj.btn_stop.show();
                _play();
            });

            obj.btn_stop.on("click",function(){
                obj.autos = "N";
                obj.btn_stop.hide();
                obj.btn_play.show();
                _stop();
            });

            if(obj.autos === "Y"){
                obj.btn_play.hide();
                obj.btn_stop.show();
            }
            _move(obj.cnt);
        }

        $(window).on("scroll",function(){
            var t = $(this).scrollTop() * -1;
            obj.css("top",t);
        });
    }

    for(var i=0; i<$('[data-pop="TopPop"]').length; i++){
        _set($('[data-pop="TopPop"]').eq(i));
    }
}

function main_popupzone_AC(){
    function _set(str){
        var obj = str;
            obj.ul = obj.find(" .move>ul");
            obj.li = obj.ul.find(">li");
            obj.btn_close = obj.find(" .close");
            obj.cnt = 0;
            obj.textCount = obj.find(">.title>span");

        function _count(){
            obj.textCount.html('<em>'+(obj.cnt+1)+'</em>/'+obj.li.length);
        }

        if(obj.li.length < 2){
            obj.li.eq(0).attr("data-open","on");
            _count();
            return false;
        } else {
            $('<div class="control" />').appendTo(obj.find(" .move"));
            for(var i=0; i<obj.li.length; i++){
                $('<button class="num">'+(i+1)+'</button>').appendTo(obj.find(" .control"));
            }
            $('<button class="before">이전</button>\
               <button class="stop">정지</button>\
               <button class="play">재생</button>\
               <button class="after">다음</button>').appendTo(obj.find(" .control"));
            

            obj.btn = obj.find(" .control .num");
            obj.btn_play = obj.find(" .control .play");
            obj.btn_stop = obj.find(" .control .stop");
            obj.btn_before = obj.find(" .control .before");
            obj.btn_after = obj.find(" .control .after");
            obj.autos = "Y";
            obj.times = "";
            obj.speeds = 7000;

            function _move(idx){
                obj.li.find(">a").attr("tabindex","-1");
                obj.li.eq(idx).find(">a").removeAttr("tabindex");
                obj.li.attr("data-open","off")
                    .eq(idx).attr("data-open","on");
                obj.btn.attr("data-open","off")
                    .eq(idx).attr("data-open","on");

                obj.cnt = idx;
                _count();
                if(obj.autos == "Y"){
                    _play();
                }
            }

            function _stop(){
                clearTimeout(obj.times);
            }
            function _play(){
                _stop();
                obj.times = setTimeout(function(){
                    var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
                    _move(idx);
                },obj.speeds);
            }

            obj.btn.on("click",function(){
                var idx = obj.btn.index($(this));
                _move(idx);
            });

            obj.btn_before.on("click",function(){
                var idx = (obj.cnt-1 < 0) ? obj.li.length-1:obj.cnt-1;
                _move(idx);
            });

            obj.btn_after.on("click",function(){
                var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
                _move(idx);
            });

            obj.btn_play.on("click",function(){
                obj.autos = "Y";
                obj.btn_play.hide();
                obj.btn_stop.show();
                _play();
            });

            obj.btn_stop.on("click",function(){
                obj.autos = "N";
                obj.btn_play.show();
                obj.btn_stop.hide();
                _stop();
            });

            if(obj.autos == "Y"){
                obj.btn_play.hide();
                obj.btn_stop.show();
            }            
            _move(obj.cnt);
        }
    }

    for(var i=0; i<$('[data-js="popupzone"]').length; i++){
        _set($('[data-js="popupzone"]').eq(i));
    }
}

function main_photoList_AC(){
    function _set(str){
        var obj = str.find(">.in");
            obj.ul = obj.find(">.midd>ul");
            obj.li = obj.ul.find(">li");

        if(obj.li.length < 2){
            return false;
        } else {
            $('<div class="control" />').insertAfter(obj.find(">.midd"));
            $('<button class="before">이전</button>\
               <button class="stop">정지</button>\
               <button class="play">재생</button>\
               <button class="after">다음</button>').appendTo(obj.find(" .control"));
            
            obj.btn_play = obj.find(" .control .play");
            obj.btn_stop = obj.find(" .control .stop");
            obj.btn_before = obj.find(" .control .before");
            obj.btn_after = obj.find(" .control .after");
            obj.autos = "Y";
            obj.times = "";
            obj.speeds = 5600;

            function _move(ar){
                obj.li = obj.ul.find(">li");
                var l = obj.li.eq(0).innerWidth() * -1;

                if(ar === "before"){
                    obj.ul
                        .css("left",l+"px")
                        .find(">li").last().prependTo(obj.ul);

                    l = 0;
                }
                obj.ul.stop().animate({"left":l+"px"},function(){
                    if(ar === "after"){
                        obj.ul
                            .css("left","0")
                            .find(">li").first().appendTo(obj.ul);
                    }
                    if(obj.autos == "Y"){
                        _play();
                    }
                });
            }

            function _stop(){
                clearTimeout(obj.times);
            }
            function _play(){
                _stop();
                obj.times = setTimeout(function(){
                    _move("after");
                },obj.speeds);
            }

            obj.btn_before.on("click",function(){_move("before");});
            obj.btn_after.on("click",function(){_move("after");});

            obj.btn_play.on("click",function(){
                obj.autos = "Y";
                obj.btn_play.hide();
                obj.btn_stop.show();
                _play();
            });

            obj.btn_stop.on("click",function(){
                obj.autos = "N";
                obj.btn_play.show();
                obj.btn_stop.hide();
                _stop();
            });

            if(obj.autos == "Y"){
                obj.btn_play.hide();
                obj.btn_stop.show();
                _play();
            }

             obj.li.find(">a").on("focus",function(){
                 obj.btn_stop.trigger("click");
             });
        }
    }

    for(var i=0; i<$('[data-item="4"]').length; i++){
        _set($('[data-item="4"]').eq(i));
    }
}

function header_selectbox_AC(){
    function _set(str){
        var obj = str;
            obj.btn = obj.find(">strong>a");
            obj.list = obj.find(">div>ul>li>a");

        $("<i>열기</i>").appendTo(obj.btn);

        obj.btn.on("click",function(){
            if(obj.attr("data-open") !== "on"){
                $('#header .selectbox').attr("data-open","off");
                obj.attr("data-open","on");
                obj.find(' [data-js="scroll"]').getNiceScroll().resize();
                obj.btn.find(" i").text("닫기");
            }
            else{
                obj.attr("data-open","off");
                obj.btn.find(" i").text("열기");
            }
        });

        obj.list.on("mouseover focus",function(){
            obj.find(">div>ul>li").attr("data-open","off");
            $(this).parent().attr("data-open","on");
            obj.find(' [data-js="scroll"]').getNiceScroll().resize();
        });

        obj.find(" a:last").on("keydown",function(e){
            if(!shift && e.keyCode === 9){
                obj.btn.focus();
                return false;
            }
        });
    }

    for(var i=0; i<$('#header .selectbox').length; i++){
        _set($('#header .selectbox').eq(i));
    }
    
    $(document).on("click",function(e){
        if($(e.target).parents(".selectbox").length === 0){
            $('#header .selectbox').attr("data-open","off");
        }
    });
}

function gnb(){
    var obj = $("#header .menu");
        obj.deps1 = obj.find(">ul>li>a");
    
    obj.find(">ul>li>div").css({"overflow":"hidden","height":"0"});
    function _on(idx){
        _off();
        obj.find(">ul>li").eq(idx).attr("data-open","on");
        //obj.find(">ul>li:eq("+idx+")>div").stop().slideDown(200);
        obj.find(">ul>li:eq("+idx+")>div").show();
        var h = obj.find(">ul>li:eq("+idx+")>div>ul").css("height","auto").innerHeight();
        obj.find(">ul>li>div").stop().animate({"height":h+"px"},300);

        obj.find(">ul>li.on").attr("class","ons");
    }
    function _off(){
        obj.find(">ul>li").attr("data-open","off");
        obj.find(">ul>li>div").hide();
        obj.find(">ul>li.ons").attr("class","on");
    }
    obj.deps1.on("mouseover focus",function(){
        var idx = obj.find(">ul>li").index($(this).parent());
        _on(idx);
    });

    obj.on("mouseleave",function(){
        obj.find(">ul>li>div").stop().css("height","0");
        _off();
    });

    $('[data-btn="allMenu"], #header>[data-item="1"]>.layout>[data-item="3"] a').on("focus",function(){
        obj.find(">ul>li>div").stop().css("height","0");
        _off();
    });

    mobile_gnb();
}

function mobile_gnb(){
    var m = $("#header .menu>ul").clone(false);
    var s = $('#header > [data-item="1"] > .layout > [data-item="3"]>ul').clone(false);
    var h = $('#header > [data-item="1"] > .layout > [data-item="1"]>ul').clone(false);
    //var n = $('<li>'+h.find(">li").not(".mo").find(">div>strong>a").clone()+'<div>'+h.find(">li").not(".mo").find(">div>ul").clone()+'</div></li>');
    var n = h.find(">li").not(".mo").find(">div");

    m.find(">li>div>strong").remove();
    h.find(">li").not(".mo").remove();
    m.find(" *").removeAttr("style");
    s.find(" *").removeAttr("style");
    h.find(" *").removeAttr("style");

    for(var i=0; i<n.length; i++){
        $("<li class=\"etc\"><div data-js=\"scroll\"/></li>").appendTo(m);
        n.eq(i).find(">strong>a i").remove();
        n.eq(i).find(">strong>a").prependTo(m.find(">li").last());
        n.eq(i).find(">div>ul").appendTo(m.find(">li").last().find(">div"));
    }

    $('<div data-js="mgnb">\
        <a href="#" class="sw"><span>열기</span></a>\
        <div class="bind">\
            <div class="head"></div>\
            <div class="midd"></div>\
            <div class="foot"></div>\
        </div>\
       </div>').appendTo($("#header"));
    h.appendTo($('#header > [data-js="mgnb"]>.bind>.head'));
    m.appendTo($('#header > [data-js="mgnb"]>.bind>.midd'));
    s.appendTo($('#header > [data-js="mgnb"]>.bind>.foot'));

    var menu = $('#header > [data-js="mgnb"]>.bind>.midd>ul');
        menu.li = menu.find(">li");
        menu.li.li = menu.li.find(">div>ul>li");

    menu.li.eq(0).attr("data-open","on");

    menu.li.find(" a").each(function(){
		var i = $(this);
		
		if(i.siblings("div").length != 0){
			i.addClass("child");	
		}
    });

    // 1deps
    menu.li.find(">a").on("click",function(){
        menu.li.attr("data-open","off");
        $(this).parent().attr("data-open","on");

        menu.li.find(">div").getNiceScroll().resize();
        return false;
    });
    
    // 2deps
    menu.li.li.find(" div").slideUp(0);
    menu.li.li.find(" a").on("click",function(){
        if($(this).siblings("div").length !== 0){
            if($(this).attr("data-open") !== "on"){
                $(this).attr("data-open","on");
                $(this).parent().find(">div").stop().slideDown(200);
            } else {
                $(this).attr("data-open","off");
                $(this).parent().find(">div").stop().slideUp(200);
            }
            return false;
        }
        menu.li.find(">div").getNiceScroll().resize();
    });

    var btns = $("#header [data-js='mgnb']>.sw");

    btns.on("click",function(){
        if($("body").attr("data-mgnb") !== "on"){
            $("body").attr("data-mgnb","on");
            btns.find(">span").text("닫기");
        } else {
            $("body").attr("data-mgnb","off");
            btns.find(">span").text("열기");
        }
    });
}

function header_search_AC(){
    function _set(str){
        var obj = str;
            obj.btn_open = obj.find(" .open");
            obj.btn_close = obj.find(" .close");

        obj.btn_open.on("click",function(){$("body").attr("data-search","on");return false;});
        obj.btn_close.on("click",function(){$("body").attr("data-search","off");return false;});
    }
    for(var i=0; i<$('#header>[data-item="1"]>.layout>[data-item="2"]').length; i++){
        _set($('#header>[data-item="1"]>.layout>[data-item="2"]').eq(i));
    }
}

function remote_AC(){
    function _set(str){
        var menu = str.find(">.midd>ul");
            menu.li = menu.find(">li");

        menu.li.find(" div").slideUp(0);

        menu.li.find(" a").each(function(){
            var i = $(this);
            
            if(i.siblings("div").length != 0){
                i.addClass("child");	
            }
        });

        menu.li.find(" a").on("click",function(){
            if($(this).siblings("div").length !== 0){
                if($(this).attr("data-open") !== "on" && $(this).attr("data-open") !== "hit"){
                    $(this).attr("data-open","on");
                    $(this).parent().find(">div").stop().slideDown(200);
                    $(this).attr("title","확장됨");
                } else {
                    $(this).attr("data-open","off");
                    $(this).parent().find(">div").stop().slideUp(200);
                    $(this).attr("title","축소됨");
                }
                return false;
            }
        });

        menu.li.find(">a[data-open='on']").attr("data-open","off").trigger("click");
        menu.li.find(">div>ul>li>a[data-open='on']").attr("data-open","off").trigger("click");
        
    }

    for(var i=0; i<$("#remote").length; i++){
        _set($("#remote").eq(i));
    }
}

function sns_AC(){
    function _set(str){
        var obj = str;
            obj.btn_open = obj.find(" .open");
            obj.btn_close = obj.find(" .close");

        obj.btn_open.on("click",function(){
            obj.attr("data-open","on");
            obj.find(">div a").eq(0).focus();
            return false;
        });

        obj.btn_close.on("click",function(){
            obj.attr("data-open","off");
            obj.btn_open.focus();
            return false;
        });

        obj.btn_close.on("keydown",function(e){
            if(!shift && e.keyCode === 9){
                obj.find(">div a").eq(0).focus();
                return false;
            }    
        });
    }

    for(var i=0; i<$('[data-js="sns"]').length; i++){
        _set($('[data-js="sns"]').eq(i));
    }
}

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

///////   2022.07  수정작업 : S   ///////////////////////

// 메인 홍보영상 / 카드뉴스 추가 작업  
function main_snsList_AC(){
    function _set(str){
        var obj = str;
            obj.ul = obj.find(">.midd>.move>ul");
            obj.li = obj.ul.find(">li");

            obj.in = $("[data-item='5']>.in");
            obj.tabs = obj.in.find(">.midd>ul>li>.head>a");
            obj.tabs.li = obj.in.find(">.midd>ul>li");

            obj.tabs.li.first = obj.in.find(">.midd>ul>li:nth-child(1)");
            width = $(window).width();


        if(obj.li.length < 2){
            return false;
        } else {
            $('<div class="control" />').insertAfter(obj.find(">.midd>.move"));
            $('<button class="before">이전</button>\
               <button class="stop">정지</button>\
               <button class="play">재생</button>\
               <button class="after">다음</button>').appendTo(obj.find(" .control"));
            
            obj.btn_play = obj.find(" .control .play");
            obj.btn_stop = obj.find(" .control .stop");
            obj.btn_before = obj.find(" .control .before");
            obj.btn_after = obj.find(" .control .after");
            obj.autos = "Y";
            obj.times = "";
            obj.speeds = 5600;

            function _move(ar){
                obj.li = obj.ul.find(">li");
                var l = obj.li.eq(0).innerWidth() * -1;

                if(ar === "before"){
                    obj.ul
                        .css("left",l+"px")
                        .find(">li").last().prependTo(obj.ul);

                    l = 0;
                }
                obj.ul.stop().animate({"left":l+"px"},function(){
                    if(ar === "after"){
                        obj.ul
                            .css("left","0")
                            .find(">li").first().appendTo(obj.ul);
                    }
                    if(obj.autos == "Y"){
                        _play();
                    }
                });
            }

            function _stop(){
                clearTimeout(obj.times);
            }
            function _play(){
                _stop();
                obj.times = setTimeout(function(){
                    _move("after");
                },obj.speeds);
            }

            obj.btn_before.on("click",function(){_move("before");});
            obj.btn_after.on("click",function(){_move("after");});

            obj.btn_play.on("click",function(){
                obj.autos = "Y";
                obj.btn_play.hide();
                obj.btn_stop.show();
                _play();
            });

            obj.btn_stop.on("click",function(){
                obj.autos = "N";
                obj.btn_play.show();
                obj.btn_stop.hide();
                _stop();
            });

            if(obj.autos == "Y"){
                obj.btn_play.hide();
                obj.btn_stop.show();
                _play();
            }

            obj.li.find(">a").on("focus",function(){
                obj.btn_stop.trigger("click");
            });


            //****/ 반응형 작업 

            $(window).resize(function () {

                width = $(window).width();
                
                if(width<760){
                    
                    obj.tabs.li.attr("data-open","off");
                    obj.tabs.li.first.attr("data-open","on");
                    
                    obj.tabs.on("click",function(){
                        obj.tabs.li.attr("data-open","off");
                        $(this).parent().parent().attr("data-open","on");
                        return false;
                    });
                }else {

                    obj.tabs.li.attr("data-open","on");
                    obj.tabs.on("click",function(){
                        obj.tabs.li.attr("data-open","on");
                        $(this).parent().parent().attr("data-open","on");
                    });
                    
                }
            });

        }
    }


    if($('[data-item="5"]').length !== 0){
        for(var i=0; i<$('[data-item="5"]>.in>.midd>ul>li').length; i++){
            _set($('[data-item="5"]>.in>.midd>ul>li').eq(i));
        }
    }
    
}


///////   2022.07  수정작업 : E   ///////////////////////


function main_alimList_AC(){
    function _set(str){
        var obj = str.find(">.in");
            obj.ul = obj.find(">.midd>ul");
            obj.li = obj.ul.find(">li");
            obj.btn_close = obj.find(" .close");
            obj.cnt = 0;

        if(obj.li.length < 2){
            obj.li.eq(0).attr("data-open","on");
            return false;
        } else {
            $('<div class="control" />').appendTo(obj.find(" .head"));
            $('<span></span>\
               <button class="before">이전</button>\
               <button class="stop">정지</button>\
               <button class="play">재생</button>\
               <button class="after">다음</button>').appendTo(obj.find(" .control"));
            
            obj.textCount = obj.find(" .control>span");
            obj.btn_play = obj.find(" .control .play");
            obj.btn_stop = obj.find(" .control .stop");
            obj.btn_before = obj.find(" .control .before");
            obj.btn_after = obj.find(" .control .after");
            obj.autos = "Y";
            obj.times = "";
            obj.speeds = 5600;

            function _count(){
                obj.textCount.html('<em>'+(obj.cnt+1)+'</em>/'+obj.li.length);
            }
            _count();

            function _move(idx){
                obj.li.find(">a").attr("tabindex","-1");
                obj.li.eq(idx).find(">a").removeAttr("tabindex");
                obj.li.attr("data-open","off")
                    .eq(idx).attr("data-open","on");

                obj.cnt = idx;
                _count();
                if(obj.autos == "Y"){
                    _play();
                }
            }

            function _stop(){
                clearTimeout(obj.times);
            }
            function _play(){
                _stop();
                obj.times = setTimeout(function(){
                    var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
                    _move(idx);
                },obj.speeds);
            }

            obj.btn_before.on("click",function(){
                var idx = (obj.cnt-1 < 0) ? obj.li.length-1:obj.cnt-1;
                _move(idx);
            });

            obj.btn_after.on("click",function(){
                var idx = (obj.cnt+1 > obj.li.length-1) ? 0:obj.cnt+1;
                _move(idx);
            });

            obj.btn_play.on("click",function(){
                obj.autos = "Y";
                obj.btn_play.hide();
                obj.btn_stop.show();
                _play();
            });

            obj.btn_stop.on("click",function(){
                obj.autos = "N";
                obj.btn_play.show();
                obj.btn_stop.hide();
                _stop();
            });

            if(obj.autos == "Y"){
                obj.btn_play.hide();
                obj.btn_stop.show();
            }
            _move(obj.cnt);
        }
    }

    for(var i=0; i<$('[data-item="8"]').length; i++){
        _set($('[data-item="8"]').eq(i));
    }
}

function footer_slide_AC(){
    function _set(str){
        var obj = str;
            obj.ul = obj.find(">.move>ul");
            obj.li = obj.ul.find(">li");
            obj.btn_before = obj.find(">.before");
            obj.btn_after = obj.find(">.after");

        function _move(ar){
            obj.li = obj.ul.find(">li");
            var l = obj.li.eq(0).innerWidth() * -1;

            if(ar === "before"){
                obj.ul
                    .css("left",l+"px")
                    .find(">li").last().prependTo(obj.ul);

                l = 0;
            }
            obj.ul.stop().animate({"left":l+"px"},function(){
                if(ar === "after"){
                    obj.ul
                        .css("left","0")
                        .find(">li").first().appendTo(obj.ul);
                }
                if(obj.autos == "Y"){
                    _play();
                }
            });
        }

        obj.btn_before.on("click",function(){_move("before");return false;});
        obj.btn_after.on("click",function(){_move("after");return false;});
    }

    for(var i=0; i<$('[data-js="banner"]').length; i++){
        _set($('[data-js="banner"]').eq(i));
    }
}

function tab_AC(){
    function _set(str){
        var obj = str;
            obj.bx = obj.find(">ul>li a");

        $('<strong><a href="#">'+obj.find(">ul>li>strong").text()+'</a></strong>').prependTo(obj);
        obj.ti = obj.find(">strong");

        obj.ti.find(">a").on("click",function(){
            if(obj.find(">ul").is(":hidden")){
                obj.find(">ul").slideDown(200);
                obj.attr("data-open","on");
            } else {
                obj.find(">ul").slideUp(200);
                obj.attr("data-open","");
            }
            return false;
        });

        function _height(){
            obj.maxH = 0;
            obj.bx.removeAttr("style");
            obj.bx.each(function(i,str){
                obj.maxH = Math.max(obj.maxH,$(str).height());
            });
            if(obj.maxH < 49) obj.maxH = 49;
            obj.bx.height(obj.maxH);
        }
        function _select(){
            if(!obj.ti.is(":hidden") && $("#remote").is(":hidden")){
                obj.attr("data-type","select")
            } else {
                obj.attr("data-type","")
            }
        }
        _height();
        _select()
        $(window).resize(function(){
            _height();
            _select();
        });
    }
    for(var i=0; i<$("[data-tab]").length; i++){
        _set($("[data-tab]").eq(i));
    }
}


/* /////////////////////////////////////////////////////////////////////// 
    서브 
/////////////////////////////////////////////////////////////////////// */
function faq_AC(){
    function _set(str){
        var obj = str;
            obj.se = obj.find(">.head>select");
            obj.bx = obj.find(">.midd>ul>li");
            obj.ti = obj.bx.find(">ul>li>a");
            obj.te = obj.bx.find(">ul>li>div");

        obj.bx.hide();
        obj.bx.eq(0).show();
        obj.te.slideUp(0);
        obj.ti.attr("title","내용 축소됨");

        obj.ti.on("click",function(){
            if($(this).parent().attr("data-open") !== "on"){
                $(this).parent().attr("data-open","on");
                $(this).siblings("div").slideDown(200);
                $(this).attr("title","내용 확장됨");
            } else {
                $(this).parent().attr("data-open","off");
                $(this).siblings("div").slideUp(200);
                $(this).attr("title","내용 축소됨");
            }
            return false;
        });

        obj.se.on("change",function(){
            var v = $.trim(obj.se.find(">option:selected").val());
            obj.bx.hide();
            obj.find(">.midd>ul>li[data-set='"+v+"']").show();
        });
    }

    for(var i=0; i<$('#txt .faq').length; i++){
        _set($('#txt .faq').eq(i));
    }

    // 단독
    function _set2(str){
        var obj = str;
            obj.ti = obj.find(">ul>li>a");
            obj.te = obj.find(">ul>li>div");

        obj.te.slideUp(0);

        obj.ti.on("click",function(){
            if($(this).parent().attr("data-open") !== "on"){
                $(this).parent().attr("data-open","on");
                $(this).siblings("div").slideDown(200);
            } else {
                $(this).parent().attr("data-open","off");
                $(this).siblings("div").slideUp(200);
            }
            return false;
        });

        obj.find(">ul>li:eq(0)>a").click();
    }
    for(var i=0; i<$('#txt [data-faq]').length; i++){
        _set2($('#txt [data-faq]').eq(i));
    }
}

function tab_view_AC(){
    function _set(str){
        var obj = str;
            obj.btn = obj.find(">ul>li a");
            obj.targets = obj.attr('data-target');

        function _view(ids,_this){
            var s = ids.replace("#","");
            $('[data-tabview="'+obj.targets+'"]').hide();
            $("#"+s).show();

            obj.btn.unwrap();
            obj.btn.wrap('<span />');
            _this.unwrap();
            _this.wrap('<strong />');

            if(obj.attr("data-type") === "select"){
                if(obj.find(">strong").length !== 0) obj.find(">strong>a").text(_this.text());
                obj.find(">ul").slideUp(200);
            }
        }

        obj.btn.on("click",function(){
            var ids = $(this).attr("href");
            if(ids.indexOf("#") !== -1 && ids.length > 1){
                _view(ids,$(this));
                return false;
            }
        });
        obj.find(">ul>li:eq(0) a").trigger("click");
    }

    for(var i=0; i<$('[data-tab="2"]').length; i++){
        _set($('[data-tab="2"]').eq(i));
    }
}

function mapBtn_AC(){
    function _set(str){
        var obj = str;
            obj.bx = obj.siblings('[data-map="1"]');

        obj.on("click",function(){
            if(obj.bx.is(":hidden")){
                obj.bx.slideDown(200);
                obj.find(">span").text("지도 건너뛰기");
            } else {
                obj.bx.slideUp(200);
                obj.find(">span").text("지도 펼치기");
            }
            return false;
        });
    }
    for(var i=0; i<$('[data-js="mapBtn"]').length; i++){
        _set($('[data-js="mapBtn"]').eq(i));
    }
}

function history_AC(){
    function _set(str){
        var obj = str;

        function _ac(){
            var t = $(window).scrollTop() + ($(window).innerHeight() / 2);
            var b = ($("#root").innerHeight() - $(window).innerHeight()) - $(window).scrollTop();
            //console.log(b);
            var li = obj.find(">ul>li li");

            if(b < 10){
                obj.find(">ul>li").attr("data-hit","off");
                obj.find(">ul>li li").attr("data-hit","off");
                obj.find(">ul>li").last().attr("data-hit","on");
                obj.find(">ul>li").last().find(" li").last().attr("data-hit","on");
            } else {
                for(var i=0; i<li.length; i++){
                    if(t > li.eq(i).offset().top){
                        obj.find(">ul>li").attr("data-hit","off");
                        obj.find(">ul>li li").attr("data-hit","off");
                        li.eq(i).parent().parent().attr("data-hit","on");
                        li.eq(i).attr("data-hit","on");
                    }
                }
            }
        }

        $(window).on("scroll",function(){
            _ac();
        });
    }

    for(var i=0; i<$('[data-history]').length; i++){
        _set($('[data-history]').eq(i));
    }
}

function procedure_AC(){
    function _set(str){
        var obj = str;
            obj.ol = obj.find(">ol");
            obj.li = obj.ol.find(">li");
            obj.def = obj.find(">ol>li").clone();
            obj.btn_left = obj.find(">.l");
            obj.btn_right = obj.find(">.r");
            obj.gap = parseInt(obj.li.eq(2).css("margin-left"));
        
        function _move(str){
            obj.li = obj.ol.find(">li");
            var l = (obj.li.width() + obj.gap) * -1;
            if(str === "prev"){
                obj.ol.css("left",l+"px");
                obj.li.last().prependTo(obj.ol);
                l = 0;
            }
            obj.ol.animate({"left":l+"px"},500,function(){
                if(str === "next"){
                    obj.ol.css("left","0");
                    obj.li.first().appendTo(obj.ol);
                }
            });
        }

        obj.btn_left.on("click",function(){_move("prev");return false;});
        obj.btn_right.on("click",function(){_move("next");return false;});

        $(window).resize(function(){
            obj.gap = parseInt(obj.li.eq(2).css("margin-left"));
            if(obj.btn_left.is(":hidden")){
                obj.def.appendTo(obj.ol.empty());
            }
        });
    }
    for(var i=0; i<$('[data-Procedure="1"]').length; i++){
        _set($('[data-Procedure="1"]').eq(i));
    }
}

function mian_changebox(){
    if($('#container>.layout>[data-item="6"]').length === 0) return false;
    var obj = $('#container>.layout>[data-item="6"]');
    var c = obj.clone();
        c.find(">.bx").not(":nth-child(1)").remove();

    c.insertAfter($('#container>.layout>[data-item="3"]'));
}

function mian_changebox2(){
    if($('#container>.layout>[data-item="4"]').length === 0) return false;
    var obj = $('#container>.layout>[data-item="4"]');
    var c = obj.clone();
        c.attr("data-clone","mobile");
        //c.find(">.bx").not(":nth-child(1)").remove();

    c.insertBefore($('#container>.layout>[data-item="6"]'));
}

function mian_changebox3(){
    if($('#container>.layout>[data-item="2"]').length === 0) return false;
    var obj = $('#container>.layout>[data-item="2"]');
    var c = obj.clone();
        c.attr("data-clone","mobile");
        //c.find(">.bx").not(":nth-child(1)").remove();

    c.insertAfter($('#container>.layout>[data-item="5"]'));
}
function mian_changebox4(){
    if($('#container>.layout>[data-item="3"]').length === 0) return false;
    var obj = $('#container>.layout>[data-item="3"]');
    var c = obj.clone();
        c.attr("data-clone","mobile");
        //c.find(">.bx").not(":nth-child(1)").remove();

    c.insertAfter($('#container>.layout>[data-item="1"]'));
}


function file_list_popup_AC(){
    function _set(str){
        var obj = str;
            obj.btn_close = str.siblings('[data-filelist="1"]').find(' .close');

        $('[data-filelist="1"]').attr('tabindex','0');
        str.on("click",function(){
            if($(this).siblings('[data-filelist="1"]').length !== 0){
                var c = ($(this).siblings('[data-filelist="1"]').attr('data-open') !== "on") ? "on":"off";
                $(this).siblings('[data-filelist="1"]').attr('data-open',c).focus();
                return false;
            }
        });

        obj.btn_close.on("click",function(){
            $(this).parents('[data-filelist="1"]').attr('data-open','off').focus();
            return false;
        });
    }
    for(var i=0; i<$('[data-simbol="file"]').length; i++){
        _set($('[data-simbol="file"]').eq(i));
    }
}


function photo_slide_AC(){
    function _set(str){
        var obj = str;
            obj.item = obj.find(">ul>li").clone();
            obj.cnt = 0;

        $('<div class="head"></div>\
            <a href="#" class="prev"><span>이전</span></a>\
            <a href="#" class="next"><span>다음</span></a>\
        <div class="midd"><ul></ul></div>').appendTo(obj.empty());

        for(var i=0; i<obj.item.length; i++){
            obj.item.eq(i).appendTo(obj.find(">.midd>ul"));
        }
        obj.find(">.midd>ul>li>img").wrap('<a href="#"></a>');

        obj.li = obj.find(">.midd>ul>li");
        obj.box = obj.find(">.midd>ul");
        obj.btn = obj.find(">.midd>ul>li>a");
        obj.btn_prev = obj.find(" .prev");
        obj.btn_next = obj.find(" .next");

        function _point(idx){
            var ch = obj.li.eq(idx).position().left + obj.li.eq(idx).width() + obj.box.position().left;
            var ch2 = obj.li.eq(idx).position().left + obj.box.position().left;
            obj.item.eq(idx).find(" img").clone(false).appendTo(obj.find(">.head").empty());
            obj.li.removeClass("on").eq(idx).addClass("on");

            if(ch > obj.find(">.midd").width()){
                var l = (obj.li.eq(idx).position().left + obj.box.position().left) * -1;
                obj.box.animate({"left":l+"px"},300);
            }
            if(ch2 < 0){
                var l = (obj.box.position().left + obj.li.eq(idx).width() + parseInt(obj.li.eq(idx).css("margin-right")));
                obj.box.animate({"left":l+"px"},300);
            }
            obj.cnt = idx;
        }
        _point(obj.cnt);

        obj.btn_next.on("click",function(){
            if(obj.cnt + 1 > obj.li.length-1) return false;
            var idx = obj.cnt + 1;
            _point(idx);
            return false;
        });

        obj.btn_prev.on("click",function(){
            if(obj.cnt - 1 < 0) return false;
            var idx = obj.cnt - 1;
            _point(idx);
            return false;
        });

        obj.btn.on("click focus",function(){
            var idx = obj.li.index($(this).parent());
            _point(idx);
            return false;
        });
    }
    for(var i=0; i<$('[data-slide="photo"]').length; i++){
        _set($('[data-slide="photo"]').eq(i));
    }
}

function nuri_AC(){
    function _set(str){
        var obj = str.find(' [data-board-type]');
            obj.li = obj.find(">ul>li");

        $('<div class="mobile-select"><select title="월간호 선택"></select></div>').appendTo(obj);
        obj.se = obj.find(" .mobile-select>select");
        for(var i=0; i<obj.li.length; i++){
            $('<option value="'+(i+1)+'">'+obj.li.eq(i).find(" .t").text()+'</option>').appendTo(obj.se);
        }

        obj.se.on("change",function(){
            var idx = $(this).val() - 1;
            obj.li.hide().eq(idx).show();
        });
    }
    for(var i=0; i<$('#nuri').length; i++){
        _set($('#nuri').eq(i));
    }
}


function board_popup_AC(){
    function _set(str){
        var obj = str;
            obj.btn_close = str.siblings('[data-boardpop="1"]').find(' .close');

        $('[data-boardpop="1"]').attr('tabindex','0');
        str.on("click",function(){
            if($(this).siblings('[data-boardpop="1"]').length !== 0){
                var c = ($(this).siblings('[data-boardpop="1"]').attr('data-open') !== "on") ? "on":"off";
                $(this).siblings('[data-boardpop="1"]').attr('data-open',c).focus();
                return false;
            }
        });

        obj.btn_close.on("click",function(){
            $(this).parents('[data-boardpop="1"]').attr('data-open','off').focus();
            return false;
        });
    }
    for(var i=0; i<$('[data-pop="btn"]').length; i++){
        _set($('[data-pop="btn"]').eq(i));
    }
}

function gnb_ov_AC(){
    var rmote_text = $.trim($("#remote>.head").text());
    for(var i=0; i<$("#gnb>ul>li").length; i++){
        if($.trim($("#gnb>ul>li:eq("+i+")>a>span").text()) === rmote_text){
            $("#gnb>ul>li").eq(i).addClass("on");
        }
    }
    
}

function getLoc(){
    $('body#main #root #container > .layout > [data-item="1"] [data-js=popupzone] > .move').addClass("touchss");
    $('body#main #root #container > .layout > [data-item="4"] > .in > .midd').addClass("touchss");
    $('body#main #root #container > .layout > [data-item="5"] > .in > .midd > ul > li > .midd .move').addClass("touchss");
    $('body#main #root #container > .layout > [data-item="8"] > .in > .midd').addClass("touchss");
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
            /*drag_obj.parents(".in").find(".stop").trigger("click");*/
            
            if(mouseCheckVal1 && mouseCheckVal2){
                if(drag_x_end - drag_x > 100) {
                    drag_obj.parent().find(".before").trigger("click");
                }else if(drag_x_end - drag_x < -100) {
                    drag_obj.parent().find(".after").trigger("click");
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


///////   2022.07  수정작업 : S   ///////////////////////

 // 홍보영상, 카드뉴스 반응형 작업

 $(function(){ 
    var width = $(window).width();
         obj = $('.layout>[data-item="5"]');
         obj.in = obj.find(">.in");
         obj.li = obj.in.find(">.midd>ul>li");
         obj.tabs = obj.in.find(">.midd>ul>li>.head>a");
         obj.tabs.li = obj.in.find(">.midd>ul>li");

         obj.tabs.li.first = obj.in.find(">.midd>ul>li:nth-child(1)");
 
         if(width<760){

            obj.tabs.li.attr("data-open","off");
            obj.tabs.li.first.attr("data-open","on");

            obj.tabs.on("click",function(){
                obj.tabs.li.attr("data-open","off");
                $(this).parent().parent().attr("data-open","on");
                return false;
            });
        }else {
            obj.tabs.on("click",function(){
                return false;
            });
        }
 })
 
 
// 정책 > 주요주요업무계획 탭 메뉴

$(function(){

    $(".tab_head > ul > li").click(function(){
    var index = $(this).index();
        button =  $(this).find('>.in>.topbox>button');
        button_siblings = $(this).siblings().find('>.in>.topbox>button');
        tab_body = $('.tab_body_wrap>.tab_body>.tab_contents');
        tab_body_index = $('.tab_body_wrap>.tab_body>.tab_contents').eq(index);
        tab_boy_offset = $('.tab_body_wrap').offset();

        
        $(this).addClass('active').attr('aria-selected','true');
        $(this).siblings().removeClass('active');

        //탭 접근성 관련 
        $(this).attr('aria-selected','true');
        $(this).siblings().attr('aria-selected','false');
        button.attr('aria-selected','true');
        button_siblings.attr('aria-selected','false');
        $('.tab_body_wrap .tab_body > div.active').removeClass('active');
        tab_body_index.addClass('active');
       

        // 이동 및 포커스 처리
        $("html, body").animate({scrollTop: tab_boy_offset.top},400 , function(){
            tab_body_index.focus();
        });

    });


    // 클릭 이벤트 전파 방지 
    $(".tab_head > ul > li > .in > .down_btns > li > a").click(function(e){
        e.stopPropagation();
    })
    

    //카드뉴스 탭    
    // $(".card_news > .head > ul > li").click(function(){
    //     $(this).addClass('active');
    //     $(this).siblings().removeClass('active');
        
    //     var index = $(this).index();
        
    //     $('.card_news>.tab_midd>ul>li.on').removeClass('on');
    //     $('.card_news>.tab_midd>ul>li').eq(index).addClass('on');
        
    // });

    //카드뉴스가 1개 일때 

    var head   = $('.card_news>.head')
        num_li = $('.card_news>.head>ul>li').length;

        if(num_li === 1){
            head.addClass('only');
        }else {
            head.removeClass('only');
        }
})


// 카드뉴스 터치  

 $(function(){
	getLoc() //터치슬라이드
});


function getLoc(){
    $('.tab_body_wrap>.tab_body>.card_news>.tab_midd>ul> #card_01>div>.head ').addClass("touchss");
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
            /*drag_obj.parents(".in").find(".stop").trigger("click");*/
            
            if(mouseCheckVal1 && mouseCheckVal2){
                if(drag_x_end - drag_x > 100) {
                    drag_obj.parent().find(".prev").trigger("click");
                }else if(drag_x_end - drag_x < -100) {
                    drag_obj.parent().find(".next").trigger("click");
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
 

//  카드뉴스 모바일 

$(function(){
    var card_news_btn = $('.content_boxs .tab_head>ul>li>.in[data-simbol="4"]');
        card_news_head = $('.tab_body_wrap > .tab_body > .card_news .head');


    if ($(window).width() < 701){
        card_news_btn.click(function(){
            card_news_head.attr("data-type","select")
        });
    }
})


 ///////   2022.07  수정작업 : E   ///////////////////////