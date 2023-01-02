$(function(){
    layout_AC();
});
var homeJson = "";
var pageData = "";
var etcData = "";
function layout_AC(){
    var types = ($("#bind").attr("data-set") === "main") ? "main":"sub";
    var c = $("#bind").html();
    var pageName = location.href.split("/");
        pageName = pageName[pageName.length-1];
        pageName = pageName.replace("#","");

    $("body").css("opacity","0");
    
    $.ajax({
        type:"GET",
        url:"../data/set.json",
        dataType:"json"
    }).done(function(data) {
        homeJson = data.data.sort(function(a, b){return a.parent-b.parent}).sort(function(a, b){return a.key-b.key});
        etcData = data.etc;
        
        for(var i=0; i<data.data.length; i++){
            if(data.data[i].href === pageName){
                pageData = data.data[i];
            }
        }
        $.ajax({
            type:"GET",
            url:"../temp/layout.html",
            dataType:"html"
        }).done(function(data) {
            $("body").html(data).attr("id",types);
            
            if(types === "main"){
                $("#wrap > #middle").html(c);
            } else {
                $("#wrap > #middle #txt").html(c);
            }

            $.ajax({type:"GET",url:"../temp/meta.html",dataType:"html"}).done(function(data) {
                
                $("head").html(data);

                if(types === "main"){
                    $('<link rel="stylesheet" type="text/css" href="../css/main.css" media="all" />').appendTo($("head"));
                    $('<script src="../js/main.js"><\/script>').appendTo($("head"));
                }else{
                    $('<link rel="stylesheet" type="text/css" href="../css/content.css" media="all" />').appendTo($("head"));
                    $('<link rel="stylesheet" type="text/css" href="../css/board.css" media="all" />').appendTo($("head"));
                }
                layout_init();
                navi_AC();
                all_menu_AC();
                tab_mobile_AC();
                setTimeout(function(){
                    $("body").css("opacity","1");
                },700);
                // if (!document.doctype) {
                //     document.write('<!doctype HTML>\n' +
                //         document.head.outerHTML +
                //         document.body.outerHTML);
                //     return false;
                // }
            });
            
        });
        
    });
}
function layout_init(){

    // console.log(pageData);
    // console.log(homeJson);

    // Top menu
    var gnb = $('<ul>');
    function _set(str){
        var ti = (str.target === "_blank") ? "title=\"새창\"":"";
        return '<li data-key="'+str.key+'"><a href="'+str.href+'" target="'+str.target+'" '+ti+'><span>'+str.title+'</span></a></li>';
    }
    for(var i=0; i<homeJson.length; i++){
        if(homeJson[i].parent === ""){
            $(_set(homeJson[i])).appendTo(gnb);
        } else {
            var childs = gnb.find(" li[data-key='"+homeJson[i].parent+"']");
            if(childs.find(">div").length !== 1) $('<div><ul></ul></div>').appendTo(childs.addClass("child"));
            $(_set(homeJson[i])).appendTo(childs.find(">div>ul"));
        }
    }
    //상단메뉴
    $("<div id='blind'></div>").appendTo($("#gnb"));
    $("<div class='gnb_wr'></div>").appendTo($("#gnb"));
    gnb.clone().appendTo($("#gnb>.gnb_wr"));
    $("#gnb>div>ul>li").last().remove();
    for(var i=0; i<$("#gnb>div>ul>li").length; i++){
        var textVal = $("#gnb>div>ul>li").eq(i).find(">a").text();

        $('<strong>'+textVal+'</strong>').prependTo($("#gnb>div>ul>li").eq(i).find(">div"));
    }

    //etc
    if(etcData.length > 0){
        for(var i=0; i<etcData.length; i++){
            /*$('<div class="etc-'+(i+1)+'"><a href="#"><strong>'+etcData[i].title+'</strong><span>'+etcData[i].text+'</span></a></div>').appendTo($("#gnb>.gnb_wr"));*/
        }
        $("<div class='etc-1'><a href='02_07_01.html'><strong>시험분석 안내</strong><span>신뢰성이 확보된<br> 시험결과를 제공합니다.</span></a></div>").appendTo($("#gnb>.gnb_wr"));
        $("<div class='etc-2'><a href='04_01.html'><strong>온라인민원</strong><span>빠르고 친절하게<br> 답변해드리겠습니다.</span></a></div>").appendTo($("#gnb>.gnb_wr"));
    }


    //전체메뉴
    gnb.clone().appendTo($("#sitemap>.in>.midd"));
    $("#header .etcs").clone().appendTo($("#sitemap>.in"));

    if($("body#main").length !== 1 && pageData){
        for(var i=0; i<(pageData.key.length / 2); i++){
            $("#gnb li[data-key='"+pageData.key.substr(0,((i*2)+2))+"']>a").addClass("on");
            $("#sitemap li[data-key='"+pageData.key.substr(0,((i*2)+2))+"']>a").addClass("on");
        }
    }

    if($("body#main").length !== 1 && pageData){
        // Navi
        var navi = $('#navi');
        var navi_text = "<span class='home'>Home</span>";
        var h2Value = "";
        var tabValue = $('<div class="in"><ul></ul></div>');
        var tabValueMobile = $('<div class="in"><strong><a href="#"><span></span></a></strong><div><ul></ul></div></div>');
        
        for(var i=0; i<homeJson.length; i++){
            if(homeJson[i].parent === "" && pageData.key.length >= 2){
                if(navi.find(" .deps-1>strong").length !== 1){
                    $('<strong><a href="#"><span></span></a></strong><div><ul></ul></div>').appendTo(navi.find(" .deps-1"));
                }
                if(pageData.key.substr(0,2) === homeJson[i].key){
                    navi.find(" .deps-1>strong>a>span").text(homeJson[i].title);
                    h2Value = homeJson[i].title;//visual title
                    navi_text += "<span><i>&gt;</i>"+homeJson[i].title+"</span>";
                }
                $(_set(homeJson[i])).appendTo(navi.find(" .deps-1 ul"));
            } else if(homeJson[i].key.length === 4 && pageData.key.length >= 4){
                if(pageData.key.substr(0,2) === homeJson[i].parent){
                    if(navi.find(" .deps-2>strong").length !== 1){
                        $('<strong><a href="#"><span></span></a></strong><div><ul></ul></div>').appendTo(navi.find(" .deps-2"));
                    }
                    if(pageData.key.substr(0,4) === homeJson[i].key){
                        navi.find(" .deps-2>strong>a>span").text(homeJson[i].title);
                        // h2Value = homeJson[i].title;//visual title
                        navi_text += "<span><i>&gt;</i>"+homeJson[i].title+"</span>";
                    }
                    $(_set(homeJson[i])).appendTo(navi.find(" .deps-2 ul"));
                }
            } else if(homeJson[i].key.length === 6 && pageData.key.length >= 6){
                if(pageData.key.substr(0,4) === homeJson[i].parent){
                    if(navi.find(" .deps-3>strong").length !== 1){
                        $('<strong><a href="#"><span></span></a></strong><div><ul></ul></div>').appendTo(navi.find(" .deps-3"));
                    }
                    if(pageData.key.substr(0,6) === homeJson[i].key){
                        navi.find(" .deps-3>strong>a>span").text(homeJson[i].title);
                        navi_text += "<span><i>&gt;</i>"+homeJson[i].title+"</span>";

                        tabValueMobile.find(" strong>a>span").text(homeJson[i].title);
                    }
                    $(_set(homeJson[i])).appendTo(navi.find(" .deps-3 ul"));

                    $(_set(homeJson[i])).appendTo(tabValue.find(" ul"));//tab
                    $(_set(homeJson[i])).appendTo(tabValueMobile.find(" ul"));//tab_mobile
                }
            } 
            // else if(homeJson[i].key.length === 8 && pageData.key.length >= 8){
            //     if(pageData.key.substr(0,6) === homeJson[i].parent){
            //         $(_set(homeJson[i])).appendTo(tabValue.find(" ul"));
            //     }
            // }
        }
        if(tabValue.find(" ul>li").length > 1){
            tabValue.appendTo($("#tab"));//tab
            tabValueMobile.appendTo($("#tab_mobile"));//tab_mobile
        } else {
            $("#tab").remove();
            $("#tab_mobile").remove();
        }
        
        if($("#tab li").length < 1){
            $("#tab").remove();
        }

        for(var i=0; i<(pageData.key.length / 2); i++){
            $("#navi li[data-key='"+pageData.key.substr(0,((i*2)+2))+"']>a").addClass("on");
            if($("#tab li").length > 0) $("#tab li[data-key='"+pageData.key.substr(0,((i*2)+2))+"']>a").addClass("on");
        }

        // navi-2
        // visual
        var vi = $("#visual");
            vi.navi = vi.find(" #navi-2>.location");
        vi.find(" h2").text(h2Value);
        vi.navi.html(navi_text);
        vi.attr("data-bg",parseInt(pageData.key.substr(0,2)));
    } else {
        $("#middle #path").remove();
        $("#middle #visual").remove();
    }
}






