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

SNS 퍼가기

ex)
<a href="#" onclick="facebookOpen();return false;">페이스북</a>
<a href="#" onclick="twitterOpen();return false;">트위터</a>
<a href="#" onclick="blogOpen();return false;">블로그</a>

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//blog
function blogOpen(){
	var titl = $("#txt h3").text();
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace ('"', '&quot;');
	titl = encodeURIComponent(titl);
	var link = encodeURIComponent(location.href); 
	var url = "http://blog.naver.com/openapi/share?url=" + link + "&title=" + titl;
	snswindowOpen (url, 900, 450, 'no');
}
//페이스북
function facebookOpen(){
	var titl = $("#txt h3").text();
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace ('"', '&quot;');
	titl = encodeURIComponent(titl);
	var link = encodeURIComponent(location.href); 
	var url = "http://www.facebook.com/sharer.php?u=" + link + "&t=" + titl;
	snswindowOpen (url, 900, 450, 'no');
}
//twitter
function twitterOpen(){
	var titl = $("#txt h3").text();
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace ('"', '&quot;');
	titl = titl.replace('&gt;','>');
	titl = titl.replace('&gt;','>');
	titl = encodeURIComponent(titl);
	var link = encodeURIComponent(location.href); 
	var url = "http://twitter.com/share?text=" + titl + "&url=" + link;
	snswindowOpen (url, 800, 400, 'yes');
}
function snswindowOpen(){
	var nUrl; var nWidth; var nHeight; var nLeft; var nTop; var nScroll;
	nUrl = arguments[0];
	nWidth = arguments[1];
	nHeight = arguments[2];
	nScroll = (arguments.length > 3 ? arguments[3] : "no");
	nLeft = (arguments.length > 4 ? arguments[4] : (screen.width/2 - nWidth/2));
	nTop = (arguments.length > 5 ? arguments[5] : (screen.height/2 - nHeight/2));
	winopen=window.open(nUrl, 'SNS', "left="+nLeft+",top="+nTop+",width="+nWidth+",height="+nHeight+",scrollbars="+nScroll+",toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no");
}

var _layout = {
    scroll:function(){
        var obj = ($("#path").length !== 0)?$("#path"):"";
        var t = 0;
        if(obj !== ""){
            t = obj.offset().top - 10;
            $(window).on("resize",function(){
                t = obj.offset().top - 10;
            });
        } else {
            t = 10;
        }
        $(window).on("scroll",function(){
            if(t < $(this).scrollTop()){
                if($("body").attr("data-scroll") !== "on") $("body").attr("data-scroll","on");
            } else {
                if($("body").attr("data-scroll") !== "off") $("body").attr("data-scroll","off");
            }
        });
    },
    sns:function(str){
        var obj = str;
            obj.btn = obj.find(">.head a");

        obj.btn.on("click",function(){
            var c = (obj.attr('data-sw') !== "on")?"on":"off";
            obj.attr('data-sw',c);
            return false;
        });
    },
    print:function(str){
        var obj = str;
            obj.btn = obj.find(" a");

        obj.btn.on("click",function(){window.print();return false;});
    },
    gnb:function(str){
        var obj = str;
            obj.li = obj.find(">ul>li");

        var contrll = {
            on:function(idx){
                $("#header").attr("data-menu","on");
                $("#header").attr("data-menu-num",idx);
                obj.li.find(">div").stop().fadeOut(0);
                obj.li.eq(idx-1).find(">div").stop().fadeIn(200);
            },
            off:function(idx){
                $("#header").attr("data-menu","off");
                if(idx) $("#header").attr("data-menu-num",idx);
                else $("#header").removeAttr("data-menu-num");
                obj.li.find(">div").stop().fadeOut(0);
            }
        }
        obj.li.on("mouseenter",function(){
            var idx = obj.li.index($(this))+1;
            if($(this).find("div").length!==0) contrll.on(idx);
            else contrll.off(idx);
        });
        obj.li.find(">a").on("focus",function(){
            var idx = obj.li.index($(this).parent())+1;
            if($(this).parent().find("div").length!==0) contrll.on(idx);
            else contrll.off(idx);
        });
        obj.on("mouseleave",function(){contrll.off();});
        obj.li.last().find(">a").on("keydown",function(e){if(!shift && e.keyCode === 9) contrll.off();});
        obj.li.first().find(">a").on("keydown",function(e){if(shift && e.keyCode === 9) contrll.off();});
    },
    mobileMenu:function(str){
        var obj = str;
            obj.menu = obj.find(">.in>.midd>.midd>ul");
            obj.menuOpen = $(".mo-menu-open, .mo-menu-close, #header .all-btn");
            obj.listBtn = obj.menu.find(">li>a");

        for(var i=0; i<obj.menu.find(">li").length; i++){
            if(obj.menu.find(">li").eq(i).find(">div").length !== 0){
                obj.menu.find(">li").eq(i).find(">a").addClass("child");
            }
        }

        obj.listBtn.on("click",function(){
            if($(this).hasClass("child")){
                if(!$(this).hasClass("on")){
                    $(this).addClass("on");
                    $(this).siblings("div").slideDown(200);
                } else {
                    $(this).removeClass("on");
                    $(this).siblings("div").slideUp(200);
                }
            }
            return false;
        });

        obj.menuOpen.on("click",function(){
            var c = ($("body").attr("data-mobile-menu")!=="on")?"on":"off";
            $("body").attr("data-mobile-menu",c);
            return false;
        });
    },
    mobileSearch:function(str){
        var obj = str;
            obj.btnOpen = $(".mo-search-open, .mo-search-close");

        obj.btnOpen.on("click",function(){
            var c = ($("body").attr('data-search')!=="on")?"on":"off";
            $("body").attr('data-search',c);
            return false;
        });
    },
    init:function(){
        this.scroll();//서브 스크롤 액션
        if($("#path .sns").length !== 0) this.sns($("#path .sns"));//서브 sns 액션
        if($("#path .print").length !== 0) this.print($("#path .print"));//서브 sns 액션
        if($("#header .search").length !== 0) this.mobileSearch($("#header .search"));//레이아웃 모바일 검색
        if($("#header .menu").length !== 0) this.gnb($("#header .menu"));//상단메뉴
        this.mobileMenu($("#header .mo-menu"));//모바일 메뉴
    }
}

