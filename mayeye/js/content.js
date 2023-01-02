// $.params['name'];
(function($) {
    $.params = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; i++)
        {
            var p=a[i].split('='); 
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " ")); //공백으로 변환 후 디코딩
        }
        return b;
    })(window.location.search.substr(1).split('&')) //파라미터 정보만 분리
})(jQuery);

// layout
var mayeyeLayout = {
    menuCheck:function(){
        var aLink = $("#gnb>.midd>ul a");
        var loca = location.href;
        var target = "";
        for(var i=0; i<aLink.length; i++){
            if(loca.indexOf(aLink.eq(i).attr("href")) !== -1){
                target = aLink.eq(i);
            }
        }
        aLink.removeClass("on");
        $("#gnb>.midd>ul ul").slideUp(0);
        if(target!==""){
            target.addClass("on").parents("li").find(">a").addClass("on");
            $("#gnb>.midd>ul a.on").siblings("ul").slideDown(0);
        }
    },
    allMenu:function(str){
        var obj = str;
        var controll;

        controll = {
            onOff:function(){
                var sw = ($("body").attr("data-menu") !== "on") ? "on":"off";
                $("body").attr("data-menu",sw);

                if(sw==="off"){
                    mayeyeLayout.menuCheck();
                }
            },
            init:function(){
                // on off
                obj.on("click",function(){controll.onOff();return false;});
            }
        }
        controll.init();
    },
    menu:function(str){
        var obj = str;
            obj.btn = obj.find(">.midd>ul>li>a");
        var controll;

        // menu on check
        mayeyeLayout.menuCheck();

        controll = {
            on:function(str){
                obj.find(">.midd a").removeClass("on").siblings("ul").stop().slideUp(300);
                str.addClass("on").siblings("ul").stop().slideDown(300);
            }
        }
        obj.btn.on("click",function(){
            controll.on($(this));
            return false;
        });
    },
    topBtn:function(str){
        var obj = str;
            obj.btn = str.find(">a");

        obj.btn.on("click",function(){
            console.log("aa");
            $("html, body, #wrap").animate({"scrollTop":"0"},500,function(){console.log("bb")});
            return false;
        });
    },
    init:function(){
        if($("#menu-btn").length !== 0) this.allMenu($("#menu-btn"));
        if($("#gnb").length !== 0) this.menu($("#gnb"));
        if($("#top").length !== 0) this.topBtn($("#top"));
    }
}

//구간체크 : 다크모드
var mayeyeDarkCheck = {
    scroll:function(){
        var obj = $('[data-box="dark"]');
        $(window).on("scroll",function(){
            var h = $(window).height();
            var y1 = $(window).scrollTop();
            var y2 = y1+h;
            var skin = "";

            if(y1 < 20){
                skin = "light";
            } else {
                for(var i=0; i<obj.length; i++){
                    var objY1 = obj.eq(i).offset().top;
                    var objY2 = obj.eq(i).innerHeight();
                        objY1 = objY1+(objY2/2);
                    skin = (y1 < objY1 && y2 > objY1) ? "dark":"light";
                    if(skin==="dark") i=99999;
                }
            }
            if($("html").attr("data-skin") !== skin){
                $("html").attr("data-skin",skin);
            }
        });
    },
    init:function(){
        //data-box="dark"
        if($('[data-box="dark"]').length !== 0){
            this.scroll();
        }
    }
}

//연혁
var mayeyeHistory = {
    set:function(str,data){
        var obj = str;
        $('<div class="head"><span /></div><div class="midd" />').appendTo(obj.empty());

        for(var i=0; i<data.length; i++){
            if(i===0) $('<div class="rect" /><ul />').appendTo(obj.find(">div.midd"));
            var year = data[i].day.split(".");
                year = year[0];
            var list = data[i].content;
            $('<li>\
                <span></span>\
                <strong>'+year+'</strong>\
                <div></div>\
            </li>').appendTo(obj.find(">div.midd>ul"));

            for(var r=0; r<list.length; r++){
                if(r===0) $('<ul />').appendTo(obj.find(">div.midd>ul>li:eq("+i+")>div"));
                $('<li>'+list[r]+'</li>').appendTo(obj.find(">div.midd>ul>li:eq("+i+")>div>ul"));
            }
        }
    },
    init:function(){
        if($('[data-js="history"]').length !== 0){
            var _this = this;
            $.ajax("../json/history.json").done(function(data){
                _this.set($('[data-js="history"]'),data.data);
            });
        }
    }
}

