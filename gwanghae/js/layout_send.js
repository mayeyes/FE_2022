$(function(){
    navi_AC();
    all_menu_AC();
    tab_mobile_AC();
});

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
    console.log($("#sitemap .midd>ul>li>a.on").siblings("div").size());

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