function navi_AC(){
    function _set(str){
        var obj = str;
            obj.btn = obj.find(">strong>a");
            
        obj.btn.on("click",function(){
            var ch = (obj.attr("data-open") !== "on") ? "on":"off";
            obj.attr("data-open",ch);
            return false;
        });
    }
    for(var i=0; i<$("#navi [class*='deps-']").length; i++){
        _set($("#navi [class*='deps-']").eq(i));
    }
}

function all_menu_AC(){
    function _set(str){
        var obj = $("#sitemap");
            obj.btn = str;
            obj.btn_close = obj.find(" .close");
            
        obj.btn.on("click",function(){
            $("body").attr("data-sitemap","on");
            return false;
        });
        obj.btn_close.on("click",function(){
            $("body").attr("data-sitemap","off");
            return false;
        });
    }
    for(var i=0; i<$("#all-menu").length; i++){
        _set($("#all-menu").eq(i));
    }
}

function tab_mobile_AC(){
    function _set(str){
        var obj = str;
            obj.btn = obj.find(">.in>strong");
            obj.btn_list = obj.find(">.in>div>ul>li>a");
            obj.box = obj.find(">.in>div");

        obj.box.stop().slideUp(0);
        obj.attr("data-open","off");

        obj.btn.on("click",function(){
            var ch = (obj.attr("data-open") !== "on") ? "on":"off";
            if(ch === "on") obj.box.stop().slideDown(300);
            else obj.box.stop().slideUp(300);
            obj.attr("data-open",ch);
            return false;
        });
    }
    for(var i=0; i<$("#tab_mobile").length; i++){
        _set($("#tab_mobile").eq(i));
    }
}