// sub
var _selectbox = {
    set:function(str){
        var obj = str;
            obj.btn = obj.find(">.head a");

        obj.btn.on("click",function(){
            var c = (obj.attr('data-sw')!=="on")?"on":"off";
            obj.attr('data-sw',c);
            return false;
        })
    },
    clear:function(){
        $(window).on("click",function(e){
            if($(e.target).parents(".selectbox").length === 0){
                $('.selectbox').attr('data-sw','off');
            }
        });
    },
    init:function(){
        for(var i=0; i<$('.selectbox').length; i++){
            this.set($('.selectbox').eq(i));
        }
        this.clear();
    }
}
var _tab = {
    set:function(str){
        var obj = str;
            obj.btn = obj.find('>.head>a');

        obj.btn.on("click",function(){
            var c = (obj.attr('data-sw') !== "on")?"on":"off";
            for(var i=0; i<$('[data-tab]').length; i++){
                $('[data-tab]').attr('data-sw',"off");
            }
            obj.attr('data-sw',c);
            return false;
        });
    },
    init:function(str){
        for(var i=0; i<$('[data-tab]').length; i++){
            this.set($('[data-tab]').eq(i));
        }
    }
}
var _file = {
    set:function(str){
        var obj = str;
            obj.btn = obj.find(' input[type="file"]');

        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) {
                url = window.createObjectURL(file)
            } else if (window.URL != undefined) {
                url = window.URL.createObjectURL(file)
            } else if (window.webkitURL != undefined) {
                url = window.webkitURL.createObjectURL(file)
            }
            return url
        };
        
        obj.btn.on("change",function(){
            var f = (this.files)?this.files[0]:this.files;
                f = f.name;
            $(this).siblings("input[type='text']").val(f);
        });
    },
    init:function(){
        for(var i=0; i<$('[data-form="file"]').length; i++){
            this.set($('[data-form="file"]').eq(i));
        }
    }
}

