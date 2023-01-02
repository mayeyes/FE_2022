var webBook = "";
$(function(){
    $.ajax({
        url:"../_core/data/data.json",
        async:true,
        type:'GET',
        dataType:'json',// xml, json, script, html
        success:function(data) {
            webBook = data.data;
            mark_init();//mark start
        }
    });
});


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
        
    }
    for(var i=0; i<$('[data-js="scroll"]').length; i++){
		_set($('[data-js="scroll"]').eq(i));
    }
}

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	URL get Param Function
	
	ex)
	$.params['name'];

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
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

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////

	loading

/////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/*
    loading 애니메이션 
    
    명령어
    - 실행 : loading.on()
    - 삭제 : loading.off()
*/
$(function(){
    loading.init();
    loading.on();
});
var loading = {
    set:function(){
        var text = '[data-skin="loading"]>div>span{display:block; position:absolute; left:50%; top:50%; width:2.4em; height:2.4em; -webkit-border-radius:50%; border-radius:50%; -webkit-transform:translate(-50%,-50%); transform:translate(-50%,-50%); -webkit-animation-name:loadding; -webkit-animation-duration:1.2s; -webkit-animation-fill-mode:forwards; -webkit-animation-iteration-count:infinite; -webkit-animation-timing-function:linear; animation-name:loadding; animation-duration:1.2s; animation-fill-mode:forwards; animation-iteration-count:infinite; animation-timing-function:linear;} [data-skin="loading"]>div>span:nth-child(1){left:calc(50% - 5em); background-color:rgb(251, 211, 4); animation-delay:0s;} [data-skin="loading"]>div>span:nth-child(2){left:calc(50% - 1.7em); background-color:rgb(0, 181, 255); animation-delay:0.2s;} [data-skin="loading"]>div>span:nth-child(3){left:calc(50% + 1.7em); background-color:rgb(0, 196, 209); animation-delay:0.4s;} [data-skin="loading"]>div>span:nth-child(4){left:calc(50% + 5em); background-color:rgb(250, 137, 7); animation-delay:0.6s;} @-webkit-keyframes loadding{0%,80%,100%{top:calc(50%);}50%{top:calc(50% - 3em);}} @keyframes loadding{0%,80%,100%{top:calc(50%);}50%{top:calc(50% - 3em);}}';
        var style = document.createElement('style');
        style.setAttribute("type", "text/css");
        if (style.styleSheet) {
            style.styleSheet.cssText = text;
        } else {
            style.innerHTML = text;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    },
    on:function(){
        $('<div data-skin="loading"><div><span></span><span></span><span></span><span></span></div></div>').appendTo($("body"));
        $('[data-skin="loading"]').attr("style","position:fixed; left:0; top:0; z-index:3000; width:100%; height:100%; background-color:rgba(255,255,255,1);");
        $('[data-skin="loading"]>div').attr("style","position:fixed; left:50%; top:50%; width:30em; height:30em;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);");
    },
    off:function(){
        $('[data-skin="loading"]').remove();
    },
    init:function(){
        this.set();
    }
}

function dark_AC(){
    var btn = $("#mode");

    btn.on("click",function(){
        if($("body").attr("data-mode") !== "dark"){
            $("body").attr("data-mode","dark");
        } else {
            $("body").attr("data-mode","sun");
        }
        return false;
    });
}

function textColor_AC(){
    var keyword = /`(.*?)`/;
    $('#middle').markRegExp(keyword, {
        "element": "span",
        "className": "overay"
    });

    $('#middle .overay').each(function(){
        // console.log($(this));
        $(this).text($(this).text().replace(/`/g,""));
    });
}

function chart_AC(){
    //bar, line, radar, doughnut, pie, polarArea, scatter(bar+line)
    function _set(str){
        let c = str.get(0).getContext('2d');
        let ex = str.attr("data-ex");
        let ex2 = str.attr("data-ex2");
        let ty = str.attr("data-type");
        // var colorArray = ["#10346e","#1d62a7","#3b92c7","#91c5dd","#d4e5ef","#ffd7c6","#f8a980","#de5d4a","#b21528","#54011b"];
        var colorArray = ["#1f77b4","#ff7f0e","#2ca02c","#d62728","#54011b","#ffd7c6","#f8a980","#de5d4a","#b21528","#d4e5ef"];
        
        //console.log(c);
        
        if(ty !== "scatter"){
            var jsonVal = {
                "type":ty,
                "data":{
                    "labels" : [],
                    "datasets" : []
                }
            };
            $.ajax({
                type: "GET",
                url: ex,
                dataType: "text",
                success: function(data) { 
                    parseCSV(data);
                    let barChart = new Chart(str.get(0), jsonVal);
                }
            })
            
            function parseCSV(csv) {
                const csvLines = csv.split(/\r\n|\n/);
                var headVal = csvLines[0].split(',');
                var bodyVal = "";
                // var label_val = csvLines.map(line => line.split(',')[0]);
                var label_val = csvLines.map(function(line){return line.split(',')[0]});

                // head
                for(var i=1; i<label_val.length; i++){
                    jsonVal.data.labels.push(label_val[i]);
                }

                //body
                for(var i=1; i<headVal.length; i++){
                    // bodyVal = csvLines.map(line => line.split(',')[i]);
                    bodyVal = csvLines.map(function(line){return line.split(',')[i]});
                    var d = [];
                    for(var r=1; r<bodyVal.length; r++){
                        d.push(bodyVal[r]);
                    }
                    var colors = (ty==="doughnut" || ty==="pie" || ty==="polarArea") ? colorArray:colorArray[i-1];
                    var bgColors = (ty==="doughnut" || ty==="pie" || ty==="polarArea") ? colorArray:'rgba(0,0,0,0)';
                        bgColors = (ty==="bar") ? colorArray[i-1]:bgColors;
                    jsonVal.data.datasets.push({
                        "label" : bodyVal[0],
                        "data" : d,
                        "backgroundColor":bgColors,
                        "pointBackgroundColor": colors,
                        "borderColor": colors
                    });
                }
            }
        } 
    }

    for(var i=0; i<$("[data-chart]").length; i++){
        _set($("[data-chart]").eq(i));
    }
}


function tab_AC(){
    function _set(str){
        var obj = str;
            obj.data = JSON.parse(str.text()).data;
            
        obj.empty();
        $('<div class="head"></div>\
           <select class="selectmenu"></select>\
           <div class="midd"></div>').appendTo(str);
        var list = "";
        for(var i=0; i<obj.data.length; i++){
            $('<a href="#" data-step="'+(i+1)+'"><span>'+obj.data[i].title+'</span></a>').appendTo(obj.find(">.head"));
            $('<option data-step="'+(i+1)+'">'+obj.data[i].title+'</option>').appendTo(obj.find(">.selectmenu"));
            
            if(obj.data[i].img !== undefined){
                list = '<img src="'+obj.data[i].img+'" alt="" data-step="'+(i+1)+'" />';
            } else if(obj.data[i].content !== undefined){
                //list = '<div data-content="1" data-step="'+(i+1)+'">'+JSON.stringify(obj.data[i].content)+'</div>';
                list = '<div class="content" data-step="'+(i+1)+'">'+marked(obj.data[i].content)+'</div>';
            }
            $(list).appendTo(obj.find(">.midd"));
        }
        
        obj.find(' .midd [data-step]').hide();
        function _hit(idx){
            obj.find(' .midd [data-step]').hide();
            obj.find(' .midd [data-step="'+idx+'"]').show();

            obj.find(' .head a').removeClass("on");
            obj.find(' .head a[data-step="'+idx+'"]').addClass("on");

            obj.find(' .selectmenu>option').prop("selected",false);
            obj.find(' .selectmenu>option[data-step="'+idx+'"]').prop("selected",true);
        }
        _hit(1);

        obj.find(" .head a").on("click",function(){
            var idx = $(this).attr("data-step");
            _hit(idx);
            return false;
        });
        obj.find(" .selectmenu").on("change",function(){
            var idx = obj.find(" .selectmenu>option:selected").attr("data-step");
            _hit(idx);
        });

    }
    for(var i=0; i<$('[data-tab="1"]').length; i++){
        _set($('[data-tab="1"]').eq(i));
    }
}

function tab_AC2(){
    function _set(str){
        var obj = str;
            obj.data = obj.find(">[data-view]").clone();
            //obj.data = JSON.parse(str.text()).data;
            
        obj.empty();
        $('<div class="head"></div>\
            <select class="selectmenu"></select>\
            <div class="midd"></div>').appendTo(str);

        var list = "";
        for(var i=0; i<obj.data.length; i++){
            $('<a href="#" data-step="'+(i+1)+'"><span>'+obj.data.eq(i).attr("data-title")+'</span></a>').appendTo(obj.find(">.head"));
            $('<option data-step="'+(i+1)+'">'+obj.data.eq(i).attr("data-title")+'</option>').appendTo(obj.find(">.selectmenu"));
            
            list = '<div class="content" data-step="'+(i+1)+'">'+marked(obj.data.eq(i).html())+'</div>';
            $(list).appendTo(obj.find(">.midd"));
        }

        //숨김 탭
        obj.find('>.head').clone(false).attr("class","print_tab").prependTo(obj.find('>.midd>[data-step]'));
        for(var i=0; i<obj.data.length; i++){
            obj.find('>.midd>[data-step="'+(i+1)+'"] .print_tab>a').eq(i).addClass("on");
        }

        
        function _hit(idx){
            obj.find('>.midd>[data-step]').hide();
            obj.find('>.midd>[data-step="'+idx+'"]').show();

            obj.find('>.head a').removeClass("on");
            obj.find('>.head a[data-step="'+idx+'"]').addClass("on");

            obj.find('>.selectmenu>option').prop("selected",false);
            obj.find('>.selectmenu>option[data-step="'+idx+'"]').prop("selected",true);
        }
        

        obj.find(">.head a").on("click",function(){
            var idx = $(this).attr("data-step");
            _hit(idx);
            return false;
        });
        obj.find(">.selectmenu").on("change",function(){
            var idx = obj.find(">.selectmenu>option:selected").attr("data-step");
            _hit(idx);
        });

        setTimeout(function(){
            obj.find('>.midd>[data-step]').hide();
            _hit(1);
        },300);

    }
    for(var i=0; i<$('[data-tab="2"]').length; i++){
        _set($('[data-tab="2"]').eq(i));
    }
}

function a_check(){
    function _set(str){
        var obj = str;
        
        if(obj.attr("href").indexOf("http") !== -1){
            obj.attr({"target":"_blank","title":"새창"});
            // obj.attr({"target":"law_link","title":"새창"});
        }
    }
    
    for(var i=0; i<$('#middle a:not(".paginate_button")').length; i++){
        _set($('#middle a:not(".paginate_button")').eq(i));
    }
}

function img_check(){
    function _set(str){
        var obj = (str.parent()[0].tagName.toLowerCase() === "a") ? str.parent():str;

        if(obj.parents(".imgtextbox").length !== 1){
            obj.wrap($('<div class="imgbox">'));
            if(obj.parent().parent()[0].tagName.toLowerCase() == "p"){
                obj.parent().parent().addClass("imgbox_wrap");
            }
        }
    }
    
    for(var i=0; i<$('#middle img').length; i++){
        _set($('#middle img').eq(i));
    }
}

function menu_controll(str,book){
    if($("#menu > ul").length === 0) $('<ul />').appendTo($("#menu"));
    var h1 = $('#middle #page_'+str+' h1');
    var h2 = $('#middle #page_'+str+' h2');
    
    //h1.attr("id","page_"+str);
    var links = location.pathname+"?y="+$.params['y']+"&v="+$.params['v'];
    for(var i=0; i<book.page.length; i++){
        $('<li><a href="'+links+'&p='+(i+1)+'">'+book.page[i]+'</a></li>').appendTo($("#menu > ul"));
    }

    var d = ($.params['p']) ? $.params['p']:1;
    $("#menu a[href='"+links+"&p="+d+"']").parent().addClass("on").siblings("li").removeClass("on");

    $("#menu > ul").clone().appendTo($("#menu_mobile").empty());

    $("#menu > ul>li>a").on("click",function(){
        var idx = $("#menu > ul>li").index($(this).parent());
        $("#menu > ul>li").removeClass("on").eq(idx).addClass("on");
        $("#bind > [id*='page_']").hide().eq(idx).show();
        $("#visual>h2").text($(this).text());
        $("html,body").animate({"scrollTop":"0"},10);
        return false;
    });
}

function scroll_check(){
    $(window).on("scroll",function(){
        //console.log($(this).scrollTop());
        var t = 0;
        var b = t + $("body").innerHeight();
        var h1 = "";
        var h2 = "";
        for(var i=0; i<$("#bind h1").length; i++){
            var targets = $("#bind h1").eq(i);
            var box_t = targets.offset().top - $(this).scrollTop();
            if(box_t < b){
                h1 = "#"+targets.attr("id");
            }
        }
        for(var i=0; i<$("#bind h2").length; i++){
            var targets = $("#bind h2").eq(i);
            var box_t = targets.offset().top - $(this).scrollTop();
            if(box_t < b){
                h2 = "#"+targets.attr("id");
            }
        }
        $("#menu a[href='"+h1+"']").parent().addClass("on").siblings("li").removeClass("on");
        $("#menu a[href='"+h2+"']").parent().addClass("on").siblings("li").removeClass("on");
    });
    $(window).trigger("scroll");
}

function scroll_menu(){
    $(window).on("scroll",function(){
        var t = $(this).scrollTop();
        var sw = (t > $("#header").innerHeight()) ? "on":"off";
        $("body").attr("data-scroll",sw);
    });
    $(window).trigger("scroll");
}

function mobile_menu(){
    var obj = $("#menu_mobile");
        obj.btn_open = $("#all_menu");
        obj.btn_close = $("#all_menu_close");

    obj.btn_open.on("click",function(){$("body").attr("data-menu","on");return false;});
    obj.btn_close.on("click",function(){$("body").attr("data-menu","off");return false;});

    $("#menu_mobile > ul>li>a").on("click",function(){
        var idx = $("#menu_mobile > ul>li").index($(this).parent());
        $("#menu_mobile > ul>li").removeClass("on").eq(idx).addClass("on");
        $("#bind > [id*='page_']").hide().eq(idx).show();
        $("#visual>h2").text($(this).text());

        $("body").attr("data-menu","off");
        return false;
    });
}

function imgtextbox_check(){
    function _set(str){
        var obj = str;
        obj.html(marked(obj.html()));
    }
    for(var i=0; i<$(".imgtextbox").length; i++){
        _set($(".imgtextbox").eq(i));
    }
}

function table_check(){
    function _set(str){
        var obj = str;

        if(!obj.parent().hasClass("table_wrap")){
            obj.wrap('<div class="table_wrap" />');
        }

        var t = obj.parents(".table_wrap");

        t.on("scroll",function(){
            $(this).attr("data-scroll","check");
        });
    }
    $(window).on("resize",function(){
        $(".table_wrap").removeAttr("data-scroll");
    });
    for(var i=0; i<$("table").length; i++){
        _set($("table").eq(i));
    }
}

function top_btn(){
    var obj = $("#btn_top");

    obj.on("click",function(){
        var t = $(window).scrollTop();
        $("html,body").animate({"scrollTop":"0"},t*0.2);
        return false;
    });

    $(window).on("scroll",function(){
        var t = $(this).scrollTop();
        var b = $(document).height() - $("body").height() - t;
        var f = $("#footer").innerHeight() + 20;
        var openVal = (t>100) ? "on":"off";
        //console.log(b,f);

        
        obj.attr("data-open",openVal);
        
        if(b < f){
            obj.css("bottom",f-b); 
        } else {
            obj.removeAttr("style"); 
        }
    });

    $(window).trigger("scroll");
}

function sup_AC(){
    var obj = $("sup");
        obj.btn = obj.find(" a[href*='#fn']");

    obj.btn.click("click",function(){
        var t = $(this).attr("href");
        var tops = $(t).offset().top - $("#menu").innerHeight();
        $("html,body").animate({"scrollTop":tops+"px"},500);
    });
}

function data_table(){
    function _set(str){
        var obj = str;
            obj.JsonVal = obj.attr('data-table');

        $.ajax({
            url:obj.JsonVal,
            async:false,
            type:'GET',
            dataType:'json',// xml, json, script, html
            success:function(data) {
                $(data.x.container).appendTo(obj);
                var arr = [];
                for(var i=0; i<data.x.data.length; i++){
                    for(var r=0; r<data.x.data[0].length; r++){
                        if(i===0) arr[r] = [];
                        arr[r].push(data.x.data[i][r]);
                    }
                }
                obj.find(" table").DataTable({
                    "data":arr,
                    "extensions":data.x.extensions,
                    "options":data.x.options,
                    "columnDefs": data.x.options.columnDefs,
                    "order": data.x.options.order,
                    "width":data.x.options.width,
                    "drawCallback": function (settings) {
                        if(data.x.options.drawCallback){
                            var api = this.api();
                            var rows = api.rows({ page: 'current' }).nodes();
                            var last = null;
                            api
                                .column(0, { page: 'current' })
                                .data()
                                .each(function (group, i) {
                                    if (last !== group) {
                                        $(rows)
                                            .eq(i)
                                            .before('<tr class="group"><td colspan="'+data.x.options.drawCallback+'">' + group + '</td></tr>');
                
                                        last = group;
                                    }
                                });
                        } else {
                            return false;
                        }
                    },
                    "fnDrawCallback": function (oSettings) {
                        console.log("ddd")
                    }
                });
            }
        });
    }
    for(var i=0; i<$('[data-table]').length; i++){
        _set($('[data-table]').eq(i));
    }
}

function mark_init(){
    function _init(){
        chart_AC();//chart
        img_check();//img center 체크
        tab_AC();
        tab_AC2();
        //scroll_check();//
        scroll_menu();
        //dark_AC();
        mobile_menu();
        imgtextbox_check();
        top_btn();
        page_AC();
        sup_AC();
        table_check();
        a_check();//a링크 체크
        data_table();
        setTimeout(function(){
            loading.off();
        },1000);
    }

    function page_AC(){
        var c = $("#bind [id*='page_']");
        var p = ($.params['p']) ? $.params['p']:1;
        c.hide().eq(p-1).show();
    }

    function _layout(data){
        $("#header h1>em").html($.trim(data.year)+"<span> "+$.trim(data.vol.toUpperCase())+"</span>");
        $("#header>ul>li>span").eq(0).text($.trim(data.name));
        $("#header>ul>li>span").eq(1).text($.trim(data.day));
        var d = ($.params['p']) ? parseInt($.params['p'])-1:0;
        $("#visual h2").text($.trim(data.page[d]));
        $("#visual").attr("data-page",d+1);
    }
    
    var err = false;
    for(var i=0; i<webBook.length; i++){
        if($.params['y'] === undefined || $.params['v'] === undefined){
            //메인
            $('<link href="../_core/css/clear.css" rel="stylesheet">\
                <link href="../_core/css/common.css" rel="stylesheet">\
                <link href="../_core/css/layout.css" rel="stylesheet">').appendTo("head");
                
            $('<div id="list"><ul /></div>').appendTo($("#root").empty());
            for(var i=0; i<webBook.length; i++){
                var bg = "";
                var texts = '<strong class="t">'+webBook[i].year+" "+webBook[i].vol.toUpperCase()+'</strong>\
                             <span class="n">'+webBook[i].name+'</span>\
                             <span class="d">'+webBook[i].day+'</span>';
                if($.trim(webBook[i].poster) !== ""){
                    var poster = './'+webBook[i].year+'/'+webBook[i].vol+'/'+webBook[i].poster;
                        poster = poster.replace(/ /g,"%20");
                    bg = 'class="poster" style="background-image:url('+poster+')"';
                    texts = "";
                }
                $('<li>\
                    <a href="?y='+webBook[i].year+'&v='+webBook[i].vol+'&p=1" '+bg+'>\
                        <img src="../_core/img/poster_grid.png" alt="" class="grid" />\
                        '+texts+'\
                    </a>\
                </li>').appendTo($("#root > #list > ul"));
            }
            i = 99999;
            setTimeout(function(){
                loading.off();
            },1000);
        } else {
            //서브
            if($.params['y'].toLowerCase() === $.trim(webBook[i].year.toLowerCase()) && $.params['v'].toLowerCase() === $.trim(webBook[i].vol.toLowerCase())){
                $('<link href="./'+webBook[i].year+'/'+webBook[i].vol+'/css/clear.css" rel="stylesheet">\
                    <link href="./'+webBook[i].year+'/'+webBook[i].vol+'/css/common.css" rel="stylesheet">\
                    <link href="./'+webBook[i].year+'/'+webBook[i].vol+'/css/layout.css" rel="stylesheet">\
                    <link href="./'+webBook[i].year+'/'+webBook[i].vol+'/css/print.css" rel="stylesheet" media="print">').appendTo("head");
                _layout(webBook[i]);//구조

                for(var r=0; r<webBook[i].page.length; r++){
                    var pages = r;
                    var cntCh = webBook[i].page.length-1;
                    var md = "./"+webBook[i].year+"/"+webBook[i].vol+"/"+(pages+1)+".md";
                        md = md.replace(/ /g,"%20");
                    $.ajax({
                        url:md,
                        async:false,
                        type:'GET',
                        dataType:'text',// xml, json, script, html
                        success:function(data) {
                            if(pages !== 0){
                                $(marked('\n---\n')).appendTo($('#bind > #page_'+pages));    
                            }
                            $('<div id="page_'+(pages+1)+'">'+marked(data)+'</div>').appendTo($("#bind"));

                            if(pages == cntCh){
                                menu_controll(pages+1,webBook[i]);//menu controll
                                _init();
                            }
                        }
                    });
                }

                i = 99999;
                err = false;
            } else {
                err = true;
            }
        }
    }   
    if(err){
        $.ajax({
            url:"./error.html",
            async:false,
            type:'GET',
            dataType:'text',// xml, json, script, html
            success:function(data) {
                $('<link href="../_core/css/clear.css" rel="stylesheet">\
                    <link href="../_core/css/common.css" rel="stylesheet">\
                    <link href="../_core/css/layout.css" rel="stylesheet">').appendTo("head");

                $("body").attr("data-error","on");
                $(data).appendTo($("#root").empty());
            }
        });
    }
}