// Awards
var mayeyeAwards = {
    set:function(str,data){
        var obj = str;
        var t = data.list.header.join(", ");
            t = t.substr(0,t.length-2);
        
        $('<table>\
            <caption>AWARDS : '+t+'의 내용을 확인 하실 수 있습니다.</caption>\
            <col style="width:auto" span="'+data.list.header.length+'">\
            <thead><tr></tr></thead>\
            <tbody></tbody>\
        </table>').appendTo(obj);

        if(data.hot.body.length !== 0){
            $('<div class="hot">\
                <span class="s" style="background-image:url('+data.hot.mark+');"></span>\
                <span class="i" style="background-image:url('+data.hot.image+');"></span>\
                <div>\
                    <em>'+data.hot.body[0]+'</em>\
                    <strong>'+data.hot.body[1]+'<br />'+data.hot.body[2]+'</strong>\
                    <span>'+data.hot.body[3]+'</span>\
                </div>\
            </div>').prependTo(obj);
        }

        for(var i=0; i<data.list.header.length; i++){
            $('<th scope="col">'+data.list.header[i]+'</th>').appendTo(obj.find(">table>thead>tr"));
        }
        for(var i=0; i<data.list.body.length; i++){
            $('<tr />').appendTo(obj.find(">table>tbody"));
            for(var r=0; r<data.list.header.length; r++){
                var tx = (data.list.body[i][r+1] !== undefined) ? data.list.body[i][r+1]:"";
                $('<td>'+tx+'</td>').appendTo(obj.find(">table>tbody>tr").eq(i));
            }
        }
    },
    init:function(){
        if($('[data-js="awards"]').length !== 0){
            var _this = this;
            $.ajax("../json/awards.json").done(function(data){
                _this.set($('[data-js="awards"]'),data);
            });
        }
    }
}

// 인증
var mayeyeSangjang = {
    set:function(str,data){
        var obj = str;

        for(var i=0; i<data.length; i++){
            if(i===0) $('<ul />').appendTo(obj);
            $('<li><span style="background-image:url('+data[i].image+');"></span><strong>'+data[i].title+'</strong></li>').appendTo(obj.find(">ul"));
        }
    },
    init:function(){
        if($('[data-js="sangjang"]').length !== 0){
            var _this = this;
            $.ajax("../json/sangjang.json").done(function(data){
                _this.set($('[data-js="sangjang"]'),data.data);
            });
        }
    }
}

// 주요 고객사
var mayeyePartner = {
    set:function(str,data){
        var obj = str;

        for(var i=0; i<data.length; i++){
            if(i===0) $('<ul />').appendTo(obj);
            $('<li>\
                <div class="layout">\
                    <div class="head"><strong>'+data[i].title+'</strong></div>\
                    <div class="midd"></div>\
                </div>\
            </li>').appendTo(obj.find(">ul"));

            for(var r=0; r<data[i].list.length; r++){
                if(r===0) $('<ul /><div class="scroll"><span /></div>').appendTo(obj.find(">ul>li").eq(i).find(">.layout>.midd"));
                $('<li><a href="'+data[i].list[r].link+'" onclick="return false;"><span style="background-image:url('+data[i].list[r].image+');">'+data[i].list[r].title+'</span></a></li>').appendTo(obj.find(">ul>li").eq(i).find(">.layout>.midd>ul"));
            }
        }
        obj.ul = obj.find(">ul>li>.layout>.midd>ul");

        var controll = {
            widthSum:function(str){
                var returns = 0;
                for(var i=0; i<str.find(">li").length; i++){
                    returns += Number(str.find(">li").eq(i).width()) + Number(str.find(">li").eq(i).css("margin-right").replace("px",""));
                }
                return returns;
            },
            scrollSet:function(_this){
                var box = _this.width();
                var w = controll.widthSum(_this);
                var scroll_w = (box/w) * 100;
                var scroll_l = ((_this.scrollLeft()/w) * 100);
                var pointBox = _this.siblings(".scroll").find(">span");
                pointBox.css({
                    "left":scroll_l+"%",
                    "width":scroll_w+"%"
                });
            }
        }
        
        for(var i=0; i<obj.find(">ul>li").length; i++){
            controll.scrollSet(obj.find(">ul>li:eq("+i+")>.layout>.midd>ul"));
        }
        obj.ul.on("scroll",function(){controll.scrollSet($(this));});
        $(window).on("resize",function(){
            for(var i=0; i<data.length; i++){
                controll.scrollSet(obj.find(">ul>li:eq("+i+")>.layout>.midd>ul"));
            }
        });
    },
    init:function(){
        if($('[data-js="partner"]').length !== 0){
            var _this = this;
            $.ajax("../json/partner.json").done(function(data){
                _this.set($('[data-js="partner"]'),data.data);
            });
        }
    }
}