// main
var _line1_1 = {
    set:function(str){
        var obj = str;
            obj.ul = obj.find(">.move>ul");
            obj.li = obj.ul.find(">li");
            obj.btnPrev = obj.find(" .controll .prev");
            obj.btnNext = obj.find(" .controll .next");
            obj.btnStop = obj.find(" .controll .stop");
            obj.btnPlay = obj.find(" .controll .play");
            obj.cnt = 0;
            obj.autos = "Y";
            obj.time = "";
            obj.timeSpeed = 6000;//속도
        var __controll = {
            on:function(idx){
                clearTimeout(obj.time);
                obj.li.removeClass("on").eq(idx).addClass("on");
                obj.cnt = idx;
                if(obj.autos === "Y"){
                    __controll.play();
                }
            },
            prev:function(){
                var idx = (obj.cnt-1 < 0)?obj.li.length-1:obj.cnt-1;
                __controll.on(idx);
            },
            next:function(){
                var idx = (obj.cnt+1 >= obj.li.length)?0:obj.cnt+1;
                __controll.on(idx);
            },
            setTime:function(){
                obj.time = setTimeout(function(){__controll.next();},obj.timeSpeed);
            },
            play:function(){
                obj.autos = "Y";
                obj.btnPlay.hide();
                obj.btnStop.show();
                __controll.setTime();
            },
            stop:function(){
                obj.autos = "N";
                obj.btnPlay.show();
                obj.btnStop.hide();
                clearTimeout(obj.time);
            },
            def:function(){
                __controll.on(0);
            }
        }
        if(obj.li.length<2){
            obj.autos = "N";
            obj.find(" .controll").remove();
        } else {
            obj.btnPrev.on("click",function(){__controll.prev(); return false;});
            obj.btnNext.on("click",function(){__controll.next(); return false;});
            obj.btnPlay.on("click",function(){__controll.play(); return false;});
            obj.btnStop.on("click",function(){__controll.stop(); return false;});
        }
        __controll.def();
    },
    init:function(){
        if($(".line-1 .item-1_1").length !== 0){
            this.set($(".line-1 .item-1_1"));
        }
    }
}
var _line1_2 = {
    set:function(str){
        var obj = str;
            obj.ul = obj.find(">.move>ul");
            obj.li = obj.ul.find(">li");
            obj.btnPrev = obj.find(" .controll .prev");
            obj.btnNext = obj.find(" .controll .next");
            obj.btnStop = obj.find(" .controll .stop");
            obj.btnPlay = obj.find(" .controll .play");
            obj.count = obj.find(" .controll>span");
            obj.cnt = 0;
            obj.autos = "Y";
            obj.time = "";
            obj.timeSpeed = 6000;//속도
        var __controll = {
            count:function(){
                var min = ((obj.cnt+1)<10)?'0'+(obj.cnt+1):(obj.cnt+1);
                var max = (obj.li.length<10)?'0'+obj.li.length:obj.li.length;
                $('<em>'+min+'</em>/<span>'+max+'</span>').appendTo(obj.count.empty());
            },
            on:function(idx){
                clearTimeout(obj.time);
                obj.li.removeClass("on").eq(idx).addClass("on");
                obj.cnt = idx;
                __controll.count();
                if(obj.autos === "Y"){
                    __controll.play();
                }
            },
            prev:function(){
                var idx = (obj.cnt-1 < 0)?obj.li.length-1:obj.cnt-1;
                __controll.on(idx);
            },
            next:function(){
                var idx = (obj.cnt+1 >= obj.li.length)?0:obj.cnt+1;
                __controll.on(idx);
            },
            setTime:function(){
                obj.time = setTimeout(function(){__controll.next();},obj.timeSpeed);
            },
            play:function(){
                obj.autos = "Y";
                obj.btnPlay.hide();
                obj.btnStop.show();
                __controll.setTime();
            },
            stop:function(){
                obj.autos = "N";
                obj.btnPlay.show();
                obj.btnStop.hide();
                clearTimeout(obj.time);
            },
            def:function(){
                __controll.on(0);
            }
        }
        if(obj.li.length<2){
            obj.autos = "N";
            obj.find(" .controll").remove();
        } else {
            obj.btnPrev.on("click",function(){__controll.prev(); return false;});
            obj.btnNext.on("click",function(){__controll.next(); return false;});
            obj.btnPlay.on("click",function(){__controll.play(); return false;});
            obj.btnStop.on("click",function(){__controll.stop(); return false;});
        }
        __controll.def();
    },
    init:function(){
        if($(".line-1 .item-2").length !== 0){
            this.set($(".line-1 .item-2"));
        }
    }
}
var _line2_1 = {
    set:function(str){
        var obj = str;
            obj.tab = obj.find(">ul>li .t");
            obj.btnPrev = obj.find(">ul>li .controll>.prev");
            obj.btnNext = obj.find(">ul>li .controll>.next");
        var __controll = {
            onOff:function(str){
                obj.tab.unwrap();
                obj.tab.wrap('<span />');
                str.unwrap();
                str.wrap('<strong />');
            },
            prev:function(str){
                var box = str.parent().parent().find(">.move>ul");
                    box.li = box.find(">li");
                    box.w = (box.li.eq(0).width()+Number(box.li.eq(0).css("margin-right").replace("px",""))) * -1;
                var c = ((box.li.height()*2) < box.height())?"2":"1";
                    
                if(box.is(":animated")) return false;
                box.css("left",box.w+"px");
                if(c==="1"){
                    box.li.last().prependTo(box);
                } else if(c==="2"){
                    box.find(">li:gt("+(box.li.length-3)+")").prependTo(box);
                }
                
                box.animate({"left":"0px"},500);
            },
            next:function(str){
                var box = str.parent().parent().find(">.move>ul");
                    box.li = box.find(">li");
                    box.w = (box.li.eq(0).width()+Number(box.li.eq(0).css("margin-right").replace("px",""))) * -1;
                var c = ((box.li.height()*2) < box.height())?"2":"1";

                if(box.is(":animated")) return false;
                box.animate(
                    {"left":box.w+"px"},500,function(){
                        box.css("left","0");
                        if(c==="1") box.li.eq(0).appendTo(box);
                        else if(c==="2") box.find(">li:lt(2)").appendTo(box);
                    }
                );
            }
        }

        obj.tab.on("click",function(){__controll.onOff($(this));return false;});
        obj.btnPrev.on("click",function(){__controll.prev($(this));return false;});
        obj.btnNext.on("click",function(){__controll.next($(this));return false;});
    },
    init:function(){
        if($("#container .line-2 .item-1").length !== 0){
            this.set($("#container .line-2 .item-1"));
        }
    }
}
var _line2_2 = {
    set:function(str){
        var obj = str;
            obj.tab = obj.find(">ul>li .t");
            obj.tab2 = obj.find(">ul>li .ts");
            obj.btnPrev = obj.find(">ul>li .controll>.prev");
            obj.btnNext = obj.find(">ul>li .controll>.next");
        var __controll = {
            onOff:function(str){
                obj.tab.unwrap();
                obj.tab.wrap('<span />');
                str.unwrap();
                str.wrap('<strong />');
            },
            onOff2:function(str){
                var b = str.parent().parent().parent().find(" .ts")
                b.unwrap();
                b.wrap('<span />');
                str.unwrap();
                str.wrap('<strong />');
            }
        }

        obj.tab.on("click",function(){__controll.onOff($(this));return false;});
        obj.tab2.on("click",function(){__controll.onOff2($(this));return false;});
        $(window).on("resize",function(){
            var c = $("#container>.line-2>.layout>.item-3").is(":hidden");
            if(!c){
                __controll.onOff(obj.tab.eq(0));
            }
        });
    },
    init:function(){
        if($("#container .line-2 .item-2").length !== 0){
            this.set($("#container .line-2 .item-2"));
        }
    }
}
var _line3_1 = {
    set:function(str){
        var obj = str;
            obj.li = obj.find(">.item-1_1>.midd>ul>li");

        obj.attr("data-page","1");
        obj.li.on("click",function(){
            var idx = obj.li.index($(this))+1;
            obj.attr("data-page",idx);
        });
        obj.li.find(">.head>a").on("click",function(){
            var idx = obj.li.index($(this).parent().parent())+1;
            obj.attr("data-page",idx);
            return false;
        });
    },
    init:function(){
        if($("#container .line-3 .item-1").length !== 0){
            this.set($("#container .line-3 .item-1"));
        }
    }
}

$(function(){
    _layout.init();
    _selectbox.init();
    if($("body#main").length !== 0){
        //main
        _line1_1.init();
        _line1_2.init();
        _line2_1.init();
        _line2_2.init();
        _line3_1.init();
    } else {
        //sub
        _tab.init();
        _file.init();
    }
});