//Gnd
$(function(){  
    setTimeout(function(){
        if($("#gnb").size() != 0){
           gnb_AC();
        }
    },100);
});

function gnb_AC(){
    var obj = $("#gnb");
        obj.li = obj.find(" >.gnb_wr>ul>li");

    obj.mouseover(function(){
        $("#header").addClass("on");
    });
    obj.mouseout(function(){
        $("#header").removeClass("on");
    });

    
    //포커스 이동
    var _shift = false;
    $(document).on("keydown",function(event){
        if(event.keyCode == 16) _shift = true;
    });
    $(document).on("keyup",function(event){
        if(event.keyCode == 16) _shift = false;
    });


    obj.li.first().find(">a").focusin(function(){
        $("#header").addClass("on");
    });
    $("#header>h1>a").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            obj.li.first().find(">a").focus();
            return false;
        }
    });
    obj.li.first().find(">a").keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("#header").removeClass("on");
            $("#header>h1>a").focus();
            return false;
        }
    });
    obj.find(" >.gnb_wr>.etc-2>a").keydown(function(event){
        if(event.keyCode == 9 && !_shift){
            $("#header").removeClass("on");
            $("#header .site_link>li:eq(0)>a").focus();
            return false;
        }
    });
    $("#header .site_link>li:eq(0)>a").keydown(function(event){
        if(event.keyCode == 9 && _shift){
            $("#header").addClass("on");
            obj.find(" >.gnb_wr>.etc-2>a").focus();
            return false;
        }
    });

    //바로가기 포커스
    $("#skip>ul>li:eq(0)>a").click(function(){
        setTimeout(function(){
            $("body").attr("data-mian-step","1");
            $("#page_1 .vbx>.slogan>a").focus();
        });
        return false;
    });
}

//Gnb Mobile
$(function(){  
    setTimeout(function(){
        if($("#sitemap").size() != 0){
           gnb_mob_AC();
        }
    },100);
});

function gnb_mob_AC(){
    var obj = $("#sitemap");
        obj.li = obj.find(" .midd>ul>li");
        obj.btn = obj.find(" .midd>ul>li>a");

    $("#sitemap .midd>ul>li>a.on").siblings("div").show();

    obj.btn.click(function(){
        var bx = $(this).siblings("div");
        if(bx.is(":hidden")){
            bx.stop().slideDown();
            $(this).addClass("on");
        } else{
            bx.stop().slideUp();
            $(this).removeClass("on");
        }

        return false;
    });
}

//sub Top
$(function(){  
    setTimeout(function(){
        if($("body#sub #top_btn").size() != 0){
            sub_floatingTop();
        }
    },100);
});
 function sub_floatingTop(){
    $("#top_btn").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
 }

//Sns 열기
$(function(){  
    setTimeout(function(){
        if($("#navi-2 .shares .sns").size() != 0){
            sns_Open();
            sns_mob();  //모바일에서 공유버튼 클론
        }
    },100);
});

function sns_Open(){
    $("#navi-2 .shares .sns").click(function(){
        $(this).parent().toggleClass("on");
    });
}
function sns_mob(){
    $("#navi-2 .shares").clone(true).prependTo("#txt");
}