var mayeyeMap = {
    set:function(str){
        var obj = str;
            obj.lat = obj.attr("lat");
            obj.lng = obj.attr("lng");
        var controll;
        var _this = this;

        controll = {
            view:function(){
                var mapContainer = obj[0], // 지도를 표시할 div 
                    mapOption = { 
                        center: new kakao.maps.LatLng(obj.lat, obj.lng), // 지도의 중심좌표
                        level: 4 // 지도의 확대 레벨
                    };

                var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

                var imageSrc = '../images/content/map-pin.svg', // 마커이미지의 주소입니다    
                    imageSize = new kakao.maps.Size(52, 63.5), // 마커이미지의 크기입니다
                    imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    
                // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
                    markerPosition = new kakao.maps.LatLng(obj.lat, obj.lng); // 마커가 표시될 위치입니다

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: markerPosition, 
                    image: markerImage // 마커이미지 설정 
                });

                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map); 
            },
            init:function(){
                this.view();
            }
        }
        kakao.maps.load(function() {
            controll.init();
        });
    },
    init:function(){
        for(var i=0; i<$('[data-js="map"]').length; i++){
            this.set($('[data-js="map"]').eq(i));
        }
    }
}

var mayeyeBusiness = {
    list:function(str,data){
        $('<div class="layout"><div class="list"></div></div>').appendTo(str.empty());
        var obj = str;
            obj.box = obj.find(" .list");
        var link = obj.attr("data-target-link");

        for(var i=0; i<data.length; i++){
            if(i===0) $('<ul />').appendTo(obj.box.empty());
            $('<li>\
                <a href="'+link+'?type='+(i+1)+'">\
                    <span class="bg"><span style="background-image:url('+data[i].image+');"></span></span>\
                    <span class="in">\
                        <em>'+data[i].type+'</em>\
                        <strong>'+data[i].title+'</strong>\
                        <span>'+data[i].content+'</span>\
                    </span>\
                </a>\
            </li>').appendTo(obj.box.find(">ul"));
        }
    },
    view:function(str,data){
        $('<div class="layout"><div class="tab" data-type="2"></div><div class="list"></div></div>').appendTo(str.empty());
        var _this = this;
        var obj = str;
            obj.param = (isNaN(Number($.params['type']))) ? 0:Number($.params['type']);
            obj.cnt = 0;
            obj.box = obj.find(" .list");
            obj.listAddCnt = 9;

        _this.tab(obj,data);
        _this.search(obj,data);
    },
    tabCreate:function(obj,data,c){
        var _this = this;
        var tab = (obj.find(" .tab[data-type='2']>.midd").length !== 0) ? obj.find(" .tab[data-type='2']>.midd"):obj.find(" .tab[data-type='2']");
        for(var i=0; i<data.length; i++){
            tag = (i!==obj.param) ? 'span':'strong';
            tag2 = ((i+1)!==obj.param) ? 'span':'strong';
            if(i===0){
                $('<ul />').appendTo(tab.empty());
                $('<li><a href="'+location.pathname+'"><'+tag+'>전체</'+tag+'></a></li>').appendTo(tab.find(" ul"));
            }
            $('<li><a href="'+location.pathname+'?type='+(i+1)+'"><'+tag2+'>'+data[i].title+'</'+tag2+'></a></li>').appendTo(tab.find(" ul"));
        }

        if(!c) mayeyeTab.set(tab);

        tab.find(" ul>li>a").on("click",function(){
            if($(this).find(">strong").length === 0){
                var idx = tab.find(" ul>li").index($(this).parent());
                obj.param = idx;
                _this.search(obj,data);
                _this.tabCreate(obj,data,"reSearch");//탭 재생성
            }
            $(this).clone().appendTo(obj.find(" .tab[data-type='2']>.head").empty());//head 전달
            obj.find(" .tab[data-type='2']").removeAttr("data-sw").find(">.midd").slideUp(300);;
            return false;
        });
    },
    tab:function(obj,data){
        var _this = this;
        var tab = obj.find(" .tab[data-type='2']");

        if(data.length < 2){
            tab.remove();
        } else {
            _this.tabCreate(obj,data);//탭 생성
        }
    },
    search:function(obj,data){
        obj.find(" .more").remove();
        obj.list = new Array();
        obj.btnBove = $('<div class="more"><a href="#"><span>MORE VIEW</span></a></div>').insertAfter(obj.box);
        var _this = this;
        var forCnt = (obj.param<1) ? data.length:1;
        for(var r=0; r<forCnt; r++){
            if(r===0) $('<ul />').appendTo(obj.box.empty());
            var datas = (obj.param<1) ? datas = data[r]:data[obj.param-1];
            for(var i=0; i<datas.list.length; i++){
                datas.list[i].type = datas.title;
                obj.list.push(datas.list[i]);
            }
        }
        
        obj.box.attr({"data-max":obj.list.length});
        _this.listAdd(obj);//리스트 추가

        obj.btnBove.find(">a").on("click",function(){_this.listAdd(obj);return false;});//리스트 추가
    },
    listAdd:function(obj){
        var templet = function(data){
            $('<li>\
                <a href="#" class="bx" onclick="mayeyeImagePop.on(\''+data.image+'\',\''+data.title+'\');">\
                    <span class="bg"><span style="background-image:url('+data.thumb+');"></span></span>\
                    <span class="in">\
                        <em>'+data.type+'</em>\
                        <strong>'+data.title+'</strong>\
                    </span>\
                </a>\
            </li>').appendTo(obj.box.find(">ul"));
        }

        var min = Number(obj.box.find(">ul>li").length);
        var max = ((min+obj.listAddCnt) > obj.list.length) ? obj.list.length:min+obj.listAddCnt;
        
        for(var i=min; i<max; i++){
            templet(obj.list[i]);
        }

        if((min+obj.listAddCnt) > obj.list.length){
            obj.btnBove.remove();
        }
    },
    init:function(){
        if($('[data-js="business"]').length !== 0){
            var _this = this;
            $.ajax("../json/business.json").done(function(data){
                _this.list($('[data-js="business"]'),data.data);
            });
        } else if($('[data-js="business-view"]').length !== 0){
            var _this = this;
            $.ajax("../json/business.json").done(function(data){
                _this.view($('[data-js="business-view"]'),data.data);
            });
        }
    }
}

var mayeyeHelpYou = {
    set:function(str){
        var obj = str;
            obj.li = obj.find(">ul>li");

        var def = function(){
            obj.attr("data-page","1");
            obj.li.removeClass("on").eq(0).addClass("on");
        }
        def();

        obj.li.on("mouseover",function(){
            var idx = obj.li.index($(this))+1;
            obj.attr("data-page",idx);

            obj.li.removeClass("on");
            $(this).addClass("on");
        });
        obj.on("mouseleave",function(){
            def();
        });
    },
    init:function(){
        if($("#page-2>.layout>.list").length !== 0){
            this.set($("#page-2>.layout>.list"));
        }
    }
}

var mayeyeTab = {
    set:function(str){
        str.find(">ul").wrap($('<div class="midd" />'));
        $('<div class="head" />').prependTo(str);
        var obj = str;
            obj.btnList = obj.find(" .midd>ul>li>a");
            obj.btnHead = obj.find(" .head");

        for(var i=0; i<obj.find(" .midd>ul>li").length; i++){
            if(obj.find(" .midd>ul>li").eq(i).find(">a>strong").length !== 0){
                obj.find(" .midd>ul>li").eq(i).find(">a").clone().appendTo(obj.find(" .head").empty());
            }
        }

        obj.css("opacity","1");

        obj.btnList.on("click",function(){
            $(this).clone().appendTo($(this).parents(".tab").find(" .head").empty());
            $(this).parents(".tab").attr("data-sw","off").find(">.midd").slideUp(300);
        });

        obj.btnHead.on("click",function(){
            var ch = ($(this).parents(".tab").attr("data-sw") !== "on") ? "on":"off";
            $(".tab").attr("data-sw","off").find(">.midd").slideUp(300);
            if(ch === "on"){
                $(this).parents(".tab").attr("data-sw","on").find(">.midd").slideDown(300);
            }
            return false;
        });
    },
    init:function(){
        for(var i=0; i<$("#container .tab").length; i++){
            this.set($("#container .tab").eq(i));
        }
        if($("#container .tab").length !== 0){
            $(document).on("click",function(event){
                if($(event.target).parents(".tab")){
                    $(".tab").attr("data-sw","off").find(">.midd").slideUp(300);
                }
            });
        }
    }
}

var mayeyeImagePop = {
    on:function(img,str){
        if($('[data-pop="img"]').length === 0) $('<div data-pop="img"><div class="in"><div class="bind"></div><a href="#"><span>닫기</span></a></div></div>').appendTo($("body"));
        var obj = $('[data-pop="img"]');
            obj.box = obj.find(">.in>.bind");

        $('<img src="'+img+'" alt="'+str+'" />').appendTo(obj.box.empty());

        obj.on("click",function(){
            $('[data-pop="img"]').remove();
            return false;
        });
    }
}

$(function(){
    //layout
    mayeyeLayout.init();//레이아웃
    //common
    mayeyeDarkCheck.init();
    if($("body#main").length !== 0){
        //main
        mayeyeHelpYou.init();//may i help you
    } else {
        //sub
        mayeyeHistory.init();//연혁
        mayeyeAwards.init();//Awards
        mayeyeSangjang.init();//인증
        mayeyePartner.init();//주요 고객사
        mayeyeMap.init();//map
        mayeyeBusiness.init();//사업분야

        //last
        mayeyeTab.init();//Tab
    }
});